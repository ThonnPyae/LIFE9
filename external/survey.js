
const surveyForm = document.getElementById("disasterSurvey");
const successMessage = document.getElementById("successMessage");
const surveySection = document.getElementById("survey-form");
const anotherResponse = document.getElementById("anotherResponse");

// SUBMIT SURVEY
surveyForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // CHECK EXPERIENCE QUESTION
    const experienceOptions = document.querySelectorAll(
        'input[name="experienced"]:checked'
    );

    const experienceError = document.getElementById("experienceError");

    if (experienceOptions.length === 0) {
        experienceError.style.display = "block";

        document.querySelector(
            'input[name="experienced"]'
        ).closest(".question-card").scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        return;
    }

    experienceError.style.display = "none";

    // GET FORM DATA
    const formData = new FormData(surveyForm);
    const response = {
        submittedAt: new Date().toISOString()
    };

    formData.forEach(function (value, key) {
        if (response[key]) {
            if (!Array.isArray(response[key])) {
                response[key] = [response[key]];
            }

            response[key].push(value);
        } else {
            response[key] = value;
        }
    });

    // SAVE RESPONSE IN LOCAL STORAGE
    let savedResponses = JSON.parse(
        localStorage.getItem("life9SurveyResponses")
    ) || [];

    savedResponses.push(response);

    localStorage.setItem(
        "life9SurveyResponses",
        JSON.stringify(savedResponses)
    );

    // DISPLAY SUCCESS MESSAGE
    surveyForm.style.display = "none";
    successMessage.style.display = "block";

    successMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});

// SUBMIT ANOTHER RESPONSE
anotherResponse.addEventListener("click", function () {
    surveyForm.reset();

    successMessage.style.display = "none";
    surveyForm.style.display = "block";

    surveySection.scrollIntoView({
        behavior: "smooth"
    });
});

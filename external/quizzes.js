
function toggleSidebar() {
    let sidebar = document.getElementById("sidebar");
    let icon = document.getElementById("toggleIcon");

    if (!sidebar || !icon) return;

    sidebar.classList.toggle("collapsed");

    if (sidebar.classList.contains("collapsed")) {
        icon.className = "bi bi-arrow-right";
    } else {
        icon.className = "bi bi-arrow-left";
    }
}

let currentQuestion = 0;

let questions = [
    {
        scenario: "Your family and other town residents were given an emergency alert to evacuate to a cyclone shelter immediately, and you only have time to get one item.",
        title: "What will you try to grab as an emergency tool within a few seconds?",
        options: [
            "Battery-powered emergency radio",
            "Flashlight",
            "First-aid kit",
            "Whistle",
            "Power bank"
        ]
    },
    {
        scenario: "A tornado warning has been announced in your area. You are inside your house with your family.",
        title: "Where should you go to stay safe?",
        options: [
            "North",
            "West",
            "East",
            "South",
            "Southeast"
        ]
    },
    {
        scenario: "Heavy rainfall has caused flooding in your neighbourhood. The water level is rising, and some roads are already underwater.",
        title: "What is the safest action to take?",
        options: [
            "Walk through the floodwater",
            "Drive across the flooded road",
            "Move to higher ground and follow official instructions",
            "Stay near the river",
            "Touch electrical equipment near the water"
        ]
    },
    {
        scenario: "You are attending an online class when you suddenly feel the ground shaking strongly. Your family members are also inside the house.",
        title: "What should you do during the earthquake?",
        options: [
            "Run towards the nearest window",
            "Use the elevator immediately",
            "Drop, Cover, and Hold On",
            "Stand under a ceiling fan",
            "Rush down the stairs while the shaking continues"
        ]
    },
    {
        scenario: "After a disaster, your neighbourhood has lost electricity and communication is limited. Your family needs to receive emergency updates.",
        title: "What should your family do?",
        options: [
            "Wait until electricity returns",
            "Use a battery-powered radio for official updates and conserve phone battery",
            "Use the phone continuously for entertainment",
            "Ignore official announcements",
            "Share unverified information with neighbours"
        ]
    }
];

let selectedAnswers = Array(questions.length).fill(null);

// Start quiz
document.getElementById("startBtn").addEventListener("click", function() {
    document.getElementById("startSection").style.display = "none";
    document.getElementById("quizHeader").style.display = "none";
    document.getElementById("quizSection").style.display = "block";

    currentQuestion = 0;
    showQuestion();
    window.scrollTo(0, 0);
});

// Display questions
function showQuestion() {
    let question = questions[currentQuestion];

    document.getElementById("questionNumber").innerText =
        "QUESTION " + (currentQuestion + 1) + " OF " + questions.length;

    document.getElementById("scenarioBox").innerHTML =
        "<strong>Scenario:</strong> " + question.scenario;

    document.getElementById("questionTitle").innerText =
        question.title;

    let answersHTML = "";

    question.options.forEach(function(option, index) {
        let selected = selectedAnswers[currentQuestion] === index;

        answersHTML += `
            <label class="answer ${selected ? 'selected' : ''}">
                <input type="radio" name="answer" value="${index}" ${selected ? 'checked' : ''}>
                <span class="radio"></span>
                <span>${option}</span>
            </label>
        `;
    });

    document.getElementById("answers").innerHTML = answersHTML;

    // Select answers
    let answerCards = document.querySelectorAll(".answer");

    answerCards.forEach(function(card, index) {
        card.addEventListener("click", function() {
            selectedAnswers[currentQuestion] = index;

            answerCards.forEach(function(item) {
                item.classList.remove("selected");
            });

            card.classList.add("selected");
        });
    });

    updateProgress();

    // Back button
    document.getElementById("backBtn").style.visibility =
        currentQuestion === 0 ? "hidden" : "visible";

    // Next button
    document.getElementById("nextBtn").innerText =
        currentQuestion === questions.length - 1 ? "Finish" : "Next";
}

// Update progress bar
function updateProgress() {
    let percentage = ((currentQuestion + 1) / questions.length) * 100;

    document.getElementById("progressFill").style.width =
        percentage + "%";

    document.getElementById("progressCircle").style.left =
        percentage + "%";

    document.getElementById("progressCircle").innerText =
        Math.round(percentage) + "%";
}

// Next question
function nextQuestion() {
    if (selectedAnswers[currentQuestion] === null) {
        alert("Please select an answer first!");
        return;
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
        window.scrollTo(0, 0);
    } else {
        document.getElementById("quizSection").style.display = "none";
        document.getElementById("completeSection").style.display = "flex";
        window.scrollTo(0, 0);
    }
}

// Previous question
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
        window.scrollTo(0, 0);
    }
}

// Restart quiz
function restartQuiz() {
    currentQuestion = 0;
    selectedAnswers = Array(questions.length).fill(null);

    document.getElementById("completeSection").style.display = "none";
    document.getElementById("quizSection").style.display = "block";

    showQuestion();
    window.scrollTo(0, 0);
}

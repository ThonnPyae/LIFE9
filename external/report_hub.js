document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();

    const message = document.getElementById("submit-message");

    message.textContent = "Your report has been submitted successfully!";
    message.style.color = "#198754";
    message.style.fontWeight = "600";

    this.reset();
});
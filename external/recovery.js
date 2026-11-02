const recoveryChecks = document.querySelectorAll(".recovery-check");
const progressText = document.getElementById("progress-text");
const progressBar = document.getElementById("progress-bar");
const progressContainer = document.getElementById("progress-container");
function updateProgress() {
    const completed = document.querySelectorAll(".recovery-check:checked").length;
    const total = recoveryChecks.length;
    const percentage = (completed / total) * 100;
    progressText.textContent = `${completed} of ${total} completed`;
    progressBar.style.width = `${percentage}%`;
    progressContainer.setAttribute("aria-valuenow", completed);
};
recoveryChecks.forEach(check => check.addEventListener("change", updateProgress));
const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("username-login");
const passwordInput = document.getElementById("password-login");

function showError(id, show = true) {
    document.getElementById(id).style.display = show ? "block" : "none";
}

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Clear previous errors
    showError("w-usename-login", false);
    showError("w-password-login", false);

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    // Retrieve registered accounts
    const users = JSON.parse(localStorage.getItem("life9Users")) || [];

    // Find matching username
    const existingUser = users.find(
        user => user.username.toLowerCase() === username.toLowerCase()
    );

    // Check username
    if (!existingUser) {
        showError("w-usename-login");
        return;
    }

    // Check password
    if (existingUser.password !== password) {
        showError("w-password-login");
        return;
    }

    // Create current login session
    const currentUser = {
        username: existingUser.username,
        fullname: existingUser.fullname,
        region: existingUser.region
    };

    localStorage.setItem("life9CurrentUser", JSON.stringify(currentUser));

    alert("Login successful! Welcome back, " + existingUser.fullname + "!");

    // Redirect to dashboard
    window.location.href = "dashboard.html";
});

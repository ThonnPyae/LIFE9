const signupForm = document.getElementById("signup-form");
const usernameInput = document.getElementById("username-signin");
const fullnameInput = document.getElementById("fullname");
const passwordInput = document.getElementById("password-signin");
const confirmInput = document.getElementById("password-confirm");
const regionInput = document.getElementById("region");

function showError(id, show = true) {
    document.getElementById(id).style.display = show ? "block" : "none";
}

function clearErrors() {
    const errors = [
        "w-usename-signup",
        "no-name-signup",
        "w-pass-signup",
        "no-pass-signup",
        "w-confirm-signup",
        "w-region-signup"
    ];
    errors.forEach(id => showError(id, false));
}

signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();

    const username = usernameInput.value.trim();
    const fullname = fullnameInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmInput.value;
    const region = regionInput.value;

    let valid = true;

    // Username validation
    if (username.length < 4 || !/^[a-zA-Z0-9_]+$/.test(username)) {
        document.getElementById("user-requirement").textContent =
            "at least 4 characters and contain only letters, numbers or underscores.";
        showError("w-usename-signup");
        valid = false;
    }

    // Full name validation
    if (fullname.length < 2) {
        showError("no-name-signup");
        valid = false;
    }

    // Password validation
    if (password.length <= 5) {
        document.getElementById("pass-requirement").textContent =
            "at least 6 characters.";
        showError("w-pass-signup");
        valid = false;
    }

    // Password confirmation
    if (password !== confirmPassword) {
        showError("w-confirm-signup");
        valid = false;
    }

    // Region validation
    if (region === "select") {
        showError("w-region-signup");
        valid = false;
    }

    if (!valid) return;

    // Retrieve registered users
    let users = JSON.parse(localStorage.getItem("life9Users")) || [];

    // Check for existing username
    const existingUser = users.find(
        user => user.username.toLowerCase() === username.toLowerCase()
    );

    if (existingUser) {
        document.getElementById("user-requirement").textContent =
            "a username that has not already been registered.";
        showError("w-usename-signup");
        return;
    }

    // Create new account
    const newUser = {
        username: username,
        fullname: fullname,
        password: password,
        region: region
    };

    users.push(newUser);

    // Save registered accounts
    localStorage.setItem("life9Users", JSON.stringify(users));

    // Create login session
    const currentUser = {
        username: username,
        fullname: fullname,
        region: region
    };

    localStorage.setItem("life9CurrentUser", JSON.stringify(currentUser));

    alert("Your account has been created successfully!");

    // Redirect to dashboard
    window.location.href = "dashboard.html";
});

// Get logged-in user data
const currentUser = JSON.parse(
    localStorage.getItem("life9CurrentUser")
);

// Redirect if not logged in
if (!currentUser) {
    alert("Please log in first!");
    window.location.href = "login.html";
}

// Logout function
function logout() {
    localStorage.removeItem("life9CurrentUser");
    window.location.href = "login.html";
}


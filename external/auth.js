// authenticate
function logout() {
    localStorage.removeItem("life9CurrentUser");
    window.location.href = "login.html";
}


// AUTHENTICATE
const userData = localStorage.getItem("life9CurrentUser");

if (!userData) {
    alert("Login information not found!");
    window.location.href = "login.html";
} else {
    const parsedUserData = JSON.parse(userData);
    const profileContainer = document.getElementById("profile-container");

    // PROFILE PREVIEW
    document.getElementById("fullname-preview").textContent = parsedUserData.fullname;
    document.getElementById("username-preview").textContent = parsedUserData.username;

    document.getElementById("bio-preview").textContent =
        parsedUserData.bio || parsedUserData.username + " currently has no bio.";

    // PROFILE PICTURE OR DEFAULT INITIAL
    function displayProfile() {
        if (parsedUserData.profilePic) {
            profileContainer.style.backgroundImage = `url("${parsedUserData.profilePic}")`;
            profileContainer.style.backgroundSize = "cover";
            profileContainer.style.backgroundPosition = "center";
            profileContainer.style.backgroundRepeat = "no-repeat";
            profileContainer.textContent = "";
        } else {
            profileContainer.style.backgroundImage = "none";
            profileContainer.textContent = parsedUserData.username.charAt(0).toUpperCase();
        }
    }

    displayProfile();

    // PLACEHOLDERS
    function decidePlaceholder() {
        document.getElementById("existing-username").placeholder =
            parsedUserData.username;

        document.getElementById("existing-fullname").placeholder =
            parsedUserData.fullname;

        document.getElementById("account-bio").placeholder =
            parsedUserData.bio || "Write something about yourself...";
    }

    decidePlaceholder();

    // ACCOUNT FORM
    const accountForm = document.getElementById("account-form");

    accountForm.addEventListener("submit", function(event) {
        event.preventDefault();

        document.getElementById("w-usename-edited").style.display = "none";

        const username = document.getElementById("existing-username").value.trim();
        const fullname = document.getElementById("existing-fullname").value.trim();
        const bio = document.getElementById("account-bio").value.trim();
        const profilePic = document.getElementById("profile").files[0];

        // PROFILE PICTURE SIZE VALIDATION
        if (profilePic && profilePic.size > 70 * 1024) {
            alert("Please insert a profile picture under 70 KB.");
            return;
        }

        // USERNAME VALIDATION
        if (username.length > 0 && username.length < 6) {
            document.getElementById("w-usename-edited").style.display = "block";
            return;
        }

        // UPDATE USERNAME
        if (username.length > 0) {
            parsedUserData.username = username;
        }

        // UPDATE FULL NAME
        if (fullname.length > 0) {
            parsedUserData.fullname = fullname;
        }

        // UPDATE BIO
        parsedUserData.bio = bio;

        // SAVE CHANGES
        function saveChanges() {
            document.getElementById("fullname-preview").textContent =
                parsedUserData.fullname;

            document.getElementById("username-preview").textContent =
                parsedUserData.username;

            document.getElementById("bio-preview").textContent =
                parsedUserData.bio ||
                parsedUserData.username + " currently has no bio.";

            displayProfile();

            localStorage.setItem("life9CurrentUser", JSON.stringify(parsedUserData));

            decidePlaceholder();

            alert("Your account has been updated!");
        }

        // UPDATE PROFILE PICTURE
        if (profilePic) {
            const profileImgReader = new FileReader();

            profileImgReader.onload = function() {
                parsedUserData.profilePic = profileImgReader.result;
                saveChanges();
            };

            profileImgReader.readAsDataURL(profilePic);
        } else {
            saveChanges();
        }
    });

    // LOG OUT
    const logoutButton = document.querySelector(".logout-btn");

    if (logoutButton) {
        logoutButton.addEventListener("click", function() {
            localStorage.removeItem("life9CurrentUser");
            window.location.href = "login.html";
        });
    }
}

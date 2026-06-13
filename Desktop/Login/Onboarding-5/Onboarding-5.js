// LOAD USER DATA INTO PAGE

document.getElementById("profileImage").src =
    localStorage.getItem("profileImage") ||
    "https://via.placeholder.com/120";

document.getElementById("fullName").textContent =
    localStorage.getItem("fullName") || "-";

document.getElementById("role").textContent =
    localStorage.getItem("role") || "-";

document.getElementById("firmName").textContent =
    localStorage.getItem("firmName") || "-";

document.getElementById("firmSize").textContent =
    localStorage.getItem("firmSize") || "-";

document.getElementById("email").textContent =
    localStorage.getItem("email") || "-";

document.getElementById("phoneNumber").textContent =
    localStorage.getItem("phoneNumber") || "-";


// REGISTER USER

const registerBtn =
    document.getElementById("launchDashboard");

registerBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    registerBtn.textContent =
        "Creating Account...";

    registerBtn.style.pointerEvents =
        "none";

    const userData = {
        fullName:
            localStorage.getItem("fullName"),

        email:
            localStorage.getItem("email"),

        password:
            localStorage.getItem("password"),

        role:
            localStorage.getItem("role"),

        firmSize:
            localStorage.getItem("firmSize"),

        phone:
            localStorage.getItem("phoneNumber"),

        lawFirm:
            localStorage.getItem("firmName"),

        profilePicture:
            localStorage.getItem("profileImage")
    };






    try {
        console.time("registration");
        const response = await fetch(
            "https://apex-legal-1.onrender.com/api/users/register",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify(userData)
            }
        );

        const data =
            await response.json();
        console.timeEnd("registration");
        if (!response.ok) {
            throw new Error(
                data.message ||
                "Registration failed"
            );
        }

        alert(
            "Account created successfully!"
        );

        console.log(data);

        // SAVE TOKEN IF YOU RETURN ONE

        if (data.token) {
            localStorage.setItem(
                "token",
                data.token
            );
        }

        // CLEAR ONBOARDING DATA

        localStorage.removeItem("firmName");
        localStorage.removeItem("firmSize");
        localStorage.removeItem("role");
        localStorage.removeItem("fullName");
        localStorage.removeItem("email");
        localStorage.removeItem("phoneNumber");
        localStorage.removeItem("password");
        localStorage.removeItem("profileImage");

        // REDIRECT

        window.location.href =
            "../login.html";

        
    } catch (error) {

        console.error(error);

        alert(error.message);

        registerBtn.textContent =
            "Create Account";

        registerBtn.style.pointerEvents =
            "auto";
    }

});
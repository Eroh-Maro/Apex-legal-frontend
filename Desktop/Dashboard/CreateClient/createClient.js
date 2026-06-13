// =====================
// AUTH CHECK
// =====================

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "../../Login/login.html";
}

// =====================
// LOAD USER DATA
// =====================

function loadUserInfo() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    console.log("Logged in user:", user);

    if (!user) return;

    const userName =
        document.getElementById("userName");

    const userRole =
        document.getElementById("userRole");

    const userAvatar =
        document.getElementById("userAvatar");

    if (userName) {
        userName.textContent =
            user.fullName ||
            user.name ||
            "User";
    }

    if (userRole) {
        userRole.textContent =
            user.role || "User";
    }

    if (userAvatar) {

        const image =
            user.profilePicture ||
            user.profileImage ||
            user.avatar;

        if (image) {
            userAvatar.src = image;
        }
    }
}

loadUserInfo();

// =====================
// CREATE CLIENT
// =====================

const createClientForm =
    document.getElementById(
        "createClientForm"
    );

if (createClientForm) {

    createClientForm.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();

            const submitBtn =
                document.querySelector(
                    ".save-btn"
                );

            const clientData = {

                fullName:
                    document
                        .getElementById(
                            "fullName"
                        )
                        .value
                        .trim(),

                email:
                    document
                        .getElementById(
                            "email"
                        )
                        .value
                        .trim(),

                phone:
                    document
                        .getElementById(
                            "phone"
                        )
                        .value
                        .trim(),

                address:
                    document
                        .getElementById(
                            "address"
                        )
                        .value
                        .trim(),

                companyName:
                    document
                        .getElementById(
                            "companyName"
                        )
                        .value
                        .trim(),

                gender:
                    document
                        .getElementById(
                            "gender"
                        )
                        .value,

                dateOfBirth:
                    document
                        .getElementById(
                            "dateOfBirth"
                        )
                        .value,

                notes:
                    document
                        .getElementById(
                            "notes"
                        )
                        .value
                        .trim(),
            };

            if (
                !clientData.fullName ||
                !clientData.phone
            ) {
                alert(
                    "Full Name and Phone Number are required"
                );
                return;
            }

            try {

                submitBtn.disabled = true;
                submitBtn.textContent =
                    "Creating Client...";

                const response =
                    await fetch(
                        "http://localhost:8080/api/clients/create",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",

                                Authorization:
                                    `Bearer ${token}`,
                            },

                            body: JSON.stringify(
                                clientData
                            ),
                        }
                    );

                const data =
                    await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                        "Failed to create client"
                    );
                }

                alert(
                    "Client created successfully"
                );

                window.location.href =
                    "../CreateClient/client.html";

            } catch (error) {

                console.error(error);

                alert(
                    error.message ||
                    "Failed to create client"
                );

                submitBtn.disabled =
                    false;

                submitBtn.textContent =
                    "Create Client";
            }
        }
    );
}

// =====================
// CANCEL BUTTON
// =====================

const cancelBtn =
    document.querySelector(
        ".cancel-btn"
    );

if (cancelBtn) {

    cancelBtn.addEventListener(
        "click",
        () => {

            window.location.href =
                "../CreateClient/client.html";
        }
    );
}

// =====================
// LOGOUT
// =====================

const logoutLinks =
    document.querySelectorAll(
        ".footer-link"
    );

const logoutBtn =
    logoutLinks[
        logoutLinks.length - 1
    ];

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        (e) => {

            e.preventDefault();

            localStorage.removeItem(
                "token"
            );

            localStorage.removeItem(
                "user"
            );

            window.location.href =
                "../../Login/login.html";
        }
    );
}
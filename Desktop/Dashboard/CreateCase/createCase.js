// =====================
// AUTH CHECK
// =====================

const token = localStorage.getItem("token");

if (!token) {
    window.location.href =
        "../../Login/login.html";
}

// =====================
// LOAD USER DATA
// =====================

function loadUserInfo() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

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
            user.role || "Lawyer";
    }

    if (
        userAvatar &&
        (user.profilePicture ||
            user.profileImage)
    ) {
        userAvatar.src =
            user.profilePicture ||
            user.profileImage;
    }
}

// =====================
// LOAD CLIENTS
// =====================

async function loadClients() {

    try {

        const response = await fetch(
            "https://apex-legal-1.onrender.com/api/clients",
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        const data =
            await response.json();

        if (!response.ok) {
            throw new Error(
                data.message
            );
        }

        const clientSelect =
            document.getElementById(
                "client"
            );

        clientSelect.innerHTML =
            `<option value="">
                Select Client
            </option>`;

        data.clients.forEach(
            (client) => {

                clientSelect.innerHTML += `
                    <option value="${client._id}">
                        ${client.fullName}
                    </option>
                `;
            }
        );

    } catch (error) {

        console.error(error);

        alert(
            "Failed to load clients"
        );
    }
}

// =====================
// CREATE CASE
// =====================

const createCaseForm =
    document.getElementById(
        "createCaseForm"
    );

if (createCaseForm) {

    createCaseForm.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();

            const submitBtn =
                document.querySelector(
                    ".save-btn"
                );

            const caseData = {

                title:
                    document
                        .getElementById(
                            "title"
                        )
                        .value
                        .trim(),

                caseNumber:
                    document
                        .getElementById(
                            "caseNumber"
                        )
                        .value
                        .trim(),

                client:
                    document
                        .getElementById(
                            "client"
                        )
                        .value,

                caseType:
                    document
                        .getElementById(
                            "caseType"
                        )
                        .value,

                status:
                    document
                        .getElementById(
                            "status"
                        )
                        .value,

                priority:
                    document
                        .getElementById(
                            "priority"
                        )
                        .value,

                hearingDate:
                    document
                        .getElementById(
                            "hearingDate"
                        )
                        .value,

                courtName:
                    document
                        .getElementById(
                            "courtName"
                        )
                        .value
                        .trim(),

                description:
                    document
                        .getElementById(
                            "description"
                        )
                        .value
                        .trim()
            };

            if (
                !caseData.title ||
                !caseData.caseNumber ||
                !caseData.client ||
                !caseData.caseType
            ) {
                alert(
                    "Please fill all required fields"
                );
                return;
            }

            try {

                submitBtn.disabled = true;

                submitBtn.textContent =
                    "Creating Case...";

                const response =
                    await fetch(
                        "https://apex-legal-1.onrender.com/api/cases/create",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",

                                Authorization:
                                    `Bearer ${token}`
                            },

                            body: JSON.stringify(
                                caseData
                            )
                        }
                    );

                const data =
                    await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                        "Failed to create case"
                    );
                }

                alert(
                    "Case created successfully"
                );

                window.location.href =
                    "./Case.html";

            } catch (error) {

                alert(error.message);

                submitBtn.disabled = false;

                submitBtn.textContent =
                    "Create Case";
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
                "./case";
        }
    );
}

// =====================
// LOGOUT
// =====================

const logoutLink =
    document.querySelectorAll(
        ".footer-link"
    )[1];

if (logoutLink) {

    logoutLink.addEventListener(
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

// =====================
// INIT
// =====================

loadUserInfo();
loadClients();
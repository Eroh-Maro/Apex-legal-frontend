// =========================
// AUTH CHECK
// =========================

const token = localStorage.getItem("token");

if (!token) {
    window.location.href =
        "../../Login/login.html";
}

// =========================
// LOAD USER INFO
// =========================

function loadUserInfo() {

    const user =
        JSON.parse(
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
            user.role || "User";
    }

    if (
        userAvatar &&
        (
            user.profilePicture ||
            user.profileImage
        )
    ) {
        userAvatar.src =
            user.profilePicture ||
            user.profileImage;
    }
}

// =========================
// LOAD CASES
// =========================

async function loadCases() {

    try {

        const response =
            await fetch(
                "https://apex-legal-1.onrender.com/api/cases",
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
                data.message ||
                "Failed to load cases"
            );
        }

        const tableBody =
            document.getElementById(
                "caseTableBody"
            );

        tableBody.innerHTML = "";

        let openCases = 0;
        let closedCases = 0;
        let upcomingHearings = 0;

        const today =
            new Date();

        data.cases.forEach(
            (caseItem) => {

                if (
                    caseItem.status
                        ?.toLowerCase() ===
                    "open"
                ) {
                    openCases++;
                }

                if (
                    caseItem.status
                        ?.toLowerCase() ===
                    "closed"
                ) {
                    closedCases++;
                }

                if (
                    caseItem.hearingDate
                ) {

                    const hearingDate =
                        new Date(
                            caseItem.hearingDate
                        );

                    if (
                        hearingDate >= today
                    ) {
                        upcomingHearings++;
                    }
                }

                tableBody.innerHTML += `
                    <tr>

                        <td>
                            ${
                                caseItem.caseNumber ||
                                "-"
                            }
                        </td>

                        <td>
                            ${
                                caseItem.title ||
                                "-"
                            }
                        </td>

                        <td>
                            ${
                                caseItem.client?.fullName ||
                                caseItem.clientName ||
                                "-"
                            }
                        </td>

                        <td>
                            <span class="${
                                caseItem.status?.toLowerCase() === "closed"
                                    ? "status-closed"
                                    : "status-open"
                            }">
                                ${
                                    caseItem.status ||
                                    "Open"
                                }
                            </span>
                        </td>

                        <td>
                            ${
                                caseItem.priority ||
                                "-"
                            }
                        </td>

                        <td>

                            <a
                                href="./viewCase.html?id=${caseItem._id}"
                                class="action-btn"
                            >
                                View
                            </a>

                        </td>

                    </tr>
                `;
            }
        );

        document.getElementById(
            "totalCases"
        ).textContent =
            data.count || 0;

        document.getElementById(
            "openCases"
        ).textContent =
            openCases;

        document.getElementById(
            "closedCases"
        ).textContent =
            closedCases;

        document.getElementById(
            "upcomingHearings"
        ).textContent =
            upcomingHearings;

    } catch (error) {

        console.error(error);

        alert(
            error.message ||
            "Failed to load cases"
        );
    }
}

// =========================
// SEARCH
// =========================

const caseSearch =
    document.getElementById(
        "caseSearch"
    );

if (caseSearch) {

    caseSearch.addEventListener(
        "input",
        function () {

            const value =
                this.value.toLowerCase();

            const rows =
                document.querySelectorAll(
                    "#caseTableBody tr"
                );

            rows.forEach((row) => {

                const text =
                    row.textContent
                        .toLowerCase();

                row.style.display =
                    text.includes(value)
                        ? ""
                        : "none";
            });
        }
    );
}

// =========================
// LOGOUT
// =========================

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

// =========================
// INIT
// =========================

loadUserInfo();
loadCases();
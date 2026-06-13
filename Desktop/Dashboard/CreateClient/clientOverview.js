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
        user.profilePicture
    ) {
        userAvatar.src =
            user.profilePicture;
    }
}

// =========================
// LOAD CLIENTS
// =========================

async function loadClients() {

    try {

        const token =
            localStorage.getItem("token");

        const response =
            await fetch(
                "http://localhost:8080/api/clients",
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

        const tableBody =
            document.getElementById(
                "clientTableBody"
            );

        tableBody.innerHTML = "";

        let activeCount = 0;
        let newThisMonth = 0;

        const currentMonth =
            new Date().getMonth();

        const currentYear =
            new Date().getFullYear();

        data.clients.forEach(
            (client) => {

                if (client.isActive) {
                    activeCount++;
                }

                const createdDate =
                    new Date(
                        client.createdAt
                    );

                if (
                    createdDate.getMonth() ===
                        currentMonth &&
                    createdDate.getFullYear() ===
                        currentYear
                ) {
                    newThisMonth++;
                }

                tableBody.innerHTML += `
                    <tr>
                        <td>${client.fullName}</td>

                        <td>${client.phone}</td>

                        <td>
                            ${
                                client.email ||
                                "-"
                            }
                        </td>

                        <td>
                            ${
                                client.companyName ||
                                "-"
                            }
                        </td>

                        <td>
                            <span class="${
                                client.isActive
                                    ? "status-active"
                                    : "status-inactive"
                            }">
                                ${
                                    client.isActive
                                        ? "Active"
                                        : "Inactive"
                                }
                            </span>
                        </td>

                        <td>
                            <a
                                href="../ViewClient/ViewClient.html?id=${client._id}"
                                class="action-btn"
                            >
                                View
                            </a>
                        </td>
                    </tr>
                `;
            }
        );

        // =========================
        // STATS
        // =========================

        document.getElementById(
            "totalClients"
        ).textContent =
            data.count;

        document.getElementById(
            "activeClients"
        ).textContent =
            activeCount;

        document.getElementById(
            "newClients"
        ).textContent =
            newThisMonth;

    } catch (error) {

        console.error(error);

        alert(
            error.message ||
            "Failed to load clients"
        );
    }
}

// =========================
// SEARCH
// =========================

const searchInput =
    document.getElementById(
        "clientSearch"
    );

if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            const value =
                this.value.toLowerCase();

            const rows =
                document.querySelectorAll(
                    "#clientTableBody tr"
                );

            rows.forEach((row) => {

                const text =
                    row.textContent.toLowerCase();

                row.style.display =
                    text.includes(value)
                        ? ""
                        : "none";
            });
        }
    );
}

// =========================
// INIT
// =========================

loadUserInfo();
loadClients();
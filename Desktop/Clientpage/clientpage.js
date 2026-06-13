// =========================
// SIDEBAR ACTIVE STATE
// =========================

const navItems = document.querySelectorAll(".nav-item");
const currentPath = window.location.pathname;

navItems.forEach((item) => {
  const href = item.getAttribute("href");

  if (!href || href === "#") return;

  const itemPath = new URL(
    href,
    window.location.origin
  ).pathname;

  if (itemPath === currentPath) {
    item.classList.add("active");
  }

  item.addEventListener("click", () => {
    navItems.forEach((nav) =>
      nav.classList.remove("active")
    );

    item.classList.add("active");
  });
});

// =========================
// FILTER BUTTONS
// =========================

const filterButtons =
  document.querySelectorAll(".filter-btn");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) =>
      btn.classList.remove("f-btn-active")
    );

    button.classList.add("f-btn-active");
  });
});

// =========================
// API
// =========================

const CLIENTS_API =
  "https://apex-legal-1.onrender.com/api/clients";

const USER_API =
  "https://apex-legal-1.onrender.com/api/users/me";

// =========================
// LOAD PAGE DATA
// =========================

document.addEventListener(
  "DOMContentLoaded",
  async () => {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      // =========================
      // FETCH USER + CLIENTS
      // =========================

      const [
        userResponse,
        clientsResponse,
      ] = await Promise.all([
        fetch(USER_API, {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }),

        fetch(CLIENTS_API, {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }),
      ]);

      const userData =
        await userResponse.json();

      const clientsData =
        await clientsResponse.json();

      console.log("User:", userData);
      console.log(
        "Clients:",
        clientsData
      );

      // =========================
      // USER INFO
      // =========================

      const user =
        userData.user ||
        userData.data ||
        userData;

      document.getElementById(
        "userName"
      ).textContent =
        user.fullName ||
        user.name ||
        "User";

      document.getElementById(
        "userRole"
      ).textContent =
        user.role?.toUpperCase() ||
        "USER";

      if (
        user.profilePicture &&
        document.getElementById(
          "userAvatar"
        )
      ) {
        document.getElementById(
          "userAvatar"
        ).src = user.profilePicture;
      }

      // =========================
      // CLIENT TABLE
      // =========================

      const tableBody =
        document.getElementById(
          "clientTableBody"
        );

      if (!tableBody) return;

      const clients =
        clientsData.clients ||
        clientsData.data ||
        [];

      if (!clients.length) {
        tableBody.innerHTML = `
          <tr>
            <td colspan="6">
              No clients found
            </td>
          </tr>
        `;

        return;
      }

      tableBody.innerHTML =
        clients
          .map(
            (client) => `
          <tr>

            <td>
              <p>
                ${
                  client.fullName ||
                  "-"
                }
              </p>

              <span>
                ID:
                ${client._id}
              </span>
            </td>

            <td>
              <p>
                ${
                  client.phone ||
                  "-"
                }
              </p>

              <span>
                ${
                  client.email ||
                  "-"
                }
              </span>
            </td>

            <td>
              <span class="badge type">
                ${
                  client.clientType ||
                  "Client"
                }
              </span>
            </td>

            <td>
              ${
                client.activeCases ||
                0
              }
            </td>

            <td>
              <span class="badge ${
                client.isActive
                  ? "active"
                  : "inactive"
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
                href="../clientprofile/clientprofile.html?id=${client._id}"
                class="action-btn"
              >
                View
              </a>
            </td>

          </tr>
        `
          )
          .join("");
const tableCount =
  document.getElementById(
    "tableCount"
  );

if (tableCount) {
  tableCount.textContent =
    `Showing ${clients.length} entr${
      clients.length === 1
        ? "y"
        : "ies"
    }`;
}
    } catch (error) {
      console.error(error);
    }
  }
);
// ======================
// SIDEBAR ACTIVE STATE
// ======================

const navItems = document.querySelectorAll(".nav-item");
const currentPath = window.location.pathname;

navItems.forEach((item) => {
  const href = item.getAttribute("href");

  if (!href || href === "#") return;

  const itemPath = new URL(href, window.location.origin).pathname;

  if (itemPath === currentPath) {
    item.classList.add("active");
  }

  item.addEventListener("click", () => {
    navItems.forEach((nav) => nav.classList.remove("active"));
    item.classList.add("active");
  });
});

// ======================
// API ROUTES
// ======================

const DASHBOARD_API = "https://apex-legal-1.onrender.com/api/dashboard";
const USER_API = "https://apex-legal-1.onrender.com/api/users/me";
const MY_HEARINGS_API = "https://apex-legal-1.onrender.com/api/hearings/my-hearings";

// ======================
// DASHBOARD
// ======================

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    // Date
    const dateElement = document.getElementById("currentDate");

    if (dateElement) {
      dateElement.textContent = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }

    // Fetch everything at once
    const [statsResponse, userResponse, hearingsResponse] = await Promise.all([
      fetch(`${DASHBOARD_API}/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

      fetch(USER_API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

      fetch(MY_HEARINGS_API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);

    const statsData = await statsResponse.json();
    const userData = await userResponse.json();
    const hearingsData = await hearingsResponse.json();
    console.log("statsData", statsData);
    console.log("statsData.cases", statsData.cases);
    console.log("statsData.recentCases", statsData.recentCases);
    console.log("Dashboard:", statsData);
    console.log("User:", userData);
    console.log("Hearings:", hearingsData);

    // ======================
    // USER DATA
    // ======================

    const user =
      userData.user || userData.data || userData.currentUser || userData || {};

    const fullName =
      user.fullName ||
      `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
      user.name ||
      "User";

    const profilePicture =
      user.profilePicture || user.avatar || user.profileImage || "";

    document.getElementById("userName") &&
      (document.getElementById("userName").textContent = fullName);

    document.getElementById("welcomeName") &&
      (document.getElementById("welcomeName").textContent =
        fullName.split(" ")[0]);

    document.getElementById("userRole") &&
      (document.getElementById("userRole").textContent =
        user.role?.toUpperCase() || "STAFF");

    document.getElementById("userEmail") &&
      (document.getElementById("userEmail").textContent = user.email || "");

    if (document.getElementById("userAvatar") && profilePicture) {
      document.getElementById("userAvatar").src = profilePicture;
    }

    // ======================
    // DASHBOARD STATS
    // ======================

    const stats = statsData.stats || {};

    document.getElementById("activeCases") &&
      (document.getElementById("activeCases").textContent =
        stats.activeCases || stats.openCases || 0);

    document.getElementById("pendingCases") &&
      (document.getElementById("pendingCases").textContent =
        stats.pendingCases || 0);

    document.getElementById("closedCases") &&
      (document.getElementById("closedCases").textContent =
        stats.closedCases || 0);

    document.getElementById("highPriorityCases") &&
      (document.getElementById("highPriorityCases").textContent =
        stats.highPriorityCases || 0);

    // ======================
    // HEARING COUNTS
    // ======================

    const hearings =
      hearingsData.hearings || hearingsData.data || hearingsData || [];

    document.getElementById("upcomingHearingsCount") &&
      (document.getElementById("upcomingHearingsCount").textContent =
        hearings.length);

    // ======================
    // CASE TABLE
    // ======================

    const table = document.getElementById("recentCasesTable");

    if (table) {
      const cases = statsData.cases || statsData.recentCases || [];

      if (!cases.length) {
        table.innerHTML = `
          <tr>
            <td colspan="4">No assigned cases found</td>
          </tr>
        `;
      } else {
        table.innerHTML = cases
          .map(
            (c) => `
            <tr>
              <td>${c.caseNumber || "-"}</td>
              <td>${c.title || c.caseTitle || "-"}</td>
              <td>${c.status || "-"}</td>
              <td>
                ${
                  c.nextHearingDate
                    ? new Date(c.nextHearingDate).toLocaleDateString()
                    : "-"
                }
              </td>
            </tr>
          `
          )
          .join("");
      }
    }

    // ======================
    // HEARINGS
    // ======================

    const hearingsContainer = document.getElementById("hearingsContainer");

    if (hearingsContainer) {
      if (!hearings.length) {
        hearingsContainer.innerHTML = "<p>No upcoming hearings</p>";
      } else {
        hearingsContainer.innerHTML = hearings
          .map(
            (hearing) => `
            <div class="hearing">
              <span>
                ${new Date(hearing.hearingDate).toLocaleDateString()}
              </span>

              <h3>
                ${hearing.case?.title || hearing.caseTitle || "Hearing"}
              </h3>

              <p>
                ${hearing.location || hearing.courtName || "Court"}
              </p>
            </div>
          `
          )
          .join("");
      }
    }
  } catch (error) {
    console.error("Dashboard Error:", error);
  }
});

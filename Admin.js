document.addEventListener("DOMContentLoaded", () => {
  // --- 1. SEARCH INPUT FUNCTIONALITY ---
  const searchInput = document.querySelector(".left-nav .input");
  
  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      const searchTerm = event.target.value.toLowerCase().trim();
      console.log(`Searching for: ${searchTerm}`);
      
      // Example: Filter the visible user rows based on name or email
      const userRows = document.querySelectorAll(".div-container > div");
      userRows.forEach(row => {
        const textContent = row.textContent.toLowerCase();
        if (textContent.includes(searchTerm)) {
          row.style.display = ""; // Show row
        } else {
          row.style.display = "none"; // Hide row
        }
      });
    });
  }


  // --- SEARCH ICON FUNCTIONALITY ---
const searchIcon = document.querySelector(".left-nav .search");
const searchInputField = document.querySelector(".left-nav .input");

if (searchIcon && searchInputField) {
  // Make the search icon look clickable
  searchIcon.style.cursor = "pointer";

  searchIcon.addEventListener("click", () => {
    const query = searchInputField.value.trim();

    if (query !== "") {
      // If there is text, trigger the search logic
      console.log(`Executing search icon query for: ${query}`);
      
      // Re-use the row filtering logic from your search input
      const userRows = document.querySelectorAll(".div-container > div");
      userRows.forEach(row => {
        const textContent = row.textContent.toLowerCase();
        if (textContent.includes(query.toLowerCase())) {
          row.style.display = ""; 
        } else {
          row.style.display = "none"; 
        }
      });
    } else {
      // If the field is empty, bring focus to the input bar so user can type
      searchInputField.focus();
    }
  });
}


  // --- 2. NAVIGATION & SIDEBAR BUTTONS ---
  
  // Dashboard Click
  const dashboardBtn = document.querySelector(".apex-item1");
  if (dashboardBtn) {
    dashboardBtn.addEventListener("click", () => {
      alert("Navigating to Dashboard...");
      // window.location.href = "/dashboard.html"; // Uncomment to redirect
    });
  }

  // User Management Click
  const userManagementBtn = document.querySelector(".apex-item3");
  if (userManagementBtn) {
    userManagementBtn.addEventListener("click", () => {
      console.log("User Management section active.");
      // Add logic here to display the user management view if hidden
    });
  }

  // All Cases Click
  const allCasesBtn = document.querySelector(".apex-item2");
  if (allCasesBtn) {
    allCasesBtn.addEventListener("click", () => {
      alert("Loading all legal cases...");
    });
  }

  // Audit Logs Click
  const auditLogsBtn = document.querySelector(".apex-item");
  if (auditLogsBtn) {
    auditLogsBtn.addEventListener("click", () => {
      alert("Opening System Audit Logs...");
    });
  }

  // New Cases Button Click
  const newCaseBtn = document.querySelector(".bottom-btn");
  if (newCaseBtn) {
    newCaseBtn.addEventListener("click", () => {
      alert("Opening form to create a New Case.");
    });
  }

  // --- 3. HEADER NAV BAR ICONS ---

  // Notification Icon Click
  const notificationIcon = document.querySelector(".right-nav .sub");
  if (notificationIcon) {
    notificationIcon.addEventListener("click", () => {
      alert("You have no new notifications.");
      // Optional: Hide the background red badge icon upon clicking
      const badge = notificationIcon.querySelector(".background");
      if (badge) badge.style.display = "none";
    });
  }

  // Setting Icon Click
  // Selects the setting icon image sitting right after the notification element
  const settingIcon = document.querySelector(".right-nav .img-nav-logo:not(sub img)");
  if (settingIcon) {
    settingIcon.addEventListener("click", () => {
      alert("Opening settings panel...");
    });
  }

  // --- 4. ACTION BUTTONS (Export & Invite) ---

  const exportBtn = document.querySelector(".head-btn1");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      alert("Exporting user directory to CSV/Excel...");
    });
  }

  const inviteBtn = document.querySelector(".head-btn2");
  if (inviteBtn) {
    inviteBtn.addEventListener("click", () => {
      alert("Opening 'Invite New User' modal window.");
    });
  }

  // --- 5. ROW ACTIONS (3-Dots Menu) ---
  const actionMenus = document.querySelectorAll(".div-container img[src*='3dots']");
  actionMenus.forEach((menuIcon, index) => {
    menuIcon.style.cursor = "pointer";
    menuIcon.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevents row click triggers
      const employeeName = menuIcon.closest("div").parentElement.querySelector("h4").textContent;
      alert(`Opening actions menu for: ${employeeName}`);
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  // --- HELP LINK FUNCTIONALITY ---
  // Selects the help paragraph or its parent link container
  const helpLink = document.querySelector(".ancor-items:has(.bottom-para:contains('Help'))") || 
                   document.querySelector(".ancor-items:nth-child(1)"); // Fallback to first item

  if (helpLink) {
    helpLink.addEventListener("click", (event) => {
      event.preventDefault(); // Prevents the page from reloading via '#' href
      
      // Example: Open a support widget or alert
      alert("Opening Help Center... How can we support you today?");
      // window.open("https://apexlegal.com", "_blank"); // Uncomment to open a real help site
    });
  }

  // --- LOGOUT LINK FUNCTIONALITY ---
  // Selects the logout paragraph or its parent link container
  const logoutLink = document.querySelector(".ancor-items:has(.bottom-para:contains('logout'))") || 
  document.querySelector(".ancor-items:nth-child(2)"); // Fallback to second item

  if (logoutLink) {
    logoutLink.addEventListener("click", (event) => {
      event.preventDefault(); // Prevents the default '#' anchor behavior
      
      // Ask user for logout confirmation
      const confirmLogout = confirm("Are you sure you want to log out of Apex Legal?");
      
      if (confirmLogout) {
        // Clear session data if needed
        sessionStorage.clear();
        localStorage.removeItem("userToken");
        
        alert("Logging out...");
        // Redirect user to the login screen
        window.location.href = "/login.html"; 
      }
    });
  }
});



document.addEventListener("DOMContentLoaded", () => {
  // --- 1. SELECT FILTER ELEMENTS ---
  const filterContainers = document.querySelectorAll(".inner-child-div");
  const userRows = document.querySelectorAll(".div-container > div");

  // Keep track of current active filters
  const activeFilters = {
    department: "all",
    role: "all",
    status: "all"
  };

  // --- 2. ADD CLICK EVENT TO EACH FILTER BUTTON ---
  filterContainers.forEach((filter) => {
    filter.style.cursor = "pointer";
    
    filter.addEventListener("click", (event) => {
      event.preventDefault();
      
      const filterText = filter.querySelector("p").textContent.toLowerCase();
      let filterType = "";
      let options = [];

      // Determine which filter was clicked and define mock options
      if (filterText.includes("department")) {
        filterType = "department";
        options = ["All Department", "Litigation", "Corporate Law", "Compliance", "Administrative Support"];
      } else if (filterText.includes("role")) {
        filterType = "role";
        options = ["All Role", "Partner", "Paralegal", "Associate", "Legal Sec."];
      } else if (filterText.includes("status")) {
        filterType = "status";
        options = ["Status: All", "Active", "Inactive", "Pending"];
      }

      // Simulate a dropdown choice using a standard browser prompt
      // (You can replace this later with a custom HTML dropdown UI)
      const optionsString = options.map((opt, index) => `${index + 1}. ${opt}`).join("\n");
      const choice = prompt(`Select a filter option:\n\n${optionsString}`, "1");

      if (choice !== null) {
        const selectedIndex = parseInt(choice, 10) - 1;
        if (selectedIndex >= 0 && selectedIndex < options.length) {
          const selectedValue = options[selectedIndex];
          
          // Update button text UI
          filter.querySelector("p").textContent = selectedValue;
          
          // Save selected state
          activeFilters[filterType] = selectedValue.replace("Status: ", "").toLowerCase();
          
          // Run the filtering logic across rows
          applyFilters(userRows, activeFilters);
        }
      }
    });
  });

  // --- 3. FILTER LOGIC ENGINE ---
  function applyFilters(rows, filters) {
    let matchCount = 0;

    rows.forEach((row) => {
      // Extract data values from the specific row elements
      const deptText = row.querySelector(".child-items p") ? row.querySelector(".child-items p").textContent.toLowerCase() : "";
      const roleText = row.querySelector("[class^='div-child']") ? row.querySelector("[class^='div-child']").textContent.toLowerCase() : "";
      const statusText = row.querySelector("[class^='double-para'] p") ? row.querySelector("[class^='double-para'] p").textContent.toLowerCase() : "";

      // Check if row matches all 3 filter categories
      const matchesDept = filters.department === "all department" || deptText.includes(filters.department);
      const matchesRole = filters.role === "all role" || roleText.trim() === filters.role;
      const matchesStatus = filters.status === "all" || statusText.trim() === filters.status;

      // Show row if it satisfies everything, otherwise hide it
      if (matchesDept && matchesRole && matchesStatus) {
        row.style.display = ""; // Show
        matchCount++;
      } else {
        row.style.display = "none"; // Hide
      }
    });

    // Dynamically update total user count display text
    const totalCountText = document.querySelector(".top-child > p");
    if (totalCountText) {
      totalCountText.textContent = `${matchCount} users found matching criteria`;
    }
  }
});




document.addEventListener("DOMContentLoaded", () => {
  // 1. Define the page routes for your text navigation items
  const navRoutes = {
    "home": "index.html",
    "about us": "about.html",
    "solutions": "solutions.html",
    "cases": "cases.html",
    "pricing": "pricing.html"
  };

  // 2. Handle the text links (Home, About Us, Solutions, Cases, Pricing)
  const textLinks = document.querySelectorAll(".second-nav .ancor-nav");

  textLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Stop the default '#' hash jump
      
      const linkText = link.textContent.trim().toLowerCase();
      const targetPage = navRoutes[linkText];

      if (targetPage) {
        window.location.href = targetPage;
      }
    });
  });

  // 3. Handle the last SVG icon link (.nav-svg)
  const navIcon = document.querySelector(".second-nav .nav-svg");

  if (navIcon) {
    // Make the mouse cursor turn into a pointer finger when hovering over the icon
    navIcon.style.cursor = "pointer";

    navIcon.addEventListener("click", () => {
      // Change 'dashboard.html' to whatever page this icon should open
      window.location.href = "dashboard.html"; 
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Target the "ENGINEERED FOR EXCELLENCE" hero button
  const heroBtn = document.querySelector(".text-hero .hero-btn");

  if (heroBtn) {
    // Change "excellence.html" to the actual filename or URL you want this button to open
    const targetPage = "excellence.html"; 

    heroBtn.addEventListener("click", () => {
      window.location.href = targetPage;
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Target the hidden vector image element
  const hiddenVector = document.querySelector(".navbar .hidden-vector");

  if (hiddenVector) {
    // 1. Set the destination page filename or web URL here
    const targetPage = "hidden-feature.html"; 

    // 2. Ensure the mouse cursor turns into a pointer finger on hover
    hiddenVector.style.cursor = "pointer";

    // 3. Navigate to the new page when the user clicks the vector
    hiddenVector.addEventListener("click", () => {
      window.location.href = targetPage;
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Navigation Button ---
  const btnLogin = document.getElementById("btn-login");
  if (btnLogin) {
    btnLogin.addEventListener("click", () => {
      alert("Redirecting to the Apex Legal login portal...");
    });
  }

  // --- 2. Hero Buttons ---
  const btnDemo = document.getElementById("btn-demo");
  if (btnDemo) {
    btnDemo.addEventListener("click", () => {
      alert("Opening the calendar calendar... Let's schedule your Apex Legal demo!");
    });
  }

  const btnExplore = document.getElementById("btn-explore");
  if (btnExplore) {
    btnExplore.addEventListener("click", () => {
      alert("Scrolling down to our solutions and core architectural features.");
      // Pro tip: This smoothly scrolls the user down to your solutions section
      const targetSection = document.querySelector(".hero-second");
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // --- 3. Mini-Section Call to Action Buttons ---
  const btnGetStarted = document.querySelector(".mini-btn");
  if (btnGetStarted) {
    btnGetStarted.addEventListener("click", () => {
      alert("Welcome aboard! Initiating account setup process.");
    });
  }

  const btnConsultant = document.querySelector(".mini-btn2");
  if (btnConsultant) {
    btnConsultant.addEventListener("click", () => {
      alert("Connecting you live with a senior Apex Legal technical consultant...");
    });
  }

  // --- 4. Email Input & Form Arrow Submission ---
  const emailInput = document.getElementById("user-email");
  const emailSubmitIcon = document.getElementById("email-form");

  // Reusable function to process the legal insights registration
  function submitNewsletter() {
    const emailValue = emailInput.value.trim();

    // Regular Expression helper for simple email verification
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {
      alert("Please enter an email address before clicking send.");
    } else if (!emailPattern.test(emailValue)) {
      alert("Please enter a valid structural business email (e.g., mail@firm.com).");
    } else {
      alert(`Success! Technical insights will now be routed to: ${emailValue}`);
      emailInput.value = ""; // Clear the structural container input field
    }
  }

  // Submit if the user clicks the arrow icon link
  if (emailSubmitIcon) {
    // Prevent the default link jump behavior and trigger standard submit
    emailSubmitIcon.closest("a").addEventListener("click", (event) => {
      event.preventDefault();
      submitNewsletter();
    });
  }

  // Submit if the user is typing inside the input and presses the 'Enter' key
  if (emailInput) {
    emailInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        submitNewsletter();
      }
    });
  }
});

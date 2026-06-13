const roleOptions = document.querySelectorAll(".role-option");
const nextBtn = document.getElementById("nextBtn");

let selectedRole = localStorage.getItem("role") || "lawyer";

roleOptions.forEach(option => {

    if (option.dataset.role === selectedRole) {
        option.classList.add("active");
    }

    option.addEventListener("click", () => {

        roleOptions.forEach(item =>
            item.classList.remove("active")
        );

        option.classList.add("active");

        selectedRole = option.dataset.role;

        localStorage.setItem("role", selectedRole);
    });
});

nextBtn.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.setItem("role", selectedRole);

    window.location.href =
        "../Onboarding-4/Onboarding-4.html";
});
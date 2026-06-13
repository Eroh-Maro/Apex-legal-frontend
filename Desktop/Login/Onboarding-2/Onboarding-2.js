const sizeOptions = document.querySelectorAll(".size-option");

sizeOptions.forEach(option => {
    option.addEventListener("click", () => {

        // Remove blue from all cards
        sizeOptions.forEach(item => {
            item.classList.remove("active");
        });

        // Make clicked card blue
        option.classList.add("active");

        // Save selected value
        localStorage.setItem(
            "firmSize",
            option.dataset.size
        );
    });
});


const continueBtn = document.getElementById("continueBtn");

continueBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const firmName =
        document.getElementById("firmName").value.trim();

    const firmSize =
        localStorage.getItem("firmSize");

    if (!firmName) {
        alert("Please enter your firm name");
        return;
    }

    localStorage.setItem(
        "firmName",
        firmName
    );

    localStorage.setItem(
        "firmSize",
        firmSize || "1-5"
    );

    window.location.href =
        "../Onboarding-3/Onboarding-3.html";
});
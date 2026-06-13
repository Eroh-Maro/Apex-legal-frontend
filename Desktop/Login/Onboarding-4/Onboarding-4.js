const uploadBtn = document.getElementById("uploadBtn");
const profileFile = document.getElementById("profileFile");
const profilePreview = document.getElementById("profilePreview");

const nextBtn = document.getElementById("nextBtn");

uploadBtn.addEventListener("click", () => {
    profileFile.click();
});

profileFile.addEventListener("change", () => {

    const file = profileFile.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(event) {

        const img = new Image();

        img.onload = function() {

            const canvas =
                document.createElement("canvas");

            const maxSize = 400;

            let width = img.width;
            let height = img.height;

            if (width > height) {

                if (width > maxSize) {

                    height =
                        height * (maxSize / width);

                    width = maxSize;
                }

            } else {

                if (height > maxSize) {

                    width =
                        width * (maxSize / height);

                    height = maxSize;
                }
            }

            canvas.width = width;
            canvas.height = height;

            const ctx =
                canvas.getContext("2d");

            ctx.drawImage(
                img,
                0,
                0,
                width,
                height
            );

            const compressedImage =
                canvas.toDataURL(
                    "image/jpeg",
                    0.6
                );

            profilePreview.src =
                compressedImage;

            localStorage.setItem(
                "profileImage",
                compressedImage
            );

            console.log(
                "Compressed image size:",
                compressedImage.length
            );
        };

        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
});

nextBtn.addEventListener("click", (e) => {

    e.preventDefault();

    const fullName =
        document.getElementById("fullName").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phoneNumber =
        document.getElementById("phoneNumber").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    if (!fullName || !email || !password) {
        alert(
            "Please fill in Full Name, Email and Password"
        );
        return;
    }

    if (password.length < 6) {
        alert(
            "Password must be at least 6 characters"
        );
        return;
    }

    if (password !== confirmPassword) {
        alert(
            "Passwords do not match"
        );
        return;
    }

    localStorage.setItem(
        "fullName",
        fullName
    );

    localStorage.setItem(
        "email",
        email
    );

    localStorage.setItem(
        "phoneNumber",
        phoneNumber
    );

    localStorage.setItem(
        "password",
        password
    );

    window.location.href =
        "../Onboarding-5/Onboarding-5.html";
});
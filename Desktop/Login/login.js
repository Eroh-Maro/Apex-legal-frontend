const signInForm =
    document.getElementById("form-signin");

signInForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email =
        document.getElementById("signin-email").value;

    const password =
        document.getElementById("signin-password").value;

    const loginBtn =
        document.getElementById("loginBtn");

    loginBtn.textContent = "Signing In...";
    loginBtn.disabled = true;

    try {

        const response = await fetch(
            "http://localhost:8080/api/users/login",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data =
            await response.json();

        if (!response.ok) {
            throw new Error(
                data.message ||
                "Login failed"
            );
        }

        localStorage.setItem(
            "token",
            data.token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );

        alert("Login successful");

        window.location.href =
            "../Dashboard/ParaDash.html";

    } catch (error) {

        alert(error.message);

        loginBtn.textContent = "Sign in";
        loginBtn.disabled = false;
    }
});
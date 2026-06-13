const signInForm =
    document.getElementById("form-signin");

signInForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email =
        document.getElementById("signin-email").value.trim();

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
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Login failed"
            );
        }

        // Store authentication token
        localStorage.setItem(
            "token",
            data.token
        );

        // Store entire user object
        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );

        // Store role separately for dashboard routing
        if (data.user?.role) {
            localStorage.setItem(
                "role",
                data.user.role
            );
        }

        console.log("User:", data.user);
        console.log("Role:", data.user?.role);

        alert("Login successful");

        // Dashboard entry point
        window.location.href =
            "../Dashboard/Dashboard.html";

    } catch (error) {

        console.error(error);

        alert(
            error.message || "Something went wrong"
        );

    } finally {

        loginBtn.textContent = "Sign In";
        loginBtn.disabled = false;

    }

});
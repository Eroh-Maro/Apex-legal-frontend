document.addEventListener("DOMContentLoaded", () => {

    const role = localStorage.getItem("role");

    if (!role) {
        window.location.href = "../login/login.html";
        return;
    }

    switch (role.toLowerCase()) {

        case "lawyer":
            window.location.href =
                "./Lawyer/Lawyer.html";
            break;

        case "paralegal":
            window.location.href =
                "../paralegal-dashboard/paralegal-dashboard.html";
            break;

        case "secretary":
            window.location.href =
                "../secretary-dashboard/secretary-dashboard.html";
            break;

        default:
            window.location.href =
                "../login/login.html";
    }
});
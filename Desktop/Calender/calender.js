// =========================
// USER INFO
// =========================

async function loadUserInfo() {

    try {

        const token =
            localStorage.getItem("token");

        const response =
            await fetch(
                "https://apex-legal-1.onrender.com/api/users/me",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const data =
            await response.json();

        const user =
            data.user ||
            data.data ||
            data;

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
            user.profilePicture
        ) {
            document.getElementById(
                "userAvatar"
            ).src =
                user.profilePicture;
        }

    } catch (error) {

        console.error(error);

    }

}

// =========================
// CALENDAR
// =========================

async function loadCalendar() {

    try {

        const token =
            localStorage.getItem("token");

        const response =
            await fetch(
                "https://apex-legal-1.onrender.com/api/hearings",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const data =
            await response.json();

        const hearings =
            data.hearings || [];

        const events =
            hearings.map(
                (hearing) => ({
                    title:
                        hearing.title,
                    start:
                        hearing.hearingDate
                })
            );

        const calendar =
            new FullCalendar.Calendar(
                document.getElementById(
                    "calendar"
                ),
                {
                    initialView:
                        "dayGridMonth",

                    height:
                        "auto",

                    events,

                    eventClick(
                        info
                    ) {

                        alert(
                            info.event.title
                        );

                    }
                }
            );

        calendar.render();

    } catch (error) {

        console.error(error);

    }

}

loadUserInfo();
loadCalendar();
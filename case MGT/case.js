// Handle the color change when you click the navigation link

// Select every navigation item in the sidebar
const changeColor = document.querySelectorAll('.nav-item');

// Get the current page URL so we can highlight the matching nav item on load
const currentUrl = window.location.href;

changeColor.forEach((item) => {
    // Read the href attribute from the nav item
    const href = item.getAttribute('href');

    // Convert relative href values to full URLs, but ignore placeholder links like '#'
    const itemUrl = href && href !== '#' ? new URL(href, window.location.href).href : null;

    // If this nav item points to the current page, keep it active on load
    if (itemUrl === currentUrl) {
        item.classList.add('active');
    }

    item.addEventListener('click', (event) => {
        // Prevent default behavior only for placeholder links that do not navigate
        if (href === '#') {
            event.preventDefault();
        }

        // Remove active state from all nav items before applying it to the clicked one
        changeColor.forEach((nav) => {
            nav.classList.remove('active');
        });

        // Highlight the clicked nav item
        item.classList.add('active');
    });
});
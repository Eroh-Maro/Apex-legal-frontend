const passwordInput = document.getElementById('password');
const toggleBtn = document.getElementById('toggle-password');


toggleBtn.addEventListener('click', () => {
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.innerHTML = '<img src="https://res.cloudinary.com/doopzrzep/image/upload/v1780301940/icons8-eye-24_vicmea.png" alt="Toggle Password Visibility">';
    } else {
        passwordInput.type = 'password';
        toggleBtn.innerHTML = '<img src="https://res.cloudinary.com/doopzrzep/image/upload/v1780301940/icons8-eye-24_vicmea.png" alt="Toggle Password Visibility">';
    }
}   );


// Handle password saving with "Remember this device for 30 days" functionality

const loginForm = document.querySelector('form');

loginForm.addEventListener('submit', (e) => {
    const remamberMe = document.getElementById('remember').checked;

    if (remamberMe) {
        const date = new Date();

        //add 30 days to the current calender date in milliseconds
        date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));

        const expires = "expires=" + date.toUTCString();

        //save a placeholder token in the browser's storage 
        document.cookie = "frontend_session=active_token; " + expires + "; path=/; SameSite=Strict; Secure";
    } else {
        // If "Remember Me" is not checked, clear the cookie
        document.cookie = "frontend_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; Secure";
    }
});


// Handle Google Sign-In button click
const googleBtn = document.getElementById('google-btn');

function handleCredentialResponse(response) {
    console.log('Encoded JWT ID token: ' + response.credential);
    // TODO: send `response.credential` to your server for verification/authentication
}

const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';

function initGoogleIdentity() {
    if (window.google && google.accounts && google.accounts.id) {
        google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse
        });

        try {
            google.accounts.id.renderButton(
                googleBtn,
                { theme: 'outline', size: 'large' }
            );
        } catch (err) {
            console.warn('renderButton failed, falling back to manual prompt:', err);
        }
    } else {
        console.warn('Google Identity Services SDK not loaded. Include the script from https://accounts.google.com/gsi/client');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    if (window.google && google.accounts && google.accounts.id) {
        initGoogleIdentity();
    }
});

window.onGoogleLoaded = initGoogleIdentity;

// On click, trigger the Google prompt (works whether or not renderButton replaced the element)
googleBtn.addEventListener('click', () => {
    if (window.google && google.accounts && google.accounts.id) {
        google.accounts.id.prompt();
    } else {
        console.error('Google Identity SDK not available.');
    }
});
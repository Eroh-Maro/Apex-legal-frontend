// Handle password visibility toggle

const toggleButtons = document.querySelectorAll('.toggle-password');

toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetSelector = button.dataset.target;
        const input = targetSelector ? document.querySelector(targetSelector) : null;

        if (!input) {
            return;
        }

        input.type = input.type === 'password' ? 'text' : 'password';
    });
});

// Handle password strength meter

const passwordInput = document.getElementById('new-password');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');

const updateStrength = (value) => {
    let score = 0;

    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    if (!value) {
        strengthBar.style.width = '0%';
        strengthBar.style.background = '#ef4444';
        strengthText.innerText = 'Weak password';
        strengthText.style.color = '#ef4444';
        return;
    }

    switch (score) {
        case 0:
        case 1:
            strengthBar.style.width = '25%';
            strengthBar.style.background = '#ef4444';
            strengthText.innerText = 'Weak password';
            strengthText.style.color = '#ef4444';
            break;
        case 2:
            strengthBar.style.width = '50%';
            strengthBar.style.background = '#f97316';
            strengthText.innerText = 'Medium password';
            strengthText.style.color = '#f97316';
            break;
        case 3:
            strengthBar.style.width = '75%';
            strengthBar.style.background = '#eab308';
            strengthText.innerText = 'Good password';
            strengthText.style.color = '#eab308';
            break;
        case 4:
            strengthBar.style.width = '100%';
            strengthBar.style.background = '#22c55e';
            strengthText.innerText = 'Strong password';
            strengthText.style.color = '#22c55e';
            break;
    }
};

passwordInput.addEventListener('input', () => {
    updateStrength(passwordInput.value);
});

updateStrength(passwordInput.value);
    
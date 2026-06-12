// Hide email icon when input is focused and show it again when blurred

const emailInput = document.getElementById('email');
const emailIcon = document.querySelector('.email-icon');

emailInput.addEventListener('focus', () => {
    emailIcon.style.display = 'none';
});

emailInput.addEventListener('blur', () => {
    emailIcon.style.display = 'block';
});



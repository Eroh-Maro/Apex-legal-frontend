const btnUpload = document.getElementById('btnUpload');
const fileInput = document.getElementById('profileFileInput');
const profileImage = document.querySelector('.profile-image img');

if (btnUpload && fileInput) {
  btnUpload.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    if (profileImage) {
      profileImage.src = imageUrl;
      profileImage.alt = file.name;
    }
  });
}

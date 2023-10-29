const fileInput = document.getElementById('image');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const preview = document.getElementById('image-preview');

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    const image = new Image();
    image.src = reader.result;
    image.addEventListener('load', () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
      context.font = 'bold 24px Arial';
      context.fillStyle = 'white';
      context.textAlign = 'center';
      context.fillText(titleInput.value, canvas.width / 2, canvas.height - 50);
      context.font = 'bold 18px Arial';
      context.fillText(authorInput.value, canvas.width / 2, canvas.height - 20);
      const modifiedImage = new Image();
      modifiedImage.src = canvas.toDataURL('image/jpeg');
      preview.innerHTML = '';
      preview.appendChild(modifiedImage);
    });
  });

  reader.readAsDataURL(file);
});
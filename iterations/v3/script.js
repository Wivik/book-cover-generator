const createCoverButton = document.getElementById('create-cover');
const downloadCoverButton = document.getElementById('download-cover');
const fileInput = document.getElementById('image');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const fontSelect = document.getElementById('font');
const fontSizeSelect = document.getElementById('font-size');
const preview = document.getElementById('image-preview');

createCoverButton.addEventListener('click', (event) => {
  event.preventDefault();
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
      context.font = `bold ${fontSizeSelect.value}px ${fontSelect.value}`;
      context.fillStyle = 'white';
      context.textAlign = 'center';
      context.fillText(titleInput.value, canvas.width / 2, canvas.height - 50);
      context.font = `bold ${fontSizeSelect.value - 6}px ${fontSelect.value}`;
      context.fillText(authorInput.value, canvas.width / 2, canvas.height - 20);
      const modifiedImage = new Image();
      modifiedImage.src = canvas.toDataURL('image/jpeg');
      preview.innerHTML = '';
      preview.appendChild(modifiedImage);
      downloadCoverButton.disabled = false;
      downloadCoverButton.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'cover.jpg';
        link.href = modifiedImage.src;
        link.click();
      });
    });
  });

  reader.readAsDataURL(file);
});
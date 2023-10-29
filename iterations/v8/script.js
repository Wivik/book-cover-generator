document.addEventListener('DOMContentLoaded', () => {
  // Get the required elements from the HTML code
  const createCoverButton = document.getElementById('create-cover');
  const downloadCoverButton = document.getElementById('download-cover');
  const fileInput = document.getElementById('image');
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  const fontSelect = document.getElementById('font');
  const fontSizeSelect = document.getElementById('font-size');
  const fontColorInput = document.getElementById('font-color');
  // const backgroundColorInput = document.getElementById('background-color');
  const titleXInput = document.getElementById('title-x');
  const titleYInput = document.getElementById('title-y');
  const authorXInput = document.getElementById('author-x');
  const authorYInput = document.getElementById('author-y');
  const preview = document.getElementById('image-preview');

  // Add a click event listener to the create cover button
  createCoverButton.addEventListener('click', (event) => {
    event.preventDefault();
    const file = fileInput.files[0];
    const reader = new FileReader();

    // Read the selected file and create an image element
    reader.addEventListener('load', () => {
      const image = new Image();
      image.src = reader.result;
      image.addEventListener('load', () => {
        // Create a canvas element and draw the image on it
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);

        // Create a text canvas element and draw the title and author text on it
        const textCanvas = document.createElement('canvas');
        const textContext = textCanvas.getContext('2d');
        textCanvas.width = canvas.width;
        textCanvas.height = canvas.height;
        textContext.font = `bold ${fontSizeSelect.value}px ${fontSelect.value}`;
        textContext.fillStyle = fontColorInput.value;
        textContext.textAlign = 'center';
        textContext.fillText(titleInput.value, textCanvas.width * (titleXInput.value / 100), textCanvas.height * (titleYInput.value / 100));
        textContext.font = `bold ${fontSizeSelect.value - 6}px ${fontSelect.value}`;
        textContext.fillStyle = fontColorInput.value;
        textContext.fillText(authorInput.value, textCanvas.width * (authorXInput.value / 100), textCanvas.height * (authorYInput.value / 100));

        // Create a modified canvas element and draw the text canvas and image canvas on it
        const modifiedCanvas = document.createElement('canvas');
        const modifiedContext = modifiedCanvas.getContext('2d');
        modifiedCanvas.width = canvas.width;
        modifiedCanvas.height = canvas.height;
        // modifiedContext.fillStyle = backgroundColorInput.value;
        modifiedContext.fillRect(0, 0, modifiedCanvas.width, modifiedCanvas.height);
        modifiedContext.drawImage(canvas, 0, 0);
        modifiedContext.drawImage(textCanvas, 0, 0);

        // Create an image element with the modified canvas as the source
        const modifiedImage = new Image();
        modifiedImage.src = modifiedCanvas.toDataURL('image/jpeg', 1.0);

        // Clear the preview area and add the modified image to it
        preview.innerHTML = '';
        preview.appendChild(modifiedImage);

        // Enable the download button and add a click event listener to it
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
});
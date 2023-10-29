// Get the necessary elements from the DOM
const createCoverButton = document.getElementById('create-cover');
const downloadCoverButton = document.getElementById('download-cover');
const fileInput = document.getElementById('image');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const fontSelect = document.getElementById('font');
const fontSizeSelect = document.getElementById('font-size');
const fontColorInput = document.getElementById('font-color');
const backgroundColorInput = document.getElementById('background-color');
const titleXInput = document.getElementById('title-x');
const titleYInput = document.getElementById('title-y');
const authorXInput = document.getElementById('author-x');
const authorYInput = document.getElementById('author-y');
const preview = document.getElementById('image-preview');

// Add a click event listener to the "Create Cover" button
createCoverButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  const file = fileInput.files[0]; // Get the selected file
  const reader = new FileReader(); // Create a new FileReader object

  // Add a load event listener to the FileReader object
  reader.addEventListener('load', () => {
    const image = new Image(); // Create a new Image object
    image.src = reader.result; // Set the source of the Image object to the data URL of the selected file
    image.addEventListener('load', () => { // Add a load event listener to the Image object
      const canvas = document.createElement('canvas'); // Create a new canvas element
      const context = canvas.getContext('2d'); // Get the 2D rendering context of the canvas
      canvas.width = image.width; // Set the width of the canvas to the width of the Image object
      canvas.height = image.height; // Set the height of the canvas to the height of the Image object
      context.drawImage(image, 0, 0); // Draw the Image object onto the canvas
      const textCanvas = document.createElement('canvas'); // Create a new canvas element for the text
      const textContext = textCanvas.getContext('2d'); // Get the 2D rendering context of the text canvas
      textCanvas.width = canvas.width; // Set the width of the text canvas to the width of the main canvas
      textCanvas.height = canvas.height; // Set the height of the text canvas to the height of the main canvas
      textContext.font = `bold ${fontSizeSelect.value}px ${fontSelect.value}`; // Set the font of the text
      textContext.fillStyle = fontColorInput.value; // Set the fill color of the text
      textContext.textAlign = 'center'; // Set the text alignment to center
      textContext.fillText(titleInput.value, textCanvas.width * (titleXInput.value / 100), textCanvas.height * (titleYInput.value / 100)); // Draw the title text onto the text canvas
      textContext.font = `bold ${fontSizeSelect.value - 6}px ${fontSelect.value}`; // Set the font of the author text
      textContext.fillStyle = fontColorInput.value; // Set the fill color of the author text
      textContext.fillText(authorInput.value, textCanvas.width * (authorXInput.value / 100), textCanvas.height * (authorYInput.value / 100)); // Draw the author text onto the text canvas
      const modifiedCanvas = document.createElement('canvas'); // Create a new canvas element for the modified image
      const modifiedContext = modifiedCanvas.getContext('2d'); // Get the 2D rendering context of the modified canvas
      modifiedCanvas.width = canvas.width; // Set the width of the modified canvas to the width of the main canvas
      modifiedCanvas.height = canvas.height; // Set the height of the modified canvas to the height of the main canvas
      modifiedContext.fillStyle = backgroundColorInput.value; // Set the fill color of the modified canvas
      modifiedContext.fillRect(0, 0, modifiedCanvas.width, modifiedCanvas.height); // Fill the modified canvas with the background color
      modifiedContext.drawImage(textCanvas, 0, 0); // Draw the text canvas onto the modified canvas
      modifiedContext.drawImage(canvas, 0, 0); // Draw the main canvas onto the modified canvas
      const modifiedImage = new Image(); // Create a new Image object for the modified image
      modifiedImage.src = modifiedCanvas.toDataURL('image/jpeg', 1.0); // Set the source of the modified Image object to the data URL of the modified canvas
      preview.innerHTML = ''; // Clear the preview element
      preview.appendChild(modifiedImage); // Add the modified Image object to the preview element
      downloadCoverButton.disabled = false; // Enable the "Download Cover" button
      downloadCoverButton.addEventListener('click', () => { // Add a click event listener to the "Download Cover" button
        const link = document.createElement('a'); // Create a new anchor element
        link.download = 'cover.jpg'; // Set the download attribute of the anchor element
        link.href = modifiedImage.src; // Set the href attribute of the anchor element to the data URL of the modified Image object
        link.click(); // Click the anchor element to download the modified image
      });
    });
  });

  reader.readAsDataURL(file); // Read the selected file as a data URL
});
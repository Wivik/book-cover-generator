document.addEventListener('DOMContentLoaded', () => {
    // Get the required elements from the HTML code
    const createCoverButton = document.getElementById('create-cover');
    const downloadCoverButton = document.getElementById('download-cover');
    const fileInput = document.getElementById('image');
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const fontSelect = document.getElementById('font');
    const titleFontSizeSelect = document.getElementById('title-font-size');
    const authorFontSizeSelect = document.getElementById('author-font-size');
    const fontColorInput = document.getElementById('font-color');
    // const backgroundColorInput = document.getElementById('background-color');
    const titleXInput = document.getElementById('title-x');
    const titleYInput = document.getElementById('title-y');
    const authorXInput = document.getElementById('author-x');
    const authorYInput = document.getElementById('author-y');
    const preview = document.getElementById('image-preview');
    const shadowColorInput = document.getElementById('shadow-color');
    const shadowBlurInput = document.getElementById('shadow-blur');
    const shadowOffsetXInput = document.getElementById('shadow-offset-x');
    const shadowOffsetYInput = document.getElementById('shadow-offset-y');

    
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
            if (image.width < 1000 && image.height < 625) {
                alert('Warning: Image size is below 1000x625 pixels. This cover won\'t be accepted by Amazon KDP.\n Imported image size :\nWidth: '+ image.width + 'px\n Height: ' + image.height + 'px');
            }
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
        textContext.font = `bold ${titleFontSizeSelect.value}px ${fontSelect.value}`;
        textContext.fillStyle = fontColorInput.value;
        textContext.textAlign = 'center';
        textContext.shadowColor = shadowColorInput.value;
        textContext.shadowBlur = shadowBlurInput.value;
        textContext.shadowOffsetX = shadowOffsetXInput.value;
        textContext.shadowOffsetY = shadowOffsetYInput.value;


        // Split the title text into multiple lines if it exceeds a certain width
        const maxWidth = canvas.width * 0.8; // 80% of the canvas width
        let titleLines = [];
        let titleLine = '';
        const titleWords = titleInput.value.split(' ');
        for (let i = 0; i < titleWords.length; i++) {
            const word = titleWords[i];
            const width = textContext.measureText(titleLine + word).width;
            if (width < maxWidth || i === 0) {
                titleLine += (i === 0 ? '' : ' ') + word;
            } else {
                titleLines.push(titleLine);
                titleLine = word;
            }
        }
        titleLines.push(titleLine);

        // Draw the title text on the text canvas
        const lineHeight = titleFontSizeSelect.value * 1.2; // 20% extra space between lines
        const titleY = textCanvas.height * (titleYInput.value / 100) - ((titleLines.length - 1) * lineHeight) / 2;
        for (let i = 0; i < titleLines.length; i++) {
            const line = titleLines[i];
            textContext.fillText(line, textCanvas.width * (titleXInput.value / 100), titleY + i * lineHeight);
        }

        // Draw the author text on the text canvas
        textContext.font = `bold ${authorFontSizeSelect.value}px ${fontSelect.value}`;
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

    const titleXValue = document.getElementById('title-x-value');
    const titleYValue = document.getElementById('title-y-value');
    const authorXValue = document.getElementById('author-x-value');
    const authorYValue = document.getElementById('author-y-value');
    
    titleXInput.addEventListener('input', () => {
        titleXValue.textContent = titleXInput.value;
    });
    titleYInput.addEventListener('input', () => {
        titleYValue.textContent = titleYInput.value;
    });
    authorXInput.addEventListener('input', () => {
        authorXValue.textContent = authorXInput.value;
    });
    authorYInput.addEventListener('input', () => {
        authorYValue.textContent = authorYInput.value;
    });
    

});


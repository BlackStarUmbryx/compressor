document.getElementById('compressBtn').addEventListener('click', () => {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (!file) {
    alert("Please select a file.");
    return;
  }

  if (file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        // Resize logic: scale down to 50%
        const scale = 0.5;
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Export compressed image
        canvas.toBlob(function(blob) {
          const url = URL.createObjectURL(blob);
          const downloadLink = document.getElementById('downloadLink');
          downloadLink.href = url;
          downloadLink.download = 'compressed.png';
          downloadLink.style.display = 'inline-block';
          downloadLink.textContent = 'Download Compressed Image';
        }, 'image/png', 0.7); // quality 0.7
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    alert('Compression for this file type is not implemented in this demo.');
  }
});

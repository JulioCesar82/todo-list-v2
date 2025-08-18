const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'package.json');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Remove BOM
  if (data.charCodeAt(0) === 0xFEFF) {
    data = data.slice(1);
  }

  fs.writeFile(filePath, data, 'utf8', (err) => {
    if (err) {
      console.error('Error writing the file:', err);
    } else {
      console.log('Successfully removed BOM and saved the file.');
    }
  });
});

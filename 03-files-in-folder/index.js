const fs = require('fs');
const path = require('path');

const secretFolderPath = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolderPath, { withFileTypes: true }, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    if (file.isFile()) {
      fs.stat(path.join(secretFolderPath, file.name), (err, stats) => {
        if (err) throw err;

        let ext = path.extname(file.name);
        const name = path.basename(file.name, ext);
        const size = (stats.size / 1024).toFixed(2);

        if (ext.length > 0 && ext[0] === '.') {
          ext = ext.slice([1]);
        }

        console.log(`${name} - ${ext} - ${size}kb`);
      });
    }
  });
});

const fs = require('fs');
const path = require('path');

const readSteam = fs.createReadStream(path.join(__dirname, 'text.txt'));

readSteam.on('data', (chunk) => {
  console.log(chunk.toString());
});

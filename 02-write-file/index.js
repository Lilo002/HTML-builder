const fs = require('fs');
const path = require('path');
const process = require('process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const writeSteam = fs.createWriteStream(path.join(__dirname, 'text.txt'));

console.log('Write your text: ');

function closeSteam() {
  writeSteam.end();
  rl.close();
  console.log('Bye');
  process.exit();
}

rl.on('line', (input) => {
  if (input.trim().toLocaleLowerCase() === 'exit') {
    closeSteam();
  }

  fs.appendFile(
    path.join(__dirname, 'text.txt'),
    `${input.trim()}\n`,
    (err) => {
      if (err) throw err;
    },
  );
});

process.on('SIGINT', closeSteam);

rl.on('SIGINT', () => {
  process.emit('SIGINT');
});

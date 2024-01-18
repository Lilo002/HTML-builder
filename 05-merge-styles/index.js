const fs = require('fs/promises');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const outputPath = path.join(__dirname, 'project-dist', 'bundle.css');

async function createBundle() {
  const files = await fs.readdir(stylesDir);
  const bundlerArr = [];
  for (let file of files) {
    const filePath = path.join(stylesDir, file);
    const stats = await fs.stat(filePath);

    if (stats.isFile() && path.extname(file) === '.css') {
      const content = await fs.readFile(filePath, 'utf8');
      bundlerArr.push(content);
    }
  }
  const bundlerContent = bundlerArr.join('\n');
  await fs.writeFile(outputPath, bundlerContent);
}

createBundle();

const fs = require('fs/promises');
const path = require('path');

const projectFolder = path.join(__dirname, 'files');
const projectToCopy = path.join(__dirname, 'files-copy');

async function copyDir(src, dest) {
  await fs.rm(projectToCopy, { recursive: true });
  await fs.mkdir(dest);

  const files = await fs.readdir(src);

  for (let file of files) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    await fs.copyFile(srcPath, destPath);
  }

  console.log('Success');
}

copyDir(projectFolder, projectToCopy);

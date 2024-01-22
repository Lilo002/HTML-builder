const fs = require('fs/promises');
const path = require('path');

const templatePath = path.join(__dirname, 'template.html');
const componentsDir = path.join(__dirname, 'components');
const styleDir = path.join(__dirname, 'styles');
const assetsDir = path.join(__dirname, 'assets');

const distFolder = path.join(__dirname, 'project-dist');

async function buildProject() {
  await fs.mkdir(distFolder, { recursive: true });

  let template = await fs.readFile(templatePath, 'utf-8');

  const components = template.match(/{{[\w]+}}/g);

  for (let component of components) {
    const componentsName = component.slice(2, -2);
    const componensPath = path.join(componentsDir, componentsName + '.html');
    const componentsContent = await fs.readFile(componensPath, 'utf-8');

    template = template.replace(component, componentsContent);
  }

  await fs.writeFile(path.join(distFolder, 'index.html'), template);
}

async function copyAssetsFolder(src, dest) {
  await fs.mkdir(dest, { recursive: true });

  const files = await fs.readdir(src);

  for (let file of files) {
    const filePath = path.join(src, file);
    const destPath = path.join(dest, file);
    const stats = await fs.stat(filePath);

    if (stats.isFile()) {
      await fs.copyFile(filePath, destPath);
    } else {
      copyAssetsFolder(filePath, destPath);
    }
  }
}

async function bundleCss() {
  const outputPath = path.join(distFolder, 'style.css');
  const files = await fs.readdir(styleDir);
  const bundlerArr = [];
  for (let file of files) {
    const filePath = path.join(styleDir, file);
    const stats = await fs.stat(filePath);

    if (stats.isFile() && path.extname(file) === '.css') {
      const content = await fs.readFile(filePath, 'utf8');
      bundlerArr.push(content);
    }
  }
  const bundlerContent = bundlerArr.join('\n');
  await fs.writeFile(outputPath, bundlerContent);
}

async function createBundle() {
  await buildProject();
  await copyAssetsFolder(assetsDir, path.join(distFolder, 'assets'));
  await bundleCss();
}

createBundle();

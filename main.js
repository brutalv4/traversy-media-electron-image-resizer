const path = require('path');
const { app, BrowserWindow } = require('electron');

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: 'Image Resizer',
    width: 500,
    height: 600,
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer/image.html'));
}

async function main() {
  await app.whenReady();
  createMainWindow();
}

main();

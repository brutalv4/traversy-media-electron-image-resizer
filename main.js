const path = require('path');
const { app, BrowserWindow } = require('electron');

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    title: 'Image Resizer',
    width: isDev ? 1000: 500,
    height: 600,
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadFile(path.join(__dirname, 'renderer/index.html'));
};

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length > 0) {
    return;
  }

  createMainWindow();
});

app.on('window-all-closed', () => {
  if (isMac) {
    return;
  }
  app.quit();
});

(async () => {
  await app.whenReady();
  createMainWindow();
})();

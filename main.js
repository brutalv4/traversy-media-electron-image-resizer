const path = require('path');
const { app, BrowserWindow, Menu } = require('electron');

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    title: 'Image Resizer',
    width: isDev ? 1000 : 500,
    height: 600,
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadFile(path.join(__dirname, 'renderer/index.html'));
};

const createAboutWindow = () => {
  const aboutWindow = new BrowserWindow({
    title: 'About Image Resizer',
    width: 300,
    height: 300,
  });

  aboutWindow.loadFile(path.join(__dirname, 'renderer/about.html'));
};

const menu = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            {
              label: 'About',
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
  {
    role: 'fileMenu',
  },
  ...(!isMac
    ? [
        {
          label: 'Help',
          submenu: [
            {
              label: 'About',
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
];

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

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
})();

const path = require('path');
const fs = require('fs');
const { app, BrowserWindow, Menu, ipcMain, shell } = require('electron');
const resizeImg = require('resize-img');

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

let mainWindow;

const resizeImage = async ({ src, dest, width, height }) => {
  try {
    const newPath = await resizeImg(fs.readFileSync(src), { width, height });
    const basename = path.basename(src);

    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }

    fs.writeFileSync(path.join(dest, basename), newPath);

    mainWindow.webContents.send('image:done');

    shell.openPath(dest);
  } catch (error) {
    console.log(error);
  }
};
ipcMain.on('image:resize', (_, options) => resizeImage(options));

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    title: 'Image Resizer',
    width: isDev ? 1000 : 500,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: true,
    },
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadFile(path.join(__dirname, 'renderer/index.html'));
  mainWindow.on('close', () => {
    mainWindow = null;
  });
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

const { contextBridge, ipcRenderer } = require('electron');
const { homedir } = require('os');
const { join } = require('path');
const Toastify = require('toastify-js');

contextBridge.exposeInMainWorld('os', { homedir: homedir() });
contextBridge.exposeInMainWorld('path', { join });
contextBridge.exposeInMainWorld('Toastify', {
  toast: (options) => Toastify(options).showToast(),
});
contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel, ...args) => ipcRenderer.send(channel, ...args),
  on: (channel, func) =>
    ipcRenderer.on(channel, (event, ...args) => func(...args)),
});

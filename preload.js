const { contextBridge } = require('electron');
const { homedir } = require('os');
const { join } = require('path');
const Toastify = require('toastify-js');

contextBridge.exposeInMainWorld('os', { homedir: homedir() });
contextBridge.exposeInMainWorld('path', { join });
contextBridge.exposeInMainWorld('Toastify', {
  toast: (options) => Toastify(options).showToast(),
});

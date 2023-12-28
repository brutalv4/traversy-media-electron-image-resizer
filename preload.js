const { contextBridge } = require('electron');
const { homedir } = require('os');
const { join } = require('path');

contextBridge.exposeInMainWorld('os', { homedir: homedir() });
contextBridge.exposeInMainWorld('path', { join });

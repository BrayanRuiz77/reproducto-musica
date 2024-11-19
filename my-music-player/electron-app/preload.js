// electron-app/preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getMusicFiles: (folderPath) => ipcRenderer.invoke('getMusicFiles', folderPath),
});
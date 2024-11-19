// electron-app/preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getMusicFiles: (folderPath) => {
    return ipcRenderer.invoke('getMusicFiles', folderPath);
  }
});
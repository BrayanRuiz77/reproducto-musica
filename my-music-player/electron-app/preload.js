const { contextBridge } = require('electron');

// Este es un ejemplo básico de comunicación.  Debes ajustar esto a tus necesidades
contextBridge.exposeInMainWorld('electronAPI', {
  sendFiles: (files) => {
    console.log("Files:", files);  // Esto solo lo ves en la consola de Electron.
    // En la realidad, procesarías estos archivos.
  }
});
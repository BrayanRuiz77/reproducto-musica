// electron-app/index.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs/promises');

let mainWindow;

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  try {
    const indexPath = path.join(__dirname, '../public/index.html'); // Ruta correcta
    if (await fs.access(indexPath).then(() => true).catch(() => false)) {
      mainWindow.loadFile(indexPath);
    } else {
      console.error(`El archivo index.html no se encontró en ${indexPath}`);
      app.quit();
    }
  } catch (err) {
    console.error(`Error al cargar index.html: ${err}`);
    app.quit();
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('getMusicFiles', async (event, folderPath) => {
  try {
    let musicFiles = [];
    if (folderPath) {
      const files = await fs.readdir(folderPath); // Uso de fs.readdir asíncrono (importante)
      musicFiles = files.filter(file => /\.(mp3|wav)$/i.test(file)); // Filtro más robusto
      musicFiles = musicFiles.map(file => path.join(folderPath, file));
    }
    return musicFiles;
  } catch (error) {
    console.error('Error al leer directorio:', error);
    return []; // Devuelve un array vacío en caso de error
  }
});
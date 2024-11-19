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
    const indexPath = path.join(__dirname, '../build/index.html'); // Ruta a index.html en el directorio build
    const buildPath = path.join(__dirname, '../build'); //Ruta al directorio build

		// Verifica que el directorio build exista
		const buildExists = await fs.access(buildPath).then(() => true).catch(() => false);
    if (buildExists) {
      mainWindow.loadFile(indexPath);
      console.log("index.html cargado correctamente.");
    } else {
      console.error("Error: El directorio 'build' no existe.");
      app.quit(); // Cierra la aplicación si build no existe
    }
  } catch (err) {
    console.error("Error al cargar la página o acceder al directorio 'build':", err);
    app.quit(); // Cierra la aplicación en caso de error
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


ipcMain.handle('getMusicFiles', async (event, folderPath) => {
  try {
    if (!folderPath) return [];
    const files = await fs.readdir(folderPath); //Uso de fs.promises.readdir (correcto)
    const musicFiles = files.filter(file => /\.(mp3|wav)$/i.test(file)); // Filtro más robusto para archivos de audio.
		const fullPaths = musicFiles.map(file => path.join(folderPath, file));
    return fullPaths;
  } catch (error) {
    console.error('Error al leer directorio:', error);
    return [];
  }
});
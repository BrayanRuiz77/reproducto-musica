import React, { useState, useEffect } from 'react';
import MusicList from './MusicList';

function App() {
  const [musicFiles, setMusicFiles] = useState([]); // Lista de archivos de música
  const [folderPath, setFolderPath] = useState(''); // Ruta del directorio

  // Función para obtener archivos de música desde la API de Electron
  const getFiles = async () => {
    if (folderPath) {
      try {
        // eslint-disable-next-line no-undef
        const files = await electronAPI.getMusicFiles(folderPath);
        setMusicFiles(files);
      } catch (error) {
        console.error("Error al obtener archivos:", error);
        setMusicFiles([]); // Resetea la lista en caso de error
      }
    }
  };

  // Efecto para actualizar la lista de archivos cuando cambia la ruta
  useEffect(() => {
    getFiles();
  }, [folderPath]);

  // Manejador para actualizar la ruta del directorio
  const handleFolderChange = (event) => {
    const folder = event.target.value;
    setFolderPath(folder);
  };

  return (
    <div>
      {/* Input para seleccionar la ruta */}
      <input 
        type="text" 
        placeholder="Ruta al directorio" 
        value={folderPath} 
        onChange={handleFolderChange} 
      />

      {/* Lista de archivos de música o mensaje de vacío */}
      {musicFiles.length > 0 ? (
        <MusicList files={musicFiles} />
      ) : (
        <p>No hay archivos de música en la ruta especificada</p>
      )}
    </div>
  );
}

export default App;

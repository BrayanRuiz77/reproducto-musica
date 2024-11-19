// src/App.js
import React, { useState, useEffect } from 'react';
import MusicList from './MusicList';

function App() {
  const [musicFiles, setMusicFiles] = useState([]);
  const [folderPath, setFolderPath] = useState('');


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getFiles = async () => {
    if (folderPath) {
      try {
        // eslint-disable-next-line no-undef
        const files = await electronAPI.getMusicFiles(folderPath);
        setMusicFiles(files);
      } catch (error) {
        console.error("Error al obtener archivos:", error);
        setMusicFiles([]);
      }
    }
  };

	useEffect(() => {
		getFiles();
	}, [folderPath, getFiles]); // <-- Correcto: Incluye getFiles en la dependencia


  const handleFolderChange = (event) => {
    const newFolderPath = event.target.value;
    setFolderPath(newFolderPath);
  };


  return (
    <div>
      <input type="text" placeholder="Ruta al directorio" onChange={handleFolderChange} />
      {musicFiles.length > 0 ? (
        <MusicList files={musicFiles} />
      ) : (
        <p>No hay archivos de música en la ruta especificada.</p>
      )}
    </div>
  );
}

export default App;
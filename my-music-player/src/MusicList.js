// src/MusicList.js
import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material'; // Importar los componentes necesarios de Material UI

function MusicList({ files }) {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Lista de Música
      </Typography>
      <List>
        {files.map((file, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={file} // Muestra el nombre del archivo (el path completo)
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default MusicList;
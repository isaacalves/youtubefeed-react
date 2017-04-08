import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const playlistId = 'PLAF8547F45A711D1B'; //my jazz guitar playlist
// const playlistId = 'RD5kcJ2d-hOyg'; //someone's jazz guitar playlist

ReactDOM.render(
  <App
  	defaultPlaylistId={playlistId}
  />,
  document.getElementById('root')
);

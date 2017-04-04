import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const playlistId = 'PLSi28iDfECJPJYFA4wjlF5KUucFvc0qbQ';
// const playlistId = 'PLoYCgNOIyGABj2GQSlDRjgvXtqfDxKm5b'; // react

ReactDOM.render(
  <App
  	id={playlistId}
  />,
  document.getElementById('root')
);

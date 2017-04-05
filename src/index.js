import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const testId = 'PLSi28iDfECJPJYFA4wjlF5KUucFvc0qbQ';

ReactDOM.render(
  <App
  	defaultPlaylistId={testId}
  />,
  document.getElementById('root')
);

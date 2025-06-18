import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// If you need the app's public URL, always use process.env.PUBLIC_URL
// const publicUrl = process.env.PUBLIC_URL;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

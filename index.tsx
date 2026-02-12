
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * ENTRY POINT:
 * This is the main starting point of the application. 
 * It finds the 'root' element in index.html and mounts the React component tree.
 */
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
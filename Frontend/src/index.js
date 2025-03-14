
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element not found.");
}

const root = ReactDOM.createRoot(rootElement);


root.render(
  <React.StrictMode>
    <BrowserRouter basename="">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

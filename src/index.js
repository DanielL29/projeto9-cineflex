import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/reset.css';
import './assets/css/index.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

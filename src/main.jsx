import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
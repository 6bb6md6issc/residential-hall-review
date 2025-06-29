import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;



axios.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const { exp } = jwtDecode(token);
      const isExpired = exp * 1000 <= Date.now();
      if (isExpired) {
        localStorage.removeItem('token');
        delete config.headers.Authorization;
        delete axios.defaults.headers.common["Authorization"];
        // Don't attach the token
      } else{
        config.headers.Authorization = `Bearer ${token}`;
      // Otherwise token is valid, attach it
      }
    } catch (err) {
      console.error('Invalid token:', err);
      localStorage.removeItem('token');
      delete config.headers.Authorization;
      delete axios.defaults.headers.common["Authorization"];
    }
  }

  return config;
}, (error) => Promise.reject(error));
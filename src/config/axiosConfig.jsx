import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// axios.interceptors.response.use(
//   response => response,
//   error => {
//     if (
//       error.response &&
//       error.response.data.toLowerCase().includes('jwt expired')
//     ) {
//       // Token expired or invalid
//       localStorage.removeItem('token');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

axios.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const { exp } = jwtDecode(token);
      const isExpired = exp * 1000 < Date.now();
      if (isExpired) {
        console.log("debugger 1:", config)
        localStorage.removeItem('token');
        delete config.headers.Authorization;
        // Don't attach the token
        return config;
      }
      // Otherwise token is valid, attach it
    } catch (err) {
      console.error('Invalid token:', err);
      localStorage.removeItem('token');
    }
  }

  return config;
}, (error) => Promise.reject(error));
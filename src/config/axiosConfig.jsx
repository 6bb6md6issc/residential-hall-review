import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

axios.interceptors.response.use(
  response => response,
  error => {
    if (
      error.response &&
      error.response.data.toLowerCase().includes('jwt expired')
    ) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
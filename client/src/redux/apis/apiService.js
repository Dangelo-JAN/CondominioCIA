import axios from 'axios';

export const apiService = axios.create({
  // Asegúrate de que en Vercel la variable VITE_EMPLOYEE_API sea: https://onrender.com
  baseURL: import.meta.env.VITE_EMPLOYEE_API, 
  withCredentials: true, // OBLIGATORIO para que las cookies viajen entre dominios
  headers: {
    'Content-Type': 'application/json',
  },
});

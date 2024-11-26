import axios from 'axios';

const api = axios.create({
  baseURL: ' http://127.0.0.1:5000', // Substitua pelo endpoint do backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptador para adicionar o token no cabeçalho das requisições autenticadas
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

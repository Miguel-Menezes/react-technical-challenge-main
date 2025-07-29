import axios from 'axios';

const token = localStorage.getItem('token');

export const api = axios.create({
  baseURL: '/api',
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});

// Atualiza o token dinamicamente antes de cada requisição
api.interceptors.request.use((config) => {
  const currentToken = localStorage.getItem('token');
  if (currentToken && config.headers) {
    config.headers.Authorization = `Bearer ${currentToken}`;
  }
  return config;
});

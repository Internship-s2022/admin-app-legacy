import axios from 'axios';

const token = localStorage.getItem('token');

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    token: token,
  },
});

export default api;

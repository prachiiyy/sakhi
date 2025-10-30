// src/axiosConfig.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' }
});

// Inject token automatically from localStorage.sakhi_auth if present
api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem('sakhi_auth');
    if (raw) {
      const user = JSON.parse(raw);
      if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
    }
  } catch (e) {
    // ignore parse errors
  }
  return config;
}, (err) => Promise.reject(err));

export default api;

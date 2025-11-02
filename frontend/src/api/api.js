// EduQuest/frontend/src/api/api.js

import axios from 'axios';

// Set the base URL for the backend API
const API_URL = 'http://localhost:5000/api/'; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach the token to every request if the user is logged in
api.interceptors.request.use((config) => {
  // Get user data from Redux store or local storage (using local storage here for simplicity)
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  if (token) {
    // Attach JWT as a Bearer Token in the Authorization header
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;

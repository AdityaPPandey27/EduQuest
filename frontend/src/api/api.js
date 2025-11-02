import axios from 'axios';

// 1. Set the base URL for the backend API
// Using environment variable VITE_API_URL, defaulting to localhost:5000/api
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request Interceptor to attach JWT token (Requirement 1 & 2)
api.interceptors.request.use(
  (config) => {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');
    
    // If a token exists, attach it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Response Interceptor for handling expired tokens (auto-logout)
// Note: Actual logout logic should dispatch a Redux action from where the API is called (e.g., in authSlice).
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const { status } = error.response;
        // If 401 Unauthorized or 403 Forbidden, and the route should be protected, 
        // a forced logout might be needed. This simple interceptor just passes the error.
        // The Redux thunks will handle the actual logout dispatch.
        return Promise.reject(error);
    }
);


// 3. Export API functions for other endpoints (Requirement 1)

// Quiz Endpoints
export const quizApi = {
  getQuizzes: () => api.get('/quiz'),
  getQuizById: (id) => api.get(`/quiz/${id}`),
  submitQuiz: (data) => api.post('/quiz/submit', data), // { quizId, answers }
};

// Mission Endpoints
export const missionApi = {
  getMissions: () => api.get('/mission'),
  getMissionById: (id) => api.get(`/mission/${id}`),
  completeMission: (data) => api.post('/mission/complete', data), // { missionId }
};

// Leaderboard Endpoints
export const leaderboardApi = {
  getLeaderboard: () => api.get('/leaderboard'),
};

export default api;
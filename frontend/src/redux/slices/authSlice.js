// EduQuest/frontend/src/redux/slices/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Get user info from localStorage if available
const user = localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user')) 
    : null;

const initialState = {
  user: user, // Holds user object, role, and token
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reducer for successful login/registration
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload)); // Store user in local storage
      state.isLoading = false;
      state.error = null;
    },
    // Reducer for logout
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user'); // Clear local storage
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
        state.isLoading = action.payload;
    },
    setError: (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
    }
  },
});

export const { setUser, logoutUser, setLoading, setError } = authSlice.actions;

export default authSlice.reducer;

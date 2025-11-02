// EduQuest/frontend/src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

// Configure the central Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer, // The auth slice for user state
    // Add other feature reducers here (e.g., quiz, missions, leaderboard)
  },
  // Optional: Add middleware or enable Redux DevTools
});

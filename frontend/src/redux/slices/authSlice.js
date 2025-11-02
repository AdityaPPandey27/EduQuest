import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

// Helper to check and load initial state from localStorage (Requirement 2)
const loadAuthState = () => {
  try {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    
    return {
        token: token || null,
        user: user || null,
        isAuthenticated: !!token && !!user,
        status: 'idle',
        error: null,
    };
  } catch (e) {
    console.error('Error loading auth state from localStorage:', e);
    return { token: null, user: null, isAuthenticated: false, status: 'idle', error: null };
  }
};

const initialState = loadAuthState();

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', userData);
      // Store JWT token in localStorage (Requirement 2)
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Registration failed');
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      // Store JWT token in localStorage (Requirement 2)
      localStorage.setItem('token', response.data.token);
      // Store user data in localStorage 
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Async thunk to fetch current user data and XP progress (Requirement 4)
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      // API call uses the interceptor to attach the stored token
      const response = await api.get('/users/profile'); 
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
        // If profile fetch fails (e.g., token expired), perform a clear logout
        dispatch(logoutUser());
        return rejectWithValue(error.response?.data?.message || 'Session expired');
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reducer for user logout (Clears JWT token from localStorage)
    logoutUser: (state) => {
      localStorage.removeItem('token'); 
      localStorage.removeItem('user');
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
    },
    // Reducer to update XP manually if an action only returns XP (Requirement 4)
    updateXP: (state, action) => {
        if (state.user) {
            state.user.xp = action.payload.xp;
            // Also update localStorage to persist changes
            localStorage.setItem('user', JSON.stringify(state.user));
        }
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle Login
      .addCase(loginUser.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user; // Update Redux store with user data (Requirement 4)
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.isAuthenticated = false;
        // Ensure tokens are cleared on failed login attempt
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      })
      // Handle Register (similar to login)
      .addCase(registerUser.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.isAuthenticated = false;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      })
      // Handle Fetch Profile (For user data/XP refresh)
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; // Update Redux store with latest user data (Requirement 4)
        state.isAuthenticated = true;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'idle'; // Reset status after auto-logout
        state.error = action.payload;
      });
  },
});

export const { logoutUser, updateXP } = authSlice.actions;
export default authSlice.reducer;
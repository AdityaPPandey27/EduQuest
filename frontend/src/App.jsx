import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AnimatePresence } from 'framer-motion'; 

// Assuming these exist from previous steps
import { fetchUserProfile } from './redux/slices/authSlice'; 
import ProtectedRoute from './components/auth/ProtectedRoute'; 
import PageTransition from './components/common/PageTransition'; 

// Import Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard'; 
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';

// A simple Layout to hold the public-facing content
const PublicLayout = ({ children }) => {
    return (
        <div className="min-h-screen">
            {/* Theme toggle is included in the dashboard/header for authenticated users, 
               but for public routes, we can include it here if a minimal layout is needed. */}
            {children}
        </div>
    );
};

// Main Component with AnimatePresence for Transitions
function App() {
    const dispatch = useDispatch();
    const location = useLocation(); 

    useEffect(() => {
        // Fetch user profile on initial load
        dispatch(fetchUserProfile());
    }, [dispatch]);

    // 4. Wrap Routes with AnimatePresence to enable smooth transitions
    return (
        <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
                {/* Public Routes - Wrapped in PageTransition */}
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
                <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
                
                {/* Protected Routes - The child element inside ProtectedRoute/Outlet will use the PageTransition */}
                <Route element={<ProtectedRoute />}>
                  {/* Dashboard is a major layout, handles its own transition wrapper to simplify */}
                  <Route path="/dashboard" element={<Dashboard />} /> 
                  
                  {/* Wrap other pages individually if they don't have their own internal layout/wrapper */}
                  <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
                  <Route path="/leaderboard" element={<PageTransition><Leaderboard /></PageTransition>} />
                  <Route path="/missions" element={<PageTransition><div>Missions Page</div></PageTransition>} />
                  <Route path="/quizzes" element={<PageTransition><div>Quizzes Page</div></PageTransition>} />
                </Route>
                
                {/* Catch all other routes */}
                <Route path="*" element={<PageTransition><div>404 Not Found</div></PageTransition>} />
            </Routes>
        </AnimatePresence>
    );
}

export default App;
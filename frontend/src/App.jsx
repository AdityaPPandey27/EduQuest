// EduQuest/frontend/src/App.jsx (UPDATED with Leaderboard and Profile Routes)

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Layout Components (Explicit .jsx extension added)
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Sidebar from './components/layout/Sidebar.jsx';

// Page Components (Explicit .jsx extension added)
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx'; 
import TeacherDashboard from './pages/TeacherDashboard.jsx'; 
import Leaderboard from './pages/Leaderboard.jsx'; // NEW IMPORT
import Profile from './pages/Profile.jsx';       // NEW IMPORT


// --- ROUTER & LAYOUT COMPONENTS ---

// Protected Route Wrapper (Requires any user)
const ProtectedRoute = ({ children }) => {
    const { user } = useSelector((state) => state.auth); 
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

// Teacher/Admin Route Wrapper (Requires specific role)
const TeacherRoute = ({ children }) => {
    const { user } = useSelector((state) => state.auth);
    // Check if user is logged in AND their role is teacher or admin
    if (!user || (user.role !== 'teacher' && user.role !== 'admin')) {
        // Redirect non-teachers to their regular dashboard or home
        return <Navigate to="/dashboard" replace />;
    }
    return children;
};

// Main Layout Wrapper
const MainLayout = ({ children, hideSidebar = false }) => (
    <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex flex-1 max-w-7xl w-full mx-auto">
            {/* Conditional Sidebar */}
            {!hideSidebar && <Sidebar />} 
            <main className="flex-1 p-6 md:p-8">
                {children}
            </main>
        </div>
        <Footer />
    </div>
);


// --- MAIN APP COMPONENT ---

function App() {
  return (
    <Router>
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MainLayout hideSidebar={true}><Home /></MainLayout>} />
            <Route path="/login" element={<MainLayout hideSidebar={true}><Login /></MainLayout>} />
            <Route path="/register" element={<MainLayout hideSidebar={true}><Register /></MainLayout>} />
            
            {/* Student Protected Routes */}
            <Route 
                path="/dashboard" 
                element={
                    <ProtectedRoute>
                        <MainLayout><Dashboard /></MainLayout>
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/profile" 
                element={
                    <ProtectedRoute>
                        <MainLayout><Profile /></MainLayout>
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/leaderboard" 
                element={
                    <ProtectedRoute>
                        <MainLayout><Leaderboard /></MainLayout>
                    </ProtectedRoute>
                } 
            />
            
            {/* Teacher Protected Route (with role check) */}
            <Route 
                path="/teacher/dashboard" 
                element={
                    <TeacherRoute>
                        <MainLayout><TeacherDashboard /></MainLayout>
                    </TeacherRoute>
                } 
            />
            
            {/* Default redirect for unhandled routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </Router>
  );
}

export default App;

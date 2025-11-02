import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { isAuthenticated, status } = useSelector((state) => state.auth);

  // If the initial check is still running (e.g., loading from localStorage), 
  // you might display a loading screen to prevent flicker.
  // Note: This logic assumes loadAuthState in the slice is nearly instant.
  if (status === 'loading') {
    return <div style={{textAlign: 'center', padding: '50px'}}>Authenticating...</div>; 
  }
  
  // If authenticated, render the child component/route via Outlet.
  // Otherwise, redirect to the login page.
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
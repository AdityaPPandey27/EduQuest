// EduQuest/frontend/src/components/layout/Navbar.jsx

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Corrected relative path from ../../ to ../ 
import { logoutUser } from '../redux/slices/authSlice'; 

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    // Optionally redirect user to home page
    window.location.href = '/'; 
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo and App Name */}
          <div className="flex-shrink-0 flex items-center">
            <svg className="h-8 w-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.144 1.395l.487-.243.08-.04 6.7-3.35a1 1 0 00.56 0l6.7 3.35.08.04.487.243a1 1 0 001.144-1.395l-7-14z" />
            </svg>
            <span className="ml-2 text-2xl font-extrabold text-gray-900 tracking-tight">
              EduQuest
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <a href="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">Home</a>
            <a href="/dashboard" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">Dashboard</a>
          </div>

          {/* Auth/Profile Actions */}
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {/* Safely check for user.xp before rendering */}
                  {user.name} ({user.role}) {user.xp !== undefined && `| XP: ${user.xp}`}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow transition duration-150"
                >
                  Logout
                </button>
              </div>
            ) : (
              <a href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg transition duration-150">
                Login / Register
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

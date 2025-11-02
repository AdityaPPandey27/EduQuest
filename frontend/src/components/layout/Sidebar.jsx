// EduQuest/frontend/src/components/layout/Sidebar.jsx

import React from 'react';

const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { name: 'Quizzes', path: '/quizzes', icon: '❓' },
    { name: 'Missions', path: '/missions', icon: '🗺️' },
    { name: 'Leaderboard', path: '/leaderboard', icon: '🏆' },
    { name: 'Profile', path: '/profile', icon: '👤' },
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-50 p-4 border-r border-gray-200 min-h-screen">
      <div className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.path}
            className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition duration-150"
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </a>
        ))}
      </div>

      {/* User Card Placeholder */}
      <div className="mt-8 pt-4 border-t border-gray-200">
        <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">User Stats</h3>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm font-bold text-blue-600">Level: 1</p>
            <p className="text-xs text-gray-500">XP: 0 / 100</p>
            <div className="h-1.5 bg-gray-200 rounded-full mt-1">
                <div className="h-1.5 bg-green-400 rounded-full" style={{ width: '0%' }}></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

// EduQuest/frontend/src/components/utils/StatCard.jsx
import React from 'react';

export const StatCard = ({ title, value, icon, color }) => (
    <div className={`p-6 rounded-xl shadow-md flex items-center space-x-4 ${color}`}>
        <span className="text-3xl">{icon}</span>
        <div>
            <p className="text-sm font-medium">{title}</p>
            <p className="text-2xl font-extrabold">{value}</p>
        </div>
    </div>
);

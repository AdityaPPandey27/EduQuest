// EduQuest/frontend/src/components/layout/PageContainer.jsx
import React from 'react';

// Generic Container for all page content
export const PageContainer = ({ title, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full min-h-full">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-2">{title}</h1>
        {children}
    </div>
);

// EduQuest/frontend/src/pages/Leaderboard.jsx

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { motion } from 'framer-motion';

// --- MOCK DATA ---
const mockLeaderboardData = [
    { rank: 1, name: 'Alice Johnson', xp: 12500, level: 12, class: 'Math A' },
    { rank: 2, name: 'Bob Smith', xp: 11800, level: 11, class: 'Science B' },
    { rank: 3, name: 'Charlie Brown', xp: 10500, level: 11, class: 'Math A' },
    { rank: 4, name: 'Diana Prince', xp: 9900, level: 10, class: 'Science B' },
    { rank: 5, name: 'Ethan Hunt', xp: 8750, level: 9, class: 'History C' },
    { rank: 6, name: 'Fiona Glenanne', xp: 7500, level: 8, class: 'Math A' },
    { rank: 7, name: 'George Kirk', xp: 6200, level: 7, class: 'Science B' },
    { rank: 8, name: 'Hannah Montana', xp: 5100, level: 6, class: 'History C' },
];

const Leaderboard = () => {
    // Assuming auth state provides current user for highlighting
    const { user } = useSelector(state => state.auth);
    const [filterClass, setFilterClass] = useState('All');
    
    // Simulating filtering logic
    const filteredData = mockLeaderboardData.filter(student => 
        filterClass === 'All' || student.class === filterClass
    );
    
    // Animation variants for Framer Motion
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: i => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.5,
                type: 'spring',
                stiffness: 100,
            },
        }),
    };

    return (
        <PageContainer title="Global Leaderboard 🏆">
            
            {/* Filter and Title */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 p-4 bg-white rounded-xl shadow-sm border">
                <h2 className="text-2xl font-extrabold text-gray-800">Top Students in EduQuest</h2>
                
                <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                    <label htmlFor="class-filter" className="text-sm font-medium text-gray-700">Filter by Class:</label>
                    <select
                        id="class-filter"
                        value={filterClass}
                        onChange={(e) => setFilterClass(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    >
                        <option value="All">All Classes</option>
                        <option value="Math A">Math A</option>
                        <option value="Science B">Science B</option>
                        <option value="History C">History C</option>
                    </select>
                </div>
            </div>

            {/* Leaderboard Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-5 p-4 bg-indigo-600 text-white font-bold text-sm uppercase tracking-wider">
                    <div className="col-span-1">Rank</div>
                    <div className="col-span-2">Name</div>
                    <div className="text-center">Level</div>
                    <div className="text-right">Total XP</div>
                </div>

                {/* Rows (Animated) */}
                <motion.div 
                    initial="hidden" 
                    animate="visible" 
                    className="divide-y divide-gray-200"
                >
                    {filteredData.map((student, index) => {
                        const isCurrentUser = user?.email === student.email; // Replace with actual user ID check
                        
                        return (
                            <motion.div 
                                key={student.rank} 
                                custom={index}
                                variants={itemVariants}
                                className={`grid grid-cols-5 p-4 text-gray-700 items-center transition duration-300 ${
                                    isCurrentUser ? 'bg-yellow-50 font-extrabold border-l-4 border-yellow-500' : 'hover:bg-gray-50'
                                }`}
                            >
                                {/* Rank */}
                                <div className="col-span-1 flex items-center space-x-2">
                                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold ${
                                        student.rank === 1 ? 'bg-yellow-400 text-white' : 
                                        student.rank === 2 ? 'bg-gray-400 text-white' :
                                        student.rank === 3 ? 'bg-orange-400 text-white' : 
                                        'bg-gray-100 text-indigo-600'
                                    }`}>
                                        {student.rank}
                                    </span>
                                </div>

                                {/* Name & Class */}
                                <div className="col-span-2">
                                    <p className="font-semibold text-gray-900">{student.name}</p>
                                    <p className="text-xs text-gray-500">{student.class}</p>
                                </div>

                                {/* Level */}
                                <div className="text-center font-bold text-indigo-600">
                                    {student.level}
                                </div>

                                {/* XP */}
                                <div className="text-right font-bold text-lg">
                                    {student.xp.toLocaleString()} 
                                    <span className="text-xs text-gray-500 ml-1">XP</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
            
        </PageContainer>
    );
};

export default Leaderboard;

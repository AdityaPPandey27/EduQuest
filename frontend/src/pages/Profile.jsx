// EduQuest/frontend/src/pages/Profile.jsx

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock Data
const mockBadges = [
    { id: 1, title: "First Quest", icon: "⭐", description: "Completed your first mission.", earned: true },
    { id: 2, title: "Math Master", icon: "➕", description: "10 Quizzes passed in Math.", earned: true },
    { id: 3, title: "History Buff", icon: "🏛️", description: "Completed all History missions.", earned: false },
    { id: 4, title: "Streak King", icon: "🔥", description: "Maintained a 7-day login streak.", earned: true },
    { id: 5, title: "Social Scientist", icon: "📊", description: "Top 10 in Social Studies leaderboard.", earned: false },
];

const mockXPData = [
    { name: 'Jan', xp: 4000 },
    { name: 'Feb', xp: 3000 },
    { name: 'Mar', xp: 6000 },
    { name: 'Apr', xp: 5500 },
    { name: 'May', xp: 7000 },
    { name: 'Jun', xp: 6800 },
];

const Profile = () => {
    // Current user data from Redux (mocked for visualization)
    const { user } = useSelector(state => state.auth);
    const mockUser = {
        name: user?.name || "Student Name",
        email: user?.email || "student@eduquest.com",
        role: user?.role || "student",
        xp: user?.xp || 12500,
        level: user?.level || 12,
        streak: user?.streak || 5,
        avatar: user?.avatar || 'https://placehold.co/128x128/6366f1/ffffff?text=AD',
    };
    
    const [selectedAvatar, setSelectedAvatar] = useState(mockUser.avatar);

    const handleAvatarChange = (newAvatar) => {
        setSelectedAvatar(newAvatar);
        console.log("Avatar change requested for:", newAvatar);
        // TODO: Implement API call to update user avatar
    };

    const AvatarSelector = () => {
        const avatars = [
            'https://placehold.co/128x128/6366f1/ffffff?text=AD',
            'https://placehold.co/128x128/22c55e/ffffff?text=ED',
            'https://placehold.co/128x128/f97316/ffffff?text=CQ',
            'https://placehold.co/128x128/06b6d4/ffffff?text=PK',
        ];
        return (
            <div className="flex space-x-3 mt-4">
                {avatars.map((avatar, index) => (
                    <img
                        key={index}
                        src={avatar}
                        alt={`Avatar ${index}`}
                        className={`w-12 h-12 rounded-full cursor-pointer transition transform hover:scale-110 ${
                            selectedAvatar === avatar ? 'ring-4 ring-indigo-500 ring-offset-2' : 'opacity-70'
                        }`}
                        onClick={() => handleAvatarChange(avatar)}
                    />
                ))}
            </div>
        );
    };

    return (
        <PageContainer title={`${mockUser.name}'s Profile`} className="space-y-8">
            {/* Profile Header and Stats */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
                
                {/* Avatar and Customization */}
                <div className="flex flex-col items-center">
                    <img
                        src={selectedAvatar}
                        alt="User Avatar"
                        className="w-32 h-32 rounded-full object-cover ring-4 ring-indigo-500 ring-offset-4"
                    />
                    <h3 className="text-2xl font-bold mt-4 text-gray-800">{mockUser.name}</h3>
                    <p className="text-sm text-gray-500">{mockUser.email}</p>
                    <AvatarSelector />
                </div>

                {/* Main Stats */}
                <div className="flex-1 grid grid-cols-2 gap-4 mt-6 md:mt-0">
                    <StatCard label="Current Level" value={`Level ${mockUser.level}`} color="text-indigo-600" />
                    <StatCard label="Total XP Earned" value={mockUser.xp.toLocaleString()} color="text-green-600" />
                    <StatCard label="Current Streak" value={`${mockUser.streak} Days 🔥`} color="text-yellow-600" />
                    <StatCard label="Role" value={mockUser.role.toUpperCase()} color="text-gray-600" />
                </div>
            </div>

            {/* XP History Chart and Badges Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
                
                {/* Badges Grid (Column 1-2) */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">My Achievements ({mockBadges.filter(b => b.earned).length}/{mockBadges.length})</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {mockBadges.map(badge => (
                            <div 
                                key={badge.id}
                                className={`p-4 rounded-lg flex flex-col items-center text-center transition duration-200 ${
                                    badge.earned ? 'bg-indigo-50 border-2 border-indigo-200 shadow-md' : 'bg-gray-100 opacity-60'
                                }`}
                            >
                                <span className={`text-3xl mb-2 ${badge.earned ? '' : 'grayscale'}`}>{badge.icon}</span>
                                <p className="font-semibold text-sm text-gray-800">{badge.title}</p>
                                <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* XP History Chart (Column 3) */}
                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">XP History</h2>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={mockXPData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                                <XAxis dataKey="name" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    formatter={(value) => [`${value.toLocaleString()} XP`, 'XP Earned']}
                                />
                                <Legend />
                                <Bar dataKey="xp" name="XP Earned" fill="#6366f1" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>

        </PageContainer>
    );
};

// Helper component (assumed to be available via PageContainer, but defined here for context)
const StatCard = ({ label, value, color }) => (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className={`text-2xl font-extrabold mt-1 ${color}`}>{value}</p>
    </div>
);

export default Profile;

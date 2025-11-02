// EduQuest/frontend/src/pages/Dashboard.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/authSlice'; 
import { PageContainer } from '../components/layout/PageContainer';
import { ProgressBar } from '../components/utils/ProgressBar';
import { StatCard } from '../components/utils/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- MOCK DATA (Moved from App.jsx) ---
const mockBadges = [
    { title: "First Step", icon: "⭐", description: "Completed 1st Quiz" },
    { title: "Streak Hero", icon: "🔥", description: "5-Day Streak" },
    { title: "Quiz Master", icon: "🧠", description: "Scored 100% on a Quiz" },
];

const mockMissions = [
    { id: 1, title: "Review Ancient History", xpReward: 50, progress: "5/10 steps" },
    { id: 2, title: "Master Pythagorean Theorem", xpReward: 100, progress: "New" },
    { id: 3, title: "Write a Short Essay", xpReward: 75, progress: "In Progress" },
];

const mockLeaderboard = [
    { name: "You", xp: 1500, rank: 1 },
    { name: "Alex B.", xp: 1200, rank: 2 },
    { name: "Sarah K.", xp: 950, rank: 3 },
    { name: "John P.", xp: 700, rank: 4 },
    { name: "Emily R.", xp: 450, rank: 5 },
];

const mockSubjectData = [
    { name: 'Math', progress: 85 },
    { name: 'Science', progress: 60 },
    { name: 'History', progress: 95 },
    { name: 'Literature', progress: 75 },
];


const Dashboard = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    
    const userData = user || { name: 'Guest', role: 'student', xp: 1500, level: 12, streak: 5 };
    const xpGoal = userData.level * 100 + 500; 

    const simulateXpGain = () => {
        const newXp = userData.xp + 100;
        const newLevel = Math.floor(newXp / 500) + 1;
        dispatch(setUser({ ...userData, xp: newXp, level: newLevel }));
    };

    return (
        <PageContainer title="Student Dashboard">
            
            {/* XP, Level, Streak Display */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <StatCard title="Current XP" value={userData.xp} icon="⚡" color="bg-yellow-100 text-yellow-800" />
                <StatCard title="Current Level" value={`Level ${userData.level}`} icon="📈" color="bg-green-100 text-green-800" />
                <StatCard title="Streak" value={`${userData.streak} Days`} icon="🔥" color="bg-red-100 text-red-800" />
            </div>

            {/* XP Progress Bar */}
            <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-xl shadow-inner">
                <h2 className="text-xl font-semibold text-blue-800 mb-3">XP Progress to Next Level (Level {userData.level + 1})</h2>
                <ProgressBar 
                    label="Progress"
                    current={userData.xp}
                    max={xpGoal}
                    color="bg-blue-600"
                />
                <div className="mt-4 text-center">
                    <button 
                        onClick={simulateXpGain}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-150"
                    >
                        +100 XP (Simulate Quiz)
                    </button>
                </div>
            </div>

            {/* Main Content Grid: Chart, Missions, Leaderboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* --- Column 1: Subject Progress Chart --- */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md border">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Subject Progress</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={mockSubjectData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="name" stroke="#333" />
                            <YAxis domain={[0, 100]} stroke="#333" />
                            <Tooltip 
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                formatter={(value) => [`${value}% Mastery`, 'Progress']}
                            />
                            <Bar dataKey="progress" fill="#4c51bf" radius={[10, 10, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* --- Column 2: Leaderboard Preview --- */}
                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md border">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 flex justify-between items-center">
                        Top 5 Leaderboard 🏆
                        <a href="/leaderboard" className="text-sm text-blue-600 hover:text-blue-800 font-medium">View All</a>
                    </h2>
                    <ul className="space-y-3">
                        {mockLeaderboard.map((user, index) => (
                            <li key={index} className={`flex items-center justify-between p-3 rounded-lg ${index === 0 ? 'bg-yellow-50 font-bold' : 'bg-gray-50'}`}>
                                <span className="text-lg font-bold w-1/5">{user.rank}.</span>
                                <span className="w-2/3 truncate">{user.name} {index === 0 && ' (You)'}</span>
                                <span className="text-sm font-semibold text-purple-600">{user.xp} XP</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
            {/* Secondary Content Grid: Badges & Missions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                 {/* --- Column 1: Active Missions List --- */}
                <div className="bg-white p-6 rounded-xl shadow-md border">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Active Missions 🗺️</h2>
                    <div className="space-y-4">
                        {mockMissions.map((mission) => (
                            <div key={mission.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150">
                                <p className="font-semibold text-lg text-gray-900">{mission.title}</p>
                                <div className="flex justify-between items-center text-sm mt-1">
                                    <span className="text-green-600 font-medium">{mission.xpReward} XP</span>
                                    <span className="text-gray-500">{mission.progress}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Column 2: Badges Display Grid --- */}
                <div className="bg-white p-6 rounded-xl shadow-md border">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Badges 🏅</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {mockBadges.map((badge, index) => (
                            <div key={index} className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl shadow-sm border border-yellow-300 transform transition-transform hover:scale-105">
                                <span className="text-4xl mb-2">{badge.icon}</span>
                                <p className="text-xs font-semibold text-center">{badge.title}</p>
                                <p className="text-xs text-gray-500 text-center mt-1 hidden sm:block">{badge.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </PageContainer>
    );
};

export default Dashboard;

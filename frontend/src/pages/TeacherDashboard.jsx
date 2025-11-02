// EduQuest/frontend/src/pages/TeacherDashboard.jsx

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { PageContainer } from '../components/layout/PageContainer'; // Keeping this path, assuming the external files are fixed
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../api/api'; // Assuming you implement the actual API calls here

// --- MOCK DATA ---
const mockQuizzes = [
    { id: 1, title: "Algebra Fundamentals", questions: 10, xp: 50, status: "Published", studentsCompleted: 85 },
    { id: 2, title: "World History: WWII", questions: 15, xp: 75, status: "Draft", studentsCompleted: 12 },
    { id: 3, title: "Introduction to Biology", questions: 8, xp: 40, status: "Published", studentsCompleted: 150 },
];

const mockAnalytics = [
    { subject: 'Algebra', avgScore: 78, students: 120 },
    { subject: 'History', avgScore: 65, students: 100 },
    { subject: 'Biology', avgScore: 88, students: 150 },
    { subject: 'Lit.', avgScore: 72, students: 90 },
];

const mockXpSettings = {
    quizCompletion: 50,
    missionCompletion: 100,
    dailyStreak: 10,
};


const TeacherDashboard = () => {
    // Assuming react-redux is now resolvable
    const { user } = useSelector(state => state.auth);
    const [newQuizData, setNewQuizData] = useState({ title: '', xpReward: 50 });
    const [newMissionData, setNewMissionData] = useState({ title: '', description: '', xpReward: 100 });
    const [xpSettings, setXpSettings] = useState(mockXpSettings);

    const handleCreateQuiz = (e) => {
        e.preventDefault();
        // TODO: Implement API call to POST /api/quiz
        console.log('Creating quiz:', newQuizData);
        // Using console log instead of alert based on previous best practice instructions
        console.log(`Quiz '${newQuizData.title}' creation simulated!`); 
        setNewQuizData({ title: '', xpReward: 50 });
    };

    const handleCreateMission = (e) => {
        e.preventDefault();
        // TODO: Implement API call to POST /api/missions
        console.log('Creating mission:', newMissionData);
        // Using console log instead of alert based on previous best practice instructions
        console.log(`Mission '${newMissionData.title}' creation simulated!`);
        setNewMissionData({ title: '', description: '', xpReward: 100 });
    };

    const handleUpdateSettings = (e) => {
        e.preventDefault();
        // TODO: Implement API call to PUT /api/admin/xp-settings
        console.log('Updating XP settings:', xpSettings);
        // Using console log instead of alert based on previous best practice instructions
        console.log('XP settings updated!');
    };

    return (
        // PageContainer is assumed to be correctly imported
        <PageContainer title={`Teacher Dashboard: ${user?.name || 'Admin'}`}>
            
            {/* Analytics and XP Settings Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                
                {/* Student Analytics Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md border">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Student Average Score by Subject</h2>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={mockAnalytics} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="subject" stroke="#333" />
                            <YAxis domain={[0, 100]} stroke="#333" />
                            <Tooltip 
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                formatter={(value, name, props) => [`${value}% Score`, 'Avg Score']}
                            />
                            <Bar dataKey="avgScore" fill="#f97316" radius={[10, 10, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* XP Reward Settings Panel */}
                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md border">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Gamification Settings</h2>
                    <form onSubmit={handleUpdateSettings} className="space-y-4">
                        <SettingInput label="Quiz Completion XP" name="quizCompletion" value={xpSettings.quizCompletion} onChange={(e) => setXpSettings({...xpSettings, quizCompletion: parseInt(e.target.value)})} />
                        <SettingInput label="Mission Completion XP" name="missionCompletion" value={xpSettings.missionCompletion} onChange={(e) => setXpSettings({...xpSettings, missionCompletion: parseInt(e.target.value)})} />
                        <SettingInput label="Daily Streak XP" name="dailyStreak" value={xpSettings.dailyStreak} onChange={(e) => setXpSettings({...xpSettings, dailyStreak: parseInt(e.target.value)})} />
                        
                        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg transition duration-150 shadow-md">
                            Update Settings
                        </button>
                    </form>
                </div>
            </div>

            {/* Creation and Management Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Create New Quiz Form */}
                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md border">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Create New Quiz 📝</h2>
                    <form onSubmit={handleCreateQuiz} className="space-y-4">
                        <InputGroup label="Quiz Title" type="text" value={newQuizData.title} onChange={(e) => setNewQuizData({...newQuizData, title: e.target.value})} required />
                        <InputGroup label="XP Reward" type="number" value={newQuizData.xpReward} onChange={(e) => setNewQuizData({...newQuizData, xpReward: parseInt(e.target.value)})} required min="1" />
                        
                        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition duration-150 shadow-md">
                            Create Quiz (Define Questions Later)
                        </button>
                    </form>
                </div>

                {/* Mission Creation Panel */}
                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md border">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">New Mission Panel 🎯</h2>
                    <form onSubmit={handleCreateMission} className="space-y-4">
                        <InputGroup label="Mission Title" type="text" value={newMissionData.title} onChange={(e) => setNewMissionData({...newMissionData, title: e.target.value})} required />
                        <label className="block">
                            <span className="text-gray-700 text-sm font-medium">Description</span>
                            <textarea
                                value={newMissionData.description}
                                onChange={(e) => setNewMissionData({...newMissionData, description: e.target.value})}
                                rows="3"
                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 focus:border-blue-500 focus:ring-blue-500"
                                required
                            ></textarea>
                        </label>
                        <InputGroup label="XP Reward" type="number" value={newMissionData.xpReward} onChange={(e) => setNewMissionData({...newMissionData, xpReward: parseInt(e.target.value)})} required min="1" />
                        
                        <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 rounded-lg transition duration-150 shadow-md">
                            Publish Mission
                        </button>
                    </form>
                </div>

                {/* List of Created Quizzes */}
                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md border max-h-[500px] overflow-y-auto">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Created Quizzes</h2>
                    <div className="space-y-3">
                        {mockQuizzes.map((quiz) => (
                            <div key={quiz.id} className="p-4 bg-gray-50 rounded-lg shadow-sm border-l-4 border-blue-500">
                                <h3 className="font-bold text-lg text-gray-900 truncate">{quiz.title}</h3>
                                <div className="flex justify-between text-sm text-gray-600 mt-1">
                                    <span>{quiz.questions} Questions</span>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${quiz.status === 'Published' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                        {quiz.status}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-500 mt-2 flex justify-between">
                                    <span>{quiz.xp} XP Reward</span>
                                    <span>{quiz.studentsCompleted} Completed</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
        </PageContainer>
    );
};

// Helper components for forms
const InputGroup = ({ label, type, value, onChange, required, min }) => (
    <label className="block">
        <span className="text-gray-700 text-sm font-medium">{label}</span>
        <input 
            type={type} 
            value={value} 
            onChange={onChange} 
            required={required}
            min={min}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 focus:border-blue-500 focus:ring-blue-500"
        />
    </label>
);

const SettingInput = ({ label, name, value, onChange }) => (
    <label className="flex items-center justify-between">
        <span className="text-gray-700 text-sm font-medium">{label}</span>
        <input 
            type="number" 
            name={name} 
            value={value} 
            onChange={onChange} 
            min="1"
            className="w-24 rounded-lg border-gray-300 shadow-sm p-2 text-right focus:border-blue-500 focus:ring-blue-500"
        />
    </label>
);

export default TeacherDashboard;

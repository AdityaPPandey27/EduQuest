import React from 'react';
import { useSelector } from 'react-redux';
// Assuming these components exist from previous steps
import Sidebar from '../components/layout/Sidebar'; 
import PageContainer from '../components/layout/PageContainer';
import StartCard from '../components/layout/StartCard';
import ProgressBar from '../components/layout/ProgressBar';
import PageTransition from '../components/common/PageTransition'; 
import ThemeToggle from '../components/common/ThemeToggle'; 

// Mock Data Structure (for illustration)
const mockUser = {
    username: 'Aditya P.',
    xp: 1250,
    level: 12,
    maxXp: 1500, 
    role: 'student',
};
const mockModules = [
    { id: 1, title: 'JavaScript Fundamentals', xpReward: 150, progress: '50%' },
    { id: 2, title: 'React State Management', xpReward: 250, progress: '25%' },
    { id: 3, title: 'Node.js & Express APIs', xpReward: 300, progress: '10%' },
    { id: 4, title: 'MongoDB & Mongoose', xpReward: 200, progress: '0%' },
];

const ModuleCard = ({ title, xpReward, progress }) => {
    return (
        <StartCard 
            title={title} 
            description={`Earn ${xpReward} XP for this module!`} 
            ctaText="Start Module"
            linkTo={`/modules/${title.toLowerCase().replace(/ /g, '-')}`}
        >
            <p className="text-sm dark:text-gray-400 text-gray-600 mt-2">
                Progress: <span className="font-semibold text-primary-blue dark:text-secondary-blue">{progress}</span>
            </p>
        </StartCard>
    );
};


const Dashboard = () => {
  // const { user } = useSelector((state) => state.auth); // Use actual Redux state
  const user = mockUser;

  return (
    // Set the overall page theme classes (bg-light-bg, dark:bg-dark-bg)
    <div className="min-h-screen flex bg-light-bg dark:bg-dark-bg transition-colors duration-500">
        <Sidebar user={user} />
        
        {/* 4. Wrap with PageTransition for smooth page entry */}
        <PageTransition>
            {/* PageContainer should wrap the main content area */}
            <PageContainer>
                {/* Header for title and theme toggle on larger screens */}
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                        Welcome back, {user.username}! 🎉
                    </h1>
                    <ThemeToggle />
                </header>
                
                {/* XP Bar Section */}
                <div className="mb-8 p-6 rounded-xl shadow-2xl bg-light-card dark:bg-dark-card transition-colors duration-500">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                        Current Progress
                    </h2>
                    <ProgressBar 
                        currentXp={user.xp} 
                        maxXp={user.maxXp} 
                        userLevel={user.level} 
                    />
                </div>

                {/* Modules/Quizzes Section - Responsive Grid Layout (Requirement 5) */}
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Available Modules
                </h2>
                {/* Responsive grid: 1 col on mobile, 2 on medium, 3 on large */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockModules.map((module) => (
                        <ModuleCard key={module.id} {...module} />
                    ))}
                </div>

                {/* Quick Stats Section - Responsive layout */}
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
                    Quick Stats
                </h2>
                <div className="flex flex-wrap gap-4">
                    <div className="p-4 rounded-xl shadow-lg bg-light-card dark:bg-dark-card w-full sm:w-auto flex-grow transition-colors duration-300">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total XP</p>
                        <p className="text-2xl font-extrabold text-xp-end">{user.xp}</p>
                    </div>
                    <div className="p-4 rounded-xl shadow-lg bg-light-card dark:bg-dark-card w-full sm:w-auto flex-grow transition-colors duration-300">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Missions Completed</p>
                        <p className="text-2xl font-extrabold text-primary-blue">7</p>
                    </div>
                    <div className="p-4 rounded-xl shadow-lg bg-light-card dark:bg-dark-card w-full sm:w-auto flex-grow transition-colors duration-300">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Badges Earned</p>
                        <p className="text-2xl font-extrabold text-yellow-500">4</p>
                    </div>
                </div>
            </PageContainer>
        </PageTransition>
    </div>
  );
};

export default Dashboard;
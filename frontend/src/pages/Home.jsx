// EduQuest/frontend/src/pages/Home.jsx
import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';

const Home = () => (
    <PageContainer title="Welcome to EduQuest">
        <p className="text-lg text-gray-600">The gamified platform for learning and earning XP!</p>
        <p className="mt-4 text-sm">Please register or log in to access the full platform features.</p>
    </PageContainer>
);

export default Home;

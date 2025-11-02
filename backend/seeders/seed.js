// EduQuest/backend/seeders/seed.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const path = require('path'); // <--- 1. NEW: Import the path module

// --- CRITICAL FIX: Correctly resolve the path to the .env file ---
// path.resolve(__dirname, '..', '.env') resolves the absolute path to:
// .../backend/seeders/ -> .../backend/ -> .env
dotenv.config({ path: path.resolve(__dirname, '..', '.env') }); 
// --- END CRITICAL FIX ---


// --- Load Models and DB Connection ---
// (These require statements remain the same)
const User = require('../models/User');
const Quiz = require('../models/quiz');
const Mission = require('../models/mission');
const Badge = require('../models/badge');
const connectDB = require('../config/db');

// Connect to Database
connectDB(); 

// ... rest of importData and destroyData functions ...
const importData = async () => {
  try {
    // 1. Clear existing data
    console.log('Destroying all existing data...');
    await User.deleteMany();
    await Quiz.deleteMany();
    await Mission.deleteMany();
    await Badge.deleteMany();
    console.log('Data cleared. Starting import...');

    // 2. Define Seed Data

    // --- USERS (3 Students, 2 Teachers) ---
    // Note: The pre-save hook in User.js will hash these passwords!
    const usersData = [
      { name: 'Alice Smith', email: 'alice@eduquest.com', password: 'password123', role: 'student', xp: 550, level: 5 },
      { name: 'Bob Johnson', email: 'bob@eduquest.com', password: 'password123', role: 'student', xp: 200, level: 2 },
      { name: 'Charlie Brown', email: 'charlie@eduquest.com', password: 'password123', role: 'student', xp: 150, level: 1 },
      { name: 'Ms. Davis', email: 'davis@eduquest.com', password: 'password123', role: 'teacher', xp: 0, level: 1 },
      { name: 'Mr. Evans', email: 'evans@eduquest.com', password: 'password123', role: 'teacher', xp: 0, level: 1 },
    ];
    
    // Using save() inside a map ensures the pre('save') hook for hashing runs for each user
    const createdUsers = await Promise.all(usersData.map(data => new User(data).save()));
    
    // Extract required IDs for linking
    const teacherId = createdUsers.find(user => user.name === 'Ms. Davis')._id;
    const secondTeacherId = createdUsers.find(user => user.name === 'Mr. Evans')._id;
    const aliceId = createdUsers.find(user => user.name === 'Alice Smith')._id;
    const bobId = createdUsers.find(user => user.name === 'Bob Johnson')._id;
    
    console.log('5 Users inserted (passwords hashed).');

    // --- BADGES (5 Badges) ---
    const badgesData = [
      { title: 'First Step', icon: 'footprint', description: 'Complete your first quiz.', condition: 'Complete 1 Quiz' },
      { title: 'Level Up', icon: 'star', description: 'Reach Level 5.', condition: 'Reach Level 5' },
      { title: 'Mission Master', icon: 'trophy', description: 'Complete 3 Missions.', condition: 'Complete 3 Missions' },
      { title: 'Streak Starter', icon: 'flame', description: 'Maintain a 7-day activity streak.', condition: 'Maintain a 7-day Streak' },
      { title: 'Code Cadet', icon: 'code', description: 'Complete the "JavaScript Basics" Quiz.', condition: 'Complete JavaScript Basics Quiz' },
    ];
    
    const createdBadges = await Badge.insertMany(badgesData);
    console.log('5 Badges inserted.');
    
    // Give Alice one badge to test frontend display of earned badges
    const firstBadgeId = createdBadges.find(badge => badge.title === 'First Step')._id;
    await User.updateOne({ _id: aliceId }, { $push: { badges: firstBadgeId } });


    // --- QUIZZES (3 Quizzes) ---
    const quizzesData = [
      {
        title: 'JavaScript Basics',
        questions: [
          { questionText: 'Which is NOT a valid JavaScript loop?', options: ['for', 'while', 'do...while', 'loopUntil'], correctAnswerIndex: 3 },
          { questionText: 'What is the correct syntax for an arrow function?', options: ['func => {}', 'function func {}', 'func() => {}', '=> func {}'], correctAnswerIndex: 0 },
        ],
        xpReward: 100,
        createdBy: teacherId, // Ms. Davis
      },
      {
        title: 'React Fundamentals',
        questions: [
          { questionText: 'What is the main purpose of JSX?', options: ['Database querying', 'Writing CSS modules', 'Describing UI structure', 'Handling server logic'], correctAnswerIndex: 2 },
          { questionText: 'Which hook manages state in a functional component?', options: ['useEffect', 'useContext', 'useState', 'useMemo'], correctAnswerIndex: 2 },
          { questionText: 'React components must start with an uppercase letter.', options: ['True', 'False'], correctAnswerIndex: 0 },
        ],
        xpReward: 150,
        createdBy: secondTeacherId, // Mr. Evans
      },
      {
        title: 'Node.js and Express',
        questions: [
          { questionText: 'What is Express.js?', options: ['A Node.js web application framework', 'A MongoDB ODM', 'A frontend library', 'A bundling tool'], correctAnswerIndex: 0 },
        ],
        xpReward: 75,
        createdBy: teacherId, // Ms. Davis
      },
    ];

    await Quiz.insertMany(quizzesData);
    console.log('3 Quizzes inserted.');

    // --- MISSIONS (3 Missions) ---
    const missionsData = [
      {
        title: 'Weekly Code Challenge',
        description: 'Solve 5 coding problems on an external platform. Due in 7 days.',
        xpReward: 300,
        duration: 7,
        isActive: true,
        participants: [aliceId, bobId], // Alice and Bob are actively participating
      },
      {
        title: 'Learn a New Hook',
        description: 'Implement a feature using an advanced React hook (e.g., useReducer or custom hook). Due in 14 days.',
        xpReward: 200,
        duration: 14,
        isActive: true,
        participants: [aliceId], 
      },
      {
        title: 'Build a REST API',
        description: 'Create a fully functional CRUD API using Express/Mongoose.',
        xpReward: 400,
        duration: 21,
        isActive: false, // Inactive mission to test filtering
      },
    ];

    await Mission.insertMany(missionsData);
    console.log('3 Missions inserted.');

    console.log('Seed Data successfully imported! ✅');
    process.exit();

  } catch (error) {
    console.error(`Error with data import: ${error.message} ❌`);
    process.exit(1);
  }
};

// Function to destroy all data
const destroyData = async () => {
  try {
    // This is purely for convenience in testing
    await User.deleteMany();
    await Quiz.deleteMany();
    await Mission.deleteMany();
    await Badge.deleteMany();
    
    console.log('Data successfully destroyed! 🗑️');
    process.exit();
  } catch (error) {
    console.error(`Error destroying data: ${error.message} ❌`);
    process.exit(1);
  }
};

// Check command line arguments to determine action
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
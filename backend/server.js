// EduQuest/backend/server.js

const express = require('express');
const dotenv = require('dotenv').config(); 
const cors = require('cors');
const connectDB = require('./config/db'); 

// Import all routes (Including the new badgeRoutes)
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/usersRoutes');
const quizRoutes = require('./routes/quizRoutes');
const missionRoutes = require('./routes/missionRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const badgeRoutes = require('./routes/badgeRoutes'); // <--- NEW IMPORT

// --- Error Handling Middleware (REQUIRED) ---
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};
// ----------------------------------------------


// Connect to MongoDB
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
// Enable CORS for all origins 
app.use(cors()); 
app.use(express.json()); // Allows server to accept JSON data in the body

// Define API Routes (Base URL: /api/...)
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/missions', missionRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/badges', badgeRoutes); // <--- NEW USAGE


// Use error handling middleware (must be after routes)
app.use(notFound);
app.use(errorHandler);


// Start the server
app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${port}`);
});

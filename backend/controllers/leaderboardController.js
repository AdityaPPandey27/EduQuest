// EduQuest/backend/controllers/leaderboardController.js

const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Leaderboard = require('../models/Leaderboard'); 

// @desc    Get the top users for the leaderboard
// @route   GET /api/leaderboard
// @access  Public
const getLeaderboard = asyncHandler(async (req, res) => {
  // Option 1: Calculate on the fly (more accurate, uses User collection)
  const leaderboard = await User.find({})
    .sort({ xp: -1 }) 
    .limit(50)          // Top 50
    .select('name xp level avatar'); 
    
  res.status(200).json(leaderboard);
});

// @desc    Update a specific user's leaderboard entry (Manual update for system/admin)
// @route   PUT /api/leaderboard/:userId
// @access  Private/Admin
const updateLeaderboardEntry = asyncHandler(async (req, res) => {
    const { xp, rank } = req.body;

    // This route is primarily for system-level synchronization or manual adjustments
    // We use the dedicated Leaderboard model here
    const updatedEntry = await Leaderboard.findOneAndUpdate(
        { userId: req.params.userId },
        { xp, rank, snapshotDate: Date.now() },
        { new: true, upsert: true } // Create if it doesn't exist
    ).populate('userId', 'name email');

    if (updatedEntry) {
        res.status(200).json({ 
            message: 'Leaderboard entry updated',
            entry: updatedEntry 
        });
    } else {
        res.status(404);
        throw new Error('User not found in Leaderboard');
    }
});


module.exports = {
  getLeaderboard,
  updateLeaderboardEntry,
};

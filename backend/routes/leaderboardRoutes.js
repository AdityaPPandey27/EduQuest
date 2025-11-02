// EduQuest/backend/routes/leaderboardRoutes.js

const express = require('express');
const router = express.Router();
const { getLeaderboard, updateLeaderboardEntry } = require('../controllers/leaderboardController');
const { protect, checkRole } = require('../middleware/authMiddleware');

// GET /api/leaderboard (Public access)
router.route('/').get(getLeaderboard);

// PUT /api/leaderboard/:userId (Restricted to Admins)
router.route('/:userId').put(protect, checkRole(['admin']), updateLeaderboardEntry);


module.exports = router;

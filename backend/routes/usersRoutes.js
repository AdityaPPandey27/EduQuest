// EduQuest/backend/routes/usersRoutes.js

const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/usersController');
const { protect } = require('../middleware/authMiddleware');

// The 'protect' middleware ensures only authenticated users can access these routes
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

module.exports = router;

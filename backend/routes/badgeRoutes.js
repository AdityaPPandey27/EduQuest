// EduQuest/backend/routes/badgeRoutes.js

const express = require('express');
const router = express.Router();
const { getBadges, awardBadge } = require('../controllers/badgeController');
const { protect, checkRole } = require('../middleware/authMiddleware');

router.route('/').get(getBadges);

// Route to award a badge is restricted to Admin
router.route('/award/:badgeId/:userId').post(protect, checkRole(['admin']), awardBadge);

// TODO: Add route for Admin to create, update, or delete badge definitions

module.exports = router;

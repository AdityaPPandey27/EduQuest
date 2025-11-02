// EduQuest/backend/controllers/badgeController.js

const asyncHandler = require('express-async-handler');
const Badge = require('../models/badge');
const User = require('../models/User');

// @desc    Get all available badges
// @route   GET /api/badges
// @access  Public
const getBadges = asyncHandler(async (req, res) => {
  const badges = await Badge.find({});
  res.status(200).json(badges);
});

// @desc    Award a badge to a specific user (Admin/System action)
// @route   POST /api/badges/award/:badgeId/:userId
// @access  Private/Admin
const awardBadge = asyncHandler(async (req, res) => {
    const { badgeId, userId } = req.params;

    const user = await User.findById(userId);
    const badge = await Badge.findById(badgeId);

    if (!user || !badge) {
        res.status(404);
        throw new Error('User or Badge not found');
    }

    if (user.badges.includes(badgeId)) {
        res.status(400);
        throw new Error('User already has this badge');
    }

    user.badges.push(badgeId);
    await user.save();
    
    res.status(200).json({ message: `${badge.title} awarded to ${user.name}` });
});

module.exports = {
  getBadges,
  awardBadge,
  // ... createBadge, updateBadge, deleteBadge (Admin routes)
};

// EduQuest/backend/controllers/usersController.js

const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc    Get user profile (private route)
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  // req.user is populated by authMiddleware (protect)
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      points: user.points,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // Update fields if provided in the request body
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    
    // Only update password if a new one is provided
    if (req.body.password) {
      user.password = req.body.password; // The pre-save hook in User.js handles hashing
    }

    const updatedUser = await user.save();
    
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      points: updatedUser.points,
      // Note: We don't send the password or token back here for simplicity
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = {
  getUserProfile,
  updateUserProfile,
};

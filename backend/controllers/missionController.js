// EduQuest/backend/controllers/missionController.js

const asyncHandler = require('express-async-handler');
const Mission = require('../models/Mission');
const User = require('../models/User');

// @desc    Get all active missions
// @route   GET /api/missions
// @access  Private
const getActiveMissions = asyncHandler(async (req, res) => {
  const missions = await Mission.find({ isActive: true });
  res.status(200).json(missions);
});

// @desc    Complete a mission and award points
// @route   POST /api/missions/complete/:id
// @access  Private
const completeMission = asyncHandler(async (req, res) => {
  const mission = await Mission.findById(req.params.id);
  const user = await User.findById(req.user._id);

  if (!mission) {
    res.status(404);
    throw new Error('Mission not found');
  }

  if (!mission.isActive) {
    res.status(400);
    throw new Error('Mission is no longer active.');
  }

  // 1. Award XP
  user.xp += mission.xpReward;
  
  // TODO: Add logic to track completion (e.g., in a separate 'Progress' collection)
  await user.save();
  
  res.status(200).json({ 
    message: `${mission.title} completed!`, 
    xpEarned: mission.xpReward,
    newXP: user.xp 
  });
});

// --- NEW CRUD METHODS ---

// @desc    Create a new mission
// @route   POST /api/missions
// @access  Private/Teacher/Admin
const createMission = asyncHandler(async (req, res) => {
    const { title, description, xpReward, duration } = req.body;

    if (!title || !description || !xpReward || !duration) {
        res.status(400);
        throw new Error('Please provide title, description, XP reward, and duration.');
    }

    const mission = new Mission({
        title,
        description,
        xpReward,
        duration,
    });

    const createdMission = await mission.save();
    res.status(201).json(createdMission);
});

// @desc    Update a mission by ID
// @route   PUT /api/missions/:id
// @access  Private/Teacher/Admin
const updateMission = asyncHandler(async (req, res) => {
    const mission = await Mission.findById(req.params.id);

    if (mission) {
        // Validation/Sanitization should happen here
        mission.title = req.body.title || mission.title;
        mission.description = req.body.description || mission.description;
        mission.xpReward = req.body.xpReward || mission.xpReward;
        mission.duration = req.body.duration || mission.duration;
        mission.isActive = req.body.isActive !== undefined ? req.body.isActive : mission.isActive;

        const updatedMission = await mission.save();
        res.status(200).json({ message: 'Mission updated successfully', mission: updatedMission });
    } else {
        res.status(404);
        throw new Error('Mission not found');
    }
});

// @desc    Delete a mission by ID
// @route   DELETE /api/missions/:id
// @access  Private/Teacher/Admin
const deleteMission = asyncHandler(async (req, res) => {
    const mission = await Mission.findById(req.params.id);

    if (mission) {
        await Mission.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Mission deleted successfully' });
    } else {
        res.status(404);
        throw new Error('Mission not found');
    }
});

module.exports = {
  getActiveMissions,
  completeMission,
  createMission,
  updateMission,
  deleteMission,
};

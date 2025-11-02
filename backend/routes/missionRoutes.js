// EduQuest/backend/routes/missionRoutes.js

const express = require('express');
const router = express.Router();
const { getActiveMissions, completeMission, createMission, updateMission, deleteMission } = require('../controllers/missionController');
const { protect, checkRole } = require('../middleware/authMiddleware');

const adminOrTeacher = checkRole(['teacher', 'admin']);

// Routes for listing and creation (POST is Admin/Teacher only)
router.route('/')
    .get(protect, getActiveMissions)
    .post(protect, adminOrTeacher, createMission); 

router.route('/complete/:id').post(protect, completeMission); // Student can complete

// Routes for updating and deleting a single mission (Admin/Teacher only)
router.route('/:id')
    .put(protect, adminOrTeacher, updateMission)
    .delete(protect, adminOrTeacher, deleteMission);

module.exports = router;

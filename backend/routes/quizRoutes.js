// EduQuest/backend/routes/quizRoutes.js

const express = require('express');
const router = express.Router();
const { getQuizzes, getQuizById, createQuiz, updateQuiz, deleteQuiz } = require('../controllers/quizController');
const { protect, checkRole } = require('../middleware/authMiddleware');

// Routes for listing and creation (POST is Admin/Teacher only)
router.route('/')
    .get(protect, getQuizzes)
    .post(protect, checkRole(['teacher', 'admin']), createQuiz); 

// Routes for reading, updating, and deleting a single quiz (PUT/DELETE is Admin/Teacher only)
router.route('/:id')
    .get(protect, getQuizById)
    .put(protect, checkRole(['teacher', 'admin']), updateQuiz) 
    .delete(protect, checkRole(['teacher', 'admin']), deleteQuiz); 

module.exports = router;

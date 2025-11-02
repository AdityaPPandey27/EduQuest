// EduQuest/backend/controllers/quizController.js

const asyncHandler = require('express-async-handler');
const Quiz = require('../models/quiz');

// @desc    Get all available quizzes
// @route   GET /api/quiz
// @access  Private
const getQuizzes = asyncHandler(async (req, res) => {
  // Finds quizzes created by the current user OR all if user is admin
  let query = {};
  if (req.user.role === 'teacher') {
    query.createdBy = req.user._id;
  }
  
  const quizzes = await Quiz.find(query).select('-questions.correctAnswerIndex').populate('createdBy', 'name role'); 
  res.status(200).json(quizzes);
});

// @desc    Get a single quiz by ID (for students to take)
// @route   GET /api/quiz/:id
// @access  Private
const getQuizById = asyncHandler(async (req, res) => {
  // Do not expose answers (correctAnswerIndex) to the student
  const quiz = await Quiz.findById(req.params.id).select('-questions.correctAnswerIndex').populate('createdBy', 'name');

  if (quiz) {
    res.status(200).json(quiz);
  } else {
    res.status(404);
    throw new Error('Quiz not found');
  }
});

// @desc    Create a new quiz
// @route   POST /api/quiz
// @access  Private/Teacher/Admin
const createQuiz = asyncHandler(async (req, res) => {
  const { title, questions, xpReward } = req.body;

  if (!title || !questions || questions.length === 0) {
    res.status(400);
    throw new Error('Please include a title and at least one question.');
  }
  
  // Basic validation that questions array contains objects with necessary keys
  const isValidQuestions = questions.every(q => q.questionText && q.options && q.correctAnswerIndex !== undefined);
  if (!isValidQuestions) {
      res.status(400);
      throw new Error('Invalid question structure detected.');
  }

  const quiz = new Quiz({
    title,
    questions,
    xpReward: xpReward || 50,
    createdBy: req.user._id, 
  });

  const createdQuiz = await quiz.save();
  res.status(201).json(createdQuiz);
});

// @desc    Update a quiz by ID
// @route   PUT /api/quiz/:id
// @access  Private/Teacher/Admin
const updateQuiz = asyncHandler(async (req, res) => {
    const { title, questions, xpReward } = req.body;

    const quiz = await Quiz.findById(req.params.id);

    if (quiz) {
        // Check if the current user is the creator or an admin
        const isCreatorOrAdmin = quiz.createdBy.equals(req.user._id) || req.user.role === 'admin';
        
        if (!isCreatorOrAdmin) {
            res.status(403);
            throw new Error('Not authorized to update this quiz.');
        }

        quiz.title = title || quiz.title;
        quiz.xpReward = xpReward || quiz.xpReward;
        
        // Overwrite entire questions array if provided
        if (questions && questions.length > 0) {
            const isValidQuestions = questions.every(q => q.questionText && q.options && q.correctAnswerIndex !== undefined);
            if (!isValidQuestions) {
                res.status(400);
                throw new Error('Invalid question structure for update.');
            }
            quiz.questions = questions;
        }

        const updatedQuiz = await quiz.save();
        res.status(200).json({ 
            message: 'Quiz updated successfully', 
            quiz: updatedQuiz 
        });

    } else {
        res.status(404);
        throw new Error('Quiz not found');
    }
});

// @desc    Delete a quiz by ID
// @route   DELETE /api/quiz/:id
// @access  Private/Teacher/Admin
const deleteQuiz = asyncHandler(async (req, res) => {
    const quiz = await Quiz.findById(req.params.id);

    if (quiz) {
        const isCreatorOrAdmin = quiz.createdBy.equals(req.user._id) || req.user.role === 'admin';
        
        if (!isCreatorOrAdmin) {
            res.status(403);
            throw new Error('Not authorized to delete this quiz.');
        }
        
        await Quiz.deleteOne({ _id: req.params.id }); 
        res.status(200).json({ message: 'Quiz removed successfully' });
    } else {
        res.status(404);
        throw new Error('Quiz not found');
    }
});


module.exports = {
  getQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
};

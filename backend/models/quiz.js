// EduQuest/backend/models/Quiz.js

const mongoose = require('mongoose');

// Define a Sub-Schema for Questions
const questionSchema = mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswerIndex: { type: Number, required: true }, // Index of the correct option in the options array
});

const quizSchema = mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    
    // Array of questions using the sub-schema
    questions: [questionSchema], 
    
    xpReward: { type: Number, default: 50 }, // XP awarded for completing the quiz
    
    // Reference to the Teacher/Admin who created the quiz
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', 
    },
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;

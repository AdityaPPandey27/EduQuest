// EduQuest/backend/models/User.js (UPDATED)

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    
    // Core Role for Access Control
    role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
    
    // Gamification & Profile Fields
    xp: { type: Number, default: 0 },         // Experience Points
    level: { type: Number, default: 1 },      // Current Level
    streak: { type: Number, default: 0 },     // Daily login/activity streak
    avatar: { type: String, default: 'default_avatar.png' }, // Profile picture URL or path
    
    // References to other collections
    badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }], // Array of earned badges
    
  },
  {
    timestamps: true,
  }
);

// --- Pre-save Hook for Password Hashing (Unchanged) ---
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// --- Method to Compare Entered Password (Unchanged) ---
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;

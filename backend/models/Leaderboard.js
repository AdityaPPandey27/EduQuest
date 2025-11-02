// EduQuest/backend/models/Leaderboard.js

const mongoose = require('mongoose');

const leaderboardSchema = mongoose.Schema(
  {
    // Reference to the user who holds this rank
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      unique: true // Each user only appears once in the leaderboard
    },
    
    // XP is copied here but kept in sync with the User model for quick sorting
    xp: { type: Number, required: true, default: 0 }, 
    
    // Rank can be computed at query time or stored here
    rank: { type: Number, default: 0 },
    
    // Snapshot date, useful if you track weekly/monthly leaderboards
    snapshotDate: {
        type: Date,
        default: Date.now,
    }
  },
  {
    timestamps: true,
  }
);

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
module.exports = Leaderboard;

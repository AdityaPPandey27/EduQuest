// EduQuest/backend/models/Mission.js

const mongoose = require('mongoose');

const missionSchema = mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    xpReward: { type: Number, default: 100 },
    
    // Duration in days (e.g., 7 days)
    duration: { type: Number, default: 7 }, 
    
    // Optional: Array to track users who have started or are participating
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
    
    // Status to indicate if the mission is active
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Mission = mongoose.model('Mission', missionSchema);
module.exports = Mission;

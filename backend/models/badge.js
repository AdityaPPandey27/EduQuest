// EduQuest/backend/models/Badge.js

const mongoose = require('mongoose');

const badgeSchema = mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    icon: { type: String, default: 'star' }, // e.g., 'star', 'trophy', or an icon URL
    description: { type: String, required: true },
    
    // Describes the rule for earning the badge (e.g., "Complete 10 Quizzes", "Reach Level 5")
    condition: { type: String, required: true }, 
    
  },
  {
    timestamps: true,
  }
);

const Badge = mongoose.model('Badge', badgeSchema);
module.exports = Badge;

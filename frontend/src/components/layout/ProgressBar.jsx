import React from 'react';
import { motion } from 'framer-motion'; 

const ProgressBar = ({ currentXp, maxXp, userLevel }) => {
  const percentage = maxXp > 0 ? (currentXp / maxXp) * 100 : 0;
  const clampedPercentage = Math.min(100, Math.max(0, percentage)); 

  return (
    <div className="w-full bg-gray-300 dark:bg-dark-card/50 rounded-full h-5 relative shadow-inner">
      {/* 2. Animate the progress bar width (Framer Motion) */}
      <motion.div
        className="h-full rounded-full absolute top-0 left-0 
                   bg-gradient-to-r from-xp-start to-xp-end shadow-md" 
        initial={{ width: '0%' }}
        // Animate the width based on the XP percentage
        animate={{ width: `${clampedPercentage}%` }}
        // Smooth and satisfying bounce effect
        transition={{ duration: 1.5, type: 'spring', bounce: 0.3 }} 
      />
      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
        Level {userLevel || 1}: {currentXp} / {maxXp} XP
      </div>
    </div>
  );
};

export default ProgressBar;
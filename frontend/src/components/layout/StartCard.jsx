import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; 

const StartCard = ({ title, description, linkTo, ctaText, children }) => {
  return (
    // 1. Add Gradient Background and Hover Effects
    <motion.div
        className="
            relative p-6 rounded-xl overflow-hidden shadow-xl transition-all duration-300 
            cursor-pointer 
            // Hover: subtle scale, lift, and shadow color change
            transform hover:scale-[1.03] hover:shadow-primary-blue/50 dark:hover:shadow-secondary-blue/50
            // Dynamic Gradient Background (Light/Dark Mode)
            bg-gradient-to-br from-light-card to-gray-50 text-gray-800
            dark:from-dark-card dark:to-dark-card/90 dark:text-white
        "
        whileHover={{ translateY: -8 }} // Stronger lift for a clear effect
    >
      <h3 className="text-xl font-bold mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {description}
      </p>
      
      {children}

      <Link
        to={linkTo}
        className="mt-4 inline-block px-4 py-2 text-sm font-semibold 
                   rounded-lg text-white transition-all duration-300 
                   // Gradient CTA Button
                   bg-gradient-to-r from-primary-blue to-secondary-blue 
                   hover:from-secondary-blue hover:to-primary-blue 
                   shadow-md hover:shadow-lg"
      >
        {ctaText}
      </Link>
        
    </motion.div>
  );
};

export default StartCard;
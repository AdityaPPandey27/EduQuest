import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react'; 
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-colors duration-300 shadow-lg border border-gray-200 
                 dark:bg-dark-card dark:text-yellow-400 bg-white text-primary-blue 
                 focus:outline-none focus:ring-4 focus:ring-primary-blue/30 dark:focus:ring-yellow-400/30"
      // Custom Animation for the toggle button
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon size={20} />
      ) : (
        <Sun size={20} />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
import React from 'react';
import { motion } from 'framer-motion';

// 4. Component to wrap individual routes for smooth transitions
const PageTransition = ({ children }) => {
  const transitionVariants = {
    initial: {
      opacity: 0,
      y: 10,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -10,
    },
  };

  return (
    <motion.div
      variants={transitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: 'easeOut', duration: 0.5 }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
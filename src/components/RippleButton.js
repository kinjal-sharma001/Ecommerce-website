import React, { useState } from 'react';
import { motion } from 'framer-motion';

const RippleButton = ({ children, className = '', onClick, ...props }) => {
  const [ripples, setRipples] = useState([]);

  const addRipple = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const newRipple = {
      x,
      y,
      size,
      id: Date.now()
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={addRipple}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {children}
      
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white bg-opacity-30 rounded-full pointer-events-none"
          initial={{ 
            x: ripple.x, 
            y: ripple.y, 
            width: 0, 
            height: 0 
          }}
          animate={{ 
            width: ripple.size, 
            height: ripple.size,
            x: ripple.x - ripple.size / 2,
            y: ripple.y - ripple.size / 2,
            opacity: 0
          }}
          transition={{ 
            duration: 0.6,
            ease: "easeOut"
          }}
        />
      ))}
    </motion.button>
  );
};

export default RippleButton;


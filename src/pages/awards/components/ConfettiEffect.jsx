import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ConfettiEffect = ({ trigger, duration = 3000 }) => {
  const [isActive, setIsActive] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);

  useEffect(() => {
    if (trigger) {
      setIsActive(true);
      
      // Generate confetti pieces
      const pieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        rotation: Math.random() * 360,
        color: [
          '#00FFE0', // primary
          '#FF007F', // accent
          '#FFD700', // gold
          '#FF6B6B', // red
          '#4ECDC4', // teal
          '#45B7D1', // blue
          '#96CEB4', // green
          '#FFEAA7'  // yellow
        ]?.[Math.floor(Math.random() * 8)],
        size: Math.random() * 8 + 4,
        velocityX: (Math.random() - 0.5) * 4,
        velocityY: Math.random() * 3 + 2,
        rotationSpeed: (Math.random() - 0.5) * 10
      }));
      
      setConfettiPieces(pieces);

      // Auto cleanup
      const timer = setTimeout(() => {
        setIsActive(false);
        setConfettiPieces([]);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [trigger, duration]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {confettiPieces?.map((piece) => (
          <motion.div
            key={piece?.id}
            className="absolute rounded-full"
            style={{
              backgroundColor: piece?.color,
              width: piece?.size,
              height: piece?.size,
              left: piece?.x,
              top: piece?.y,
            }}
            initial={{
              y: -10,
              x: piece?.x,
              rotate: piece?.rotation,
              opacity: 1,
            }}
            animate={{
              y: window.innerHeight + 50,
              x: piece?.x + piece?.velocityX * 100,
              rotate: piece?.rotation + piece?.rotationSpeed * 100,
              opacity: [1, 1, 0.8, 0],
            }}
            transition={{
              duration: duration / 1000,
              ease: "easeOut",
            }}
            exit={{ opacity: 0 }}
          />
        ))}
      </AnimatePresence>
      {/* Additional sparkle effects */}
      <AnimatePresence>
        {isActive && Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              left: Math.random() * window.innerWidth,
              top: Math.random() * window.innerHeight,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 2,
              delay: Math.random() * 1,
              repeat: 2,
            }}
          >
            <div className="w-2 h-2 bg-primary rounded-full glow-primary" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ConfettiEffect;
import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TimelineScrubber = ({ experiences, activeIndex, onNavigate }) => {
  const handleScrubberClick = (index) => {
    onNavigate(index);
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 hidden lg:block">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel px-6 py-4 rounded-full"
      >
        <div className="flex items-center space-x-4">
          {/* Previous Button */}
          <button
            onClick={() => onNavigate(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Icon name="ChevronLeft" size={16} />
          </button>

          {/* Timeline Dots */}
          <div className="flex items-center space-x-2">
            {experiences?.map((experience, index) => (
              <motion.button
                key={experience?.id}
                onClick={() => handleScrubberClick(index)}
                className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-primary scale-125' 
                    : index < activeIndex 
                      ? 'bg-success-green' :'bg-surface hover:bg-primary/30'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Active indicator */}
                {index === activeIndex && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                      boxShadow: '0 0 10px rgba(0, 255, 224, 0.5)'
                    }}
                  />
                )}
                
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-text-primary whitespace-nowrap">
                    {experience?.title}
                    <div className="text-xs text-text-secondary">{experience?.organization}</div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => onNavigate(Math.min(experiences?.length - 1, activeIndex + 1))}
            disabled={activeIndex === experiences?.length - 1}
            className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 w-full h-1 bg-surface rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((activeIndex + 1) / experiences?.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Current Position Info */}
        <div className="mt-2 text-center">
          <span className="text-xs text-text-secondary">
            {activeIndex + 1} of {experiences?.length}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default TimelineScrubber;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const AchievementBadges = ({ achievements }) => {
  const [unlockedBadges, setUnlockedBadges] = useState(new Set());
  const [selectedBadge, setSelectedBadge] = useState(null);

  const handleBadgeClick = (achievement) => {
    if (!unlockedBadges?.has(achievement?.id)) {
      setUnlockedBadges(prev => new Set([...prev, achievement.id]));
    }
    setSelectedBadge(achievement);
  };

  const getBadgeColor = (category) => {
    switch (category) {
      case 'hackathon': return 'from-accent to-primary';
      case 'academic': return 'from-primary to-success-green';
      case 'leadership': return 'from-success-green to-accent';
      case 'research': return 'from-primary to-accent';
      case 'startup': return 'from-accent to-success-green';
      default: return 'from-text-secondary to-primary';
    }
  };

  const getBadgeIcon = (category) => {
    switch (category) {
      case 'hackathon': return 'Trophy';
      case 'academic': return 'GraduationCap';
      case 'leadership': return 'Crown';
      case 'research': return 'BookOpen';
      case 'startup': return 'Rocket';
      default: return 'Award';
    }
  };

  return (
    <>
      <div className="glass-panel rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
            <Icon name="Award" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-xl font-space-grotesk font-bold text-text-primary">Achievement Vault</h3>
            <p className="text-text-secondary text-sm">Click badges to unlock details</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {achievements?.map((achievement, index) => {
            const isUnlocked = unlockedBadges?.has(achievement?.id);
            
            return (
              <motion.div
                key={achievement?.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative group cursor-pointer"
                onClick={() => handleBadgeClick(achievement)}
              >
                <motion.div
                  className={`
                    relative w-20 h-20 mx-auto rounded-full flex items-center justify-center
                    bg-gradient-to-br ${getBadgeColor(achievement?.category)}
                    ${isUnlocked ? 'opacity-100' : 'opacity-40 grayscale'}
                    transition-all duration-300 group-hover:scale-110
                  `}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={isUnlocked ? {
                    boxShadow: [
                      '0 0 20px rgba(0, 255, 224, 0.3)',
                      '0 0 30px rgba(255, 0, 127, 0.4)',
                      '0 0 20px rgba(0, 255, 224, 0.3)'
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Icon 
                    name={getBadgeIcon(achievement?.category)} 
                    size={24} 
                    className="text-white drop-shadow-lg" 
                  />
                  
                  {/* Unlock Animation */}
                  <AnimatePresence>
                    {isUnlocked && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 rounded-full border-2 border-primary"
                      />
                    )}
                  </AnimatePresence>

                  {/* Rarity Indicator */}
                  {achievement?.rarity && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                      <span className="text-xs text-white font-bold">
                        {achievement?.rarity === 'legendary' ? '★' : achievement?.rarity === 'rare' ? '◆' : '●'}
                      </span>
                    </div>
                  )}
                </motion.div>
                {/* Badge Title */}
                <div className="mt-2 text-center">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {achievement?.title}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {achievement?.year}
                  </p>
                </div>
                {/* Hover Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                  <div className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-text-primary whitespace-nowrap shadow-lg">
                    {achievement?.title}
                    <div className="text-xs text-text-secondary">{achievement?.organization}</div>
                  </div>
                </div>
                {/* Lock Overlay */}
                {!isUnlocked && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon name="Lock" size={16} className="text-text-secondary" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Progress Stats */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{unlockedBadges?.size}</div>
              <div className="text-sm text-text-secondary">Unlocked</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">{achievements?.length}</div>
              <div className="text-sm text-text-secondary">Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success-green">
                {Math.round((unlockedBadges?.size / achievements?.length) * 100)}%
              </div>
              <div className="text-sm text-text-secondary">Complete</div>
            </div>
          </div>
        </div>
      </div>
      {/* Badge Detail Modal */}
      <AnimatePresence>
        {selectedBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedBadge(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass-panel rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e?.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${getBadgeColor(selectedBadge?.category)} flex items-center justify-center mb-4 glow-primary`}>
                  <Icon name={getBadgeIcon(selectedBadge?.category)} size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-space-grotesk font-bold text-text-primary mb-2">
                  {selectedBadge?.title}
                </h3>
                <p className="text-primary font-medium">{selectedBadge?.organization}</p>
                <p className="text-text-secondary text-sm">{selectedBadge?.year}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-text-primary mb-2">Description</h4>
                  <p className="text-text-secondary text-sm">{selectedBadge?.description}</p>
                </div>

                {selectedBadge?.impact && (
                  <div>
                    <h4 className="font-semibold text-text-primary mb-2">Impact</h4>
                    <p className="text-text-secondary text-sm">{selectedBadge?.impact}</p>
                  </div>
                )}

                {selectedBadge?.skills && (
                  <div>
                    <h4 className="font-semibold text-text-primary mb-2">Skills Demonstrated</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedBadge?.skills?.map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedBadge(null)}
                className="mt-6 w-full py-2 bg-surface hover:bg-primary/10 text-text-primary rounded-lg transition-colors duration-200"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AchievementBadges;
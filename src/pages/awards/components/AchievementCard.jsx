import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AchievementCard = ({ achievement, index, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'academic': return 'GraduationCap';
      case 'competition': return 'Trophy';
      case 'professional': return 'Award';
      case 'community': return 'Users';
      default: return 'Star';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'academic': return 'text-blue-400 bg-blue-400/10';
      case 'competition': return 'text-yellow-400 bg-yellow-400/10';
      case 'professional': return 'text-green-400 bg-green-400/10';
      case 'community': return 'text-purple-400 bg-purple-400/10';
      default: return 'text-primary bg-primary/10';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="glass-panel p-6 rounded-xl hover:glow-primary transition-all duration-300 h-full">
        {/* Achievement Image */}
        <div className="relative mb-4 overflow-hidden rounded-lg">
          <Image
            src={achievement?.image}
            alt={achievement?.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
          
          {/* Category Badge */}
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(achievement?.category)}`}>
            <Icon name={getCategoryIcon(achievement?.category)} size={12} className="inline mr-1" />
            {achievement?.category?.charAt(0)?.toUpperCase() + achievement?.category?.slice(1)}
          </div>

          {/* Year Badge */}
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-background/80 text-primary text-xs font-medium">
            {achievement?.year}
          </div>
        </div>

        {/* Achievement Content */}
        <div className="space-y-3">
          <h3 className="text-xl font-space-grotesk font-bold text-text-primary group-hover:text-primary transition-colors duration-300">
            {achievement?.title}
          </h3>
          
          <p className="text-text-secondary text-sm line-clamp-2">
            {achievement?.description}
          </p>

          {/* Achievement Details */}
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span className="flex items-center">
              <Icon name="MapPin" size={12} className="mr-1" />
              {achievement?.location}
            </span>
            {achievement?.rank && (
              <span className="flex items-center text-primary">
                <Icon name="Medal" size={12} className="mr-1" />
                {achievement?.rank}
              </span>
            )}
          </div>

          {/* Impact Metrics */}
          {achievement?.metrics && (
            <div className="flex items-center space-x-4 text-xs">
              {achievement?.metrics?.participants && (
                <span className="flex items-center text-text-secondary">
                  <Icon name="Users" size={12} className="mr-1" />
                  {achievement?.metrics?.participants} participants
                </span>
              )}
              {achievement?.metrics?.prize && (
                <span className="flex items-center text-green-400">
                  <Icon name="DollarSign" size={12} className="mr-1" />
                  {achievement?.metrics?.prize}
                </span>
              )}
            </div>
          )}

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onViewDetails(achievement)}
            className="w-full mt-4 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center"
          >
            <Icon name="Eye" size={14} className="mr-2" />
            View Details
          </motion.button>
        </div>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
      </div>
    </motion.div>
  );
};

export default AchievementCard;
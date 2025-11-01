import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrophyCarousel = ({ achievements }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const featuredAchievements = achievements?.filter(achievement => achievement?.featured);

  useEffect(() => {
    if (!isAutoPlaying || featuredAchievements?.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredAchievements?.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredAchievements?.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredAchievements?.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredAchievements?.length) % featuredAchievements?.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  if (featuredAchievements?.length === 0) return null;

  const currentAchievement = featuredAchievements?.[currentIndex];

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Main Carousel */}
      <div className="relative h-96 overflow-hidden rounded-2xl glass-panel">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex items-center space-x-8 px-8">
              {/* Trophy Animation */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
                className="flex-shrink-0"
              >
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center glow-accent">
                    <Icon name="Trophy" size={64} className="text-yellow-900" />
                  </div>
                  
                  {/* Floating Particles */}
                  {[...Array(6)]?.map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                      animate={{
                        y: [-10, -30, -10],
                        x: [0, Math.sin(i) * 20, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Achievement Details */}
              <div className="flex-1 space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                      {currentAchievement?.category?.charAt(0)?.toUpperCase() + currentAchievement?.category?.slice(1)}
                    </span>
                    <span className="text-text-secondary text-sm">{currentAchievement?.year}</span>
                  </div>
                  
                  <h3 className="text-3xl font-space-grotesk font-bold text-text-primary mb-2">
                    {currentAchievement?.title}
                  </h3>
                  
                  <p className="text-text-secondary text-lg leading-relaxed">
                    {currentAchievement?.description}
                  </p>

                  {/* Achievement Stats */}
                  <div className="flex items-center space-x-6 mt-4">
                    {currentAchievement?.rank && (
                      <div className="flex items-center text-primary">
                        <Icon name="Medal" size={16} className="mr-2" />
                        <span className="font-medium">{currentAchievement?.rank}</span>
                      </div>
                    )}
                    <div className="flex items-center text-text-secondary">
                      <Icon name="MapPin" size={16} className="mr-2" />
                      <span>{currentAchievement?.location}</span>
                    </div>
                    {currentAchievement?.metrics?.participants && (
                      <div className="flex items-center text-text-secondary">
                        <Icon name="Users" size={16} className="mr-2" />
                        <span>{currentAchievement?.metrics?.participants} participants</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {featuredAchievements?.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-background/80 hover:bg-background text-text-primary hover:text-primary backdrop-blur-sm"
            >
              <Icon name="ChevronLeft" size={24} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-background/80 hover:bg-background text-text-primary hover:text-primary backdrop-blur-sm"
            >
              <Icon name="ChevronRight" size={24} />
            </Button>
          </>
        )}

        {/* Auto-play Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute top-4 right-4 w-10 h-10 bg-background/80 hover:bg-background text-text-secondary hover:text-primary backdrop-blur-sm"
        >
          <Icon name={isAutoPlaying ? "Pause" : "Play"} size={16} />
        </Button>
      </div>
      {/* Carousel Indicators */}
      {featuredAchievements?.length > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          {featuredAchievements?.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary glow-primary' :'bg-text-secondary/30 hover:bg-text-secondary/50'
              }`}
            />
          ))}
        </div>
      )}
      {/* Progress Bar */}
      {isAutoPlaying && featuredAchievements?.length > 1 && (
        <div className="w-full bg-text-secondary/20 rounded-full h-1 mt-4 overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 4, ease: "linear" }}
            key={currentIndex}
          />
        </div>
      )}
    </div>
  );
};

export default TrophyCarousel;
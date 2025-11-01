import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const AchievementTimeline = ({ achievements }) => {
  const [selectedYear, setSelectedYear] = useState(null);

  // Group achievements by year
  const achievementsByYear = achievements?.reduce((acc, achievement) => {
    const year = achievement?.year;
    if (!acc?.[year]) {
      acc[year] = [];
    }
    acc?.[year]?.push(achievement);
    return acc;
  }, {});

  const years = Object.keys(achievementsByYear)?.sort((a, b) => b - a);

  const getTimelineIcon = (category) => {
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
      case 'academic': return 'border-blue-400 bg-blue-400';
      case 'competition': return 'border-yellow-400 bg-yellow-400';
      case 'professional': return 'border-green-400 bg-green-400';
      case 'community': return 'border-purple-400 bg-purple-400';
      default: return 'border-primary bg-primary';
    }
  };

  return (
    <div className="relative">
      <h3 className="text-2xl font-space-grotesk font-bold text-text-primary mb-8 text-center">
        Achievement Timeline
      </h3>
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary opacity-30"></div>

        {/* Timeline Items */}
        <div className="space-y-8">
          {years?.map((year, yearIndex) => (
            <motion.div
              key={year}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: yearIndex * 0.1, duration: 0.6 }}
              className="relative"
            >
              {/* Year Marker */}
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground font-space-grotesk font-bold text-lg glow-primary relative z-10">
                  {year}
                </div>
                <div className="ml-4 flex-1 h-0.5 bg-gradient-to-r from-primary/50 to-transparent"></div>
              </div>

              {/* Achievements for this year */}
              <div className="ml-20 space-y-4">
                {achievementsByYear?.[year]?.map((achievement, index) => (
                  <motion.div
                    key={achievement?.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (yearIndex * 0.1) + (index * 0.05), duration: 0.4 }}
                    className="glass-panel p-4 rounded-lg hover:glow-primary transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedYear(selectedYear === achievement?.id ? null : achievement?.id)}
                  >
                    <div className="flex items-start space-x-4">
                      {/* Achievement Icon */}
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${getCategoryColor(achievement?.category)}`}>
                        <Icon name={getTimelineIcon(achievement?.category)} size={16} className="text-white" />
                      </div>

                      {/* Achievement Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-space-grotesk font-semibold text-text-primary">
                            {achievement?.title}
                          </h4>
                          <Icon 
                            name={selectedYear === achievement?.id ? "ChevronUp" : "ChevronDown"} 
                            size={16} 
                            className="text-text-secondary" 
                          />
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-text-secondary mb-2">
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
                          <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                            {achievement?.category}
                          </span>
                        </div>

                        <p className="text-text-secondary text-sm">
                          {achievement?.description}
                        </p>

                        {/* Expanded Details */}
                        {selectedYear === achievement?.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 pt-4 border-t border-border"
                          >
                            {achievement?.details && (
                              <p className="text-text-secondary text-sm mb-3">
                                {achievement?.details}
                              </p>
                            )}

                            {achievement?.metrics && (
                              <div className="flex flex-wrap gap-4 text-xs">
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
                                {achievement?.metrics?.duration && (
                                  <span className="flex items-center text-text-secondary">
                                    <Icon name="Clock" size={12} className="mr-1" />
                                    {achievement?.metrics?.duration}
                                  </span>
                                )}
                              </div>
                            )}

                            {achievement?.links && achievement?.links?.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {achievement?.links?.map((link, linkIndex) => (
                                  <a
                                    key={linkIndex}
                                    href={link?.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-3 py-1 bg-primary/10 hover:bg-primary/20 text-primary rounded-full text-xs transition-colors duration-300"
                                  >
                                    <Icon name="ExternalLink" size={10} className="mr-1" />
                                    {link?.label}
                                  </a>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementTimeline;
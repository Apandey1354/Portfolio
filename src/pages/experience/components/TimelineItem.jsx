import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TimelineItem = ({ experience, index, isActive, onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    onToggle(experience?.id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'current': return 'text-primary bg-primary/20 border-primary/30';
      case 'completed': return 'text-success-green bg-success-green/20 border-success-green/30';
      case 'milestone': return 'text-accent bg-accent/20 border-accent/30';
      default: return 'text-text-secondary bg-surface/20 border-border';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'education': return 'GraduationCap';
      case 'work': return 'Briefcase';
      case 'startup': return 'Rocket';
      case 'hackathon': return 'Trophy';
      case 'research': return 'BookOpen';
      default: return 'Circle';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative min-w-80 lg:min-w-96"
    >
      {/* Timeline Node */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${getStatusColor(experience?.status)}`}
          whileHover={{ scale: 1.2 }}
          animate={isActive ? { scale: 1.1, boxShadow: '0 0 20px rgba(0, 255, 224, 0.3)' } : {}}
        >
          <Icon name={getTypeIcon(experience?.type)} size={12} />
        </motion.div>
      </div>
      {/* Main Card */}
      <motion.div
        className={`glass-panel rounded-xl p-6 mt-6 cursor-pointer transition-all duration-300 ${
          isActive ? 'glow-primary border-primary/50' : 'hover:glow-primary hover:border-primary/30'
        }`}
        onClick={handleExpand}
        whileHover={{ y: -5 }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(experience?.status)}`}>
                {experience?.status?.toUpperCase()}
              </span>
              <span className="text-text-secondary text-sm">{experience?.duration}</span>
            </div>
            <h3 className="text-xl font-space-grotesk font-bold text-text-primary mb-1">
              {experience?.title}
            </h3>
            <p className="text-primary font-medium">{experience?.organization}</p>
            <p className="text-text-secondary text-sm">{experience?.location}</p>
          </div>
          
          {experience?.logo && (
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface flex-shrink-0">
              <Image 
                src={experience?.logo} 
                alt={`${experience?.organization} logo`}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Quick Summary */}
        <p className="text-text-secondary mb-4 line-clamp-2">
          {experience?.summary}
        </p>

        {/* Key Metrics */}
        {experience?.metrics && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            {experience?.metrics?.map((metric, idx) => (
              <div key={idx} className="text-center">
                <div className="text-2xl font-bold text-primary">{metric?.value}</div>
                <div className="text-xs text-text-secondary">{metric?.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Technologies */}
        {experience?.technologies && (
          <div className="flex flex-wrap gap-2 mb-4">
            {experience?.technologies?.slice(0, 4)?.map((tech, idx) => (
              <span key={idx} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                {tech}
              </span>
            ))}
            {experience?.technologies?.length > 4 && (
              <span className="px-2 py-1 bg-surface text-text-secondary text-xs rounded-full">
                +{experience?.technologies?.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Expand Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {experience?.achievements && (
              <div className="flex items-center space-x-1">
                <Icon name="Award" size={16} className="text-accent" />
                <span className="text-sm text-text-secondary">{experience?.achievements?.length} achievements</span>
              </div>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            className="text-primary hover:bg-primary/10"
          >
            {isExpanded ? "Less" : "More"}
          </Button>
        </div>

        {/* Expanded Content */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          {isExpanded && (
            <div className="pt-6 border-t border-border mt-6">
              {/* Detailed Description */}
              <div className="mb-6">
                <h4 className="text-lg font-space-grotesk font-semibold text-text-primary mb-3">Mission Details</h4>
                <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                  {experience?.description}
                </p>
              </div>

              {/* Key Responsibilities */}
              {experience?.responsibilities && (
                <div className="mb-6">
                  <h4 className="text-lg font-space-grotesk font-semibold text-text-primary mb-3">Key Responsibilities</h4>
                  <ul className="space-y-2">
                    {experience?.responsibilities?.map((responsibility, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <Icon name="ArrowRight" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-text-secondary">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Achievements */}
              {experience?.achievements && (
                <div className="mb-6">
                  <h4 className="text-lg font-space-grotesk font-semibold text-text-primary mb-3">Achievements</h4>
                  <div className="grid gap-3">
                    {experience?.achievements?.map((achievement, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start space-x-3 p-3 bg-success-green/5 border border-success-green/20 rounded-lg"
                      >
                        <Icon name="Trophy" size={16} className="text-success-green mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-text-primary font-medium">{achievement?.title}</p>
                          <p className="text-text-secondary text-sm">{achievement?.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* All Technologies */}
              {experience?.technologies && (
                <div className="mb-6">
                  <h4 className="text-lg font-space-grotesk font-semibold text-text-primary mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {experience?.technologies?.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Testimonials */}
              {experience?.testimonials && (
                <div className="mb-6">
                  <h4 className="text-lg font-space-grotesk font-semibold text-text-primary mb-3">Testimonials</h4>
                  <div className="space-y-4">
                    {experience?.testimonials?.map((testimonial, idx) => (
                      <div key={idx} className="p-4 bg-surface/30 rounded-lg border border-border">
                        <p className="text-text-secondary italic mb-3">"{testimonial?.quote}"</p>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <Icon name="User" size={16} className="text-primary" />
                          </div>
                          <div>
                            <p className="text-text-primary font-medium text-sm">{testimonial?.author}</p>
                            <p className="text-text-secondary text-xs">{testimonial?.position}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              {experience?.links && (
                <div className="flex flex-wrap gap-3">
                  {experience?.links?.map((link, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      iconName={link?.icon}
                      iconPosition="left"
                      className="text-primary border-primary/30 hover:bg-primary/10"
                      onClick={(e) => {
                        e?.stopPropagation();
                        window.open(link?.url, '_blank');
                      }}
                    >
                      {link?.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default TimelineItem;
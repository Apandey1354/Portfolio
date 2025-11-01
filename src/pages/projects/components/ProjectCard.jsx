import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onViewDetails, onCompare, isSelected, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`
        relative group glass-panel rounded-xl overflow-hidden
        transition-all duration-500 hover:scale-105 hover:glow-primary
        ${isSelected ? 'ring-2 ring-primary glow-primary' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Holographic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project?.image}
          alt={project?.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Status Badge */}
        <div className={`
          absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium
          ${project?.status === 'Live' ? 'bg-success/20 text-success border border-success/30' :
            project?.status === 'In Progress'? 'bg-warning/20 text-warning border border-warning/30' : 'bg-primary/20 text-primary border border-primary/30'
          }
        `}>
          {project?.status}
        </div>

        {/* Complexity Indicator */}
        <div className="absolute top-4 left-4 flex space-x-1">
          {[...Array(5)]?.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < project?.complexity 
                  ? 'bg-primary glow-primary' :'bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Hover Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center space-x-3"
        >
          <Button
            variant="default"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            onClick={() => onViewDetails(project)}
            className="glow-primary"
          >
            View Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="GitBranch"
            iconPosition="left"
            onClick={() => window.open(project?.githubUrl, '_blank')}
          >
            GitHub
          </Button>
          
        </motion.div>
      </div>
      {/* Project Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-space-grotesk font-bold text-text-primary group-hover:text-primary transition-colors">
            {project?.title}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            iconName={isSelected ? "Check" : "Plus"}
            onClick={() => onCompare(project)}
            className={`
              transition-all duration-300
              ${isSelected ? 'text-primary bg-primary/10' : 'text-text-secondary hover:text-primary'}
            `}
          />
        </div>

        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
          {project?.description}
        </p>

        {/* Technology Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project?.technologies?.slice(0, 4)?.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md border border-primary/20"
            >
              {tech}
            </span>
          ))}
          {project?.technologies?.length > 4 && (
            <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-md">
              +{project?.technologies?.length - 4} more
            </span>
          )}
        </div>

        {/* Project Stats */}
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-warning" />
              <span>{project?.stars}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="GitFork" size={14} />
              <span>{project?.forks}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} />
              <span>{project?.teamSize}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={14} />
            <span>{project?.year}</span>
          </div>
        </div>

        {/* Impact Metrics */}
        {project?.impact && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary">Impact Score</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                    style={{ width: `${project?.impact}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-primary">{project?.impact}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Particle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {isHovered && (
          <>
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary rounded-full animate-particle-float"></div>
            <div className="absolute top-3/4 right-1/3 w-0.5 h-0.5 bg-accent rounded-full animate-particle-float" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-primary/50 rounded-full animate-particle-float" style={{ animationDelay: '1s' }}></div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
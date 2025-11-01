import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ProjectStats = ({ projects, filteredProjects }) => {
  const [animatedStats, setAnimatedStats] = useState({
    totalProjects: 0,
    totalStars: 0,
    totalForks: 0,
    avgImpact: 0
  });

  const stats = {
    totalProjects: filteredProjects?.length,
    totalStars: filteredProjects?.reduce((sum, project) => sum + project?.stars, 0),
    totalForks: filteredProjects?.reduce((sum, project) => sum + project?.forks, 0),
    avgImpact: Math.round(filteredProjects?.reduce((sum, project) => sum + project?.impact, 0) / filteredProjects?.length) || 0
  };

  useEffect(() => {
    const animateValue = (start, end, duration, callback) => {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (end - start) * progress);
        callback(current);
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    };

    // Animate each stat
    animateValue(animatedStats?.totalProjects, stats?.totalProjects, 1000, (value) => {
      setAnimatedStats(prev => ({ ...prev, totalProjects: value }));
    });
    
    animateValue(animatedStats?.totalStars, stats?.totalStars, 1200, (value) => {
      setAnimatedStats(prev => ({ ...prev, totalStars: value }));
    });
    
    animateValue(animatedStats?.totalForks, stats?.totalForks, 1400, (value) => {
      setAnimatedStats(prev => ({ ...prev, totalForks: value }));
    });
    
    animateValue(animatedStats?.avgImpact, stats?.avgImpact, 1600, (value) => {
      setAnimatedStats(prev => ({ ...prev, avgImpact: value }));
    });
  }, [filteredProjects]);

  const statItems = [
    {
      label: 'Total Projects',
      value: animatedStats?.totalProjects,
      icon: 'Folder',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20'
    },
    {
      label: 'GitHub Stars',
      value: animatedStats?.totalStars,
      icon: 'Star',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20'
    },
    {
      label: 'Total Forks',
      value: animatedStats?.totalForks,
      icon: 'GitFork',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/20'
    },
    {
      label: 'Avg Impact',
      value: `${animatedStats?.avgImpact}%`,
      icon: 'TrendingUp',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statItems?.map((stat, index) => (
        <motion.div
          key={stat?.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`
            glass-panel rounded-xl p-4 text-center transition-all duration-300
            hover:scale-105 hover:glow-primary
            ${stat?.bgColor} ${stat?.borderColor} border
          `}
        >
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-3 ${stat?.bgColor}`}>
            <Icon name={stat?.icon} size={24} className={stat?.color} />
          </div>
          <div className={`text-2xl font-bold font-space-grotesk mb-1 ${stat?.color}`}>
            {stat?.value}
          </div>
          <div className="text-text-secondary text-sm">
            {stat?.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectStats;
import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SkillProgression = ({ skills }) => {
  const getSkillIcon = (category) => {
    switch (category) {
      case 'programming': return 'Code';
      case 'ai': return 'Brain';
      case 'hardware': return 'Cpu';
      case 'leadership': return 'Users';
      case 'research': return 'BookOpen';
      default: return 'Star';
    }
  };

  const getProgressColor = (level) => {
    if (level >= 90) return 'from-accent to-primary';
    if (level >= 70) return 'from-primary to-success-green';
    if (level >= 50) return 'from-success-green to-primary';
    return 'from-text-secondary to-primary';
  };

  return (
    <div className="glass-panel rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <Icon name="TrendingUp" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-space-grotesk font-bold text-text-primary">Skill Evolution</h3>
          <p className="text-text-secondary text-sm">Growth trajectory over time</p>
        </div>
      </div>
      <div className="space-y-6">
        {skills?.map((skillCategory, categoryIndex) => (
          <div key={skillCategory?.category} className="space-y-4">
            <div className="flex items-center space-x-2">
              <Icon name={getSkillIcon(skillCategory?.category)} size={18} className="text-primary" />
              <h4 className="font-space-grotesk font-semibold text-text-primary capitalize">
                {skillCategory?.category}
              </h4>
            </div>

            <div className="space-y-3">
              {skillCategory?.skills?.map((skill, skillIndex) => (
                <motion.div
                  key={skill?.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-text-primary font-medium">{skill?.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-text-secondary">{skill?.level}%</span>
                      {skill?.yearStarted && (
                        <span className="text-xs text-text-secondary bg-surface px-2 py-1 rounded-full">
                          Since {skill?.yearStarted}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative h-2 bg-surface rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${getProgressColor(skill?.level)} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill?.level}%` }}
                      transition={{ duration: 1, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                    />
                    
                    {/* Glow effect for high-level skills */}
                    {skill?.level >= 80 && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>

                  {/* Milestones */}
                  {skill?.milestones && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {skill?.milestones?.map((milestone, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) + (idx * 0.02) }}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full border border-primary/20"
                        >
                          {milestone}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Overall Progress Summary */}
      <div className="mt-8 pt-6 border-t border-border">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {Math.round(skills?.reduce((acc, cat) => acc + cat?.skills?.reduce((sum, skill) => sum + skill?.level, 0) / cat?.skills?.length, 0) / skills?.length)}%
            </div>
            <div className="text-sm text-text-secondary">Average Proficiency</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success-green">
              {skills?.reduce((acc, cat) => acc + cat?.skills?.length, 0)}
            </div>
            <div className="text-sm text-text-secondary">Skills Tracked</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillProgression;
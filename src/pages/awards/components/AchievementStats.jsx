import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const AchievementStats = ({ achievements }) => {
  // Calculate statistics
  const totalAchievements = achievements?.length;
  const competitionWins = achievements?.filter(a => a?.category === 'competition')?.length;
  const academicAwards = achievements?.filter(a => a?.category === 'academic')?.length;
  const professionalRecognitions = achievements?.filter(a => a?.category === 'professional')?.length;
  const communityImpact = achievements?.filter(a => a?.category === 'community')?.length;

  // Calculate win rate (assuming some competitions were entered but not won)
  const totalCompetitionsEntered = competitionWins * 1.5; // Mock calculation
  const winRate = Math.round((competitionWins / totalCompetitionsEntered) * 100);

  // Calculate total prize money
  const totalPrizeValue = achievements?.filter(a => a?.metrics?.prize)?.reduce((sum, a) => {
      const prizeStr = a?.metrics?.prize?.replace(/[^0-9]/g, '');
      return sum + parseInt(prizeStr || 0);
    }, 0);

  const stats = [
    {
      id: 'total',
      label: 'Total Achievements',
      value: totalAchievements,
      icon: 'Award',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'Recognitions earned across all categories'
    },
    {
      id: 'competitions',
      label: 'Competition Victories',
      value: competitionWins,
      icon: 'Trophy',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      description: 'Hackathons and coding competitions won'
    },
    {
      id: 'academic',
      label: 'Academic Excellence',
      value: academicAwards,
      icon: 'GraduationCap',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      description: 'University honors and academic achievements'
    },
    {
      id: 'winrate',
      label: 'Competition Win Rate',
      value: `${winRate}%`,
      icon: 'Target',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      description: 'Success rate in competitive events'
    },
    {
      id: 'professional',
      label: 'Professional Awards',
      value: professionalRecognitions,
      icon: 'Briefcase',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      description: 'Industry recognition and professional honors'
    },
    {
      id: 'community',
      label: 'Community Impact',
      value: communityImpact,
      icon: 'Users',
      color: 'text-pink-400',
      bgColor: 'bg-pink-400/10',
      description: 'Community service and social impact awards'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-space-grotesk font-bold text-text-primary mb-2">
          Achievement Statistics
        </h3>
        <p className="text-text-secondary">
          Quantified impact and recognition across multiple domains
        </p>
      </div>
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats?.map((stat, index) => (
          <motion.div
            key={stat?.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="glass-panel p-6 rounded-xl hover:glow-primary transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={stat?.icon} size={24} className={stat?.color} />
              </div>
              <div className="text-right">
                <div className={`text-2xl font-space-grotesk font-bold ${stat?.color}`}>
                  {stat?.value}
                </div>
              </div>
            </div>
            
            <h4 className="text-lg font-space-grotesk font-semibold text-text-primary mb-2">
              {stat?.label}
            </h4>
            
            <p className="text-text-secondary text-sm">
              {stat?.description}
            </p>
          </motion.div>
        ))}
      </div>
      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Prize Value Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="glass-panel p-6 rounded-xl"
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
              <Icon name="DollarSign" size={28} className="text-white" />
            </div>
            <div>
              <div className="text-2xl font-space-grotesk font-bold text-green-400">
                ${totalPrizeValue?.toLocaleString()}
              </div>
              <div className="text-text-primary font-medium">Total Prize Value</div>
              <div className="text-text-secondary text-sm">
                Combined monetary awards from competitions
              </div>
            </div>
          </div>
        </motion.div>

        {/* Years Active Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="glass-panel p-6 rounded-xl"
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <Icon name="Calendar" size={28} className="text-primary-foreground" />
            </div>
            <div>
              <div className="text-2xl font-space-grotesk font-bold text-primary">
                {new Date()?.getFullYear() - 2020 + 1}
              </div>
              <div className="text-text-primary font-medium">Years Active</div>
              <div className="text-text-secondary text-sm">
                Consistent achievement since 2020
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Achievement Breakdown Chart */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="glass-panel p-6 rounded-xl"
      >
        <h4 className="text-lg font-space-grotesk font-semibold text-text-primary mb-4">
          Achievement Distribution
        </h4>
        
        <div className="space-y-3">
          {[
            { label: 'Competition Victories', value: competitionWins, total: totalAchievements, color: 'bg-yellow-400' },
            { label: 'Academic Excellence', value: academicAwards, total: totalAchievements, color: 'bg-blue-400' },
            { label: 'Professional Awards', value: professionalRecognitions, total: totalAchievements, color: 'bg-purple-400' },
            { label: 'Community Impact', value: communityImpact, total: totalAchievements, color: 'bg-pink-400' }
          ]?.map((item, index) => {
            const percentage = (item?.value / item?.total) * 100;
            return (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-text-primary">{item?.label}</span>
                  <span className="text-text-secondary">{item?.value} ({Math.round(percentage)}%)</span>
                </div>
                <div className="w-full bg-surface rounded-full h-2 overflow-hidden">
                  <motion.div
                    className={`h-full ${item?.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: 1.2 + (index * 0.1), duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default AchievementStats;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CallToAction = () => {
  const [hoveredAction, setHoveredAction] = useState(null);

  const actionCards = [
    {
      id: 'projects',
      title: 'Explore Projects',
      description: 'Dive deep into innovative solutions that bridge AI, hardware, and space technology.',
      icon: 'Rocket',
      color: 'primary',
      path: '/projects',
      stats: '50+ Projects',
      gradient: 'from-primary/20 to-primary/5'
    },
    {
      id: 'experience',
      title: 'View Experience',
      description: 'Journey through my career progression from academic excellence to startup leadership.',
      icon: 'Briefcase',
      color: 'accent',
      path: '/experience',
      stats: '5+ Years',
      gradient: 'from-accent/20 to-accent/5'
    },
    {
      id: 'contact',
      title: 'Start Collaboration',
      description: 'Ready to build the future together? Let\'s discuss your next breakthrough project.',
      icon: 'MessageCircle',
      color: 'success',
      path: '/contact',
      stats: 'Available Now',
      gradient: 'from-success/20 to-success/5'
    }
  ];

  const quickLinks = [
    { name: 'Resume', icon: 'Download', action: 'download' },
    { name: 'LinkedIn', icon: 'Linkedin', action: 'external' },
    { name: 'GitHub', icon: 'Github', action: 'external' },
    { name: 'Email', icon: 'Mail', action: 'mailto' }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        text: 'text-primary',
        bg: 'bg-primary',
        border: 'border-primary',
        hover: 'hover:bg-primary/10 hover:border-primary'
      },
      accent: {
        text: 'text-accent',
        bg: 'bg-accent',
        border: 'border-accent',
        hover: 'hover:bg-accent/10 hover:border-accent'
      },
      success: {
        text: 'text-success',
        bg: 'bg-success',
        border: 'border-success',
        hover: 'hover:bg-success/10 hover:border-success'
      }
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-secondary to-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Orbital Rings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-96 border border-primary/10 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
          <div className="absolute inset-8 border border-accent/10 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
          <div className="absolute inset-16 border border-success/10 rounded-full animate-spin" style={{ animationDuration: '25s' }}></div>
        </div>

        {/* Floating Particles */}
        {[...Array(12)]?.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Icon name="Zap" size={16} className="mr-2" />
            Ready to Launch
          </div>
          <h2 className="text-4xl md:text-6xl font-space-grotesk font-bold text-text-primary mb-6">
            Let's Build the
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-success ml-3">
              Future
            </span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Whether you're looking for a technical co-founder, innovative solutions, or collaborative partnerships, 
            I'm ready to turn ambitious ideas into reality.
          </p>
        </motion.div>

        {/* Action Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {actionCards?.map((card, index) => (
            <motion.div
              key={card?.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredAction(card?.id)}
              onMouseLeave={() => setHoveredAction(null)}
              className="relative group"
            >
              <Link to={card?.path} className="block h-full">
                <div className={`
                  glass-panel rounded-2xl p-8 h-full transition-all duration-300 cursor-pointer
                  hover:glow-primary transform hover:scale-105
                  bg-gradient-to-br ${card?.gradient}
                `}>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`
                      w-16 h-16 rounded-2xl flex items-center justify-center
                      ${getColorClasses(card?.color)?.bg}/10 border ${getColorClasses(card?.color)?.border}/20
                      group-hover:${getColorClasses(card?.color)?.bg}/20 transition-all duration-300
                    `}>
                      <Icon 
                        name={card?.icon} 
                        size={32} 
                        className={getColorClasses(card?.color)?.text}
                      />
                    </div>
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-medium
                      ${getColorClasses(card?.color)?.text} ${getColorClasses(card?.color)?.bg}/10
                      border ${getColorClasses(card?.color)?.border}/20
                    `}>
                      {card?.stats}
                    </span>
                  </div>

                  {/* Card Content */}
                  <h3 className="text-2xl font-space-grotesk font-bold text-text-primary mb-4 group-hover:text-primary transition-colors duration-300">
                    {card?.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed mb-6">
                    {card?.description}
                  </p>

                  {/* Action Button */}
                  <div className="flex items-center text-primary font-medium group-hover:text-accent transition-colors duration-300">
                    <span className="mr-2">Explore Now</span>
                    <motion.div
                      animate={{ x: hoveredAction === card?.id ? 5 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon name="ArrowRight" size={16} />
                    </motion.div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className={`
                  absolute -inset-1 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10
                  bg-gradient-to-r ${getColorClasses(card?.color)?.bg}/20 to-transparent
                `}></div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Connect Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-space-grotesk font-bold text-text-primary mb-8">
            Quick Connect
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {quickLinks?.map((link, index) => (
              <motion.button
                key={link?.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-6 py-3 rounded-full bg-surface border border-border text-text-primary hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 group"
              >
                <Icon 
                  name={link?.icon} 
                  size={18} 
                  className="mr-2 group-hover:text-primary transition-colors duration-200" 
                />
                <span className="font-medium">{link?.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Button
              variant="default"
              size="xl"
              iconName="Rocket"
              iconPosition="left"
              className="glow-primary hover:glow-strong transform hover:scale-105 transition-all duration-300 px-12 py-4"
              asChild
            >
              <Link to="/contact">
                Start Your Project
              </Link>
            </Button>
            
            <p className="text-sm text-text-secondary">
              Available for full-time opportunities and consulting projects
            </p>
          </motion.div>
        </motion.div>

        {/* Terminal Easter Egg */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-4 rounded-lg bg-black/50 border border-primary/20 font-mono text-sm">
            <div className="text-success mb-1">anish@future-systems:~$</div>
            <div className="text-primary">
              <span className="animate-typing">
                echo "Ready to engineer tomorrow's solutions today"
              </span>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Background Gradient Overlays */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-accent/5 to-transparent rounded-full blur-3xl"></div>
    </section>
  );
};

export default CallToAction;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SkillsConstellation = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const skillCategories = [
    {
      name: "AI & Machine Learning",
      icon: "Brain",
      color: "primary",
      skills: [
        { name: "TensorFlow", level: 95, icon: "Cpu" },
        { name: "PyTorch", level: 90, icon: "Zap" },
        { name: "Neural Networks", level: 92, icon: "Network" },
        { name: "Computer Vision", level: 88, icon: "Eye" },
        { name: "NLP", level: 85, icon: "MessageSquare" }
      ]
    },
    {
      name: "Hardware & Robotics",
      icon: "Cog",
      color: "accent",
      skills: [
        { name: "Arduino", level: 93, icon: "Microchip" },
        { name: "Raspberry Pi", level: 90, icon: "Cpu" },
        { name: "PCB Design", level: 87, icon: "Circuit" },
        { name: "3D Printing", level: 85, icon: "Box" },
        { name: "Sensor Integration", level: 91, icon: "Radio" }
      ]
    },
    {
      name: "Software Development",
      icon: "Code",
      color: "success",
      skills: [
        { name: "Python", level: 96, icon: "Code" },
        { name: "JavaScript", level: 92, icon: "Globe" },
        { name: "React", level: 89, icon: "Layers" },
        { name: "Node.js", level: 87, icon: "Server" },
        { name: "Docker", level: 84, icon: "Package" }
      ]
    },
    {
      name: "Space & Mathematics",
      icon: "Rocket",
      color: "warning",
      skills: [
        { name: "Orbital Mechanics", level: 88, icon: "Orbit" },
        { name: "MATLAB", level: 91, icon: "Calculator" },
        { name: "Signal Processing", level: 86, icon: "Radio" },
        { name: "Control Systems", level: 89, icon: "Settings" },
        { name: "Simulation", level: 87, icon: "Play" }
      ]
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e?.clientX, y: e?.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getColorClass = (color, type = 'text') => {
    const colorMap = {
      primary: type === 'text' ? 'text-primary' : type === 'bg' ? 'bg-primary' : 'border-primary',
      accent: type === 'text' ? 'text-accent' : type === 'bg' ? 'bg-accent' : 'border-accent',
      success: type === 'text' ? 'text-success' : type === 'bg' ? 'bg-success' : 'border-success',
      warning: type === 'text' ? 'text-warning' : type === 'bg' ? 'bg-warning' : 'border-warning'
    };
    return colorMap?.[color] || 'text-primary';
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-secondary to-background relative overflow-hidden">
      {/* Constellation Background */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 1000 800">
          {/* Constellation Lines */}
          <defs>
            <linearGradient id="constellationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(0, 255, 224, 0.3)" />
              <stop offset="100%" stopColor="rgba(255, 0, 127, 0.3)" />
            </linearGradient>
          </defs>
          {[...Array(15)]?.map((_, i) => (
            <line
              key={i}
              x1={Math.random() * 1000}
              y1={Math.random() * 800}
              x2={Math.random() * 1000}
              y2={Math.random() * 800}
              stroke="url(#constellationGradient)"
              strokeWidth="1"
              opacity="0.5"
            />
          ))}
          {/* Stars */}
          {[...Array(50)]?.map((_, i) => (
            <circle
              key={i}
              cx={Math.random() * 1000}
              cy={Math.random() * 800}
              r={Math.random() * 2 + 1}
              fill="rgba(0, 255, 224, 0.6)"
              className="animate-pulse"
              style={{ animationDelay: `${Math.random() * 3}s` }}
            />
          ))}
        </svg>
      </div>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16 relative z-10"
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
          <Icon name="Star" size={16} className="mr-2" />
          Skills Constellation
        </div>
        <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-text-primary mb-6">
          Technical
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent ml-3">
            Expertise
          </span>
        </h2>
        <p className="text-lg text-text-secondary max-w-3xl mx-auto">
          Navigate through my technical universe where each skill represents a star in the constellation 
          of innovation, connected by years of hands-on experience and continuous learning.
        </p>
      </motion.div>
      {/* Skills Grid */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {skillCategories?.map((category, categoryIndex) => (
            <motion.div
              key={category?.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Category Card */}
              <div className="glass-panel rounded-2xl p-6 h-full hover:glow-primary transition-all duration-300">
                {/* Category Header */}
                <div className="flex items-center mb-6">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center mr-4
                    bg-${category?.color}/10 border border-${category?.color}/20
                    group-hover:bg-${category?.color}/20 transition-all duration-300
                  `}>
                    <Icon 
                      name={category?.icon} 
                      size={24} 
                      className={getColorClass(category?.color)}
                    />
                  </div>
                  <h3 className="text-lg font-space-grotesk font-semibold text-text-primary">
                    {category?.name}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category?.skills?.map((skill, skillIndex) => (
                    <motion.div
                      key={skill?.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                      viewport={{ once: true }}
                      className="relative"
                      onMouseEnter={() => setHoveredSkill(`${category?.name}-${skill?.name}`)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      {/* Skill Item */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Icon 
                            name={skill?.icon} 
                            size={16} 
                            className="text-text-secondary mr-2" 
                          />
                          <span className="text-text-primary font-medium text-sm">
                            {skill?.name}
                          </span>
                        </div>
                        <span className={`
                          text-xs font-bold px-2 py-1 rounded-full
                          ${getColorClass(category?.color)} bg-${category?.color}/10
                        `}>
                          {skill?.level}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-surface rounded-full h-2 overflow-hidden">
                        <motion.div
                          className={`h-full ${getColorClass(category?.color, 'bg')} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill?.level}%` }}
                          transition={{ duration: 1, delay: (categoryIndex * 0.2) + (skillIndex * 0.1) + 0.5 }}
                          viewport={{ once: true }}
                        />
                      </div>

                      {/* Hover Effect */}
                      {hoveredSkill === `${category?.name}-${skill?.name}` && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg border-2 border-primary/30 bg-primary/5 pointer-events-none"
                        />
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Category Stats */}
                <div className="mt-6 pt-4 border-t border-border">
                  <div className="flex justify-between items-center text-xs text-text-secondary">
                    <span>Avg. Proficiency</span>
                    <span className={`font-bold ${getColorClass(category?.color)}`}>
                      {Math.round(category?.skills?.reduce((acc, skill) => acc + skill?.level, 0) / category?.skills?.length)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Orbital Ring */}
              <div className="absolute -inset-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-full h-full border border-primary/20 rounded-3xl animate-pulse"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Cursor Trail */}
        {hoveredSkill && (
          <motion.div
            className="fixed pointer-events-none z-50 w-4 h-4 bg-primary rounded-full blur-sm"
            style={{
              left: mousePosition?.x - 8,
              top: mousePosition?.y - 8,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />
        )}
      </div>
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)]?.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default SkillsConstellation;
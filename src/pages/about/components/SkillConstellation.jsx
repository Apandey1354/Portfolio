import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SkillConstellation = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillCategories = [
    {
      id: 'ai-ml',
      name: 'AI & Machine Learning',
      icon: 'Brain',
      color: 'from-primary to-accent',
      position: { x: 50, y: 20 },
      skills: [
        { name: 'Deep Learning', proficiency: 95, description: 'Neural networks, CNNs, RNNs, Transformers' },
        { name: 'Computer Vision', proficiency: 90, description: 'Image processing, object detection, facial recognition' },
        { name: 'Natural Language Processing', proficiency: 85, description: 'Text analysis, sentiment analysis, chatbots' },
        { name: 'Reinforcement Learning', proficiency: 80, description: 'Q-learning, policy gradients, game AI' }
      ]
    },
    {
      id: 'robotics',
      name: 'Robotics & Hardware',
      icon: 'Cpu',
      color: 'from-accent to-primary',
      position: { x: 80, y: 60 },
      skills: [
        { name: 'Embedded Systems', proficiency: 92, description: 'Arduino, Raspberry Pi, microcontrollers' },
        { name: 'Robot Operating System', proficiency: 88, description: 'ROS/ROS2, navigation, manipulation' },
        { name: 'Sensor Integration', proficiency: 85, description: 'LiDAR, cameras, IMU, ultrasonic sensors' },
        { name: 'Motor Control', proficiency: 82, description: 'Servo motors, stepper motors, PID control' }
      ]
    },
    {
      id: 'software',
      name: 'Software Engineering',
      icon: 'Code',
      color: 'from-primary to-professional-blue',
      position: { x: 20, y: 70 },
      skills: [
        { name: 'Full-Stack Development', proficiency: 94, description: 'React, Node.js, Python, databases' },
        { name: 'Cloud Architecture', proficiency: 87, description: 'AWS, Docker, Kubernetes, microservices' },
        { name: 'DevOps & CI/CD', proficiency: 83, description: 'GitHub Actions, Jenkins, automated testing' },
        { name: 'System Design', proficiency: 89, description: 'Scalable architectures, distributed systems' }
      ]
    },
    {
      id: 'research',
      name: 'Research & Innovation',
      icon: 'BookOpen',
      color: 'from-accent to-success-green',
      position: { x: 15, y: 25 },
      skills: [
        { name: 'Academic Writing', proficiency: 91, description: 'Research papers, technical documentation' },
        { name: 'Experimental Design', proficiency: 86, description: 'Hypothesis testing, data collection, analysis' },
        { name: 'Patent Development', proficiency: 78, description: 'Intellectual property, innovation protection' },
        { name: 'Peer Review', proficiency: 84, description: 'Journal reviews, conference presentations' }
      ]
    },
    {
      id: 'leadership',
      name: 'Leadership & Strategy',
      icon: 'Users',
      color: 'from-professional-blue to-accent',
      position: { x: 75, y: 15 },
      skills: [
        { name: 'Team Management', proficiency: 88, description: 'Agile methodologies, cross-functional teams' },
        { name: 'Product Strategy', proficiency: 85, description: 'Roadmap planning, market analysis, user research' },
        { name: 'Startup Operations', proficiency: 82, description: 'Business development, fundraising, scaling' },
        { name: 'Mentorship', proficiency: 90, description: 'Student guidance, knowledge transfer, coaching' }
      ]
    }
  ];

  const connections = [
    { from: 'ai-ml', to: 'robotics', strength: 0.9 },
    { from: 'robotics', to: 'software', strength: 0.8 },
    { from: 'software', to: 'research', strength: 0.7 },
    { from: 'research', to: 'leadership', strength: 0.6 },
    { from: 'leadership', to: 'ai-ml', strength: 0.8 },
    { from: 'ai-ml', to: 'software', strength: 0.85 },
    { from: 'robotics', to: 'research', strength: 0.75 }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-surface to-background relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 255, 224, 0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-space-grotesk font-bold text-text-primary mb-6">
            Skill <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">Constellation</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Where mathematics meets mechanics - explore the interconnected universe of my technical expertise, 
            each skill a star in the constellation of innovation.
          </p>
        </motion.div>

        {/* Interactive Constellation */}
        <div className="relative w-full h-[600px] lg:h-[700px] mb-16">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {connections?.map((connection, index) => {
              const fromSkill = skillCategories?.find(s => s?.id === connection?.from);
              const toSkill = skillCategories?.find(s => s?.id === connection?.to);
              
              if (!fromSkill || !toSkill) return null;

              const fromX = (fromSkill?.position?.x / 100) * 100 + '%';
              const fromY = (fromSkill?.position?.y / 100) * 100 + '%';
              const toX = (toSkill?.position?.x / 100) * 100 + '%';
              const toY = (toSkill?.position?.y / 100) * 100 + '%';

              return (
                <motion.line
                  key={`${connection?.from}-${connection?.to}`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: connection?.strength * 0.5 }}
                  transition={{ duration: 2, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  x1={fromX}
                  y1={fromY}
                  x2={toX}
                  y2={toY}
                  stroke="url(#connectionGradient)"
                  strokeWidth="2"
                  className={`${hoveredSkill === connection?.from || hoveredSkill === connection?.to ? 'opacity-100' : ''}`}
                />
              );
            })}
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>

          {/* Skill Nodes */}
          {skillCategories?.map((category, index) => (
            <motion.div
              key={category?.id}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                left: `${category?.position?.x}%`,
                top: `${category?.position?.y}%`
              }}
              onMouseEnter={() => setHoveredSkill(category?.id)}
              onMouseLeave={() => setHoveredSkill(null)}
              onClick={() => setSelectedSkill(selectedSkill === category?.id ? null : category?.id)}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative w-20 h-20 lg:w-24 lg:h-24 rounded-full glass-panel
                  flex items-center justify-center group
                  ${hoveredSkill === category?.id || selectedSkill === category?.id ? 'glow-primary' : ''}
                  transition-all duration-300
                `}
              >
                {/* Pulsing Ring */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${category?.color} opacity-20`}
                />
                
                {/* Icon */}
                <Icon 
                  name={category?.icon} 
                  size={28} 
                  className="text-primary group-hover:text-accent transition-colors duration-300 relative z-10" 
                />

                {/* Skill Name */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <span className="text-xs font-medium text-text-secondary group-hover:text-primary transition-colors duration-300">
                    {category?.name}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Skill Details Panel */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="glass-panel p-8 rounded-2xl glow-primary"
            >
              {(() => {
                const category = skillCategories?.find(c => c?.id === selectedSkill);
                if (!category) return null;

                return (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category?.color} flex items-center justify-center`}>
                          <Icon name={category?.icon} size={24} className="text-white" />
                        </div>
                        <h3 className="text-2xl font-space-grotesk font-bold text-text-primary">
                          {category?.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => setSelectedSkill(null)}
                        className="w-8 h-8 rounded-full bg-surface hover:bg-primary/20 flex items-center justify-center transition-colors duration-300"
                      >
                        <Icon name="X" size={16} className="text-text-secondary hover:text-primary" />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      {category?.skills?.map((skill, index) => (
                        <motion.div
                          key={skill?.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.4 }}
                          className="space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-space-grotesk font-semibold text-text-primary">
                              {skill?.name}
                            </h4>
                            <span className="text-sm font-medium text-primary">
                              {skill?.proficiency}%
                            </span>
                          </div>
                          
                          <div className="w-full bg-surface rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill?.proficiency}%` }}
                              transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                              className={`h-full bg-gradient-to-r ${category?.color} rounded-full`}
                            />
                          </div>
                          
                          <p className="text-sm text-text-secondary">
                            {skill?.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-sm text-text-secondary mb-4">
            Click on any skill constellation to explore detailed proficiencies
          </p>
          <div className="flex justify-center items-center space-x-6 text-xs text-text-secondary">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5 bg-gradient-to-r from-primary to-accent"></div>
              <span>Skill Connections</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-primary/20 border border-primary/50"></div>
              <span>Interactive Nodes</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillConstellation;
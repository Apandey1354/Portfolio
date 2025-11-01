import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [currentText, setCurrentText] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const typingTexts = [
    "Future Systems Architect",
    "AI × Hardware × Space",
    "Building Tomorrow\'s Solutions",
    "Engineering the Impossible"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false);
      setTimeout(() => {
        setCurrentText((prev) => (prev + 1) % typingTexts?.length);
        setIsTyping(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const particleVariants = {
    animate: {
      y: [-10, 10, -10],
      opacity: [0.3, 1, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-secondary to-background">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 224, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 224, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)]?.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            variants={particleVariants}
            animate="animate"
            transition={{ delay: i * 0.2 }}
          />
        ))}
      </div>
      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            <Icon name="Zap" size={16} className="mr-2" />
            Welcome to the Future
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-space-grotesk font-bold text-text-primary mb-6"
        >
          Anish
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent ml-4">
            Pandey
          </span>
        </motion.h1>

        {/* Typing Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-8 h-16 flex items-center justify-center"
        >
          <div className="text-2xl md:text-3xl lg:text-4xl font-space-grotesk font-medium text-text-secondary">
            <span className={`${isTyping ? 'animate-typing' : ''} inline-block`}>
              {typingTexts?.[currentText]}
            </span>
            <span className="animate-pulse text-primary">|</span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Bridging the gap between theoretical computer science and tangible robotic solutions. 
          From hackathon victories to real-world impact in Nepal's tech ecosystem, 
          I engineer tomorrow's solutions today.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Button
            variant="default"
            size="lg"
            iconName="Rocket"
            iconPosition="left"
            className="glow-primary hover:glow-strong transform hover:scale-105 transition-all duration-300"
          >
            Explore Projects
          </Button>
          <Button
            variant="outline"
            size="lg"
            iconName="Download"
            iconPosition="left"
            className="hover:bg-primary/10 hover:border-primary hover:text-primary transition-all duration-300"
          >
            Download Resume
          </Button>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { icon: "Trophy", value: "15+", label: "Hackathon Wins" },
            { icon: "Code", value: "50+", label: "Projects Built" },
            { icon: "Users", value: "10K+", label: "Lives Impacted" },
            { icon: "Star", value: "4.9", label: "GitHub Rating" }
          ]?.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20 mb-3 group-hover:bg-primary/20 group-hover:glow-primary transition-all duration-300">
                <Icon name={stat?.icon} size={20} className="text-primary" />
              </div>
              <div className="text-2xl font-space-grotesk font-bold text-text-primary mb-1">
                {stat?.value}
              </div>
              <div className="text-sm text-text-secondary">
                {stat?.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center text-text-secondary">
          <span className="text-sm mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Icon name="ChevronDown" size={24} className="text-primary" />
          </motion.div>
        </div>
      </motion.div>
      {/* Holographic Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-l from-accent/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </section>
  );
};

export default HeroSection;
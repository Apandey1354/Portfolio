import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Image from "../../../components/AppImage";
import { useNavigate } from "react-router-dom";


const HeroSection = ({
  heroImages = [
    "assets/images/anish-robotics.png",
    "assets/images/anish-ai.png",
    "assets/images/anish-design.jpeg",
    "assets/images/plot.jpg",
  ],
}) => {
  const [currentText, setCurrentText] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const navigate = useNavigate();

  const typingTexts = [
    "Machine Learning Engineer",
    "Software Engineer",
    "Robotics Engineer",
    "Edge Ai Researcher",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false);
      setTimeout(() => {
        setCurrentText((prev) => (prev + 1) % typingTexts.length);
        setIsTyping(true);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const particleVariants = {
    animate: {
      y: [-10, 10, -10],
      opacity: [0.3, 1, 0.3],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 px-8 py-20 overflow-hidden bg-gradient-to-br from-background via-secondary/10 to-background">
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
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

      {/* Left Section - Text */}
      <div className="relative z-10 w-full lg:w-2/5 flex flex-col items-start text-left space-y-6 lg:pl-16 md:pl-10 pl-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            <Icon name="Zap" size={16} className="mr-2" />
            Welcome to the Future
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-space-grotesk font-bold text-text-primary leading-tight"
        >
          Anish{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Pandey
          </span>
        </motion.h1>

        {/* Typing Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="h-14 flex items-center text-2xl md:text-3xl text-text-secondary font-space-grotesk"
        >
          <span className={`${isTyping ? "animate-typing" : ""} inline-block`}>
            {typingTexts[currentText]}
          </span>
          <span className="animate-pulse text-primary ml-1">|</span>
        </motion.div>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-md"
        >
          I design systems that merge optimized machine intelligence,
          engineering precision — from software solutions, assistive technologies and robotics and hard tech innovations.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex flex-wrap gap-4 mt-6"
        >
          <Button
            variant="default"
            size="lg"
            iconName="Rocket"
            iconPosition="left"
            className="glow-primary hover:glow-strong transform hover:scale-105 transition-all duration-300"
            onClick={() => navigate("/projects")}
          >
            Explore Projects
          </Button>
          <Button
            variant="outline"
            size="lg"
            iconPosition="left"
            className="hover:bg-primary/10 hover:border-primary hover:text-primary transition-all duration-300"
            onClick={() =>
window.open(
               "https://www.linkedin.com/in/anishpandey2/",
               "_blank",
"noopener,noreferrer"
             )
}
          >
            LinkedIn
            
          </Button>
        </motion.div>
      </div>

      {/* Right Section - 3 Layered Images */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full lg:w-3/5 flex justify-center items-center"
      >
        <div className="relative flex items-center justify-center w-full max-w-xl">
          {/* Background glow */}
          <div className="absolute -inset-10 bg-gradient-to-tr from-primary/20 via-accent/10 to-transparent rounded-full blur-3xl animate-pulse"></div>

          {/* Image Cluster */}
          <div className="relative flex justify-center items-center gap-6 flex-wrap">
            {heroImages.map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative ${
                  index === 1 ? "z-20 scale-110" : "z-10"
                } hover:scale-115 transition-transform duration-300`}
              >
                <Image
                  src={src}
                  alt={`hero-${index}`}
                  className="w-52 h-52 md:w-64 md:h-64 object-cover rounded-3xl shadow-xl border-4 border-primary/20 hover:border-primary/40"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

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
    </section>
  );
};

export default HeroSection;

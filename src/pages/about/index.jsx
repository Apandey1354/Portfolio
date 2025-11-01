import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import SkillConstellation from './components/SkillConstellation';
import PersonalTimeline from './components/PersonalTimeline';
import TestimonialsSection from './components/TestimonialsSection.jsx';


const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorTrail, setCursorTrail] = useState([]);

  useEffect(() => {
    setIsLoaded(true);
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Custom cursor trail effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add new trail point
      setCursorTrail(prev => [
        ...prev.slice(-8), // Keep only last 8 points
        { x: e.clientX, y: e.clientY, id: Date.now() }
      ]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Clean up old trail points
  useEffect(() => {
    const cleanup = setInterval(() => {
      setCursorTrail(prev => prev.slice(-5));
    }, 100);

    return () => clearInterval(cleanup);
  }, []);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const sectionVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <>
      <Helmet>
        <title>Anish Pandey - Future Systems Architect | AI × Hardware × Space</title>
        <meta name="description" content="Discover the journey of Anish Pandey, a visionary engineer bridging AI, hardware, space, and innovation. From academic excellence to startup leadership, creating purposeful solutions for global advancement." />
        <meta name="keywords" content="Anish Pandey, AI engineer, robotics, startup founder, Nepal tech, machine learning, computer vision, hackathon winner, research, innovation" />
        <meta property="og:title" content="Anish Pandey - Future Systems Architect" />
        <meta property="og:description" content="Explore the story of a modern space-age inventor who bridges theoretical computer science with tangible robotic solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://anishpandey.dev" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Anish Pandey - Future Systems Architect" />
        <meta name="twitter:description" content="Journey from academic excellence to startup leadership, creating innovation that serves both local communities and global advancement." />
        <link rel="canonical" href="https://anishpandey.dev" />
      </Helmet>
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate={isLoaded ? "animate" : "initial"}
        className="min-h-screen bg-background relative overflow-hidden"
      >
        
        {/* Custom Cursor Trail */}
        <div className="fixed inset-0 pointer-events-none z-50">
          {cursorTrail.map((position, index) => (
            <motion.div
              key={index}
              className="fixed w-4 h-4 bg-primary/10 rounded-full pointer-events-none z-50 mix-blend-difference"
              style={{
                left: position.x - 8,
                top: position.y - 8,
              }}
              initial={{ opacity: 0.3, scale: 1 }}
              animate={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.05
              }}
            />
          ))}
        </div>

        {/* Main Cursor */}
        <motion.div
          className="fixed w-4 h-4 bg-primary/30 rounded-full pointer-events-none z-50 mix-blend-difference"
          style={{
            left: mousePosition.x - 8,
            top: mousePosition.y - 8,
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
          }}
        />
        <Header />
        
        {/* Main Content */}
        <main className="relative">
          {/* Hero Section */}
          <motion.section variants={sectionVariants}>
            <HeroSection />
          </motion.section>
          
          {/* Skill Constellation */}
          <motion.section variants={sectionVariants}>
            <SkillConstellation />
          </motion.section>
          
          {/* Personal Timeline */}
          <motion.section variants={sectionVariants}>
            <PersonalTimeline />
          </motion.section>
          
          {/* Testimonials */}
          <motion.section variants={sectionVariants}>
            <TestimonialsSection />
          </motion.section>
          
          
        </main>

        {/* Floating Action Button - Resume Download */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
          className="fixed bottom-8 right-8 z-40"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg glow-primary hover:glow-strong transition-all duration-300 flex items-center justify-center group"
            title="Download Resume"
          >
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7,10 12,15 17,10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Scroll Progress Indicator */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-primary/20 z-50"
          initial={{ scaleX: 0 }}
          style={{ transformOrigin: "0%" }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            style={{
              scaleX: typeof window !== 'undefined' ? 
                window.scrollY / (document.documentElement?.scrollHeight - window.innerHeight) : 0
            }}
          />
        </motion.div>

        {/* Background Ambient Effects */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* Ambient Particles */}
          {[...Array(30)]?.map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-px bg-primary/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}

          {/* Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-accent/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-success/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Loading Overlay */}
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="fixed inset-0 bg-background z-50 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full mx-auto mb-4"
              />
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-text-secondary font-space-grotesk"
              >
                Initializing Future Systems...
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <footer className="bg-surface border-t border-border py-12">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-6 text-text-secondary">
                <a 
                  href="mailto: apandey2@caldwell.edu" 
                  className="hover:text-primary transition-colors duration-300"
                  aria-label="Email Anish Pandey"
                >
                  Email
                </a>
                <span>•</span>
                <a 
                  href="https://www.linkedin.com/in/anishpandey2/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-300"
                  aria-label="LinkedIn Profile"
                >
                  LinkedIn
                </a>
                <span>•</span>
                <a 
                  href="https://github.com/Apandey1354" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-300"
                  aria-label="GitHub Profile"
                >
                  GitHub
                </a>
              </div>
              <p className="text-text-secondary text-sm">
                © {new Date()?.getFullYear()} Anish Pandey. Building tomorrow's solutions today.
              </p>
            </div>
          </div>
        </footer>
      </motion.div>
    </>
  );
};

export default About;
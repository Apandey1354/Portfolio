import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedProjects = () => {
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      id: 1,
      title: "NeuroLink Prosthetic Control",
      category: "AI × Hardware",
      description: `Revolutionary brain-computer interface enabling intuitive prosthetic control through neural signal processing.\nImplemented advanced machine learning algorithms for real-time gesture recognition with 94% accuracy.`,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
      technologies: ["Python", "TensorFlow", "Arduino", "C++", "Signal Processing"],
      metrics: {
        accuracy: "94%",
        latency: "50ms",
        users: "500+"
      },
      status: "Production",
      github: "https://github.com/anishpandey/neurolink-prosthetic",
      demo: "https://neurolink-demo.com"
    },
    {
      id: 2,
      title: "Kampan Labs Ecosystem",
      category: "Startup × Innovation",
      description: `Nepal's premier tech incubator platform connecting entrepreneurs with investors and mentors.\nBuilt scalable microservices architecture serving 10,000+ active users across South Asia.`,
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?w=800&h=600&fit=crop",
      technologies: ["React", "Node.js", "MongoDB", "AWS", "Docker"],
      metrics: {
        users: "10K+",
        startups: "200+",
        funding: "$2M+"
      },
      status: "Live",
      github: "https://github.com/kampanlabs/platform",
      demo: "https://kampanlabs.com"
    },
    {
      id: 3,
      title: "Satellite Trajectory Optimizer",
      category: "Space × Mathematics",
      description: `Advanced orbital mechanics simulation for optimizing satellite deployment patterns.\nReduced fuel consumption by 23% through machine learning-powered trajectory planning algorithms.`,
      image: "https://images.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_1280.jpg?w=800&h=600&fit=crop",
      technologies: ["MATLAB", "Python", "NumPy", "Orbital Mechanics", "ML"],
      metrics: {
        efficiency: "23%",
        satellites: "50+",
        savings: "$500K+"
      },
      status: "Research",
      github: "https://github.com/anishpandey/satellite-optimizer",
      demo: "https://sat-optimizer-demo.com"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-secondary relative overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
          <Icon name="Lightbulb" size={16} className="mr-2" />
          Featured Projects
        </div>
        <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-text-primary mb-6">
          Engineering
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent ml-3">
            Innovation
          </span>
        </h2>
        <p className="text-lg text-text-secondary max-w-3xl mx-auto">
          Explore breakthrough projects that bridge theoretical concepts with real-world impact, 
          from neural interfaces to space optimization algorithms.
        </p>
      </motion.div>
      {/* Project Carousel */}
      <div className="max-w-7xl mx-auto">
        {/* Project Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {projects?.map((project, index) => (
            <button
              key={project?.id}
              onClick={() => setActiveProject(index)}
              className={`
                px-6 py-3 rounded-full font-medium transition-all duration-300
                ${activeProject === index
                  ? 'bg-primary text-primary-foreground glow-primary'
                  : 'bg-surface text-text-secondary hover:bg-primary/10 hover:text-primary'
                }
              `}
            >
              {project?.category}
            </button>
          ))}
        </div>

        {/* Active Project Display */}
        <motion.div
          key={activeProject}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Project Image */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="relative overflow-hidden rounded-2xl bg-surface border border-border">
              <Image
                src={projects?.[activeProject]?.image}
                alt={projects?.[activeProject]?.title}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
              
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span className={`
                  px-3 py-1 rounded-full text-xs font-medium
                  ${projects?.[activeProject]?.status === 'Production' ? 'bg-success/20 text-success border border-success/30' :
                    projects?.[activeProject]?.status === 'Live'? 'bg-primary/20 text-primary border border-primary/30' : 'bg-warning/20 text-warning border border-warning/30'
                  }
                `}>
                  {projects?.[activeProject]?.status}
                </span>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex gap-4">
                  <Button
                    variant="default"
                    size="sm"
                    iconName="ExternalLink"
                    iconPosition="left"
                    className="glow-primary"
                  >
                    Live Demo
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Github"
                    iconPosition="left"
                    className="bg-background/80 hover:bg-primary/10"
                  >
                    Code
                  </Button>
                </div>
              </div>
            </div>

            {/* Particle Effects */}
            <div className="absolute -inset-4 pointer-events-none">
              {[...Array(6)]?.map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary rounded-full opacity-60"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Project Details */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                  {projects?.[activeProject]?.category}
                </span>
                <div className="flex items-center gap-2 text-text-secondary text-sm">
                  <Icon name="Calendar" size={14} />
                  <span>2024</span>
                </div>
              </div>
              <h3 className="text-3xl font-space-grotesk font-bold text-text-primary mb-4">
                {projects?.[activeProject]?.title}
              </h3>
              <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                {projects?.[activeProject]?.description}
              </p>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="text-sm font-medium text-text-secondary mb-3 uppercase tracking-wide">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {projects?.[activeProject]?.technologies?.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-surface border border-border text-text-primary text-sm font-medium hover:border-primary/30 hover:bg-primary/5 transition-colors duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div>
              <h4 className="text-sm font-medium text-text-secondary mb-3 uppercase tracking-wide">
                Key Metrics
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(projects?.[activeProject]?.metrics)?.map(([key, value], index) => (
                  <div key={index} className="text-center p-4 rounded-lg bg-surface border border-border hover:border-primary/30 transition-colors duration-200">
                    <div className="text-xl font-space-grotesk font-bold text-primary mb-1">
                      {value}
                    </div>
                    <div className="text-xs text-text-secondary capitalize">
                      {key}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                variant="default"
                iconName="ExternalLink"
                iconPosition="left"
                className="glow-primary hover:glow-strong"
              >
                View Project
              </Button>
              <Button
                variant="outline"
                iconName="Github"
                iconPosition="left"
                className="hover:bg-primary/10 hover:border-primary hover:text-primary"
              >
                Source Code
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
      {/* Background Decorations */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default FeaturedProjects;
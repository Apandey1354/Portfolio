import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SocialProofSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [githubStats, setGithubStats] = useState({
    contributions: 1247,
    repositories: 89,
    followers: 2341,
    stars: 4567
  });

  const achievements = [
    {
      title: "HackTheNorth 2024",
      position: "1st Place",
      category: "AI Innovation",
      prize: "$50,000",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      description: "Revolutionary neural interface for prosthetic control",
      date: "Oct 2024",
      participants: "2000+"
    },
    {
      title: "MIT Reality Hack",
      position: "Winner",
      category: "AR/VR",
      prize: "$25,000",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?w=400&h=300&fit=crop",
      description: "Immersive space training simulation platform",
      date: "Sep 2024",
      participants: "1500+"
    },
    {
      title: "NASA Space Apps",
      position: "Global Finalist",
      category: "Space Tech",
      prize: "Recognition",
      image: "https://images.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_1280.jpg?w=400&h=300&fit=crop",
      description: "Satellite debris tracking system",
      date: "Aug 2024",
      participants: "5000+"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "AI Research Director",
      company: "MIT CSAIL",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      content: `Anish's work on neural interfaces represents a breakthrough in brain-computer interaction. His mathematical rigor combined with practical engineering skills is exceptional.`,
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      role: "CTO",
      company: "TechStars Nepal",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      content: `Leading Kampan Labs, Anish has transformed Nepal's startup ecosystem. His vision for connecting local innovation with global markets is inspiring.`,
      rating: 5
    },
    {
      name: "Prof. Michael Rodriguez",
      role: "Robotics Professor",
      company: "Stanford University",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      content: `Anish's interdisciplinary approach to robotics and AI is remarkable. He bridges theoretical concepts with real-world applications seamlessly.`,
      rating: 5
    }
  ];

  const mediaFeatures = [
    {
      outlet: "TechCrunch",
      title: "Nepal\'s Rising Tech Star",
      date: "Nov 2024",
      type: "Feature Article"
    },
    {
      outlet: "IEEE Spectrum",
      title: "Neural Prosthetics Breakthrough",
      date: "Oct 2024",
      type: "Research Highlight"
    },
    {
      outlet: "Wired",
      title: "Future of Brain-Computer Interfaces",
      date: "Sep 2024",
      type: "Interview"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Simulate GitHub stats animation
  useEffect(() => {
    const animateStats = () => {
      setGithubStats(prev => ({
        contributions: prev?.contributions + Math.floor(Math.random() * 3),
        repositories: prev?.repositories,
        followers: prev?.followers + Math.floor(Math.random() * 2),
        stars: prev?.stars + Math.floor(Math.random() * 5)
      }));
    };

    const interval = setInterval(animateStats, 3000);
    return () => clearInterval(interval);
  }, []);

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
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-success/10 border border-success/20 text-success text-sm font-medium mb-6">
          <Icon name="Award" size={16} className="mr-2" />
          Recognition & Impact
        </div>
        <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-text-primary mb-6">
          Proven
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent ml-3">
            Excellence
          </span>
        </h2>
        <p className="text-lg text-text-secondary max-w-3xl mx-auto">
          From hackathon victories to academic recognition, explore the achievements that validate 
          innovation and technical excellence in the global tech community.
        </p>
      </motion.div>
      <div className="max-w-7xl mx-auto">
        {/* Achievement Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-space-grotesk font-bold text-text-primary mb-8 text-center">
            Recent Hackathon Victories
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {achievements?.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="glass-panel rounded-2xl overflow-hidden hover:glow-primary transition-all duration-300">
                  {/* Achievement Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={achievement?.image}
                      alt={achievement?.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
                    
                    {/* Position Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                        {achievement?.position}
                      </span>
                    </div>

                    {/* Prize Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium border border-accent/30">
                        {achievement?.prize}
                      </span>
                    </div>
                  </div>

                  {/* Achievement Details */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-text-secondary">{achievement?.date}</span>
                      <span className="text-sm text-primary font-medium">{achievement?.participants} participants</span>
                    </div>
                    
                    <h4 className="text-xl font-space-grotesk font-bold text-text-primary mb-2">
                      {achievement?.title}
                    </h4>
                    
                    <p className="text-text-secondary text-sm mb-4">
                      {achievement?.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-surface text-text-primary text-xs font-medium">
                        {achievement?.category}
                      </span>
                      <Icon name="Trophy" size={20} className="text-warning" />
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* GitHub Stats & Testimonials */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* GitHub Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-panel rounded-2xl p-8"
          >
            <div className="flex items-center mb-6">
              <Icon name="Github" size={32} className="text-text-primary mr-4" />
              <div>
                <h3 className="text-xl font-space-grotesk font-bold text-text-primary">
                  GitHub Activity
                </h3>
                <p className="text-text-secondary text-sm">Open source contributions</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Contributions", value: githubStats?.contributions, icon: "GitCommit" },
                { label: "Repositories", value: githubStats?.repositories, icon: "Folder" },
                { label: "Followers", value: githubStats?.followers, icon: "Users" },
                { label: "Stars Earned", value: githubStats?.stars, icon: "Star" }
              ]?.map((stat, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-surface border border-border">
                  <Icon name={stat?.icon} size={24} className="text-primary mx-auto mb-2" />
                  <div className="text-2xl font-space-grotesk font-bold text-text-primary mb-1">
                    {stat?.value?.toLocaleString()}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {stat?.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Contribution Graph Simulation */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-text-secondary mb-3">Contribution Activity</h4>
              <div className="grid grid-cols-12 gap-1">
                {[...Array(84)]?.map((_, i) => (
                  <div
                    key={i}
                    className={`
                      w-3 h-3 rounded-sm
                      ${Math.random() > 0.7 ? 'bg-primary' :
                        Math.random() > 0.5 ? 'bg-primary/60' :
                        Math.random() > 0.3 ? 'bg-primary/30' : 'bg-surface'
                      }
                    `}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-panel rounded-2xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-space-grotesk font-bold text-text-primary">
                What People Say
              </h3>
              <div className="flex gap-2">
                {testimonials?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`
                      w-2 h-2 rounded-full transition-all duration-300
                      ${currentTestimonial === index ? 'bg-primary w-6' : 'bg-surface'}
                    `}
                  />
                ))}
              </div>
            </div>

            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(testimonials?.[currentTestimonial]?.rating)]?.map((_, i) => (
                  <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
                ))}
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-text-primary leading-relaxed italic">
                "{testimonials?.[currentTestimonial]?.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center pt-4 border-t border-border">
                <Image
                  src={testimonials?.[currentTestimonial]?.avatar}
                  alt={testimonials?.[currentTestimonial]?.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-medium text-text-primary">
                    {testimonials?.[currentTestimonial]?.name}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {testimonials?.[currentTestimonial]?.role} at {testimonials?.[currentTestimonial]?.company}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Media Features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-space-grotesk font-bold text-text-primary mb-8">
            Featured In
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {mediaFeatures?.map((feature, index) => (
              <div
                key={index}
                className="glass-panel rounded-xl p-6 hover:glow-primary transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-space-grotesk font-bold text-primary">
                    {feature?.outlet}
                  </span>
                  <Icon name="ExternalLink" size={16} className="text-text-secondary group-hover:text-primary transition-colors duration-200" />
                </div>
                <h4 className="font-medium text-text-primary mb-2 group-hover:text-primary transition-colors duration-200">
                  {feature?.title}
                </h4>
                <div className="flex items-center justify-between text-sm text-text-secondary">
                  <span>{feature?.type}</span>
                  <span>{feature?.date}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      {/* Background Effects */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-gradient-to-br from-success/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-gradient-to-tl from-warning/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default SocialProofSection;
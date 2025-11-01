import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      role: "Professor of Computer Science",
      organization: "Stanford University",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      content: `Anish's research on human-robot interaction has been groundbreaking. His ability to bridge theoretical concepts with practical applications is remarkable. During our collaboration, he consistently demonstrated exceptional problem-solving skills and innovative thinking that pushed the boundaries of what we thought possible.`,
      rating: 5,
      category: "Academic",
      relationship: "Research Collaborator",
      project: "Human-Robot Interaction Study",
      duration: "8 months"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Senior Engineering Manager",
      organization: "Google AI",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      content: `Working with Anish on our AI partnership was incredible. He has this unique ability to take complex machine learning concepts and make them accessible to everyone on the team. His technical depth combined with leadership skills makes him a rare talent in the industry.`,
      rating: 5,
      category: "Industry",
      relationship: "Partnership Lead",
      project: "AI Integration Platform",
      duration: "1 year"
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "Co-founder & CTO",
      organization: "TechVenture Nepal",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      content: `Anish mentored me during my transition from academia to entrepreneurship. His insights into building scalable tech solutions and navigating the startup ecosystem were invaluable. He has this gift of seeing potential in people and helping them realize it.`,
      rating: 5,
      category: "Mentorship",
      relationship: "Mentee",
      project: "Startup Guidance Program",
      duration: "6 months"
    },
    {
      id: 4,
      name: "James Wilson",
      role: "Hackathon Judge",
      organization: "TechCrunch Disrupt",
      image: "https://randomuser.me/api/portraits/men/56.jpg",
      content: `I've judged hundreds of hackathons, but Anish's presentations always stood out. His solutions weren't just technically impressive - they addressed real-world problems with genuine impact. His team leadership and ability to execute under pressure is exceptional.`,
      rating: 5,
      category: "Competition",
      relationship: "Judge",
      project: "Multiple Hackathons",
      duration: "3 years"
    },
    {
      id: 5,
      name: "Dr. Rajesh Patel",
      role: "Head of Robotics Department",
      organization: "IIT Delhi",
      image: "https://randomuser.me/api/portraits/men/73.jpg",
      content: `Anish's contributions to our robotics research have been phenomenal. His innovative approach to sensor integration and autonomous systems has resulted in three published papers and two patent applications. He's definitely one of the brightest minds I've worked with.`,
      rating: 5,
      category: "Research",
      relationship: "Research Supervisor",
      project: "Autonomous Robotics Systems",
      duration: "2 years"
    },
    {
      id: 6,
      name: "Lisa Thompson",
      role: "Venture Partner",
      organization: "Sequoia Capital",
      image: "https://randomuser.me/api/portraits/women/25.jpg",
      content: `When we first met Anish and the Kampan Labs team, we were impressed by their technical vision and execution capability. Anish's ability to articulate complex technical concepts to investors while maintaining the engineering rigor is remarkable. He's building something truly transformative.`,
      rating: 5,
      category: "Investment",
      relationship: "Investor",
      project: "Kampan Labs Funding",
      duration: "Ongoing"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials?.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
  };

  const categoryColors = {
    Academic: 'from-primary to-accent',
    Industry: 'from-accent to-professional-blue',
    Mentorship: 'from-professional-blue to-success-green',
    Competition: 'from-success-green to-primary',
    Research: 'from-primary to-professional-blue',
    Investment: 'from-accent to-success-green'
  };

  return (
    <section className="py-20 bg-gradient-to-b from-surface to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300FFE0' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
            Voices of <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">Collaboration</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Hear from the brilliant minds I've had the privilege to work with - professors, industry leaders, 
            fellow entrepreneurs, and mentees who've been part of this incredible journey.
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              className="glass-panel p-8 lg:p-12 rounded-3xl glow-primary"
            >
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                {/* Testimonial Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Category Badge */}
                  <div className="flex items-center space-x-4">
                    <span className={`px-4 py-2 bg-gradient-to-r ${categoryColors?.[testimonials?.[currentTestimonial]?.category]} text-white text-sm font-medium rounded-full`}>
                      {testimonials?.[currentTestimonial]?.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonials?.[currentTestimonial]?.rating)]?.map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-primary fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="relative">
                    <Icon name="Quote" size={48} className="text-primary/20 absolute -top-4 -left-2" />
                    <blockquote className="text-lg lg:text-xl text-text-primary leading-relaxed pl-8">
                      {testimonials?.[currentTestimonial]?.content}
                    </blockquote>
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div>
                      <span className="text-sm text-text-secondary">Project</span>
                      <p className="font-medium text-text-primary">{testimonials?.[currentTestimonial]?.project}</p>
                    </div>
                    <div>
                      <span className="text-sm text-text-secondary">Duration</span>
                      <p className="font-medium text-text-primary">{testimonials?.[currentTestimonial]?.duration}</p>
                    </div>
                  </div>
                </div>

                {/* Author Info */}
                <div className="text-center lg:text-left">
                  <div className="relative inline-block mb-6">
                    <div className="w-32 h-32 mx-auto lg:mx-0 rounded-full overflow-hidden glass-panel p-1">
                      <Image
                        src={testimonials?.[currentTestimonial]?.image}
                        alt={testimonials?.[currentTestimonial]?.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    {/* Floating Badge */}
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                      <Icon name="CheckCircle" size={20} className="text-white" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-space-grotesk font-bold text-text-primary">
                      {testimonials?.[currentTestimonial]?.name}
                    </h3>
                    <p className="text-primary font-medium">
                      {testimonials?.[currentTestimonial]?.role}
                    </p>
                    <p className="text-text-secondary">
                      {testimonials?.[currentTestimonial]?.organization}
                    </p>
                    <div className="inline-flex items-center space-x-2 text-sm text-text-secondary bg-surface px-3 py-1 rounded-full">
                      <Icon name="Users" size={14} />
                      <span>{testimonials?.[currentTestimonial]?.relationship}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center space-x-6 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-surface hover:bg-primary/20 flex items-center justify-center transition-all duration-300 hover:glow-primary"
            >
              <Icon name="ChevronLeft" size={20} className="text-text-secondary hover:text-primary" />
            </button>

            {/* Dots Indicator */}
            <div className="flex items-center space-x-2">
              {testimonials?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-primary scale-125' :'bg-surface hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-surface hover:bg-primary/20 flex items-center justify-center transition-all duration-300 hover:glow-primary"
            >
              <Icon name="ChevronRight" size={20} className="text-text-secondary hover:text-primary" />
            </button>
          </div>

          {/* Auto-play Toggle */}
          <div className="text-center mt-6">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="inline-flex items-center space-x-2 text-sm text-text-secondary hover:text-primary transition-colors duration-300"
            >
              <Icon name={isAutoPlaying ? "Pause" : "Play"} size={16} />
              <span>{isAutoPlaying ? "Pause" : "Play"} Auto-rotation</span>
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mt-12"
        >
          {Object.keys(categoryColors)?.map((category) => {
            const count = testimonials?.filter(t => t?.category === category)?.length;
            return (
              <div
                key={category}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-surface rounded-full text-sm"
              >
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${categoryColors?.[category]}`}></div>
                <span className="text-text-secondary">{category}</span>
                <span className="text-primary font-medium">({count})</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
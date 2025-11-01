import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import AchievementCard from './components/AchievementCard';
import TrophyCarousel from './components/TrophyCarousel';
import AchievementTimeline from './components/AchievementTimeline';
import AchievementStats from './components/AchievementStats';
import ConfettiEffect from './components/ConfettiEffect';
import MediaGallery from './components/MediaGallery';

const Awards = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid, timeline, stats

  // Mock achievements data
  const achievements = [
  {
    id: 1,
    title: "HackNYU x Google",
    description: "First place among 650+ participants and 120+ projects for developing ‘Dristi,’ a wearable assistive device for the visually impaired.",
    details: `Led a team to develop Dristi, a real-time wearable with a voice interface, obstacle detection, and environmental monitoring for the visually impaired. Built using Raspberry Pi, OpenCV, and PyTorch with 75% higher segmentation accuracy and 15% faster object recognition. Integrated Google Maps API for navigation and real-time emergency alert systems.`,
    category: "competition",
    year: 2025,
    location: "New York, NY",
    rank: "1st Place",
    featured: true,
    image: "assets/images/hackNYU.png",
    metrics: {
      participants: 650,
      projects: 120,
      duration: "36 hours"
    },
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
        caption: "Team Dristi presenting at HackNYU"
      }
    ],
    links: [
      { label: "Devpost Submission", url: "#" },
      { label: "Project Demo", url: "#" }
    ]
  },
  {
    id: 2,
    title: "HackNJIT 2024",
    description: "Second place winner among 550+ participants for developing Gamify.Work — a gamified AI productivity platform.",
    details: `Created Gamify.Work, an AI-driven web app that transforms task management into a game-like experience using rewards, streaks, and progress analytics. Built with React, Node.js, and MongoDB, integrating OpenAI APIs to recommend tasks and maintain focus. Increased average productivity by 40% in user testing.`,
    category: "competition",
    year: 2024,
    location: "Newark, NJ",
    rank: "2nd Place",
    image: "assets/images/hackNJIT.png",
    metrics: {
      participants: 550,
      projects: 75,
      duration: "36 hours"
    },
    links: [
      { label: "Devpost Project", url: "#" }
    ]
  },
  {
    id: 3,
    title: "HACKMIT x Fetch AI x Anthropic",
    description: "Finalist at HACKMIT 2025 — Top 10 among 365 innovative global projects.",
    details: `Developed an AI-embedded digital twin simulation platform integrating reinforcement learning and predictive modeling to optimize planetary-scale sustainability challenges using real-time IoT and climate data.`,
    category: "competition",
    year: 2025,
    location: "Cambridge, MA",
    rank: "Top 10 Finalist",
    featured: true,
    image: "assets/images/HackMIT.png",
    metrics: {
      participants: 365,
      rank: "Top 10"
    },
    links: [
      { label: "HackMIT Project", url: "#" }
    ]
  },
  {
    id: 4,
    title: "CougarHacks 2024",
    description: "First place winner at Caldwell University’s annual hackathon for developing Total Security — an all-in-one safety and monitoring app.",
    details: `Built Total Security, a cross-platform app combining biometric authentication, smart alerts, and encrypted data storage for home and personal safety. Implemented using Flutter, Firebase, and Python backend for face recognition and motion detection integration.`,
    category: "competition",
    year: 2024,
    location: "Caldwell, NJ",
    rank: "1st Place",
    image: "assets/images/HackCALDWELL.png",
    metrics: {
      participants: 100,
      duration: "24 hours"
    },
    links: [
      { label: "Project Showcase", url: "#" }
    ]
  },
  {
    id: 5,
    title: "PennApps",
    description: "Honorable Mention for developing a sensor-embedded health app capable of reading real-time vitals.",
    details: `Developed an IoT-based mobile app embedded with biosensors to monitor pulse, blood pressure, and oxygen levels. Integrated Arduino sensors with a Flutter app for real-time health data visualization and anomaly detection using Python analytics.`,
    category: "competition",
    year: 2025,
    location: "Philadelphia, PA",
    rank: "Honorable Mention",
    featured: true,
    image: "assets/images/hackPenn.png",
    metrics: {
      participants: 1000,
      duration: "48 hours"
    },
    links: [
      { label: "PennApps Project", url: "#" }
    ]
  },
  {
    id: 6,
    title: "National Mathematics and Physics Olympiad Finalist",
    description: "National finalist recognition for excellence in problem-solving and analytical reasoning.",
    details: `Ranked among the top students nationwide in mathematical modeling and theoretical physics problem-solving. Demonstrated advanced analytical reasoning and computational skills.`,
    category: "academic",
    year: 2021,
    location: "Kathmandu, Nepal",
    rank: "Finalist",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop",
    metrics: {
      participants: "Nationwide",
      category: "STEM Olympiad"
    }
  }
];

    
  

  const categories = [
    { id: 'all', label: 'All Achievements', icon: 'Award' },
    { id: 'competition', label: 'Competitions', icon: 'Trophy' },
    { id: 'academic', label: 'Academic', icon: 'GraduationCap' },
    { id: 'professional', label: 'Professional', icon: 'Briefcase' },
    { id: 'community', label: 'Community', icon: 'Users' }
  ];

  const viewModes = [
    { id: 'grid', label: 'Grid View', icon: 'Grid3X3' },
    { id: 'timeline', label: 'Timeline', icon: 'Clock' },
    { id: 'stats', label: 'Statistics', icon: 'BarChart3' }
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements?.filter(achievement => achievement?.category === selectedCategory);

  const handleViewDetails = (achievement) => {
    setSelectedAchievement(achievement);
    setShowConfetti(true);
  };

  const closeModal = () => {
    setSelectedAchievement(null);
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 100);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <>
      <Helmet>
        <title>Awards & Achievements - Anish Pandey | Future Systems Architect</title>
        <meta name="description" content="Explore Anish Pandey's achievements including hackathon victories, academic excellence, and professional recognitions in AI, robotics, and software development." />
        <meta name="keywords" content="awards, achievements, hackathon winner, academic excellence, programming competitions, AI research, robotics" />
      </Helmet>
      <div className="min-h-screen bg-background text-text-primary">
        <Header />
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center glow-primary">
                  <Icon name="Trophy" size={32} className="text-primary-foreground" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-space-grotesk font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Achievement Vault
              </h1>
              
              <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                A comprehensive showcase of recognitions, victories, and milestones that define my journey in technology, innovation, and community impact.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center text-primary">
                  <Icon name="Award" size={20} className="mr-2" />
                  <span className="font-medium">{achievements?.length} Total Achievements</span>
                </div>
                <div className="flex items-center text-text-secondary">
                  <Icon name="Trophy" size={20} className="mr-2" />
                  <span>{achievements?.filter(a => a?.category === 'competition')?.length} Competition Wins</span>
                </div>
                <div className="flex items-center text-text-secondary">
                  <Icon name="GraduationCap" size={20} className="mr-2" />
                  <span>{achievements?.filter(a => a?.category === 'academic')?.length} Academic Honors</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Floating Achievement Icons */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)]?.map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${10 + (i * 12)}%`,
                  top: `${20 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [-10, 10, -10],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4 + (i * 0.5),
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name={['Trophy', 'Award', 'Star', 'Medal']?.[i % 4]} size={16} className="text-primary/30" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Trophy Carousel */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <TrophyCarousel achievements={achievements} />
            </motion.div>
          </div>
        </section>

        {/* Controls Section */}
        <section className="py-8 border-t border-border">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Category Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-text-secondary font-medium mr-2">Filter by:</span>
                {categories?.map((category) => (
                  <Button
                    key={category?.id}
                    variant={selectedCategory === category?.id ? "default" : "outline"}
                    size="sm"
                    iconName={category?.icon}
                    iconPosition="left"
                    onClick={() => setSelectedCategory(category?.id)}
                    className="transition-all duration-300"
                  >
                    {category?.label}
                  </Button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-text-secondary font-medium mr-2">View:</span>
                {viewModes?.map((mode) => (
                  <Button
                    key={mode?.id}
                    variant={viewMode === mode?.id ? "default" : "ghost"}
                    size="sm"
                    iconName={mode?.icon}
                    onClick={() => setViewMode(mode?.id)}
                    className="transition-all duration-300"
                  >
                    <span className="hidden sm:inline ml-2">{mode?.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            {viewMode === 'grid' && (
              <motion.div
                key="grid-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredAchievements?.map((achievement, index) => (
                    <AchievementCard
                      key={achievement?.id}
                      achievement={achievement}
                      index={index}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {viewMode === 'timeline' && (
              <motion.div
                key="timeline-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <AchievementTimeline achievements={filteredAchievements} />
              </motion.div>
            )}

            {viewMode === 'stats' && (
              <motion.div
                key="stats-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <AchievementStats achievements={achievements} />
              </motion.div>
            )}
          </div>
        </section>

        {/* Achievement Detail Modal */}
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass-panel rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e?.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-background/80 backdrop-blur-sm p-6 border-b border-border flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <Icon name="Trophy" size={24} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-space-grotesk font-bold text-text-primary">
                      {selectedAchievement?.title}
                    </h2>
                    <div className="flex items-center space-x-4 text-sm text-text-secondary">
                      <span>{selectedAchievement?.year}</span>
                      <span>•</span>
                      <span>{selectedAchievement?.location}</span>
                      {selectedAchievement?.rank && (
                        <>
                          <span>•</span>
                          <span className="text-primary font-medium">{selectedAchievement?.rank}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeModal}
                  className="text-text-secondary hover:text-text-primary"
                >
                  <Icon name="X" size={24} />
                </Button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-8">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-space-grotesk font-semibold text-text-primary mb-3">
                    Overview
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {selectedAchievement?.details || selectedAchievement?.description}
                  </p>
                </div>

                {/* Metrics */}
                {selectedAchievement?.metrics && (
                  <div>
                    <h3 className="text-lg font-space-grotesk font-semibold text-text-primary mb-3">
                      Key Metrics
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(selectedAchievement?.metrics)?.map(([key, value]) => (
                        <div key={key} className="bg-surface p-4 rounded-lg">
                          <div className="text-primary font-semibold text-lg">{value}</div>
                          <div className="text-text-secondary text-sm capitalize">
                            {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Media Gallery */}
                {selectedAchievement?.media && selectedAchievement?.media?.length > 0 && (
                  <MediaGallery achievement={selectedAchievement} />
                )}

                {/* Links */}
                {selectedAchievement?.links && selectedAchievement?.links?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-space-grotesk font-semibold text-text-primary mb-3">
                      Related Links
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedAchievement?.links?.map((link, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          iconName="ExternalLink"
                          iconPosition="right"
                          onClick={() => window.open(link?.url, '_blank')}
                        >
                          {link?.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Confetti Effect */}
        <ConfettiEffect trigger={showConfetti} />
      </div>
    </>
  );
};

export default Awards;
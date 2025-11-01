import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TimelineItem from './components/TimelineItem';
import TimelineScrubber from './components/TimelineScrubber';
import SkillProgression from './components/SkillProgression';
import AchievementBadges from './components/AchievementBadges';
import PrintableTimeline from './components/PrintableTimeline';

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showPrintView, setShowPrintView] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef(null);
  const containerRef = useRef(null);

  // Mock experience data
  const experiences = [
    {
      id: 1,
      title: "Co-Founder & CTO",
      organization: "Kampan Labs",
      location: "Kathmandu, Nepal",
      duration: "2023 - Present",
      status: "current",
      type: "startup",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center",
      summary: "Leading technical innovation in Nepal's emerging tech ecosystem, building AI-powered solutions for local businesses while establishing international partnerships.",
      description: `Spearheading the technical vision and product development at Kampan Labs, Nepal's fastest-growing tech startup. Leading a team of 12 engineers across AI, web development, and hardware integration projects.\n\nFocusing on bridging the gap between cutting-edge technology and practical solutions for Nepalese businesses, while building scalable systems that can compete globally.`,
      responsibilities: [
        "Architecting scalable AI/ML infrastructure serving 10,000+ daily users",
        "Leading cross-functional teams in agile development cycles",
        "Establishing technical partnerships with international companies",
        "Mentoring junior developers and interns from local universities",
        "Driving product strategy and technical roadmap planning"
      ],
      achievements: [
        {
          title: "Secured $500K Seed Funding",
          description: "Led technical due diligence and product demonstrations for Series A preparation"
        },
        {
          title: "Built Nepal\'s First AI Chatbot Platform",
          description: "Deployed multilingual chatbot serving 50+ local businesses"
        },
        {
          title: "Team Growth Leadership",
          description: "Scaled engineering team from 3 to 12 members in 18 months"
        }
      ],
      technologies: ["Python", "React", "Node.js", "TensorFlow", "AWS", "Docker", "Kubernetes", "PostgreSQL", "Redis", "WebRTC"],
      metrics: [
        { value: "12", label: "Team Members" },
        { value: "50+", label: "Client Projects" },
        { value: "$500K", label: "Funding Raised" },
        { value: "10K+", label: "Daily Users" }
      ],
      testimonials: [
        {
          quote: "Anish\'s technical leadership and vision have been instrumental in our rapid growth. His ability to translate complex AI concepts into practical business solutions is remarkable.",
          author: "Rajesh Sharma",
          position: "CEO, Kampan Labs"
        }
      ],
      links: [
        { label: "Company Website", url: "https://kampanlabs.com", icon: "ExternalLink" },
        { label: "Product Demo", url: "#", icon: "Play" }
      ]
    },
    {
      id: 2,
      title: "Research Assistant",
      organization: "Tribhuvan University",
      location: "Kathmandu, Nepal",
      duration: "2022 - 2023",
      status: "completed",
      type: "research",
      logo: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=100&h=100&fit=crop&crop=center",
      summary: "Conducted cutting-edge research in AI-powered robotics, focusing on computer vision applications for autonomous navigation systems.",
      description: `Led research initiatives in the Computer Science department, focusing on the intersection of artificial intelligence and robotics. Collaborated with international research teams and published findings in peer-reviewed journals.\n\nDeveloped novel algorithms for real-time object detection and path planning, contributing to the advancement of autonomous systems research in Nepal.`,
      responsibilities: [
        "Designing and implementing computer vision algorithms for robot navigation",
        "Collaborating with international research teams on joint publications",
        "Mentoring undergraduate students in research methodologies",
        "Managing laboratory equipment and research infrastructure",
        "Presenting findings at national and international conferences"
      ],
      achievements: [
        {
          title: "Published 3 Research Papers",
          description: "First-author publications in IEEE conferences on AI and robotics"
        },
        {
          title: "Best Research Award",
          description: "Received university\'s outstanding research contribution award"
        },
        {
          title: "International Collaboration",
          description: "Established research partnerships with universities in Japan and Singapore"
        }
      ],
      technologies: ["Python", "OpenCV", "TensorFlow", "ROS", "MATLAB", "C++", "Arduino", "Raspberry Pi"],
      metrics: [
        { value: "3", label: "Publications" },
        { value: "15", label: "Citations" },
        { value: "5", label: "Conferences" },
        { value: "8", label: "Students Mentored" }
      ],
      testimonials: [
        {
          quote: "Anish demonstrated exceptional research capabilities and innovative thinking. His work on autonomous navigation has opened new possibilities for robotics research in our region.",
          author: "Dr. Pradeep Kumar",
          position: "Research Supervisor, TU"
        }
      ],
      links: [
        { label: "Research Papers", url: "#", icon: "FileText" },
        { label: "Lab Website", url: "#", icon: "ExternalLink" }
      ]
    },
    {
      id: 3,
      title: "Full-Stack Developer",
      organization: "TechSolutions Nepal",
      location: "Kathmandu, Nepal",
      duration: "2021 - 2022",
      status: "completed",
      type: "work",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
      summary: "Developed enterprise-level web applications for government and private sector clients, focusing on scalable architecture and user experience.",
      description: `Worked as a senior full-stack developer, leading the development of critical applications for Nepal's digital transformation initiatives. Collaborated with government agencies and private enterprises to deliver robust, scalable solutions.\n\nFocused on building secure, user-friendly applications that could handle high traffic loads while maintaining excellent performance and reliability.`,
      responsibilities: [
        "Developing full-stack web applications using modern frameworks",
        "Collaborating with UI/UX designers to implement responsive designs",
        "Optimizing application performance and database queries",
        "Implementing security best practices and data protection measures",
        "Leading code reviews and maintaining development standards"
      ],
      achievements: [
        {
          title: "Government Portal Launch",
          description: "Successfully launched citizen services portal serving 100K+ users"
        },
        {
          title: "Performance Optimization",
          description: "Improved application load times by 60% through optimization"
        },
        {
          title: "Security Implementation",
          description: "Implemented robust security measures with zero security incidents"
        }
      ],
      technologies: ["React", "Node.js", "Express", "MongoDB", "PostgreSQL", "AWS", "Docker", "Git", "Jest"],
      metrics: [
        { value: "8", label: "Projects Delivered" },
        { value: "100K+", label: "End Users" },
        { value: "99.9%", label: "Uptime" },
        { value: "60%", label: "Performance Gain" }
      ],
      testimonials: [
        {
          quote: "Anish consistently delivered high-quality code and showed excellent problem-solving skills. His technical expertise and professionalism made him an invaluable team member.",
          author: "Sita Rai",
          position: "Project Manager, TechSolutions"
        }
      ],
      links: [
        { label: "Portfolio", url: "#", icon: "Briefcase" }
      ]
    },
    {
      id: 4,
      title: "Computer Science Student",
      organization: "Tribhuvan University",
      location: "Kathmandu, Nepal",
      duration: "2019 - 2023",
      status: "completed",
      type: "education",
      logo: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=100&h=100&fit=crop&crop=center",
      summary: "Graduated with First Class Honors in Computer Science, specializing in Artificial Intelligence and Machine Learning with focus on practical applications.",
      description: `Completed Bachelor's degree in Computer Science with distinction, maintaining a strong academic record while actively participating in research projects and hackathons.\n\nSpecialized in AI/ML coursework and completed a thesis on autonomous robot navigation, which later became the foundation for my research work.`,
      responsibilities: [
        "Maintaining academic excellence across all computer science subjects",
        "Leading student programming clubs and organizing coding competitions",
        "Participating in national and international hackathons",
        "Conducting independent research projects",
        "Mentoring junior students in programming and project development"
      ],
      achievements: [
        {
          title: "First Class Honors",
          description: "Graduated with 3.8/4.0 GPA, ranking in top 5% of class"
        },
        {
          title: "Best Thesis Award",
          description: "Received department\'s best undergraduate thesis award"
        },
        {
          title: "Student Leadership",
          description: "Served as President of Computer Science Student Association"
        }
      ],
      technologies: ["Java", "Python", "C++", "JavaScript", "HTML/CSS", "MySQL", "Git", "Linux"],
      metrics: [
        { value: "3.8", label: "GPA" },
        { value: "5", label: "Hackathons Won" },
        { value: "15", label: "Projects" },
        { value: "Top 5%", label: "Class Rank" }
      ],
      testimonials: [
        {
          quote: "Anish was one of our most promising students, showing exceptional aptitude for both theoretical concepts and practical implementation. His leadership qualities were evident from early on.",
          author: "Prof. Ram Shrestha",
          position: "Head of Department, Computer Science"
        }
      ],
      links: [
        { label: "Thesis Paper", url: "#", icon: "FileText" },
        { label: "University Profile", url: "#", icon: "ExternalLink" }
      ]
    }
  ];

  // Mock skills data
  const skillsData = [
    {
      category: "programming",
      skills: [
        { name: "Python", level: 95, yearStarted: 2019, milestones: ["Django Expert", "ML Libraries", "Data Science"] },
        { name: "JavaScript", level: 90, yearStarted: 2020, milestones: ["React Mastery", "Node.js", "TypeScript"] },
        { name: "Java", level: 85, yearStarted: 2019, milestones: ["Spring Boot", "Microservices"] },
        { name: "C++", level: 80, yearStarted: 2019, milestones: ["System Programming", "Algorithms"] }
      ]
    },
    {
      category: "ai",
      skills: [
        { name: "Machine Learning", level: 92, yearStarted: 2020, milestones: ["Scikit-learn", "Model Deployment"] },
        { name: "Deep Learning", level: 88, yearStarted: 2021, milestones: ["TensorFlow", "PyTorch", "CNNs"] },
        { name: "Computer Vision", level: 85, yearStarted: 2021, milestones: ["OpenCV", "Object Detection"] },
        { name: "NLP", level: 82, yearStarted: 2022, milestones: ["Transformers", "BERT"] }
      ]
    },
    {
      category: "hardware",
      skills: [
        { name: "Arduino", level: 88, yearStarted: 2020, milestones: ["IoT Projects", "Sensors"] },
        { name: "Raspberry Pi", level: 85, yearStarted: 2020, milestones: ["Linux", "GPIO"] },
        { name: "Robotics", level: 80, yearStarted: 2021, milestones: ["ROS", "Navigation"] },
        { name: "PCB Design", level: 75, yearStarted: 2022, milestones: ["Eagle", "KiCad"] }
      ]
    },
    {
      category: "leadership",
      skills: [
        { name: "Team Management", level: 90, yearStarted: 2022, milestones: ["12+ Team Size", "Agile"] },
        { name: "Project Planning", level: 88, yearStarted: 2021, milestones: ["Scrum Master", "Roadmaps"] },
        { name: "Mentoring", level: 85, yearStarted: 2022, milestones: ["15+ Mentees", "Workshops"] },
        { name: "Public Speaking", level: 82, yearStarted: 2020, milestones: ["Conferences", "Presentations"] }
      ]
    }
  ];

  // Mock achievements data
  const achievementsData = [
    {
      id: 1,
      title: "Hackathon Champion",
      category: "hackathon",
      organization: "TechFest Nepal 2023",
      year: "2023",
      rarity: "legendary",
      description: "Won first place in Nepal\'s largest hackathon with an AI-powered solution for agricultural optimization.",
      impact: "Solution adopted by 3 agricultural cooperatives, impacting 500+ farmers.",
      skills: ["AI/ML", "React", "Python", "Team Leadership"]
    },
    {
      id: 2,
      title: "Research Excellence",
      category: "academic",
      organization: "Tribhuvan University",
      year: "2023",
      rarity: "rare",
      description: "Received the university\'s highest honor for undergraduate research contribution.",
      impact: "Research cited in 15+ international papers and presentations.",
      skills: ["Research", "AI", "Computer Vision", "Technical Writing"]
    },
    {
      id: 3,
      title: "Startup Founder",
      category: "startup",
      organization: "Kampan Labs",
      year: "2023",
      rarity: "legendary",
      description: "Co-founded and scaled Nepal's fastest-growing AI startup to 50+ clients.",
      impact: "Created 12 jobs and contributed to Nepal\'s tech ecosystem development.",
      skills: ["Entrepreneurship", "Leadership", "Product Development", "Fundraising"]
    },
    {
      id: 4,
      title: "Open Source Contributor",
      category: "research",
      organization: "GitHub",
      year: "2022",
      rarity: "common",
      description: "Contributed to major open-source projects with 1000+ stars combined.",
      impact: "Code used by developers worldwide, improving accessibility and performance.",
      skills: ["Open Source", "Collaboration", "Code Quality", "Documentation"]
    },
    {
      id: 5,
      title: "Student Leader",
      category: "leadership",
      organization: "CS Student Association",
      year: "2022",
      rarity: "rare",
      description: "Served as President, organizing events for 500+ students and improving department relations.",
      impact: "Increased student engagement by 40% and established industry partnerships.",
      skills: ["Leadership", "Event Management", "Communication", "Strategy"]
    },
    {
      id: 6,
      title: "Innovation Award",
      category: "hackathon",
      organization: "Smart City Challenge",
      year: "2022",
      rarity: "rare",
      description: "Developed IoT solution for traffic management, winning innovation category.",
      impact: "Prototype tested by Kathmandu Metropolitan City for implementation.",
      skills: ["IoT", "Hardware", "System Design", "Innovation"]
    }
  ];

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef?.current) {
        const scrollLeft = timelineRef?.current?.scrollLeft;
        const scrollWidth = timelineRef?.current?.scrollWidth - timelineRef?.current?.clientWidth;
        const progress = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0;
        setScrollProgress(progress);
      }
    };

    const timelineElement = timelineRef?.current;
    if (timelineElement) {
      timelineElement?.addEventListener('scroll', handleScroll);
      return () => timelineElement?.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Handle timeline navigation
  const handleTimelineNavigation = (index) => {
    setActiveIndex(index);
    if (timelineRef?.current) {
      const itemWidth = 320; // Approximate width of timeline item
      const scrollPosition = index * itemWidth;
      timelineRef?.current?.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  // Handle timeline item toggle
  const handleItemToggle = (experienceId) => {
    const index = experiences?.findIndex(exp => exp?.id === experienceId);
    if (index !== -1) {
      setActiveIndex(index);
    }
  };

  return (
    <>
      <Helmet>
        <title>Experience - Anish Pandey | Future Systems Architect</title>
        <meta name="description" content="Explore Anish Pandey's professional journey from academic excellence to startup leadership, featuring hackathon victories, research contributions, and real-world impact in Nepal's tech ecosystem." />
        <meta name="keywords" content="Anish Pandey, experience, career, startup founder, AI researcher, full-stack developer, Nepal tech, Kampan Labs" />
        <meta property="og:title" content="Experience - Anish Pandey | Future Systems Architect" />
        <meta property="og:description" content="Professional journey showcasing career progression from theoretical computer science to tangible robotic solutions, with leadership evolution and technical expertise." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Experience - Anish Pandey | Future Systems Architect" />
        <meta name="twitter:description" content="Career timeline featuring startup leadership, research excellence, and contributions to Nepal's emerging tech ecosystem." />
      </Helmet>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-24 pb-12 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
                  <Icon name="Briefcase" size={24} className="text-white" />
                </div>
                <h1 className="text-4xl lg:text-6xl font-space-grotesk font-bold text-text-primary">
                  Flight Log
                </h1>
              </div>
              
              <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
                Mission timeline documenting the evolution from academic excellence to startup leadership,
                <br className="hidden sm:block" />
                featuring hackathon victories and real-world impact across Nepal's tech ecosystem.
              </p>

              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="default"
                  iconName="Download"
                  iconPosition="left"
                  className="glow-primary"
                  onClick={() => setShowPrintView(true)}
                >
                  Download Resume
                </Button>
                <Button
                  variant="outline"
                  iconName="ExternalLink"
                  iconPosition="left"
                  className="border-primary/30 text-primary hover:bg-primary/10"
                >
                  View LinkedIn
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Timeline Progress Bar */}
        <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-primary">Mission Progress</span>
              <span className="text-sm text-text-secondary">{Math.round(scrollProgress)}% Complete</span>
            </div>
            <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                style={{ width: `${scrollProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* Main Timeline */}
        <section className="py-12 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Desktop Horizontal Timeline */}
            <div className="hidden lg:block">
              <div 
                ref={timelineRef}
                className="flex space-x-8 overflow-x-auto pb-8 scrollbar-thin scrollbar-track-surface scrollbar-thumb-primary"
                style={{ scrollbarWidth: 'thin' }}
              >
                {/* Timeline Line */}
                <div className="absolute top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-30"></div>
                
                {experiences?.map((experience, index) => (
                  <TimelineItem
                    key={experience?.id}
                    experience={experience}
                    index={index}
                    isActive={activeIndex === index}
                    onToggle={handleItemToggle}
                  />
                ))}
              </div>
            </div>

            {/* Mobile Vertical Timeline */}
            <div className="lg:hidden space-y-8">
              {experiences?.map((experience, index) => (
                <div key={experience?.id} className="relative">
                  {/* Vertical Line */}
                  {index < experiences?.length - 1 && (
                    <div className="absolute left-6 top-20 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent opacity-30"></div>
                  )}
                  
                  <TimelineItem
                    experience={experience}
                    index={index}
                    isActive={activeIndex === index}
                    onToggle={handleItemToggle}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills & Achievements Section */}
        <section className="py-12 px-6 lg:px-8 bg-surface/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Skills Progression */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <SkillProgression skills={skillsData} />
              </motion.div>

              {/* Achievement Badges */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <AchievementBadges achievements={achievementsData} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Career Stats */}
        <section className="py-12 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-panel rounded-xl p-8"
            >
              <h3 className="text-2xl font-space-grotesk font-bold text-text-primary text-center mb-8">
                Mission Statistics
              </h3>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">4+</div>
                  <div className="text-text-secondary">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">50+</div>
                  <div className="text-text-secondary">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success-green mb-2">12</div>
                  <div className="text-text-secondary">Team Members Led</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">5</div>
                  <div className="text-text-secondary">Hackathons Won</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Timeline Scrubber */}
        <TimelineScrubber
          experiences={experiences}
          activeIndex={activeIndex}
          onNavigate={handleTimelineNavigation}
        />

        {/* Printable Timeline Modal */}
        <AnimatePresence>
          {showPrintView && (
            <PrintableTimeline
              experiences={experiences}
              onClose={() => setShowPrintView(false)}
            />
          )}
        </AnimatePresence>

        {/* Floating Particles */}
        <div className="fixed inset-0 pointer-events-none z-10">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/20 rounded-full animate-particle-float"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-accent/30 rounded-full animate-particle-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-primary/15 rounded-full animate-particle-float" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </>
  );
};

export default Experience;
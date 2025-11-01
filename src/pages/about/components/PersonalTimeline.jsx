import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PersonalTimeline = () => {
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  const timelineData = [
    {
      id: 'foundation',
      year: '2019',
      title: 'Foundations of Curiosity',
      category: 'Early Journey',
      icon: 'Lightbulb',
      color: 'from-primary to-accent',
      description:
        'Discovered a passion for robotics and AI while experimenting with Arduino and Python. Built my first autonomous robot and realized the power of code in shaping the physical world.',
      achievements: [
        'Built first IoT and Arduino-based robot',
        'Explored Python automation and basic ML models',
        'Won regional science fair with embedded systems project',
        'Started sharing open-source code on GitHub',
      ],
      image:
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
      stats: { projects: 3, languages: 2, awards: 1 },
    },
    {
      id: 'caldwell-start',
      year: '2023',
      title: 'Caldwell Robotics & Makerspace',
      category: 'Leadership',
      icon: 'Cpu',
      color: 'from-accent to-professional-blue',
      description:
        'Founded Caldwell Robotics and the university Makerspace, creating a hub for 70+ students to collaborate on AI, embedded systems, and design. Established partnerships to bring fabrication resources to campus.',
      achievements: [
        'Founded Caldwell Robotics (70+ active members)',
        'Secured funding for 3D printers, CNC machines, and electronics lab',
        'Hosted the first university-wide Robot Soccer competition',
        'Mentored 6+ student projects in AI, firmware, and design',
      ],
      image:
        'https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=400&h=300&fit=crop',
      stats: { members: 70, events: 5, mentees: 6 },
    },
    {
      id: 'hackathon-success',
      year: '2024',
      title: 'Hackathon Success & National Recognition',
      category: 'Achievement',
      icon: 'Trophy',
      color: 'from-professional-blue to-success-green',
      description:
        'Earned national recognition by winning and placing in major hackathons like HackNJIT, CougarHacks, and HackMIT. Built impactful, research-driven solutions in assistive technology, AI, and robotics.',
      achievements: [
        '🥇 1st Place — HackNYU 2025 (Dristi: smart VUI for the visually impaired)',
        '🥈 2nd Place — HackNJIT 2024 (Gamify.Work gesture-controlled robotic arm)',
        '🏆 1st Place — CougarHacks 2024',
        '🏅 Finalist — HackMIT 2025 (Top 10 of 365 projects)',
      ],
      image:
        'https://images.unsplash.com/photo-1581092334936-1bb97b7c95a8?w=400&h=300&fit=crop',
      stats: { hackathons: 5, wins: 3, finalists: 2 },
    },
    {
      id: 'google-nyu',
      year: '2025',
      title: 'Google × NYU Tandon — Dristi Project',
      category: 'Professional',
      icon: 'Code',
      color: 'from-success-green to-primary',
      description:
        'Led full-stack development for Dristi, a real-time wearable assistant for the visually impaired. Integrated PyTorch, Google Maps API, and sensor fusion into a production-ready system at HACKNYU 2025.',
      achievements: [
        'Led team of 4 to win HackNYU 2025 (1st of 650+ participants)',
        'Improved obstacle detection by 80% via async ML pipeline',
        'Integrated emergency alert via SINCH API, reducing latency 45%',
        'Deployed backend using AWS RDS and Flask for secure storage',
      ],
      image:
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop',
      stats: { accuracy: '80%', latency: '-45%', participants: 650 },
    },
    {
      id: 'lura-health',
      year: '2024',
      title: 'Lura Health — HAX Internship',
      category: 'Internship',
      icon: 'FlaskConical',
      color: 'from-primary to-accent',
      description:
        'Worked at Lura Health (HAX Accelerator) as a Software Engineer Intern, developing embedded communication firmware and AI-based analytics pipelines for health sensors.',
      achievements: [
        'Optimized BLE firmware in C for +30% data throughput',
        'Developed RAG-based recommendation engine using ChromaDB & OpenAI embeddings',
        'Automated sensor log parsing with pandas for 2x faster debugging',
        'Created FFT-based MATLAB signal processing model for calibration',
      ],
      image:
        'https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=400&h=300&fit=crop',
      stats: { throughput: '+30%', efficiency: '2x', accuracy: '98%' },
    },
    {
      id: 'uav-research',
      year: '2025',
      title: 'Autonomous UAV Research — Caldwell University',
      category: 'Research',
      icon: 'Drone',
      color: 'from-accent to-primary',
      description:
        'Conducting undergraduate ML research in UAV autonomy, developing computer vision segmentation and path planning algorithms that increase precision in aerial spraying and mapping.',
      achievements: [
        'Achieved 97% soil-vs-vegetation classification accuracy',
        'Implemented LiDAR SLAM for unstructured terrain navigation (+85% reliability)',
        'Developed GPS transformation pipeline with sub-meter precision',
        'Cut redundant coverage passes by 90% using cluster detection',
      ],
      image:
        'https://images.unsplash.com/photo-1602084117929-894e83b44b9b?w=400&h=300&fit=crop',
      stats: { accuracy: '97%', precision: '1m', efficiency: '+30%' },
    },
    {
      id: 'kampan-labs',
      year: '2025',
      title: 'Kampan Labs — Building Nepal’s Tech Future',
      category: 'Entrepreneurship',
      icon: 'Rocket',
      color: 'from-professional-blue to-accent',
      description:
        'Founded Kampan Labs, an embedded systems startup and NGO building scalable tech for transportation and agriculture. Raised NPR 1.1 crore (~$80,000) and deployed national-scale data systems.',
      achievements: [
        'Raised NPR 1.1 crore (~$80,000) in seed funding',
        'Developed Sawari — Nepal’s national transport management system for 2M+ users',
        'Built real-time transit data API with 55% faster route search',
        'Led Agile team of 12 engineers; improved velocity by 35%',
      ],
      image:
        'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=400&h=300&fit=crop',
      stats: { funding: '$80K', users: '2M+', team: 12 },
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-surface relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary via-transparent to-accent"></div>
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
            My <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">Journey</span> in Innovation
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            From building my first robot to founding Kampan Labs — here’s a timeline of learning, leading, and shaping the future through AI, hardware, and systems design.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-accent to-primary opacity-30"></div>

          <div className="space-y-16">
            {timelineData?.map((milestone, index) => (
              <motion.div
                key={milestone?.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Content Card */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass-panel p-6 rounded-2xl cursor-pointer hover:glow-primary transition-all duration-300"
                    onClick={() => setSelectedMilestone(selectedMilestone === milestone?.id ? null : milestone?.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${milestone?.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon name={milestone?.icon} size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-2xl font-space-grotesk font-bold text-primary">{milestone?.year}</span>
                          <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">{milestone?.category}</span>
                        </div>
                        <h3 className="text-xl font-space-grotesk font-bold text-text-primary mb-3">{milestone?.title}</h3>
                        <p className="text-text-secondary text-sm leading-relaxed mb-4">{milestone?.description}</p>
                        <div className="flex flex-wrap gap-4 text-xs">
                          {Object.entries(milestone?.stats)?.map(([key, value]) => (
                            <div key={key} className="flex items-center space-x-1">
                              <span className="text-text-secondary capitalize">{key?.replace('_', ' ')}:</span>
                              <span className="text-primary font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Central Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full border-4 border-background z-10">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    className="w-full h-full rounded-full bg-gradient-to-r from-primary to-accent opacity-50"
                  />
                </div>

                {/* Year Badge */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pl-8' : 'pr-8'} flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className="glass-panel px-4 py-2 rounded-lg">
                    <span className="text-sm font-mono text-text-secondary">{milestone?.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedMilestone && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedMilestone(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="glass-panel p-8 rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto glow-primary"
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const milestone = timelineData.find((m) => m.id === selectedMilestone);
                  if (!milestone) return null;
                  return (
                    <div>
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${milestone.color} flex items-center justify-center`}>
                            <Icon name={milestone.icon} size={28} className="text-white" />
                          </div>
                          <div>
                            <h3 className="text-3xl font-space-grotesk font-bold text-text-primary">{milestone.title}</h3>
                            <div className="flex items-center space-x-3 mt-2">
                              <span className="text-xl font-mono text-primary">{milestone.year}</span>
                              <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full">{milestone.category}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedMilestone(null)}
                          className="w-10 h-10 rounded-full bg-surface hover:bg-primary/20 flex items-center justify-center transition-colors duration-300"
                        >
                          <Icon name="X" size={20} className="text-text-secondary hover:text-primary" />
                        </button>
                      </div>

                      <div className="grid lg:grid-cols-2 gap-8">
                        <div>
                          <div className="aspect-video rounded-xl overflow-hidden mb-6">
                            <Image src={milestone.image} alt={milestone.title} className="w-full h-full object-cover" />
                          </div>
                          <p className="text-text-secondary leading-relaxed mb-6">{milestone.description}</p>
                          <div className="grid grid-cols-2 gap-4">
                            {Object.entries(milestone.stats).map(([key, value]) => (
                              <div key={key} className="bg-surface p-4 rounded-xl">
                                <div className="text-2xl font-space-grotesk font-bold text-primary mb-1">{value}</div>
                                <div className="text-sm text-text-secondary capitalize">{key.replace('_', ' ')}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xl font-space-grotesk font-bold text-text-primary mb-4">Key Achievements</h4>
                          <div className="space-y-3">
                            {milestone.achievements.map((achievement, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                className="flex items-start space-x-3"
                              >
                                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <Icon name="Check" size={14} className="text-primary" />
                                </div>
                                <span className="text-text-secondary">{achievement}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PersonalTimeline;

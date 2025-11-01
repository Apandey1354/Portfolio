import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'technical', label: 'Technical Details', icon: 'Code' },
    { id: 'architecture', label: 'Architecture', icon: 'Layers' },
    { id: 'impact', label: 'Impact & Results', icon: 'TrendingUp' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-space-grotesk font-semibold text-text-primary mb-3">Problem Statement</h4>
              <p className="text-text-secondary leading-relaxed">{project?.problemStatement}</p>
            </div>
            <div>
              <h4 className="text-lg font-space-grotesk font-semibold text-text-primary mb-3">Solution Overview</h4>
              <p className="text-text-secondary leading-relaxed">{project?.solutionOverview}</p>
            </div>
            <div>
              <h4 className="text-lg font-space-grotesk font-semibold text-text-primary mb-3">Key Features</h4>
              <ul className="space-y-2">
                {project?.keyFeatures?.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Icon name="CheckCircle" size={16} className="text-primary mt-1 flex-shrink-0" />
                    <span className="text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'technical':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-space-grotesk font-semibold text-text-primary mb-3">Technology Stack</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {project?.technologies?.map((tech, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 bg-surface rounded-lg border border-border">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-text-primary text-sm font-medium">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-space-grotesk font-semibold text-text-primary mb-3">Implementation Challenges</h4>
              <div className="space-y-3">
                {project?.challenges?.map((challenge, index) => (
                  <div key={index} className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
                    <h5 className="font-medium text-warning mb-2">{challenge?.title}</h5>
                    <p className="text-text-secondary text-sm">{challenge?.description}</p>
                    <p className="text-primary text-sm mt-2 font-medium">Solution: {challenge?.solution}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-space-grotesk font-semibold text-text-primary mb-3">Code Snippet</h4>
              <div className="bg-background border border-border rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-text-primary whitespace-pre-wrap">{project?.codeSnippet}</pre>
              </div>
            </div>
          </div>
        );
      case 'architecture':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-space-grotesk font-semibold text-text-primary mb-3">System Architecture</h4>
              <div className="bg-surface border border-border rounded-lg p-6">
                <Image
                  src={project?.architectureDiagram}
                  alt="System Architecture Diagram"
                  className="w-full h-64 object-contain"
                />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-space-grotesk font-semibold text-text-primary mb-3">Architecture Components</h4>
              <div className="grid gap-4">
                {project?.architectureComponents?.map((component, index) => (
                  <div key={index} className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon name="Box" size={16} className="text-primary" />
                      <h5 className="font-medium text-text-primary">{component?.name}</h5>
                    </div>
                    <p className="text-text-secondary text-sm">{component?.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'impact':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-space-grotesk font-semibold text-text-primary mb-3">Project Metrics</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project?.metrics?.map((metric, index) => (
                  <div key={index} className="text-center p-4 bg-surface border border-border rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-1">{metric?.value}</div>
                    <div className="text-xs text-text-secondary">{metric?.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-space-grotesk font-semibold text-text-primary mb-3">Impact Summary</h4>
              <p className="text-text-secondary leading-relaxed">{project?.impactSummary}</p>
            </div>
            <div>
              <h4 className="text-lg font-space-grotesk font-semibold text-text-primary mb-3">Lessons Learned</h4>
              <ul className="space-y-2">
                {project?.lessonsLearned?.map((lesson, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Icon name="Lightbulb" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-text-secondary">{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
          
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl max-h-[90vh] glass-panel rounded-xl overflow-hidden"
            onClick={(e) => e?.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Icon name="Rocket" size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-space-grotesk font-bold text-text-primary">{project?.title}</h2>
                  <p className="text-text-secondary">{project?.category} • {project?.year}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                iconName="X"
                onClick={onClose}
                className="text-text-secondary hover:text-text-primary"
              />
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`
                    flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap
                    ${activeTab === tab?.id 
                      ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-text-primary'
                    }
                  `}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-6 max-h-96 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderTabContent()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-border">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="Star" size={16} className="text-warning" />
                  <span>{project?.stars} stars</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="GitFork" size={16} />
                  <span>{project?.forks} forks</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="Users" size={16} />
                  <span>{project?.teamSize} team members</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="Github"
                  iconPosition="left"
                  onClick={() => window.open(project?.githubUrl, '_blank')}
                >
                  View Code
                </Button>
                {project?.liveUrl && (
                  <Button
                    variant="default"
                    iconName="ExternalLink"
                    iconPosition="left"
                    onClick={() => window.open(project?.liveUrl, '_blank')}
                    className="glow-primary"
                  >
                    Live Demo
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
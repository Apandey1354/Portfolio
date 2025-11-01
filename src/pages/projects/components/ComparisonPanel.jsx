import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ComparisonPanel = ({ selectedProjects, onRemoveProject, onClearAll, isOpen, onToggle }) => {
  if (selectedProjects?.length === 0) return null;

  const ComparisonRow = ({ label, getValue, icon }) => (
    <div className="py-3 border-b border-border">
      <div className="flex items-center space-x-2 mb-2">
        <Icon name={icon} size={16} className="text-primary" />
        <span className="text-sm font-medium text-text-primary">{label}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {selectedProjects?.map((project, index) => (
          <div key={project?.id} className="text-sm text-text-secondary">
            {getValue(project)}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Comparison Toggle Button */}
      <AnimatePresence>
        {selectedProjects?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <Button
              variant="default"
              iconName="GitCompare"
              iconPosition="left"
              onClick={onToggle}
              className="glow-primary shadow-lg"
            >
              Compare ({selectedProjects?.length})
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Comparison Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onToggle}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
            
            {/* Panel */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl max-h-[90vh] glass-panel rounded-xl overflow-hidden"
              onClick={(e) => e?.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <Icon name="GitCompare" size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-space-grotesk font-bold text-text-primary">
                      Project Comparison
                    </h2>
                    <p className="text-text-secondary text-sm">
                      Comparing {selectedProjects?.length} projects side by side
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Trash2"
                    onClick={onClearAll}
                    className="text-text-secondary hover:text-error"
                  >
                    Clear All
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    iconName="X"
                    onClick={onToggle}
                    className="text-text-secondary hover:text-text-primary"
                  />
                </div>
              </div>

              {/* Project Headers */}
              <div className="p-6 border-b border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedProjects?.map((project, index) => (
                    <div key={project?.id} className="relative">
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <Image
                            src={project?.image}
                            alt={project?.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => onRemoveProject(project?.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-error text-white rounded-full flex items-center justify-center hover:bg-error/80 transition-colors"
                          >
                            <Icon name="X" size={12} />
                          </button>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-space-grotesk font-semibold text-text-primary">
                            {project?.title}
                          </h3>
                          <p className="text-text-secondary text-sm mt-1">
                            {project?.category} • {project?.year}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className={`
                              px-2 py-1 rounded-full text-xs
                              ${project?.status === 'Live' ? 'bg-success/20 text-success' :
                                project?.status === 'In Progress'? 'bg-warning/20 text-warning' : 'bg-primary/20 text-primary'
                              }
                            `}>
                              {project?.status}
                            </span>
                            <div className="flex space-x-1">
                              {[...Array(5)]?.map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    i < project?.complexity 
                                      ? 'bg-primary' :'bg-muted'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comparison Content */}
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="space-y-1">
                  <ComparisonRow
                    label="Description"
                    icon="FileText"
                    getValue={(project) => project?.description}
                  />
                  
                  <ComparisonRow
                    label="Technologies"
                    icon="Code"
                    getValue={(project) => (
                      <div className="flex flex-wrap gap-1">
                        {project?.technologies?.slice(0, 6)?.map((tech, i) => (
                          <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                            {tech}
                          </span>
                        ))}
                        {project?.technologies?.length > 6 && (
                          <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded">
                            +{project?.technologies?.length - 6}
                          </span>
                        )}
                      </div>
                    )}
                  />
                  
                  <ComparisonRow
                    label="Team Size"
                    icon="Users"
                    getValue={(project) => `${project?.teamSize} members`}
                  />
                  
                  <ComparisonRow
                    label="GitHub Stats"
                    icon="Github"
                    getValue={(project) => (
                      <div className="flex items-center space-x-4 text-xs">
                        <div className="flex items-center space-x-1">
                          <Icon name="Star" size={12} className="text-warning" />
                          <span>{project?.stars}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="GitFork" size={12} />
                          <span>{project?.forks}</span>
                        </div>
                      </div>
                    )}
                  />
                  
                  <ComparisonRow
                    label="Impact Score"
                    icon="TrendingUp"
                    getValue={(project) => (
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                            style={{ width: `${project?.impact}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-primary">{project?.impact}%</span>
                      </div>
                    )}
                  />
                  
                  <ComparisonRow
                    label="Key Features"
                    icon="CheckCircle"
                    getValue={(project) => (
                      <ul className="space-y-1">
                        {project?.keyFeatures?.slice(0, 3)?.map((feature, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <Icon name="Dot" size={12} className="text-primary mt-1 flex-shrink-0" />
                            <span className="text-xs">{feature}</span>
                          </li>
                        ))}
                        {project?.keyFeatures?.length > 3 && (
                          <li className="text-xs text-text-secondary">
                            +{project?.keyFeatures?.length - 3} more features
                          </li>
                        )}
                      </ul>
                    )}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between p-6 border-t border-border">
                <div className="text-sm text-text-secondary">
                  Select up to 3 projects for detailed comparison
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    iconName="Download"
                    iconPosition="left"
                    onClick={() => {
                      // Mock download comparison report
                      console.log('Downloading comparison report...');
                    }}
                  >
                    Export Report
                  </Button>
                  <Button
                    variant="default"
                    iconName="Share"
                    iconPosition="left"
                    className="glow-primary"
                    onClick={() => {
                      // Mock share functionality
                      navigator.clipboard?.writeText(window.location?.href);
                    }}
                  >
                    Share Comparison
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ComparisonPanel;
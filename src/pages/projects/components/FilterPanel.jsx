import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  searchQuery, 
  onSearchChange, 
  isOpen, 
  onToggle,
  projectCount 
}) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Projects', icon: 'Grid3x3', count: projectCount?.all },
    { id: 'web', label: 'Web Development', icon: 'Globe', count: projectCount?.web },
    // { id: 'mobile', label: 'Mobile Apps', icon: 'Smartphone', count: projectCount?.mobile },
    { id: 'ai', label: 'AI & ML', icon: 'Brain', count: projectCount?.ai },
    { id: 'robotics', label: 'Robotics', icon: 'Bot', count: projectCount?.robotics },
    { id: 'iot', label: 'IoT & Hardware', icon: 'Cpu', count: projectCount?.iot }
  ];

  const technologies = [
    'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'MongoDB',
    'PostgreSQL', 'Docker', 'AWS', 'TensorFlow', 'PyTorch', 'Arduino',
    'Raspberry Pi', 'Flutter', 'React Native', 'Next.js', 'Express.js'
  ];

  const complexityLevels = [
    { id: 1, label: 'Beginner', color: 'text-success' },
    { id: 2, label: 'Intermediate', color: 'text-warning' },
    { id: 3, label: 'Advanced', color: 'text-error' },
    { id: 4, label: 'Expert', color: 'text-accent' },
    { id: 5, label: 'Master', color: 'text-primary' }
  ];

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    onFilterChange({ ...filters, category: categoryId });
  };

  const handleTechnologyToggle = (tech) => {
    const updatedTechs = filters?.technologies?.includes(tech)
      ? filters?.technologies?.filter(t => t !== tech)
      : [...filters?.technologies, tech];
    onFilterChange({ ...filters, technologies: updatedTechs });
  };

  const handleComplexityToggle = (level) => {
    const updatedLevels = filters?.complexity?.includes(level)
      ? filters?.complexity?.filter(l => l !== level)
      : [...filters?.complexity, level];
    onFilterChange({ ...filters, complexity: updatedLevels });
  };

  const clearAllFilters = () => {
    setActiveCategory('all');
    onFilterChange({
      category: 'all',
      technologies: [],
      complexity: [],
      status: 'all'
    });
    onSearchChange('');
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          iconName="Filter"
          iconPosition="left"
          onClick={onToggle}
          fullWidth
          className="justify-center"
        >
          Filters & Search
        </Button>
      </div>
      {/* Filter Panel */}
      <AnimatePresence>
        {(isOpen || window.innerWidth >= 1024) && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className={`
              ${isOpen ? 'fixed inset-0 z-40 lg:relative lg:inset-auto' : 'hidden lg:block'}
              lg:w-80 bg-background lg:bg-transparent
            `}
          >
            {/* Mobile Backdrop */}
            <div 
              className="lg:hidden absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={onToggle}
            />

            {/* Filter Content */}
            <div className={`
              relative lg:sticky lg:top-24 h-full lg:h-auto
              ${isOpen ? 'w-80 ml-auto' : 'w-full'}
              glass-panel lg:glass-panel p-6 overflow-y-auto
            `}>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-space-grotesk font-semibold text-text-primary">
                  Mission Filters
                </h3>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="RotateCcw"
                    onClick={clearAllFilters}
                    className="text-text-secondary hover:text-primary"
                  >
                    Clear
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    iconName="X"
                    onClick={onToggle}
                    className="lg:hidden text-text-secondary hover:text-primary"
                  />
                </div>
              </div>

              {/* Search */}
              <div className="mb-6">
                <Input
                  type="search"
                  placeholder="Search projects, technologies..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e?.target?.value)}
                  className="w-full"
                />
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center">
                  <Icon name="Folder" size={16} className="mr-2" />
                  Project Categories
                </h4>
                <div className="space-y-2">
                  {categories?.map((category) => (
                    <button
                      key={category?.id}
                      onClick={() => handleCategoryChange(category?.id)}
                      className={`
                        w-full flex items-center justify-between p-3 rounded-lg transition-all
                        ${activeCategory === category?.id
                          ? 'bg-primary/10 text-primary border border-primary/20' :'text-text-secondary hover:text-text-primary hover:bg-surface'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name={category?.icon} size={16} />
                        <span className="text-sm font-medium">{category?.label}</span>
                      </div>
                      <span className={`
                        text-xs px-2 py-1 rounded-full
                        ${activeCategory === category?.id
                          ? 'bg-primary/20 text-primary' :'bg-muted text-text-secondary'
                        }
                      `}>
                        {category?.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center">
                  <Icon name="Code" size={16} className="mr-2" />
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {technologies?.map((tech) => (
                    <button
                      key={tech}
                      onClick={() => handleTechnologyToggle(tech)}
                      className={`
                        px-3 py-1 text-xs rounded-full border transition-all
                        ${filters?.technologies?.includes(tech)
                          ? 'bg-primary/10 text-primary border-primary/20' :'text-text-secondary border-border hover:text-text-primary hover:border-primary/20'
                        }
                      `}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>

              {/* Complexity */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center">
                  <Icon name="BarChart3" size={16} className="mr-2" />
                  Complexity Level
                </h4>
                <div className="space-y-2">
                  {complexityLevels?.map((level) => (
                    <button
                      key={level?.id}
                      onClick={() => handleComplexityToggle(level?.id)}
                      className={`
                        w-full flex items-center justify-between p-2 rounded-lg transition-all
                        ${filters?.complexity?.includes(level?.id)
                          ? 'bg-primary/10 text-primary border border-primary/20' :'text-text-secondary hover:text-text-primary hover:bg-surface'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          {[...Array(5)]?.map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < level?.id 
                                  ? level?.color?.replace('text-', 'bg-')
                                  : 'bg-muted'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm">{level?.label}</span>
                      </div>
                      {filters?.complexity?.includes(level?.id) && (
                        <Icon name="Check" size={14} className="text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center">
                  <Icon name="Activity" size={16} className="mr-2" />
                  Project Status
                </h4>
                <div className="space-y-2">
                  {['all', 'Live', 'In Progress', 'Completed']?.map((status) => (
                    <button
                      key={status}
                      onClick={() => onFilterChange({ ...filters, status })}
                      className={`
                        w-full flex items-center space-x-3 p-2 rounded-lg transition-all text-left
                        ${filters?.status === status
                          ? 'bg-primary/10 text-primary border border-primary/20' :'text-text-secondary hover:text-text-primary hover:bg-surface'
                        }
                      `}
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        status === 'Live' ? 'bg-success' :
                        status === 'In Progress' ? 'bg-warning' :
                        status === 'Completed'? 'bg-primary' : 'bg-muted'
                      }`} />
                      <span className="text-sm capitalize">{status === 'all' ? 'All Status' : status}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Filters Summary */}
              {(filters?.technologies?.length > 0 || filters?.complexity?.length > 0 || filters?.status !== 'all' || activeCategory !== 'all') && (
                <div className="pt-4 border-t border-border">
                  <h4 className="text-sm font-medium text-text-primary mb-3">Active Filters</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeCategory !== 'all' && (
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded border border-primary/20">
                        {categories?.find(c => c?.id === activeCategory)?.label}
                      </span>
                    )}
                    {filters?.technologies?.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-accent/10 text-accent text-xs rounded border border-accent/20">
                        {tech}
                      </span>
                    ))}
                    {filters?.complexity?.map((level) => (
                      <span key={level} className="px-2 py-1 bg-warning/10 text-warning text-xs rounded border border-warning/20">
                        Level {level}
                      </span>
                    ))}
                    {filters?.status !== 'all' && (
                      <span className="px-2 py-1 bg-success/10 text-success text-xs rounded border border-success/20">
                        {filters?.status}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterPanel;
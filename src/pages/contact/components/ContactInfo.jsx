import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactInfo = () => {
  const contactMethods = [
    {
      id: 'email',
      icon: 'Mail',
      label: 'Email',
      value: 'anish.pandey@kampanlabs.com',
      description: 'Primary communication channel',
      action: 'mailto:anish.pandey@kampanlabs.com',
      responseTime: '< 24 hours'
    },
    {
      id: 'linkedin',
      icon: 'Linkedin',
      label: 'LinkedIn',
      value: '/in/anishpandey',
      description: 'Professional networking',
      action: 'https://linkedin.com/in/anishpandey',
      responseTime: '< 48 hours'
    },
    {
      id: 'github',
      icon: 'Github',
      label: 'GitHub',
      value: '@anishpandey',
      description: 'Code collaboration',
      action: 'https://github.com/anishpandey',
      responseTime: 'Variable'
    },
    {
      id: 'phone',
      icon: 'Phone',
      label: 'Phone',
      value: '+977-98XX-XXXXX',
      description: 'Direct communication',
      action: 'tel:+977-98XX-XXXXX',
      responseTime: 'By appointment'
    }
  ];

  const quickStats = [
    { label: 'Response Rate', value: '98%', icon: 'TrendingUp' },
    { label: 'Avg Response Time', value: '< 12h', icon: 'Clock' },
    { label: 'Active Projects', value: '5+', icon: 'Zap' },
    { label: 'Collaboration Score', value: '4.9/5', icon: 'Star' }
  ];

  const availability = {
    status: 'Available',
    timezone: 'NPT (UTC+5:45)',
    workingHours: '9:00 AM - 6:00 PM',
    preferredDays: 'Monday - Friday',
    nextAvailable: 'Today'
  };

  return (
    <div className="space-y-8">
      {/* Status Card */}
      <div className="glass-panel p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-success-green rounded-full animate-pulse"></div>
            <h3 className="text-lg font-space-grotesk font-semibold text-text-primary">
              System Status
            </h3>
          </div>
          <div className="text-sm text-success-green font-medium">
            {availability?.status}
          </div>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-text-secondary">Timezone:</span>
            <span className="text-text-primary">{availability?.timezone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Working Hours:</span>
            <span className="text-text-primary">{availability?.workingHours}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Next Available:</span>
            <span className="text-primary">{availability?.nextAvailable}</span>
          </div>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        {quickStats?.map((stat) => (
          <div key={stat?.label} className="glass-panel p-4 rounded-xl text-center">
            <Icon name={stat?.icon} size={20} className="text-primary mx-auto mb-2" />
            <div className="text-lg font-space-grotesk font-bold text-text-primary">
              {stat?.value}
            </div>
            <div className="text-xs text-text-secondary">
              {stat?.label}
            </div>
          </div>
        ))}
      </div>
      {/* Contact Methods */}
      <div className="space-y-4">
        <h3 className="text-lg font-space-grotesk font-semibold text-text-primary mb-4">
          Communication Channels
        </h3>
        
        {contactMethods?.map((method) => (
          <div key={method?.id} className="glass-panel p-4 rounded-xl hover:glow-primary transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Icon name={method?.icon} size={18} className="text-primary" />
                </div>
                <div>
                  <div className="font-medium text-text-primary">{method?.label}</div>
                  <div className="text-sm text-text-secondary">{method?.description}</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="ExternalLink"
                iconPosition="right"
                onClick={() => window.open(method?.action, '_blank')}
                className="text-primary hover:bg-primary/10"
              >
                Connect
              </Button>
            </div>
            
            <div className="mt-3 pt-3 border-t border-border/50">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Contact:</span>
                <span className="text-text-primary font-mono">{method?.value}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-text-secondary">Response Time:</span>
                <span className="text-primary">{method?.responseTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Emergency Contact */}
      <div className="glass-panel p-4 rounded-xl border border-accent/30">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="AlertTriangle" size={16} className="text-accent" />
          <span className="text-sm font-medium text-accent">Priority Contact</span>
        </div>
        <p className="text-xs text-text-secondary">
          For urgent technical collaborations or time-sensitive opportunities, 
          use the priority email: <span className="text-primary font-mono">urgent@kampanlabs.com</span>
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;
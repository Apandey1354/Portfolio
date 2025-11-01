import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ContactForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: '',
    projectScope: '',
    timeline: '',
    budget: '',
    message: '',
    preferredContact: '',
    newsletter: false,
    terms: false
  });

  const [errors, setErrors] = useState({});

  const inquiryTypes = [
    { value: 'collaboration', label: 'Technical Collaboration' },
    { value: 'hiring', label: 'Job Opportunity' },
    { value: 'consulting', label: 'Consulting Services' },
    { value: 'speaking', label: 'Speaking Engagement' },
    { value: 'research', label: 'Research Partnership' },
    { value: 'startup', label: 'Startup Opportunity' },
    { value: 'other', label: 'Other Inquiry' }
  ];

  const timelineOptions = [
    { value: 'immediate', label: 'Immediate (Within 1 week)' },
    { value: 'short', label: 'Short-term (1-4 weeks)' },
    { value: 'medium', label: 'Medium-term (1-3 months)' },
    { value: 'long', label: 'Long-term (3+ months)' },
    { value: 'flexible', label: 'Flexible Timeline' }
  ];

  const budgetRanges = [
    { value: 'under-5k', label: 'Under $5,000' },
    { value: '5k-15k', label: '$5,000 - $15,000' },
    { value: '15k-50k', label: '$15,000 - $50,000' },
    { value: '50k-plus', label: '$50,000+' },
    { value: 'discuss', label: 'Let\'s Discuss' }
  ];

  const contactMethods = [
    { value: 'email', label: 'Email Communication' },
    { value: 'phone', label: 'Phone/Video Call' },
    { value: 'linkedin', label: 'LinkedIn Message' },
    { value: 'meeting', label: 'In-person Meeting' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) newErrors.name = 'Name is required';
    if (!formData?.email?.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/?.test(formData?.email)) newErrors.email = 'Invalid email format';
    if (!formData?.inquiryType) newErrors.inquiryType = 'Please select inquiry type';
    if (!formData?.message?.trim()) newErrors.message = 'Message is required';
    if (!formData?.terms) newErrors.terms = 'Please accept terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="glass-panel p-8 rounded-2xl">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
          <Icon name="Send" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-space-grotesk font-semibold text-text-primary">
            Mission Brief
          </h3>
          <p className="text-sm text-text-secondary">
            Initiate collaboration protocol
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your name"
            value={formData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            error={errors?.name}
            required
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="your.email@domain.com"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
          />
        </div>

        <Input
          label="Company/Organization"
          type="text"
          placeholder="Your company or organization"
          value={formData?.company}
          onChange={(e) => handleInputChange('company', e?.target?.value)}
          description="Optional - helps me understand context"
        />

        {/* Inquiry Details */}
        <Select
          label="Inquiry Type"
          placeholder="Select inquiry type"
          options={inquiryTypes}
          value={formData?.inquiryType}
          onChange={(value) => handleInputChange('inquiryType', value)}
          error={errors?.inquiryType}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Project Timeline"
            placeholder="Select timeline"
            options={timelineOptions}
            value={formData?.timeline}
            onChange={(value) => handleInputChange('timeline', value)}
          />
          <Select
            label="Budget Range"
            placeholder="Select budget range"
            options={budgetRanges}
            value={formData?.budget}
            onChange={(value) => handleInputChange('budget', value)}
          />
        </div>

        <Input
          label="Project Scope"
          type="text"
          placeholder="Brief description of project scope"
          value={formData?.projectScope}
          onChange={(e) => handleInputChange('projectScope', e?.target?.value)}
          description="What kind of project or collaboration are you envisioning?"
        />

        {/* Message */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            Detailed Message <span className="text-red-400">*</span>
          </label>
          <textarea
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            rows={5}
            placeholder="Tell me more about your project, goals, and how we might collaborate..."
            value={formData?.message}
            onChange={(e) => handleInputChange('message', e?.target?.value)}
          />
          {errors?.message && (
            <p className="text-sm text-red-400">{errors?.message}</p>
          )}
        </div>

        {/* Contact Preferences */}
        <Select
          label="Preferred Contact Method"
          placeholder="How would you like me to respond?"
          options={contactMethods}
          value={formData?.preferredContact}
          onChange={(value) => handleInputChange('preferredContact', value)}
          description="I typically respond within 24 hours"
        />

        {/* Checkboxes */}
        <div className="space-y-4">
          <Checkbox
            label="Subscribe to newsletter"
            description="Get updates on new projects and technical insights"
            checked={formData?.newsletter}
            onChange={(e) => handleInputChange('newsletter', e?.target?.checked)}
          />
          <Checkbox
            label="I agree to the terms and conditions"
            description="By submitting, you agree to our privacy policy and terms of service"
            checked={formData?.terms}
            onChange={(e) => handleInputChange('terms', e?.target?.checked)}
            error={errors?.terms}
            required
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          loading={isSubmitting}
          iconName="Send"
          iconPosition="right"
          fullWidth
          className="glow-primary hover:glow-strong"
        >
          {isSubmitting ? 'Transmitting...' : 'Launch Mission'}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const testimonials = [
  
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-surface">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-space-grotesk font-bold text-text-primary mb-4">
            Trusted by Industry 
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-background rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="User" size={24} className="text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-space-grotesk font-semibold text-text-primary">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <blockquote>
                <p className="text-text-secondary italic">
                  "{testimonial.content}"
                </p>
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
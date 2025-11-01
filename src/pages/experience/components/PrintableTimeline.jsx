import React from 'react';

import Button from '../../../components/ui/Button';

const PrintableTimeline = ({ experiences, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-auto">
      {/* Print Controls - Hidden in print */}
      <div className="no-print sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-4 flex items-center justify-between">
        <h2 className="text-xl font-space-grotesk font-bold text-text-primary">
          Printable Resume Timeline
        </h2>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            iconName="Printer"
            iconPosition="left"
            onClick={handlePrint}
          >
            Print
          </Button>
          <Button
            variant="ghost"
            iconName="X"
            onClick={onClose}
          />
        </div>
      </div>
      {/* Printable Content */}
      <div className="max-w-4xl mx-auto p-8 bg-white text-black print:p-0 print:max-w-none">
        {/* Header */}
        <div className="text-center mb-8 print:mb-6">
          <h1 className="text-3xl font-bold mb-2 print:text-2xl">Anish Pandey</h1>
          <p className="text-lg text-gray-600 mb-1">Future Systems Architect</p>
          <p className="text-sm text-gray-500">AI × Hardware × Space × Innovation</p>
        </div>

        {/* Timeline */}
        <div className="space-y-6 print:space-y-4">
          {experiences?.map((experience, index) => (
            <div key={experience?.id} className="border-l-2 border-gray-300 pl-6 pb-6 relative print:pb-4">
              {/* Timeline Dot */}
              <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full border-2 border-white"></div>
              
              {/* Content */}
              <div className="space-y-3 print:space-y-2">
                {/* Header */}
                <div className="flex items-start justify-between print:block">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 print:text-lg">
                      {experience?.title}
                    </h3>
                    <p className="text-blue-600 font-semibold">{experience?.organization}</p>
                    <p className="text-gray-600 text-sm">{experience?.location}</p>
                  </div>
                  <div className="text-right text-sm text-gray-500 print:text-left print:mt-1">
                    <p>{experience?.duration}</p>
                    <span className="inline-block px-2 py-1 bg-gray-100 rounded text-xs">
                      {experience?.status?.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-gray-700 text-sm leading-relaxed">
                  {experience?.summary}
                </p>

                {/* Key Metrics */}
                {experience?.metrics && (
                  <div className="grid grid-cols-2 gap-4 print:grid-cols-4">
                    {experience?.metrics?.map((metric, idx) => (
                      <div key={idx} className="text-center bg-gray-50 p-2 rounded print:bg-transparent print:border print:border-gray-300">
                        <div className="text-lg font-bold text-blue-600 print:text-base">{metric?.value}</div>
                        <div className="text-xs text-gray-600">{metric?.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Key Responsibilities */}
                {experience?.responsibilities && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Key Responsibilities:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {experience?.responsibilities?.slice(0, 4)?.map((responsibility, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Achievements */}
                {experience?.achievements && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Key Achievements:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {experience?.achievements?.slice(0, 3)?.map((achievement, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-600 mr-2">★</span>
                          <span>{achievement?.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                {experience?.technologies && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Technologies:</h4>
                    <div className="flex flex-wrap gap-1">
                      {experience?.technologies?.map((tech, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded border print:border-gray-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-300 text-center text-sm text-gray-500 print:mt-6">
          <p>Generated on {new Date()?.toLocaleDateString()} | Anish Pandey Portfolio</p>
        </div>
      </div>
      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
          
          body {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
          }
          
          .print\\:text-2xl {
            font-size: 1.5rem !important;
          }
          
          .print\\:text-lg {
            font-size: 1.125rem !important;
          }
          
          .print\\:text-base {
            font-size: 1rem !important;
          }
          
          .print\\:p-0 {
            padding: 0 !important;
          }
          
          .print\\:max-w-none {
            max-width: none !important;
          }
          
          .print\\:mb-6 {
            margin-bottom: 1.5rem !important;
          }
          
          .print\\:pb-4 {
            padding-bottom: 1rem !important;
          }
          
          .print\\:space-y-4 > * + * {
            margin-top: 1rem !important;
          }
          
          .print\\:space-y-2 > * + * {
            margin-top: 0.5rem !important;
          }
          
          .print\\:block {
            display: block !important;
          }
          
          .print\\:text-left {
            text-align: left !important;
          }
          
          .print\\:mt-1 {
            margin-top: 0.25rem !important;
          }
          
          .print\\:mt-6 {
            margin-top: 1.5rem !important;
          }
          
          .print\\:bg-transparent {
            background-color: transparent !important;
          }
          
          .print\\:border {
            border-width: 1px !important;
          }
          
          .print\\:border-gray-300 {
            border-color: #d1d5db !important;
          }
          
          .print\\:grid-cols-4 {
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PrintableTimeline;
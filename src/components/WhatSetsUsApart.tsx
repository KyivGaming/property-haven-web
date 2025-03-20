
import React from 'react';
import { Building, Shield, Award, Clock } from 'lucide-react';

const WhatSetsUsApart = () => {
  return (
    <section className="section-padding bg-slate-50">
      <div className="container-custom">
        <div className="text-center mb-16 animate-fade-up">
          <span className="tag bg-real-100 text-real-700 mb-4">Our Difference</span>
          <h2 className="heading-lg mb-6">What Sets Us Apart</h2>
          <p className="subtitle-md max-w-3xl mx-auto">
            At OOL Properties, we distinguish ourselves through our commitment to excellence, 
            innovation, and client satisfaction in every aspect of our business.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {differenceItems.map((item, index) => (
            <div 
              key={index} 
              className={`flex items-start space-x-6 p-6 bg-white rounded-xl shadow-elevation-1 animate-scale-in stagger-delay-${index + 1}`}
            >
              <div className="bg-real-50 w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-real-700">
                {item.icon}
              </div>
              <div>
                <h3 className="heading-sm mb-2">{item.title}</h3>
                <p className="body-md text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const differenceItems = [
  {
    icon: <Building size={20} />,
    title: "Quality Properties",
    description: "We meticulously select and develop properties that meet the highest standards of quality and provide excellent investment value."
  },
  {
    icon: <Shield size={20} />,
    title: "Secure Investments",
    description: "Our thorough due diligence process ensures that all investments are secure and legally sound, providing peace of mind to our clients."
  },
  {
    icon: <Award size={20} />,
    title: "Industry Excellence",
    description: "Our team of professionals brings decades of combined experience and a commitment to excellence in every project we undertake."
  },
  {
    icon: <Clock size={20} />,
    title: "Timely Delivery",
    description: "We understand the importance of time in real estate investments and are committed to delivering all our projects on schedule."
  }
];

export default WhatSetsUsApart;

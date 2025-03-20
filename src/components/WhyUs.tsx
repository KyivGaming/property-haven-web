
import React from 'react';
import { CheckCircle } from 'lucide-react';

const WhyUs = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="relative animate-fade-in">
            <div className="rounded-2xl overflow-hidden shadow-elevation-3">
              <img
                src="https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80"
                alt="Team Meeting"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 lg:-bottom-10 lg:-right-10 rounded-2xl bg-white p-6 shadow-elevation-1 max-w-xs">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="text-4xl font-bold text-real-700">200+</div>
                <div className="text-base font-medium">Projects Completed</div>
              </div>
              <div className="h-1 w-1/3 bg-real-400 mb-4 rounded-full"></div>
              <p className="body-sm text-muted-foreground">
                Successfully delivered over 200 projects across Nigeria since our inception.
              </p>
            </div>
          </div>
          
          <div className="space-y-6 animate-fade-up">
            <span className="tag bg-real-100 text-real-700 mb-4">Why Choose Us</span>
            <h2 className="heading-lg mb-6">The OOL Properties Advantage</h2>
            <p className="body-lg text-muted-foreground mb-8">
              With our deep understanding of the Nigerian real estate market and commitment to excellence, 
              we provide investment opportunities that deliver exceptional returns.
            </p>
            
            <div className="space-y-4">
              {advantages.map((advantage, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="text-real-500 mt-1 shrink-0" size={20} />
                  <p className="body-md">{advantage}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const advantages = [
  "Expert team with extensive knowledge of the Nigerian property market",
  "Proven track record of delivering high-yield investment opportunities",
  "Comprehensive due diligence on all properties and developments",
  "Transparent approach to property transactions and investments",
  "Strong network of industry relationships and partnerships",
  "Innovative property development strategies"
];

export default WhyUs;

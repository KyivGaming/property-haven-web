
import React from 'react';
import { Target, Users, TrendingUp } from 'lucide-react';

const Mission = () => {
  return (
    <section id="mission" className="section-padding bg-slate-50">
      <div className="container-custom">
        <div className="text-center mb-16 animate-fade-up">
          <span className="tag bg-real-100 text-real-700 mb-4">Our Mission</span>
          <h2 className="heading-lg mb-6">What Drives Our Success</h2>
          <p className="subtitle-md max-w-3xl mx-auto">
            Our mission is to revolutionize the real estate industry in Nigeria by providing exceptional 
            investment opportunities and delivering unmatched value to our clients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {missionItems.map((item, index) => (
            <div 
              key={index}
              className={`bg-white p-8 rounded-xl shadow-elevation-1 text-center animate-scale-in stagger-delay-${index + 1}`}
            >
              <div className="bg-real-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-real-700">
                {item.icon}
              </div>
              <h3 className="heading-sm mb-4">{item.title}</h3>
              <p className="body-md text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const missionItems = [
  {
    icon: <Target size={24} />,
    title: "Ambitious Vision",
    description: "We aim to be the premier real estate investment firm in Nigeria, setting the standard for quality and innovation."
  },
  {
    icon: <Users size={24} />,
    title: "Client-Focused Approach",
    description: "Our clients' success is our priority. We tailor our services to meet their unique needs and goals."
  },
  {
    icon: <TrendingUp size={24} />,
    title: "Sustainable Growth",
    description: "We develop properties that not only provide immediate returns but also appreciate in value over time."
  }
];

export default Mission;

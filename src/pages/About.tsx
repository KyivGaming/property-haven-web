
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import Mission from '@/components/Mission';
import WhyUs from '@/components/WhyUs';
import WhatSetsUsApart from '@/components/WhatSetsUsApart';

const About = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Header />
      <main>
        <AboutSection />
        <Mission />
        <WhyUs />
        <WhatSetsUsApart />
      </main>
      <Footer />
    </div>
  );
};

export default About;

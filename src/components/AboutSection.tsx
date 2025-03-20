
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-up">
            <span className="tag bg-real-100 text-real-700 mb-4">About Us</span>
            <h1 className="heading-lg mb-6">Pioneering Real Estate Investments in Nigeria</h1>
            <p className="body-lg text-muted-foreground mb-6">
              OOL Properties has been at the forefront of real estate development and investment in Nigeria for over a decade. 
              Our commitment to excellence and innovative approach to property development has made us a trusted name in the market.
            </p>
            <Button className="group" asChild>
              <a href="#mission">
                Learn More 
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
          
          <div className="relative animate-fade-in">
            <div className="rounded-2xl overflow-hidden shadow-elevation-3">
              <img
                src="https://images.unsplash.com/photo-1577415124269-fc1140a69e91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="OOL Properties Team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

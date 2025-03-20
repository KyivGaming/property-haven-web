
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Services from '@/components/Services';
import Contact from '@/components/Contact';

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Header />
      <main>
        <div className="pt-24 bg-real-50">
          <div className="container-custom py-12">
            <h1 className="heading-lg text-center">Our Services</h1>
            <p className="subtitle-md text-center max-w-3xl mx-auto mt-4">
              We provide comprehensive real estate solutions tailored to meet your specific needs and goals.
            </p>
          </div>
        </div>
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;

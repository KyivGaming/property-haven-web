
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/95 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
          alt="Luxury Property"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-fade-down">
            <span className="tag bg-primary/10 text-primary mb-6">Premium Real Estate Investment</span>
          </div>
          <h1 className="heading-xl mb-6 text-white drop-shadow-md animate-fade-down stagger-delay-1">
            Unlock Your Real Estate Investment Potential
          </h1>
          <p className="subtitle-lg text-white/90 mb-10 max-w-2xl mx-auto animate-fade-down stagger-delay-2">
            OOL Properties offers expert consulting and premium real estate solutions tailored to maximize your investment returns.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up stagger-delay-3">
            <Button size="lg" className="min-w-[160px]">
              Explore Properties
            </Button>
            <Button size="lg" variant="outline" className="min-w-[160px] bg-white/20 backdrop-blur-sm hover:bg-white/30">
              Our Services
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer animate-bounce"
        onClick={() => scrollToSection('about')}
      >
        <ChevronDown className="text-white drop-shadow-md" size={32} />
      </div>
    </section>
  );
};

export default Hero;

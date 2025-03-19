
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronRight, User } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    // Prevent body scrolling when mobile menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };
  
  // Close mobile menu when clicking on a link
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-elevation-1' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <RouterLink to="/" className="flex items-center">
            <span className="text-xl font-bold tracking-tight text-real-700">OOL Properties</span>
          </RouterLink>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <RouterLink to="/" className="nav-link">Home</RouterLink>
            <a href="/#about" className="nav-link">About</a>
            <RouterLink to="/properties" className="nav-link">Properties</RouterLink>
            <a href="/#services" className="nav-link">Services</a>
            <a href="/#contact" className="nav-link">Contact</a>
          </nav>
          
          {/* Admin link and mobile menu toggle */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild className="hidden sm:flex">
              <RouterLink to="/admin/login" className="flex items-center">
                <User size={16} className="mr-1.5" />
                Admin
              </RouterLink>
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Overlay */}
      <div 
        className={`fixed inset-0 bg-black/95 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-end mb-8">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleMobileMenu}
              className="text-white hover:text-white hover:bg-white/10"
              aria-label="Close menu"
            >
              <X size={24} />
            </Button>
          </div>
          
          <nav className="flex flex-col space-y-6 items-start">
            <RouterLink 
              to="/" 
              className="text-xl font-medium text-white group flex items-center"
              onClick={handleMobileLinkClick}
            >
              Home
              <ChevronRight size={16} className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </RouterLink>
            <a 
              href="/#about" 
              className="text-xl font-medium text-white group flex items-center"
              onClick={handleMobileLinkClick}
            >
              About
              <ChevronRight size={16} className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
            <RouterLink 
              to="/properties" 
              className="text-xl font-medium text-white group flex items-center"
              onClick={handleMobileLinkClick}
            >
              Properties
              <ChevronRight size={16} className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </RouterLink>
            <a 
              href="/#services" 
              className="text-xl font-medium text-white group flex items-center"
              onClick={handleMobileLinkClick}
            >
              Services
              <ChevronRight size={16} className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
            <a 
              href="/#contact" 
              className="text-xl font-medium text-white group flex items-center"
              onClick={handleMobileLinkClick}
            >
              Contact
              <ChevronRight size={16} className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
            <RouterLink 
              to="/admin/login" 
              className="text-xl font-medium text-white group flex items-center"
              onClick={handleMobileLinkClick}
            >
              Admin Dashboard
              <ChevronRight size={16} className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </RouterLink>
          </nav>
          
          <div className="mt-auto border-t border-white/20 pt-6">
            <p className="text-white/60 text-sm">
              © 2023 OOL Properties. Premium Real Estate Investment.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

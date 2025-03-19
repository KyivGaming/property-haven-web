
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300',
        isScrolled ? 'glassmorphism' : 'bg-transparent'
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center" onClick={closeMenu}>
            <span className="text-xl font-display font-bold">OOL Properties</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-medium hover:text-primary transition-custom"
              >
                {link.label}
              </a>
            ))}
            <Button>Contact Us</Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="p-2 md:hidden transition-custom"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          'fixed inset-0 bg-background z-40 md:hidden transition-transform duration-300 ease-in-out pt-20',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <nav className="container-custom flex flex-col space-y-6 p-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-2xl font-medium py-3 hover:text-primary transition-custom"
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
          <Button className="mt-4 w-full" onClick={closeMenu}>
            Contact Us
          </Button>
        </nav>
      </div>
    </header>
  );
};

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Properties', href: '#properties' },
  { label: 'Services', href: '#services' },
];

export default Header;

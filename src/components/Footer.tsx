
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useState } from 'react';
import { supabase, Tables } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Invalid email', {
        description: 'Please enter a valid email address',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Cast the email to the correct Insert type
      const newsletterData: Tables['newsletters']['Insert'] = { email };
      
      const { error } = await supabase
        .from('newsletters')
        .insert([newsletterData] as any); // Using 'as any' as a temporary fix
        
      if (error) {
        if (error.code === '23505') { // Unique violation error code
          throw new Error('This email is already subscribed to our newsletter.');
        }
        throw error;
      }
      
      setEmail('');
      toast.success('Subscription successful', {
        description: 'Thank you for subscribing to our newsletter!',
      });
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      const errorMessage = error instanceof Error ? error.message : 'Please try again later.';
      toast.error('Subscription failed', {
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <footer className="bg-real-950 text-white pt-16 pb-8">
      <div className="container-custom">
        {/* Footer top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company info */}
          <div>
            <h3 className="text-xl font-display font-bold mb-6">OOL Properties</h3>
            <p className="text-slate-300 mb-6">
              Dedicated to providing premium real estate investment opportunities and personalized service to our clients.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.href} 
                  className="p-2 bg-real-900 hover:bg-real-800 rounded-lg transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {servicesLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-slate-300 mb-4">
              Subscribe to our newsletter for the latest property listings and market insights.
            </p>
            <form className="flex" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-real-900 text-white px-4 py-2 rounded-l-lg flex-grow focus:outline-none focus:ring-1 focus:ring-real-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
              />
              <button 
                type="submit" 
                className="bg-real-700 hover:bg-real-600 text-white px-4 py-2 rounded-r-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
        
        {/* Footer bottom */}
        <div className="border-t border-real-900 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-slate-400 text-sm mb-4 md:mb-0">
            © {currentYear} OOL Properties. All rights reserved.
          </div>
          <div className="flex space-x-6">
            {legalLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.href} 
                className="text-slate-400 hover:text-white text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

const socialLinks = [
  { 
    href: '#', 
    icon: <Facebook size={18} />, 
    label: 'Facebook' 
  },
  { 
    href: '#', 
    icon: <Instagram size={18} />, 
    label: 'Instagram' 
  },
  { 
    href: '#', 
    icon: <Twitter size={18} />, 
    label: 'Twitter' 
  },
  { 
    href: '#', 
    icon: <Linkedin size={18} />, 
    label: 'LinkedIn' 
  },
];

const quickLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About Us' },
  { href: '#properties', label: 'Properties' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact Us' },
];

const servicesLinks = [
  { href: '#', label: 'Land Verification' },
  { href: '#', label: 'Property Management' },
  { href: '#', label: 'Investment Solutions' },
  { href: '#', label: 'Construction & Development' },
  { href: '#', label: 'Advisory Services' },
];

const legalLinks = [
  { href: '#', label: 'Privacy Policy' },
  { href: '#', label: 'Terms of Service' },
  { href: '#', label: 'Cookie Policy' },
];

export default Footer;

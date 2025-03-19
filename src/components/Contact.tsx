
import { useState } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', phone: '', message: '' });
    // Show success message (In a real implementation, we would use toast notifications)
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <section id="contact" className="section-padding bg-real-50">
      <div className="container-custom">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-up">
          <span className="tag bg-real-100 text-real-700 mb-4">Get In Touch</span>
          <h2 className="heading-lg mb-6">Contact Our Team</h2>
          <p className="subtitle-md">
            Have questions about our properties or services? Our team is ready to assist you. Reach out to us today.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact form */}
          <div className="bg-white rounded-2xl shadow-elevation-2 p-8 animate-fade-in">
            <h3 className="heading-sm mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-real-400 focus:outline-none focus:ring-2 focus:ring-real-100 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-real-400 focus:outline-none focus:ring-2 focus:ring-real-100 transition-all"
                    placeholder="johndoe@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-real-400 focus:outline-none focus:ring-2 focus:ring-real-100 transition-all"
                    placeholder="+234 800 000 0000"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-real-400 focus:outline-none focus:ring-2 focus:ring-real-100 transition-all"
                    placeholder="Tell us about your real estate needs..."
                  ></textarea>
                </div>
                
                <div>
                  <Button type="submit" className="w-full">Send Message</Button>
                </div>
              </div>
            </form>
          </div>
          
          {/* Contact information */}
          <div className="flex flex-col justify-center">
            <div className="space-y-8 animate-fade-up">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="p-3 bg-real-100 rounded-lg text-real-700 mt-1">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                    <p className="text-muted-foreground">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Map or additional contact information can go here */}
            <div className="mt-12 p-6 bg-white rounded-2xl border border-slate-100 shadow-elevation-1 animate-fade-up stagger-delay-3">
              <h4 className="text-lg font-semibold mb-4">Office Hours</h4>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 5:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="font-medium">10:00 AM - 2:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="font-medium">Closed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const contactInfo = [
  {
    title: 'Our Location',
    details: '123 Business Avenue, Lagos, Nigeria',
    icon: <MapPin size={20} />,
  },
  {
    title: 'Email Us',
    details: 'info@oolproperties.com',
    icon: <Mail size={20} />,
  },
  {
    title: 'Call Us',
    details: '+234 800 123 4567',
    icon: <Phone size={20} />,
  },
];

export default Contact;

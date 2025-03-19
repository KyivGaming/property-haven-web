
import { Building, CheckSquare, ClipboardCheck, Cog, LineChart, Shield } from 'lucide-react';
import ServiceCard from './ServiceCard';

const Services = () => {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-up">
          <span className="tag bg-real-100 text-real-700 mb-4">Our Services</span>
          <h2 className="heading-lg mb-6">Comprehensive Real Estate Solutions</h2>
          <p className="subtitle-md">
            We provide end-to-end real estate services designed to maximize your investment returns and create long-term value.
          </p>
        </div>
        
        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service}
              className={`animate-scale-in stagger-delay-${index % 5 + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const services = [
  {
    id: '1',
    title: 'Land Verification',
    description: 'Comprehensive due diligence to verify land titles, ownership history, and legal status before your investment.',
    icon: <CheckSquare size={28} />,
  },
  {
    id: '2',
    title: 'Property Management',
    description: 'Full-service property management including tenant acquisition, maintenance, and financial reporting.',
    icon: <Building size={28} />,
  },
  {
    id: '3',
    title: 'Investment Solutions',
    description: 'Customized investment strategies based on your financial goals, risk tolerance, and investment horizon.',
    icon: <LineChart size={28} />,
  },
  {
    id: '4',
    title: 'Construction & Development',
    description: 'End-to-end project management for new constructions, renovations, and property developments.',
    icon: <Cog size={28} />,
  },
  {
    id: '5',
    title: 'Portfolio Management',
    description: 'Strategic management of your real estate portfolio to optimize returns and mitigate risks.',
    icon: <ClipboardCheck size={28} />,
  },
  {
    id: '6',
    title: 'Advisory Services',
    description: 'Expert guidance on market trends, investment opportunities, and regulatory compliance.',
    icon: <Shield size={28} />,
  },
];

export default Services;

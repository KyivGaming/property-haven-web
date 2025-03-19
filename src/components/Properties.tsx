
import { ArrowRight, Rotate3D } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PropertyCard from './PropertyCard';

const Properties = () => {
  return (
    <section id="properties" className="section-padding bg-slate-50">
      <div className="container-custom">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-up">
          <span className="tag bg-real-100 text-real-700 mb-4">Our Properties</span>
          <h2 className="heading-lg mb-6">Featured Properties & Land Listings</h2>
          <p className="subtitle-md">
            Discover our handpicked selection of premium properties and land opportunities that promise exceptional investment returns.
          </p>
        </div>
        
        {/* Properties grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProperties.map((property, index) => (
            <PropertyCard 
              key={property.id} 
              property={property}
              className={`animate-scale-in stagger-delay-${index + 1}`}
            />
          ))}
        </div>
        
        {/* CTA button */}
        <div className="text-center animate-fade-up">
          <Button variant="outline" className="group">
            View All Properties
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

const featuredProperties = [
  {
    id: '1',
    title: 'Modern Office Building',
    location: 'Lagos, Nigeria',
    price: 'NGN 350,000,000',
    size: '12,000 sq ft',
    type: 'Commercial',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    featured: true,
  },
  {
    id: '2',
    title: 'Prime Development Land',
    location: 'Abuja, Nigeria',
    price: 'NGN 75,000,000',
    size: '5 acres',
    type: 'Land',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
  },
  {
    id: '3',
    title: 'Luxury Residential Complex',
    location: 'Port Harcourt, Nigeria',
    price: 'NGN 520,000,000',
    size: '35,000 sq ft',
    type: 'Residential',
    image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
];

export default Properties;

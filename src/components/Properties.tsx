
import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PropertyCard from './PropertyCard';
import { usePropertyStore } from '@/store/usePropertyStore';
import { Link } from 'react-router-dom';

const Properties = () => {
  const { properties, fetchProperties, isLoading } = usePropertyStore();
  
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);
  
  // Get the top 3 most expensive properties
  const topProperties = properties.slice(0, 3);
  
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
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 animate-pulse bg-slate-200 rounded-xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {topProperties.map((property, index) => (
              <PropertyCard 
                key={property.id} 
                property={property}
                className={`animate-scale-in stagger-delay-${index + 1}`}
              />
            ))}
          </div>
        )}
        
        {/* CTA button */}
        <div className="text-center animate-fade-up">
          <Button variant="outline" className="group" asChild>
            <Link to="/properties">
              View All Properties
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Properties;

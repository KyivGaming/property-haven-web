
import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton'; 
import PropertyCard from './PropertyCard';
import { usePropertyStore } from '@/store/usePropertyStore';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

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
          <div className="space-y-8">
            <div className="w-full">
              <Progress value={40} className="w-full mb-4" />
              <p className="text-center text-sm text-muted-foreground">Loading properties...</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl overflow-hidden shadow-elevation-1">
                  <Skeleton className="h-64 w-full" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-32" />
                    <div className="pt-4 flex justify-between">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
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

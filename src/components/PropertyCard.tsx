
import { Building, MapPin, Maximize } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: string;
    size: string;
    type: string;
    image: string;
    featured?: boolean;
  };
  className?: string;
}

const PropertyCard = ({ property, className }: PropertyCardProps) => {
  return (
    <div 
      className={cn(
        "rounded-xl overflow-hidden shadow-elevation-1 bg-white hover-lift",
        property.featured && "md:col-span-2 lg:col-span-2",
        className
      )}
    >
      {/* Image container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="tag bg-white/90 backdrop-blur-sm text-real-700 shadow-sm">
            {property.type}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex items-center text-muted-foreground mb-2">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        
        <h3 className="heading-sm mb-3">{property.title}</h3>
        
        <div className="flex justify-between items-center mb-4">
          <div className="font-semibold text-real-700">{property.price}</div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center text-muted-foreground">
            <Maximize size={16} className="mr-1" />
            <span className="text-sm">{property.size}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Building size={16} className="mr-1" />
            <span className="text-sm">{property.type}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

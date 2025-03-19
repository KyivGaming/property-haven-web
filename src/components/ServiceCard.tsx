
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    description: string;
    icon: JSX.Element;
  };
  className?: string;
}

const ServiceCard = ({ service, className }: ServiceCardProps) => {
  return (
    <div 
      className={cn(
        "group p-8 rounded-2xl bg-white border border-slate-100 shadow-elevation-1 hover-lift",
        className
      )}
    >
      <div className="mb-6 p-4 bg-real-50 rounded-xl w-16 h-16 flex items-center justify-center text-real-700 group-hover:bg-real-700 group-hover:text-white transition-colors duration-300">
        {service.icon}
      </div>
      
      <h3 className="heading-sm mb-4">{service.title}</h3>
      
      <p className="body-md text-muted-foreground mb-6">
        {service.description}
      </p>
      
      <div className="flex items-center text-real-700 font-medium group-hover:text-real-500 transition-colors">
        <span>Learn More</span>
        <ArrowUpRight size={16} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </div>
    </div>
  );
};

export default ServiceCard;

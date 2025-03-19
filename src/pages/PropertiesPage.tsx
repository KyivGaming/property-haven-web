
import { useEffect, useState } from 'react';
import { usePropertyStore } from '@/store/usePropertyStore';
import PropertyCard from '@/components/PropertyCard';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ArrowRight, Building, Home, MapPin, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const PropertiesPage = () => {
  const { properties, fetchProperties, isLoading, error } = usePropertyStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    type: 'All',
    location: 'All',
  });
  const { toast } = useToast();
  
  const propertiesPerPage = 6;
  
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);
  
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);
  
  // Filter properties
  const filteredProperties = properties.filter(property => {
    return (
      (filters.type === 'All' || property.type === filters.type) &&
      (filters.location === 'All' || property.location.includes(filters.location))
    );
  });
  
  // Calculate pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
  
  // Extract unique locations and types for filters
  const locations = ['All', ...new Set(properties.map(p => p.location.split(',')[0].trim()))];
  const types = ['All', ...new Set(properties.map(p => p.type))];
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-real-700 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <h1 className="heading-xl mb-6">Our Properties</h1>
            <p className="subtitle-md mb-8">
              Discover exceptional investment opportunities in our diverse portfolio of premium properties and land.
            </p>
            
            {/* Filter Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20">
                  <SlidersHorizontal size={16} className="mr-2" />
                  Filter Properties
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Filter Properties</DialogTitle>
                  <DialogDescription>
                    Narrow down your search with specific criteria.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Property Type</label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={filters.type}
                      onChange={(e) => setFilters({...filters, type: e.target.value})}
                    >
                      {types.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={filters.location}
                      onChange={(e) => setFilters({...filters, location: e.target.value})}
                    >
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button 
                    onClick={() => setFilters({ type: 'All', location: 'All' })}
                    variant="outline" 
                    className="mr-2"
                  >
                    Reset
                  </Button>
                  <Button type="submit">Apply Filters</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>
      
      {/* Properties Listing */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Filter summary */}
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              {filters.type !== 'All' && (
                <div className="flex items-center bg-real-50 text-real-700 px-3 py-1.5 rounded-full text-sm">
                  <Building size={14} className="mr-1.5" />
                  {filters.type}
                </div>
              )}
              {filters.location !== 'All' && (
                <div className="flex items-center bg-real-50 text-real-700 px-3 py-1.5 rounded-full text-sm">
                  <MapPin size={14} className="mr-1.5" />
                  {filters.location}
                </div>
              )}
              {(filters.type !== 'All' || filters.location !== 'All') && (
                <button 
                  onClick={() => setFilters({ type: 'All', location: 'All' })}
                  className="text-sm text-muted-foreground hover:text-real-700"
                >
                  Clear filters
                </button>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              Showing {currentProperties.length} of {filteredProperties.length} properties
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div 
                  key={i} 
                  className="h-96 animate-pulse bg-slate-200 rounded-xl"
                ></div>
              ))}
            </div>
          ) : (
            <>
              {currentProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {currentProperties.map((property, index) => (
                    <PropertyCard 
                      key={property.id} 
                      property={property}
                      className={`animate-scale-in stagger-delay-${index + 1}`}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Home size={40} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="heading-md mb-2">No properties found</h3>
                  <p className="text-muted-foreground mb-6">
                    We couldn't find any properties matching your criteria.
                  </p>
                  <Button 
                    onClick={() => setFilters({ type: 'All', location: 'All' })}
                    variant="outline"
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
              
              {/* Pagination */}
              {filteredProperties.length > propertiesPerPage && (
                <Pagination className="mt-10">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink 
                          onClick={() => handlePageChange(page)}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default PropertiesPage;

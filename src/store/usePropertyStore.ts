
import { create } from 'zustand';
import { Property, PropertyFormData } from '@/types/property';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";

interface PropertyState {
  properties: Property[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchProperties: () => Promise<void>;
  getPropertyById: (id: string) => Property | undefined;
  createProperty: (propertyData: PropertyFormData) => Promise<void>;
  updateProperty: (id: string, propertyData: Partial<PropertyFormData>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
}

export const usePropertyStore = create<PropertyState>((set, get) => ({
  properties: [],
  isLoading: false,
  error: null,
  
  fetchProperties: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('price', { ascending: false });
      
      if (error) throw error;
      
      // Transform the data to match our property interface
      const properties = data.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        price: item.price,
        location: item.location,
        size: item.size,
        type: item.type,
        featured: item.featured,
        image: item.image,
        createdAt: item.created_at,
        updatedAt: item.updated_at
      }));
      
      set({ properties, isLoading: false });
    } catch (error) {
      console.error('Error fetching properties:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        isLoading: false 
      });
    }
  },
  
  getPropertyById: (id: string) => {
    return get().properties.find(property => property.id === id);
  },
  
  createProperty: async (propertyData: PropertyFormData) => {
    set({ isLoading: true, error: null });
    
    try {
      const { data, error } = await supabase
        .from('properties')
        .insert([{
          title: propertyData.title,
          description: propertyData.description,
          price: propertyData.price,
          location: propertyData.location,
          size: propertyData.size,
          type: propertyData.type,
          featured: propertyData.featured,
          image: propertyData.image
        }])
        .select();
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        const newProperty = {
          id: data[0].id,
          title: data[0].title,
          description: data[0].description,
          price: data[0].price,
          location: data[0].location,
          size: data[0].size,
          type: data[0].type,
          featured: data[0].featured,
          image: data[0].image,
          createdAt: data[0].created_at,
          updatedAt: data[0].updated_at
        };
        
        set(state => ({
          properties: [newProperty, ...state.properties],
          isLoading: false
        }));
        
        toast.success("Property created successfully");
      }
    } catch (error) {
      console.error('Error creating property:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to create property',
        isLoading: false 
      });
      
      toast.error("Failed to create property", {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },
  
  updateProperty: async (id: string, propertyData: Partial<PropertyFormData>) => {
    set({ isLoading: true, error: null });
    
    try {
      const { data, error } = await supabase
        .from('properties')
        .update({
          ...(propertyData.title && { title: propertyData.title }),
          ...(propertyData.description && { description: propertyData.description }),
          ...(propertyData.price !== undefined && { price: propertyData.price }),
          ...(propertyData.location && { location: propertyData.location }),
          ...(propertyData.size && { size: propertyData.size }),
          ...(propertyData.type && { type: propertyData.type }),
          ...(propertyData.featured !== undefined && { featured: propertyData.featured }),
          ...(propertyData.image && { image: propertyData.image })
        })
        .eq('id', id)
        .select();
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        const updatedProperty = {
          id: data[0].id,
          title: data[0].title,
          description: data[0].description,
          price: data[0].price,
          location: data[0].location,
          size: data[0].size,
          type: data[0].type,
          featured: data[0].featured,
          image: data[0].image,
          createdAt: data[0].created_at,
          updatedAt: data[0].updated_at
        };
        
        set(state => ({
          properties: state.properties.map(property => 
            property.id === id ? updatedProperty : property
          ),
          isLoading: false
        }));
        
        toast.success("Property updated successfully");
      }
    } catch (error) {
      console.error('Error updating property:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update property',
        isLoading: false 
      });
      
      toast.error("Failed to update property", {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },
  
  deleteProperty: async (id: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      set(state => ({
        properties: state.properties.filter(property => property.id !== id),
        isLoading: false
      }));
      
      toast.success("Property deleted successfully");
    } catch (error) {
      console.error('Error deleting property:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete property',
        isLoading: false 
      });
      
      toast.error("Failed to delete property", {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },
}));

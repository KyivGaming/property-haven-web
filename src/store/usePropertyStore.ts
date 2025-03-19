
import { create } from 'zustand';
import { Property, PropertyFormData } from '@/types/property';

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

// Mock data - this will be replaced with Supabase integration
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Office Building',
    description: 'A sleek, contemporary office building with state-of-the-art facilities in the heart of Lagos business district.',
    location: 'Lagos, Nigeria',
    price: 'NGN 350,000,000',
    size: '12,000 sq ft',
    type: 'Commercial',
    featured: true,
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Prime Development Land',
    description: 'Strategic land parcel ideal for residential or mixed-use development with excellent access to major highways.',
    location: 'Abuja, Nigeria',
    price: 'NGN 75,000,000',
    size: '5 acres',
    type: 'Land',
    featured: false,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Luxury Residential Complex',
    description: 'Elite residential complex featuring premium apartments with world-class amenities including swimming pool, gym, and 24/7 security.',
    location: 'Port Harcourt, Nigeria',
    price: 'NGN 520,000,000',
    size: '35,000 sq ft',
    type: 'Residential',
    featured: false,
    image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Waterfront Retail Space',
    description: 'Premium retail space with stunning waterfront views, perfect for high-end boutiques or restaurants.',
    location: 'Lagos, Nigeria',
    price: 'NGN 180,000,000',
    size: '8,500 sq ft',
    type: 'Commercial',
    featured: false,
    image: 'https://images.unsplash.com/photo-1582037928769-181cf1066a8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Industrial Warehouse',
    description: 'Spacious industrial warehouse with modern logistics infrastructure, located near major transportation routes.',
    location: 'Kano, Nigeria',
    price: 'NGN 230,000,000',
    size: '40,000 sq ft',
    type: 'Industrial',
    featured: true,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Agricultural Farm Land',
    description: 'Fertile agricultural land suitable for various crops, with irrigation systems already in place.',
    location: 'Ibadan, Nigeria',
    price: 'NGN 45,000,000',
    size: '20 acres',
    type: 'Land',
    featured: false,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const usePropertyStore = create<PropertyState>((set, get) => ({
  properties: [],
  isLoading: false,
  error: null,
  
  fetchProperties: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real implementation, this would be a Supabase call
      set({ properties: mockProperties, isLoading: false });
    } catch (error) {
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create new property
      const newProperty: Property = {
        ...propertyData,
        id: Math.random().toString(36).substring(2, 11),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // Update state
      set(state => ({
        properties: [...state.properties, newProperty],
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to create property',
        isLoading: false 
      });
    }
  },
  
  updateProperty: async (id: string, propertyData: Partial<PropertyFormData>) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update property
      set(state => {
        const updatedProperties = state.properties.map(property => 
          property.id === id 
            ? { 
                ...property, 
                ...propertyData, 
                updatedAt: new Date().toISOString() 
              } 
            : property
        );
        return { properties: updatedProperties, isLoading: false };
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update property',
        isLoading: false 
      });
    }
  },
  
  deleteProperty: async (id: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Delete property
      set(state => ({
        properties: state.properties.filter(property => property.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete property',
        isLoading: false 
      });
    }
  },
}));


export interface Property {
  id: string;
  title: string;
  description: string;
  price: string;
  location: string;
  size: string;
  type: string;
  featured: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export type PropertyFormData = Omit<Property, 'id' | 'createdAt' | 'updatedAt'>;

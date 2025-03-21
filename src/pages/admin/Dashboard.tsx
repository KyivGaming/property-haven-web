
import { useEffect } from 'react';
import { usePropertyStore } from '@/store/usePropertyStore';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Building, Home, Landmark, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const { properties, fetchProperties } = usePropertyStore();
  
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);
  
  // Calculate property type distribution
  const propertyTypeCounts = properties.reduce((acc: Record<string, number>, property) => {
    acc[property.type] = (acc[property.type] || 0) + 1;
    return acc;
  }, {});
  
  const propertyTypeData = Object.entries(propertyTypeCounts).map(([name, value]) => ({
    name,
    value,
  }));
  
  // Calculate location distribution
  const locationCounts = properties.reduce((acc: Record<string, number>, property) => {
    const location = property.location.split(',')[0].trim();
    acc[location] = (acc[location] || 0) + 1;
    return acc;
  }, {});
  
  const locationData = Object.entries(locationCounts).map(([name, value]) => ({
    name,
    value,
  }));
  
  // Mock data for monthly listings
  const monthlyData = [
    { name: 'Jan', listings: 4 },
    { name: 'Feb', listings: 6 },
    { name: 'Mar', listings: 8 },
    { name: 'Apr', listings: 10 },
    { name: 'May', listings: 7 },
    { name: 'Jun', listings: 9 },
    { name: 'Jul', listings: 12 },
    { name: 'Aug', listings: 14 },
    { name: 'Sep', listings: 11 },
    { name: 'Oct', listings: 8 },
    { name: 'Nov', listings: 10 },
    { name: 'Dec', listings: properties.length },
  ];
  
  const COLORS = ['#38bdf8', '#4ade80', '#f97316', '#8b5cf6', '#ec4899'];
  
  return (
    <div className="space-y-6">
      <h1 className="heading-lg">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{properties.length}</div>
            <p className="text-xs text-muted-foreground">
              Active listings in our portfolio
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured Properties</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {properties.filter(p => p.featured).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Properties highlighted on homepage
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locations</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.keys(locationCounts).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Cities with available properties
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Property Types</CardTitle>
            <Landmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.keys(propertyTypeCounts).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Different property categories
            </p>
          </CardContent>
        </Card>
      </div>
      
    </div>
  );
};

export default Dashboard;

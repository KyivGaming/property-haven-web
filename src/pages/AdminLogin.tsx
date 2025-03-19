
import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Home, LogIn } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      navigate('/admin/dashboard');
      toast({
        title: 'Login successful',
        description: 'Welcome to the admin dashboard',
      });
    } catch (err) {
      // Error is already handled by the store
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="heading-lg mb-2">Admin Login</h1>
          <p className="text-muted-foreground">
            Sign in to access the OOL Properties admin dashboard
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-elevation-1">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@oolproperties.com"
                required
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                For demo: admin@oolproperties.com / admin123
              </p>
            </div>
            
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
              <LogIn size={16} className="ml-2" />
            </Button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <Button variant="ghost" asChild>
              <a href="/" className="inline-flex items-center">
                <Home size={16} className="mr-2" />
                Return to Home
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

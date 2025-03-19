
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { toast } from "sonner";
import { Home, LogIn } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error, isAuthenticated, checkSession } = useAuthStore();
  const navigate = useNavigate();
  const { toast: uiToast } = useToast();
  
  useEffect(() => {
    // Check if user is already authenticated
    checkSession().then(() => {
      const { isAuthenticated } = useAuthStore.getState();
      if (isAuthenticated) {
        navigate('/admin/dashboard');
      }
    });
  }, [navigate, checkSession]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      const { isAuthenticated, error } = useAuthStore.getState();
      
      if (isAuthenticated) {
        navigate('/admin/dashboard');
        toast.success('Login successful', {
          description: 'Welcome to the admin dashboard',
        });
      } else if (error) {
        toast.error('Login failed', {
          description: error,
        });
      }
    } catch (err) {
      toast.error('Login error', {
        description: 'An unexpected error occurred',
      });
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
          <p className="text-muted-foreground">
            Sign in to access the OOL Properties admin dashboard
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-md">
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
                placeholder="admin@example.com"
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

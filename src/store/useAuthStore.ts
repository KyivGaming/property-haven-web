
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: { id: string; email: string } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // Mock authentication - in real implementation, this would be replaced with Supabase auth
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // For demo purposes only - in production, use proper authentication
          if (email === 'admin@oolproperties.com' && password === 'admin123') {
            set({ 
              user: { id: '1', email },
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
          } else {
            throw new Error('Invalid email or password');
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Authentication failed',
            isLoading: false 
          });
        }
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false, error: null });
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);

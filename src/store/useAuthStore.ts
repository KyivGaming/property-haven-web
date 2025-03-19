
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";

interface AuthState {
  user: { id: string; email: string } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
          });
          
          if (error) throw error;
          
          if (data?.user) {
            // Check if the user is an admin
            const { data: adminData, error: adminError } = await supabase
              .from('admin_users')
              .select('*')
              .eq('id', data.user.id)
              .single();
              
            if (adminError) {
              console.error('Admin check error:', adminError);
              await supabase.auth.signOut();
              throw new Error(`Admin verification failed: ${adminError.message}`);
            }
            
            if (!adminData) {
              console.error('Not an admin user:', data.user.email);
              await supabase.auth.signOut();
              throw new Error('Not authorized as admin. This account is not registered as an admin.');
            }
            
            set({ 
              user: { id: data.user.id, email: data.user.email || '' },
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
            
            toast.success('Login successful', {
              description: `Welcome back, ${data.user.email}`,
            });
          }
        } catch (error) {
          console.error('Login error:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Authentication failed',
            isLoading: false,
            isAuthenticated: false,
            user: null
          });
        }
      },
      
      logout: async () => {
        set({ isLoading: true });
        
        try {
          await supabase.auth.signOut();
          set({ user: null, isAuthenticated: false, error: null, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Logout failed',
            isLoading: false 
          });
        }
      },
      
      checkSession: async () => {
        set({ isLoading: true });
        
        try {
          const { data } = await supabase.auth.getSession();
          
          if (data.session?.user) {
            // Verify the user is an admin
            const { data: adminData, error: adminError } = await supabase
              .from('admin_users')
              .select('*')
              .eq('id', data.session.user.id)
              .single();
              
            if (!adminError && adminData) {
              set({ 
                user: { 
                  id: data.session.user.id, 
                  email: data.session.user.email || '' 
                },
                isAuthenticated: true,
                isLoading: false,
                error: null
              });
              return;
            }
          }
          
          // If we got here, user is not authenticated or not an admin
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false, 
            error: null 
          });
        } catch (error) {
          set({ 
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: error instanceof Error ? error.message : 'Session check failed'
          });
        }
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);

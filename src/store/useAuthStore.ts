
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
  updatePassword: (password: string) => Promise<void>;
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
            set({ 
              user: { 
                id: data.session.user.id, 
                email: data.session.user.email || '' 
              },
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
          } else {
            // If we got here, user is not authenticated
            set({ 
              user: null, 
              isAuthenticated: false, 
              isLoading: false, 
              error: null 
            });
          }
        } catch (error) {
          set({ 
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: error instanceof Error ? error.message : 'Session check failed'
          });
        }
      },

      updatePassword: async (password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const { error } = await supabase.auth.updateUser({
            password
          });
          
          if (error) throw error;
          
          set({ isLoading: false });
          
          toast.success('Password updated', {
            description: 'Your password has been updated successfully',
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Password update failed',
            isLoading: false 
          });
          
          toast.error('Password update failed', {
            description: error instanceof Error ? error.message : 'Failed to update password',
          });
        }
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);

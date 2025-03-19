
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PropertiesPage from "./pages/PropertiesPage";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import PropertiesAdmin from "./pages/admin/PropertiesAdmin";
import InquiriesAdmin from "./pages/admin/InquiriesAdmin";
import UsersAdmin from "./pages/admin/UsersAdmin";
import SettingsAdmin from "./pages/admin/SettingsAdmin";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, checkSession } = useAuthStore();
  
  useEffect(() => {
    checkSession();
  }, [checkSession]);
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }
  
  return <>{children}</>;
};

const App = () => {
  const { checkSession } = useAuthStore();
  
  useEffect(() => {
    // Check authentication status when the app loads
    checkSession();
  }, [checkSession]);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="properties" element={<PropertiesAdmin />} />
              <Route path="inquiries" element={<InquiriesAdmin />} />
              <Route path="users" element={<UsersAdmin />} />
              <Route path="settings" element={<SettingsAdmin />} />
              <Route path="" element={<Navigate to="/admin/dashboard" replace />} />
            </Route>
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

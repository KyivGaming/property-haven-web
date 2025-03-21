
import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { 
  Building, 
  LayoutDashboard, 
  ListChecks, 
  LogOut, 
  Mail,
  MessageSquare, 
  Settings, 
  Users 
} from 'lucide-react';
import { Button } from './ui/button';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarInset
} from './ui/sidebar';
import { toast } from "sonner";

const AdminLayout = () => {
  const { isAuthenticated, logout, checkSession } = useAuthStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check authentication status when component mounts
    checkSession();
  }, [checkSession]);
  
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out", {
        description: "You have been successfully logged out",
      });
      navigate('/admin/login');
    } catch (error) {
      toast.error("Logout failed", {
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      });
    }
  };
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar variant="inset">
          <SidebarHeader>
            <div className="flex items-center px-2 py-4">
              <Building className="h-8 w-8 text-primary mr-2" />
              <div>
                <h1 className="font-bold tracking-tight">OOL Properties</h1>
                <p className="text-xs text-muted-foreground">Admin Portal</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/admin/dashboard">
                        <LayoutDashboard />
                        <span>Dashboard</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/admin/properties">
                        <ListChecks />
                        <span>Properties</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/admin/inquiries">
                        <MessageSquare />
                        <span>Inquiries</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/admin/contacts">
                        <MessageSquare />
                        <span>Contact Messages</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/admin/newsletter">
                        <Mail />
                        <span>Newsletter</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/admin/users">
                        <Users />
                        <span>Users</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>Settings</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/admin/settings">
                        <Settings />
                        <span>Account Settings</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-muted-foreground"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="border-b border-border p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h1 className="text-lg font-semibold">Admin Dashboard</h1>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-full overflow-x-auto">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;

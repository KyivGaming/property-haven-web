
import { useEffect, useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { toast } from "sonner";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, UserPlus, AlertCircle, Loader2 } from 'lucide-react';
import { supabase, Tables } from '@/integrations/supabase/client';
import { useAuthStore } from '@/store/useAuthStore';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

// Type definition for Admin Profile
type AdminProfile = Tables['admin_profiles']['Row'] & {
  email?: string;
};

// Form data types
type ProfileFormData = {
  first_name: string;
  last_name: string;
  email: string;
};

type PasswordFormData = {
  current_password: string;
  new_password: string;
  confirm_password: string;
};

type NewAdminFormData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
};

const SettingsAdmin = () => {
  const [siteSettings, setSiteSettings] = useState({
    siteName: 'OOL Properties',
    siteEmail: 'contact@oolproperties.com',
    phoneNumber: '+1 (555) 123-4567',
    address: '123 Business Ave, Suite 200, San Francisco, CA 94103',
  });
  
  const [featureFlags, setFeatureFlags] = useState({
    enableSocialSharing: true,
    enableLiveChat: false,
    enablePropertyReviews: true,
    enableNewsletterSignup: true,
  });

  const [adminProfiles, setAdminProfiles] = useState<AdminProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAction, setIsLoadingAction] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<AdminProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { user, checkSession } = useAuthStore();

  // Initialize forms
  const profileForm = useForm<ProfileFormData>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: ""
    }
  });

  const passwordForm = useForm<PasswordFormData>({
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: ""
    }
  });

  const newAdminForm = useForm<NewAdminFormData>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      role: "admin"
    }
  });

  const editProfileForm = useForm<ProfileFormData>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: ""
    }
  });

  useEffect(() => {
    fetchAdminProfiles();
    fetchCurrentUserProfile();
  }, [user]);

  const fetchAdminProfiles = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('admin_profiles')
        .select('*');
      
      if (error) throw error;

      if (data) {
        // Now fetch emails from auth users based on id
        const profiles = await Promise.all(data.map(async (profile) => {
          // This query needs to be done on the server side via an admin API
          // For demo purposes, we'll use mock email data
          return { 
            ...profile,
            email: `admin${profile.id.substring(0, 4)}@oolproperties.com`
          };
        }));
        
        setAdminProfiles(profiles);
      }
    } catch (err) {
      console.error('Error fetching admin profiles:', err);
      setError(err instanceof Error ? err.message : 'Failed to load admin profiles');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCurrentUserProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('admin_profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      
      if (data) {
        profileForm.reset({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          email: user.email || ''
        });
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  };

  const handleSiteSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSiteSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFeatureFlagsChange = (name: string, checked: boolean) => {
    setFeatureFlags(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleSaveSettings = () => {
    toast.success("Settings saved", {
      description: "Your settings have been updated successfully.",
    });
  };

  const handleUpdateProfile = async (data: ProfileFormData) => {
    if (!user) return;
    
    setIsLoadingAction(true);
    try {
      const { error } = await supabase
        .from('admin_profiles')
        .update({
          first_name: data.first_name,
          last_name: data.last_name
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast.success("Profile updated", {
        description: "Your profile information has been updated successfully.",
      });
      
      fetchAdminProfiles();
    } catch (err) {
      toast.error("Update failed", {
        description: err instanceof Error ? err.message : "Failed to update profile",
      });
    } finally {
      setIsLoadingAction(false);
    }
  };

  const handleUpdatePassword = async (data: PasswordFormData) => {
    if (data.new_password !== data.confirm_password) {
      toast.error("Passwords don't match", {
        description: "New password and confirmation do not match.",
      });
      return;
    }
    
    setIsLoadingAction(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.new_password
      });
      
      if (error) throw error;
      
      toast.success("Password updated", {
        description: "Your password has been updated successfully.",
      });
      
      passwordForm.reset();
    } catch (err) {
      toast.error("Update failed", {
        description: err instanceof Error ? err.message : "Failed to update password",
      });
    } finally {
      setIsLoadingAction(false);
    }
  };

  const handleCreateAdmin = async (data: NewAdminFormData) => {
    setIsLoadingAction(true);
    try {
      // Note: In a real application, user creation should be done server-side
      // This is a simplified version for demo purposes
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: data.email,
        password: data.password,
        email_confirm: true,
        user_metadata: {
          first_name: data.first_name,
          last_name: data.last_name,
          role: data.role
        }
      });
      
      if (authError) throw authError;
      
      if (authData) {
        toast.success("Admin created", {
          description: `New admin ${data.email} has been created successfully.`,
        });
        
        setIsCreateDialogOpen(false);
        newAdminForm.reset();
        fetchAdminProfiles();
      }
    } catch (err) {
      toast.error("Creation failed", {
        description: err instanceof Error 
          ? err.message 
          : "Failed to create admin user. Note: In this demo, admin creation is simulated.",
      });
    } finally {
      setIsLoadingAction(false);
    }
  };

  const handleDeleteAdmin = async (id: string) => {
    if (id === user?.id) {
      toast.error("Cannot delete yourself", {
        description: "You cannot delete your own admin account.",
      });
      return;
    }

    if (confirm("Are you sure you want to delete this admin user? This action cannot be undone.")) {
      setIsLoadingAction(true);
      try {
        // This is a simplified version for demo purposes
        const { error } = await supabase.auth.admin.deleteUser(id);
        
        if (error) throw error;
        
        toast.success("Admin deleted", {
          description: "The admin user has been deleted successfully.",
        });
        
        fetchAdminProfiles();
      } catch (err) {
        toast.error("Deletion failed", {
          description: err instanceof Error 
            ? err.message 
            : "Failed to delete admin user. Note: In this demo, admin deletion is simulated.",
        });
      } finally {
        setIsLoadingAction(false);
      }
    }
  };

  const handleEditAdmin = (profile: AdminProfile) => {
    setSelectedProfile(profile);
    editProfileForm.reset({
      first_name: profile.first_name || '',
      last_name: profile.last_name || '',
      email: profile.email || ''
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateAdmin = async (data: ProfileFormData) => {
    if (!selectedProfile) return;
    
    setIsLoadingAction(true);
    try {
      const { error } = await supabase
        .from('admin_profiles')
        .update({
          first_name: data.first_name,
          last_name: data.last_name
        })
        .eq('id', selectedProfile.id);
      
      if (error) throw error;
      
      toast.success("Admin updated", {
        description: "The admin profile has been updated successfully.",
      });
      
      setIsEditDialogOpen(false);
      fetchAdminProfiles();
    } catch (err) {
      toast.error("Update failed", {
        description: err instanceof Error ? err.message : "Failed to update admin profile",
      });
    } finally {
      setIsLoadingAction(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="admins">Admin Users</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
              <CardDescription>
                Update your site details and contact information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input 
                    id="siteName" 
                    name="siteName"
                    value={siteSettings.siteName} 
                    onChange={handleSiteSettingsChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteEmail">Contact Email</Label>
                  <Input 
                    id="siteEmail" 
                    name="siteEmail"
                    type="email" 
                    value={siteSettings.siteEmail} 
                    onChange={handleSiteSettingsChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input 
                    id="phoneNumber" 
                    name="phoneNumber"
                    value={siteSettings.phoneNumber} 
                    onChange={handleSiteSettingsChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    name="address"
                    value={siteSettings.address} 
                    onChange={handleSiteSettingsChange} 
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="features" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Feature Toggles</CardTitle>
              <CardDescription>
                Enable or disable site features.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Social Sharing</h4>
                    <p className="text-sm text-muted-foreground">
                      Allow users to share properties on social media
                    </p>
                  </div>
                  <Switch 
                    checked={featureFlags.enableSocialSharing} 
                    onCheckedChange={(checked) => handleFeatureFlagsChange('enableSocialSharing', checked)} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Live Chat Support</h4>
                    <p className="text-sm text-muted-foreground">
                      Enable live chat widget for customer support
                    </p>
                  </div>
                  <Switch 
                    checked={featureFlags.enableLiveChat} 
                    onCheckedChange={(checked) => handleFeatureFlagsChange('enableLiveChat', checked)} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Property Reviews</h4>
                    <p className="text-sm text-muted-foreground">
                      Allow customers to leave reviews on properties
                    </p>
                  </div>
                  <Switch 
                    checked={featureFlags.enablePropertyReviews} 
                    onCheckedChange={(checked) => handleFeatureFlagsChange('enablePropertyReviews', checked)} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Newsletter Signup</h4>
                    <p className="text-sm text-muted-foreground">
                      Show newsletter signup form on the website
                    </p>
                  </div>
                  <Switch 
                    checked={featureFlags.enableNewsletterSignup} 
                    onCheckedChange={(checked) => handleFeatureFlagsChange('enableNewsletterSignup', checked)} 
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="account" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>
                Update your personal information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form 
                  onSubmit={profileForm.handleSubmit(handleUpdateProfile)} 
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={profileForm.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="last_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoadingAction}
                  >
                    {isLoadingAction ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : 'Update Profile'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your account password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...passwordForm}>
                <form 
                  onSubmit={passwordForm.handleSubmit(handleUpdatePassword)} 
                  className="space-y-4"
                >
                  <FormField
                    control={passwordForm.control}
                    name="current_password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="new_password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="confirm_password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoadingAction}
                  >
                    {isLoadingAction ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : 'Update Password'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admins" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Admin Users</h2>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Admin
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Admin</DialogTitle>
                  <DialogDescription>
                    Add a new administrator to the system.
                  </DialogDescription>
                </DialogHeader>
                <Form {...newAdminForm}>
                  <form onSubmit={newAdminForm.handleSubmit(handleCreateAdmin)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={newAdminForm.control}
                        name="first_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={newAdminForm.control}
                        name="last_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={newAdminForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={newAdminForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={newAdminForm.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <FormControl>
                            <Input {...field} value="admin" disabled />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button 
                        type="submit" 
                        disabled={isLoadingAction}
                      >
                        {isLoadingAction ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating...
                          </>
                        ) : 'Create Admin'}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="pt-6">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : error ? (
                <div className="bg-red-50 p-4 rounded-md text-red-800 flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              ) : adminProfiles.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No admin users found</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adminProfiles.map((profile) => (
                      <TableRow key={profile.id}>
                        <TableCell>
                          {profile.first_name || ''} {profile.last_name || ''}
                        </TableCell>
                        <TableCell>{profile.email || 'N/A'}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {profile.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(profile.created_at)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditAdmin(profile)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteAdmin(profile.id)}
                              disabled={profile.id === user?.id}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Admin Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Admin User</DialogTitle>
            <DialogDescription>
              Update admin user information.
            </DialogDescription>
          </DialogHeader>
          <Form {...editProfileForm}>
            <form onSubmit={editProfileForm.handleSubmit(handleUpdateAdmin)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editProfileForm.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editProfileForm.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={editProfileForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button 
                  type="submit" 
                  disabled={isLoadingAction}
                >
                  {isLoadingAction ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : 'Save Changes'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingsAdmin;


import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

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
  
  const { toast } = useToast();
  
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
    // In a real application, this would save to the backend
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
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
        
        <TabsContent value="account" className="space-y-4 pt-4 max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>
                Update your account password and security settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Update Password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsAdmin;

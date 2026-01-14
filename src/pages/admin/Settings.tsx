import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Save, 
  Bell, 
  Shield, 
  Database, 
  Mail,
  Globe
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    siteName: 'TruthGuard',
    siteDescription: 'AI-Powered Fake News Detection',
    emailNotifications: true,
    autoModeration: false,
    publicSubmissions: true,
    requireAuth: true,
    modelConfidenceThreshold: 75,
    maxTextLength: 10000,
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Configure application settings and preferences</p>
      </div>

      {/* General Settings */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Globe className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">General</h2>
            <p className="text-sm text-muted-foreground">Basic site configuration</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="siteName">Site Name</Label>
            <Input
              id="siteName"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="siteDescription">Site Description</Label>
            <Input
              id="siteDescription"
              value={settings.siteDescription}
              onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Bell className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
            <p className="text-sm text-muted-foreground">Configure notification preferences</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="emailNotifications" className="text-foreground">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive email alerts for new feedback</p>
            </div>
            <Switch
              id="emailNotifications"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoModeration" className="text-foreground">Auto Moderation</Label>
              <p className="text-sm text-muted-foreground">Automatically flag suspicious content</p>
            </div>
            <Switch
              id="autoModeration"
              checked={settings.autoModeration}
              onCheckedChange={(checked) => setSettings({ ...settings, autoModeration: checked })}
            />
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Security</h2>
            <p className="text-sm text-muted-foreground">Access and authentication settings</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="publicSubmissions" className="text-foreground">Public Submissions</Label>
              <p className="text-sm text-muted-foreground">Allow anyone to submit news articles</p>
            </div>
            <Switch
              id="publicSubmissions"
              checked={settings.publicSubmissions}
              onCheckedChange={(checked) => setSettings({ ...settings, publicSubmissions: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="requireAuth" className="text-foreground">Require Authentication</Label>
              <p className="text-sm text-muted-foreground">Users must be logged in to submit</p>
            </div>
            <Switch
              id="requireAuth"
              checked={settings.requireAuth}
              onCheckedChange={(checked) => setSettings({ ...settings, requireAuth: checked })}
            />
          </div>
        </div>
      </div>

      {/* Model Settings */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Database className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Model Configuration</h2>
            <p className="text-sm text-muted-foreground">AI model and processing settings</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="confidenceThreshold">Confidence Threshold (%)</Label>
            <Input
              id="confidenceThreshold"
              type="number"
              min="50"
              max="100"
              value={settings.modelConfidenceThreshold}
              onChange={(e) => setSettings({ ...settings, modelConfidenceThreshold: parseInt(e.target.value) })}
            />
            <p className="text-xs text-muted-foreground">Minimum confidence level to show prediction</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxTextLength">Maximum Text Length</Label>
            <Input
              id="maxTextLength"
              type="number"
              min="1000"
              max="50000"
              value={settings.maxTextLength}
              onChange={(e) => setSettings({ ...settings, maxTextLength: parseInt(e.target.value) })}
            />
            <p className="text-xs text-muted-foreground">Maximum characters allowed per submission</p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}

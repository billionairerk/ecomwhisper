
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-lg">Simple, powerful, intuitive control over your experience.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="ranking-alerts" className="font-medium">Ranking Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified when your rankings change</p>
              </div>
              <Switch id="ranking-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="competitor-alerts" className="font-medium">Competitor Updates</Label>
                <p className="text-sm text-muted-foreground">Monitor competitive movements</p>
              </div>
              <Switch id="competitor-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="backlink-alerts" className="font-medium">Backlink Opportunities</Label>
                <p className="text-sm text-muted-foreground">Discover new link building chances</p>
              </div>
              <Switch id="backlink-alerts" defaultChecked />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Sarah Johnson" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="sarah@example.com" />
            </div>
            <Button className="mt-2 w-full">Update Account</Button>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">API Integration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <div className="flex gap-2">
                <Input id="api-key" defaultValue="sk_live_•••••••••••••••••••••••••••••" type="password" className="font-mono" />
                <Button variant="outline">Regenerate</Button>
              </div>
              <p className="text-sm text-muted-foreground">Your API key grants full access to your account. Keep it secure.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;

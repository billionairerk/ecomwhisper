
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, ExternalLink } from 'lucide-react';

const Backlinks = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Backlinks</h1>
          <p className="text-muted-foreground">Monitor your backlink profile and discover new opportunities.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Analyze Backlinks
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Backlink Profile</CardTitle>
          <CardDescription>Configure APIs to start monitoring backlinks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">Get Started with Backlink Monitoring</h3>
            <p className="text-muted-foreground mb-4">
              To start monitoring backlinks, you need to connect to one of these backlink data providers:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 border-dashed cursor-pointer hover:border-primary transition-colors">
                <div className="font-medium mb-2">Ahrefs API</div>
                <p className="text-sm text-muted-foreground">The industry standard for backlink data.</p>
                <Button variant="outline" className="mt-2" size="sm">
                  <ExternalLink className="h-3 w-3 mr-2" /> Connect
                </Button>
              </Card>
              <Card className="p-4 border-dashed cursor-pointer hover:border-primary transition-colors">
                <div className="font-medium mb-2">Moz API</div>
                <p className="text-sm text-muted-foreground">Comprehensive link metrics and data.</p>
                <Button variant="outline" className="mt-2" size="sm">
                  <ExternalLink className="h-3 w-3 mr-2" /> Connect
                </Button>
              </Card>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">Backlink Growth Features</h3>
            <p className="text-muted-foreground mb-4">
              After connecting an API, you'll be able to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Monitor new and lost backlinks in real-time</li>
              <li>Analyze competitor backlink profiles</li>
              <li>Get AI-powered suggestions for backlink opportunities</li>
              <li>Set up alerts for important backlink changes</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Backlinks;

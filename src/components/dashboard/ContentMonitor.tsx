
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, ExternalLink } from 'lucide-react';

const ContentMonitor = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Monitor</h1>
          <p className="text-muted-foreground">Track competitor content and get AI-powered insights.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Scan Content
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Content Monitoring</CardTitle>
          <CardDescription>Configure content tracking capabilities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">Get Started with Content Monitoring</h3>
            <p className="text-muted-foreground mb-4">
              To start monitoring competitor content, you need to:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-sm mb-4">
              <li>Add competitors in the Competitors section</li>
              <li>Configure an API for content scraping</li>
              <li>Set up monitoring preferences</li>
            </ol>
            <Button variant="outline" size="sm">
              <ExternalLink className="h-3 w-3 mr-2" /> Set Up Content Scraping
            </Button>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">Content Analytics Features</h3>
            <p className="text-muted-foreground mb-4">
              After setup, you'll be able to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Detect new content from competitors</li>
              <li>Analyze content topics and themes</li>
              <li>Get AI-powered content recommendations</li>
              <li>Track content performance metrics</li>
              <li>Identify trending topics in your niche</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentMonitor;

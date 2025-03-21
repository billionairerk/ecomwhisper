
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Lightbulb } from 'lucide-react';

const GrowthHacks = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Growth Hacks</h1>
          <p className="text-muted-foreground">Get AI-powered growth strategies based on competitor analysis.</p>
        </div>
        <Button>
          <Zap className="mr-2 h-4 w-4" /> Generate Ideas
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>AI Growth Engine</CardTitle>
          <CardDescription>Intelligent growth suggestions based on your data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
            <div className="flex items-start mb-3">
              <Lightbulb className="h-5 w-5 mr-2 text-primary" />
              <div>
                <h3 className="font-medium">Set Up Your Growth Engine</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  The AI Growth Engine analyzes your competitors, keywords, and market trends to generate actionable growth strategies.
                </p>
              </div>
            </div>
            <div className="border-t border-border pt-3 mt-3">
              <p className="text-sm font-medium mb-2">To generate personalized growth hacks:</p>
              <ol className="list-decimal pl-5 text-sm space-y-1">
                <li>Add at least 5 keywords in the Keywords section</li>
                <li>Add at least 3 competitors in the Competitors section</li>
                <li>Allow data collection for at least 7 days</li>
              </ol>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <Card className="p-4 border">
              <h4 className="font-medium mb-2">Content Opportunities</h4>
              <p className="text-sm text-muted-foreground">
                Identify content gaps and trending topics your competitors are missing.
              </p>
              <Button variant="outline" className="mt-3 w-full" size="sm">
                <Zap className="h-3 w-3 mr-2" /> Generate
              </Button>
            </Card>
            
            <Card className="p-4 border">
              <h4 className="font-medium mb-2">Keyword Opportunities</h4>
              <p className="text-sm text-muted-foreground">
                Discover high-value keywords with low competition.
              </p>
              <Button variant="outline" className="mt-3 w-full" size="sm">
                <Zap className="h-3 w-3 mr-2" /> Generate
              </Button>
            </Card>
            
            <Card className="p-4 border">
              <h4 className="font-medium mb-2">Backlink Strategies</h4>
              <p className="text-sm text-muted-foreground">
                Find untapped backlink sources your competitors are leveraging.
              </p>
              <Button variant="outline" className="mt-3 w-full" size="sm">
                <Zap className="h-3 w-3 mr-2" /> Generate
              </Button>
            </Card>
            
            <Card className="p-4 border">
              <h4 className="font-medium mb-2">Conversion Tactics</h4>
              <p className="text-sm text-muted-foreground">
                Improve conversion rates based on competitor strategies.
              </p>
              <Button variant="outline" className="mt-3 w-full" size="sm">
                <Zap className="h-3 w-3 mr-2" /> Generate
              </Button>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GrowthHacks;

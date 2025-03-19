
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, BookOpen, MessageCircle, FileText, Video } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Help = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground text-lg">Simple solutions to keep you moving forward.</p>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search for help articles..." className="pl-10" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HelpCard 
          icon={<BookOpen className="h-5 w-5" />} 
          title="Knowledge Base" 
          description="Explore our comprehensive guides and documentation."
          items={[
            "Getting Started with ecomWhisper",
            "Understanding Real-Time Rankings",
            "Setting up Competitor Tracking",
            "AI Growth Hacks Explained"
          ]}
        />
        
        <HelpCard 
          icon={<Video className="h-5 w-5" />} 
          title="Video Tutorials" 
          description="Visual step-by-step instructions for every feature."
          items={[
            "Dashboard Overview",
            "Setting up Custom Alerts",
            "Reading Analytics Reports",
            "Using the AI Recommendation Engine"
          ]}
        />
        
        <HelpCard 
          icon={<MessageCircle className="h-5 w-5" />} 
          title="Live Support" 
          description="Connect with our team for personalized assistance."
          items={[
            "Live Chat (Available 24/7)",
            "Email Support",
            "Schedule a Call",
            "Feature Request"
          ]}
        />
        
        <HelpCard 
          icon={<FileText className="h-5 w-5" />} 
          title="Resources" 
          description="Additional materials to enhance your experience."
          items={[
            "SEO Best Practices",
            "Competitive Analysis Templates",
            "Monthly Webinars",
            "Industry Reports"
          ]}
        />
      </div>
    </div>
  );
};

interface HelpCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
}

const HelpCard = ({ icon, title, description, items }: HelpCardProps) => (
  <Card>
    <CardHeader className="pb-2">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-full bg-primary/10 text-primary">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-sm">
            <a href="#" className="hover:text-primary hover:underline transition-colors">{item}</a>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export default Help;

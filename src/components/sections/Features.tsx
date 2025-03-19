
import React from 'react';
import FeatureCard from '@/components/ui/card/FeatureCard';
import { ArrowUpRight, Gauge, LineChart, Link2, Search, Sparkles, Zap } from 'lucide-react';

const Features = () => {
  return (
    <section id="features" className="py-20 px-6 md:px-10 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Key Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
            Beyond Traditional SEO Tracking
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Elevate your SEO strategy with real-time insights and AI-powered recommendations that give you a competitive edge.
          </p>
        </div>

        <div className="space-y-20">
          <FeatureCard
            title="Real-Time Competitor Rank Tracking & Alerts"
            description="Stay updated on competitor keyword rankings with instant notifications and real-time insights – no more waiting hours like with traditional tools."
            icon={<Gauge className="h-8 w-8" />}
            benefits={[
              "Track competitor keyword rankings in real-time with Google Search Console API and web scraping",
              "Receive instant alerts when competitors outrank you",
              "Get AI-powered rank recovery suggestions to regain position quickly"
            ]}
          />

          <FeatureCard
            title="AI-Powered Competitor Content Monitoring"
            description="Track competitor content changes and let AI analyze & counter their strategy with better suggestions."
            icon={<Search className="h-8 w-8" />}
            isReversed={true}
            benefits={[
              "AI continuously monitors competitor blogs, website updates & ad campaigns",
              "Get actionable recommendations to outperform competitors' content",
              "Monitor Facebook, Google, and Instagram ads used by competitors"
            ]}
          />

          <FeatureCard
            title="Real-Time Backlink Tracking & Auto-Suggestions"
            description="Identify new backlinks competitors are getting and let AI suggest backlink acquisition strategies."
            icon={<Link2 className="h-8 w-8" />}
            benefits={[
              "Receive instant alerts when competitors gain new backlinks",
              "AI scans relevant authority sites for backlink opportunities for your site",
              "Get automated outreach assistance with email templates for contacting site owners"
            ]}
          />

          <FeatureCard
            title="AI-Powered Growth Hacks (Virality Engine)"
            description="Our AI analyzes competitor viral content strategies and suggests high-performing tactics for rapid growth."
            icon={<ArrowUpRight className="h-8 w-8" />}
            isReversed={true}
            benefits={[
              "AI scans competitor social media, blogs & ads for viral trends",
              "Get ready-to-use content ideas, headlines & viral hooks",
              "Receive AI-generated viral growth strategies that worked for competitors"
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;


import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Sparkles, Search, Bell, LineChart } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.85;
        if (isVisible) {
          el.classList.add('revealed');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on load
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-28 px-6 md:px-10 overflow-hidden" ref={heroRef}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-70 z-0"></div>
      <div className="absolute inset-0 bg-noise opacity-50 z-0"></div>
      
      {/* Glowing Orb */}
      <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-primary/20 rounded-full filter blur-[100px] animate-pulse-soft"></div>
      <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full filter blur-[120px] animate-pulse-soft animation-delay-1000"></div>
      
      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center pb-20">
        <div className="space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary mb-6 reveal-on-scroll">
            <Sparkles className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">AI-Powered SEO Insights</span>
          </div>
          
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-balance leading-tight reveal-on-scroll">
            Real-Time SEO &<br />Competitor Analysis <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">AI Tool</span>
          </h1>
          
          {/* Subheadline */}
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground reveal-on-scroll">
            Stay ahead with instant insights, real-time alerts, and AI-driven growth hacks that transform your SEO strategy and outperform competitors.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 reveal-on-scroll">
            <Button size="lg" className="rounded-full text-base px-8 py-6">
              Get Started <ChevronRight className="ml-1 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-base px-8 py-6">
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
      
      {/* Dashboard Preview */}
      <div className="relative w-full max-w-6xl mx-auto reveal-on-scroll">
        <div className="glass-card rounded-3xl border border-white/20 shadow-elevated overflow-hidden">
          <div className="relative bg-white/30 dark:bg-black/30 backdrop-blur-lg p-6 rounded-t-3xl border-b border-white/20">
            <div className="flex items-center">
              <div className="flex space-x-2 absolute left-6">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-center w-full">
                <div className="px-4 py-1 bg-white/20 dark:bg-black/20 rounded-full inline-flex items-center">
                  <Search className="h-3 w-3 mr-2" />
                  <span className="text-xs">ecomwhisper.ai/dashboard</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-gradient-to-b from-white/50 to-white/30 dark:from-black/50 dark:to-black/30 h-[400px] backdrop-blur-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
              <div className="col-span-2 grid grid-rows-2 gap-4">
                <div className="subtle-glass rounded-xl p-4 flex items-center">
                  <div className="mr-4 p-3 bg-primary/10 rounded-lg">
                    <LineChart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Competitor Rankings</h4>
                    <p className="text-xs text-muted-foreground">Real-time monitoring</p>
                  </div>
                </div>
                <div className="subtle-glass rounded-xl p-4 flex items-center">
                  <div className="mr-4 p-3 bg-primary/10 rounded-lg">
                    <Bell className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Real-Time Alerts</h4>
                    <p className="text-xs text-muted-foreground">Instant notifications</p>
                  </div>
                </div>
              </div>
              <div className="subtle-glass rounded-xl p-4">
                <h4 className="font-medium text-sm mb-2">AI Recommendations</h4>
                <div className="space-y-2">
                  <div className="bg-white/30 dark:bg-black/20 p-2 rounded-lg text-xs">
                    Add missing keywords for better ranking
                  </div>
                  <div className="bg-white/30 dark:bg-black/20 p-2 rounded-lg text-xs">
                    Optimize meta descriptions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

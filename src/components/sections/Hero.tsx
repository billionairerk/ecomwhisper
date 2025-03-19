
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Search, LineChart, BarChart4, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

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
            <span className="text-sm font-medium">Think Different. Rank Better.</span>
          </div>
          
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tight text-balance leading-tight reveal-on-scroll">
            The SEO Tool <br />That Just Works
          </h1>
          
          {/* Subheadline */}
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground reveal-on-scroll">
            At the intersection of simplicity and power. Monitor competitors, receive real-time alerts, 
            and get AI insights in one beautifully designed experience.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 reveal-on-scroll">
            <Link to="/dashboard">
              <Button size="lg" className="rounded-full text-base px-8 py-6 shadow-lg">
                Try Dashboard Demo <ArrowRight className="ml-1 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="rounded-full text-base px-8 py-6">
              Learn More
            </Button>
          </div>
        </div>
      </div>
      
      {/* Dashboard Preview */}
      <div className="relative w-full max-w-6xl mx-auto reveal-on-scroll">
        <div className="glass-card rounded-[2rem] border border-white/20 shadow-elevated overflow-hidden">
          <div className="relative bg-white/30 dark:bg-black/30 backdrop-blur-lg p-6 rounded-t-[2rem] border-b border-white/20">
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
          
          <div className="p-6 bg-gradient-to-b from-white/50 to-white/30 dark:from-black/50 dark:to-black/30 h-[450px] backdrop-blur-md">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-full">
              <div className="col-span-8 grid grid-rows-2 gap-4">
                <div className="subtle-glass rounded-xl p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <div className="mr-3 p-2 bg-primary/10 rounded-lg">
                        <LineChart className="h-5 w-5 text-primary" />
                      </div>
                      <h4 className="font-medium">Keyword Rankings</h4>
                    </div>
                    <div className="pill-badge">Live Data</div>
                  </div>
                  <div className="h-[120px] bg-white/20 dark:bg-black/20 rounded-lg"></div>
                </div>
                <div className="subtle-glass rounded-xl p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <div className="mr-3 p-2 bg-primary/10 rounded-lg">
                        <BarChart4 className="h-5 w-5 text-primary" />
                      </div>
                      <h4 className="font-medium">Competitive Analysis</h4>
                    </div>
                    <div className="pill-badge">Updated</div>
                  </div>
                  <div className="h-[120px] bg-white/20 dark:bg-black/20 rounded-lg"></div>
                </div>
              </div>
              <div className="col-span-4 subtle-glass rounded-xl p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="mr-3 p-2 bg-primary/10 rounded-lg">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-medium">AI Insights</h4>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/30 dark:bg-black/20 p-3 rounded-lg text-sm">
                    <p className="font-medium">Ranking Opportunity</p>
                    <p className="text-xs text-muted-foreground mt-1">Add these keywords to improve position by 30%</p>
                  </div>
                  <div className="bg-white/30 dark:bg-black/20 p-3 rounded-lg text-sm">
                    <p className="font-medium">Content Gap</p>
                    <p className="text-xs text-muted-foreground mt-1">Competitor's article outperforming by 45%</p>
                  </div>
                  <div className="bg-white/30 dark:bg-black/20 p-3 rounded-lg text-sm">
                    <p className="font-medium">Backlink Alert</p>
                    <p className="text-xs text-muted-foreground mt-1">3 new opportunities detected today</p>
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

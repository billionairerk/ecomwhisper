
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 px-6 md:px-10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-70 z-0"></div>
      <div className="absolute inset-0 bg-noise opacity-50 z-0"></div>
      
      {/* Glowing Orb */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/20 rounded-full filter blur-[100px] animate-pulse-soft"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="glass-card rounded-[2rem] p-12 md:p-16 text-center overflow-hidden relative">
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">One More Thing</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
              A Thousand Rankings In Your Pocket
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We believe in making the complex simple. In creating tools that enhance human capability. 
              This is SEO intelligence that's insanely great.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="rounded-full text-base px-8 py-6 shadow-lg">
                Get Started <ArrowRight className="ml-1 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full text-base px-8 py-6">
                Schedule a Demo
              </Button>
            </div>
          </div>
          
          {/* Abstract shapes in background */}
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-primary/10 rounded-full"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;


import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) {
      const elements = section.querySelectorAll('.reveal-on-scroll');
      elements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (section) {
        const elements = section.querySelectorAll('.reveal-on-scroll');
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <section className="py-20 px-6 md:px-10 relative overflow-hidden grid-pattern" ref={sectionRef}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent opacity-70 z-0"></div>
      <div className="absolute inset-0 bg-noise opacity-50 z-0"></div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/20 dark:bg-primary/30 rounded-full filter blur-[100px] animate-pulse-soft"></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-400/10 dark:bg-blue-500/20 rounded-full filter blur-[120px] animate-pulse-soft animation-delay-1000"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="glass-card dark:bg-black/40 rounded-[2rem] p-12 md:p-16 text-center overflow-hidden relative shiny-card">
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary mb-6 reveal-on-scroll">
              <Sparkles className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">One More Thing</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6 reveal-on-scroll">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-blue-500">
                A Thousand Rankings In Your Pocket
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto reveal-on-scroll">
              We believe in making the complex simple. In creating tools that enhance human capability. 
              This is SEO intelligence that's insanely great.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal-on-scroll">
              <Button size="lg" className="rounded-full text-base px-8 py-6 shadow-lg vercel-glow transition-all duration-300 hover:translate-y-[-2px]">
                Get Started <ArrowRight className="ml-1 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full text-base px-8 py-6 transition-all duration-300 hover:bg-primary/5 dark:hover:bg-primary/10">
                Schedule a Demo
              </Button>
            </div>
          </div>
          
          {/* Abstract shapes in background */}
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-primary/10 dark:bg-primary/20 rounded-full"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 dark:bg-primary/15 rounded-full"></div>
          
          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary/20 via-blue-500/20 to-primary/20 blur-xl -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;


import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';

const CTASection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 px-6 md:px-10 relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.07)_0,transparent_70%)] z-0"></div>
      <div className="absolute inset-0 bg-noise opacity-30 z-0"></div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-600/10 rounded-full filter blur-[100px] animate-pulse-soft"></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-violet-600/10 rounded-full filter blur-[120px] animate-pulse-soft animation-delay-1000"></div>
      
      <motion.div 
        className="max-w-6xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="neo-blur rounded-xl p-12 md:p-16 text-center overflow-hidden relative">
          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div 
              variants={itemVariants} 
              className="inline-flex items-center px-4 py-2 rounded-full bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/30 text-blue-400 mb-6"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">One More Thing</span>
            </motion.div>
            
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-5xl font-bold font-display mb-6"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-violet-400">
                A Thousand Rankings In Your Pocket
              </span>
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto"
            >
              We believe in making the complex simple. In creating tools that enhance human capability. 
              This is SEO intelligence that's insanely great.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button size="lg" className="rounded-md bg-blue-600 hover:bg-blue-700 text-base px-8 py-6 shadow-glow shadow-blue-600/20 transition-all duration-300 hover:shadow-blue-600/40 hover:translate-y-[-2px]">
                Get Started <ArrowRight className="ml-1 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-md border-zinc-700 hover:border-zinc-600 bg-transparent text-zinc-300 hover:bg-zinc-800/50 text-base px-8 py-6">
                Schedule a Demo
              </Button>
            </motion.div>
          </div>
          
          {/* Abstract shapes in background */}
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-blue-600/5 rounded-full"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-violet-600/5 rounded-full"></div>
          
          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-blue-600/20 via-violet-500/20 to-blue-600/20 blur-xl -z-10"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;

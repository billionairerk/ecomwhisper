
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Search, LineChart, BarChart4, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const floatAnimation = {
    y: [-10, 10],
    transition: {
      y: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={container}
      className="relative min-h-screen flex flex-col items-center justify-center pt-28 px-6 md:px-10 overflow-hidden" 
      ref={heroRef}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black opacity-90 z-0"></div>
      <div className="absolute inset-0 bg-noise opacity-30 z-0"></div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-blue-600/10 rounded-full filter blur-[100px] animate-pulse-soft"></div>
      <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-violet-600/10 rounded-full filter blur-[120px] animate-pulse-soft animation-delay-1000"></div>
      
      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center pb-20">
        <div className="space-y-6">
          {/* Badge */}
          <motion.div 
            variants={item}
            className="inline-flex items-center px-4 py-2 rounded-full bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/30 text-blue-400 mb-6"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Think Different. Rank Better.</span>
          </motion.div>
          
          {/* Headline */}
          <motion.h1 
            variants={item}
            className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tight text-balance leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400"
          >
            Crush Your Competition <br />With AI-Powered Insights
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p 
            variants={item}
            className="max-w-2xl mx-auto text-xl text-zinc-400"
          >
            The ultimate competitor tracking tool that analyzes SEO, backlinks, traffic, and growth trends—all in one place. 
            Get ahead before they even see you coming!
          </motion.p>
          
          {/* Feature Pills */}
          <motion.div
            variants={item}
            className="flex flex-wrap justify-center gap-3 mt-6"
          >
            <span className="bg-zinc-800/50 text-zinc-300 px-3 py-1 rounded-full text-sm flex items-center">
              <Search className="h-3 w-3 mr-1 text-blue-400" /> Track Competitors in Real-Time
            </span>
            <span className="bg-zinc-800/50 text-zinc-300 px-3 py-1 rounded-full text-sm flex items-center">
              <LineChart className="h-3 w-3 mr-1 text-green-400" /> Analyze SEO & Backlinks Instantly
            </span>
            <span className="bg-zinc-800/50 text-zinc-300 px-3 py-1 rounded-full text-sm flex items-center">
              <Zap className="h-3 w-3 mr-1 text-yellow-400" /> Uncover Hidden Market Opportunities
            </span>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div 
            variants={item}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
          >
            <Link to="/auth">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-full button-pulse"
              >
                <Button 
                  size="lg" 
                  className="rounded-md bg-blue-600 hover:bg-blue-700 text-base px-8 py-6 shadow-glow shadow-blue-600/20 transition-all duration-300 hover:shadow-blue-600/40"
                >
                  Start Winning Today <ArrowRight className="ml-1 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
            <Link to="/dashboard">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-md border-zinc-700 hover:border-zinc-600 bg-transparent text-zinc-300 hover:bg-zinc-800/50 text-base px-8 py-6 transition-all duration-300"
                >
                  Try Dashboard Demo
                </Button>
              </motion.div>
            </Link>
          </motion.div>
          
          {/* Trust Badge */}
          <motion.div
            variants={item}
            className="mt-8 flex items-center justify-center"
          >
            <div className="flex items-center text-zinc-500 text-sm">
              <Shield className="h-4 w-4 mr-2 text-zinc-400" />
              <span>Trusted by 500+ businesses worldwide</span>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Dashboard Preview */}
      <motion.div 
        variants={item}
        className="relative w-full max-w-6xl mx-auto"
        animate={floatAnimation}
      >
        <div className="neo-blur rounded-[1rem] border border-zinc-800/50 shadow-elevated overflow-hidden transition-all duration-500 hover:border-zinc-700/50 hover:shadow-glow hover:shadow-blue-600/10">
          <div className="relative bg-zinc-900/80 backdrop-blur-lg p-6 rounded-t-[1rem] border-b border-zinc-800/50">
            <div className="flex items-center">
              <div className="flex space-x-2 absolute left-6">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-center w-full">
                <div className="px-4 py-1 bg-zinc-800/50 rounded-full inline-flex items-center">
                  <Search className="h-3 w-3 mr-2 text-zinc-400" />
                  <span className="text-xs text-zinc-400">ecomwhisper.ai/dashboard</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-gradient-to-b from-zinc-900/80 to-black/80 h-[450px] backdrop-blur-md">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-full">
              <div className="col-span-8 grid grid-rows-2 gap-4">
                <div className="bg-zinc-800/40 backdrop-blur-sm border border-zinc-700/30 rounded-xl p-4 transition-all duration-300 hover:border-zinc-700/50 hover:bg-zinc-800/50">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <div className="mr-3 p-2 bg-blue-900/30 rounded-lg">
                        <LineChart className="h-5 w-5 text-blue-400" />
                      </div>
                      <h4 className="font-medium text-zinc-200">Competitor Rankings</h4>
                    </div>
                    <div className="text-xs font-medium bg-blue-900/30 text-blue-400 px-2.5 py-0.5 rounded-full">Live Data</div>
                  </div>
                  <div className="h-[120px] bg-zinc-900/40 rounded-lg flex items-center justify-center">
                    <div className="w-full px-4">
                      <div className="h-16 w-full relative">
                        {/* Animated chart lines */}
                        <div className="absolute bottom-0 left-0 w-full h-full flex items-end">
                          <div className="w-[8%] h-[35%] mx-[1%] bg-blue-500 rounded-t"></div>
                          <div className="w-[8%] h-[65%] mx-[1%] bg-blue-500 rounded-t"></div>
                          <div className="w-[8%] h-[45%] mx-[1%] bg-blue-500 rounded-t"></div>
                          <div className="w-[8%] h-[75%] mx-[1%] bg-blue-500 rounded-t"></div>
                          <div className="w-[8%] h-[55%] mx-[1%] bg-blue-500 rounded-t"></div>
                          <div className="w-[8%] h-[90%] mx-[1%] bg-blue-500 rounded-t"></div>
                          <div className="w-[8%] h-[40%] mx-[1%] bg-blue-500 rounded-t"></div>
                          <div className="w-[8%] h-[60%] mx-[1%] bg-blue-500 rounded-t"></div>
                          <div className="w-[8%] h-[80%] mx-[1%] bg-blue-500 rounded-t"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-zinc-800/40 backdrop-blur-sm border border-zinc-700/30 rounded-xl p-4 transition-all duration-300 hover:border-zinc-700/50 hover:bg-zinc-800/50">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <div className="mr-3 p-2 bg-violet-900/30 rounded-lg">
                        <BarChart4 className="h-5 w-5 text-violet-400" />
                      </div>
                      <h4 className="font-medium text-zinc-200">Competitive Analysis</h4>
                    </div>
                    <div className="text-xs font-medium bg-violet-900/30 text-violet-400 px-2.5 py-0.5 rounded-full">Updated</div>
                  </div>
                  <div className="h-[120px] bg-zinc-900/40 rounded-lg flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-4 w-full px-6">
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold text-violet-400">86%</div>
                        <div className="text-xs text-zinc-500">SEO Score</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold text-green-400">12.3k</div>
                        <div className="text-xs text-zinc-500">Backlinks</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold text-yellow-400">72</div>
                        <div className="text-xs text-zinc-500">Domain Authority</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-4 bg-zinc-800/40 backdrop-blur-sm border border-zinc-700/30 rounded-xl p-4 transition-all duration-300 hover:border-zinc-700/50 hover:bg-zinc-800/50">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="mr-3 p-2 bg-teal-900/30 rounded-lg">
                      <Zap className="h-5 w-5 text-teal-400" />
                    </div>
                    <h4 className="font-medium text-zinc-200">AI Insights</h4>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-zinc-900/60 p-3 rounded-lg text-sm transition-all duration-300 hover:bg-zinc-900/80">
                    <p className="font-medium text-zinc-200">Ranking Opportunity</p>
                    <p className="text-xs text-zinc-400 mt-1">Add these keywords to improve position by 30%</p>
                  </div>
                  <div className="bg-zinc-900/60 p-3 rounded-lg text-sm transition-all duration-300 hover:bg-zinc-900/80">
                    <p className="font-medium text-zinc-200">Content Gap</p>
                    <p className="text-xs text-zinc-400 mt-1">Competitor's article outperforming by 45%</p>
                  </div>
                  <div className="bg-zinc-900/60 p-3 rounded-lg text-sm transition-all duration-300 hover:bg-zinc-900/80">
                    <p className="font-medium text-zinc-200">Backlink Alert</p>
                    <p className="text-xs text-zinc-400 mt-1">3 new opportunities detected today</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;

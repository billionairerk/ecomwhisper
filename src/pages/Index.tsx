
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Testimonials from '@/components/sections/Testimonials';
import CTASection from '@/components/sections/CTASection';
import Pricing from '@/components/sections/Pricing';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Index = () => {
  useEffect(() => {
    // Reveal animations as user scrolls
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
    setTimeout(handleScroll, 300);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-background text-foreground overflow-x-hidden dark">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <CTASection />
        
        {/* Dashboard Preview Section */}
        <section className="py-20 px-6 md:px-10 text-center bg-zinc-900">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6 text-zinc-100"
            >
              Ready to see it in action?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-zinc-400 mb-8"
            >
              Check out our interactive dashboard demo to experience the power of real-time SEO insights.
            </motion.p>
            <Link to="/dashboard">
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }} 
                whileTap={{ scale: 0.95 }}
                className="button-pulse inline-block"
              >
                <Button 
                  size="lg" 
                  className="rounded-full text-base px-8 py-6 shadow-glow hover:shadow-blue-600/40 hover:-translate-y-1 transition-all duration-300 bg-blue-600 hover:bg-blue-700"
                >
                  View Dashboard Demo
                </Button>
              </motion.div>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

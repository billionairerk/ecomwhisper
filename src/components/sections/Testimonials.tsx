
import React from 'react';
import TestimonialCard from '@/components/ui/card/TestimonialCard';
import { Sparkles } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      content: "ecomWhisper completely transformed how we monitor competitors. The real-time alerts allowed us to respond immediately when our competitors changed strategy, helping us stay ahead of the curve.",
      author: {
        name: "Sarah Johnson",
        role: "Digital Marketing Director, E-commerce Brand"
      },
      rating: 5
    },
    {
      content: "The AI-powered recommendations are incredibly accurate. We implemented one of their backlink suggestions and saw our rankings improve within just two weeks.",
      author: {
        name: "Michael Chen",
        role: "SEO Specialist, SaaS Company"
      },
      rating: 5
    },
    {
      content: "I love how the platform notifies me instantly when competitors outrank us. It's saved us countless hours of manual checking and helped us respond faster to market changes.",
      author: {
        name: "Emma Davis",
        role: "CMO, Retail Business"
      },
      rating: 5
    },
    {
      content: "Their virality engine is a game-changer. We used their content suggestions for our social media strategy and saw engagement increase by over 200% in just one month.",
      author: {
        name: "Alex Rodriguez",
        role: "Social Media Manager, D2C Brand"
      },
      rating: 5
    },
    {
      content: "As someone who isn't an SEO expert, I appreciate how ecomWhisper makes competitor analysis accessible and actionable. The recommendations are clear and effective.",
      author: {
        name: "Jessica Wong",
        role: "Founder, E-commerce Startup"
      },
      rating: 5
    },
    {
      content: "The real-time monitoring has helped us identify market gaps faster than ever before. We've been able to capitalize on opportunities our competitors missed.",
      author: {
        name: "Daniel Smith",
        role: "Growth Lead, Technology Company"
      },
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 px-6 md:px-10 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">What People Say</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
            Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how businesses have transformed their SEO strategy and outperformed their competition with ecomWhisper.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="reveal-on-scroll">
              <TestimonialCard
                content={testimonial.content}
                author={testimonial.author}
                rating={testimonial.rating}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

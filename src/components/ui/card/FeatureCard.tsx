
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
  isReversed?: boolean;
  className?: string;
}

const FeatureCard = ({
  title,
  description,
  icon,
  benefits,
  isReversed = false,
  className,
}: FeatureCardProps) => {
  return (
    <div 
      className={cn(
        "flex flex-col lg:flex-row w-full gap-8 lg:gap-12 py-12",
        isReversed && "lg:flex-row-reverse",
        className
      )}
    >
      <div className="w-full lg:w-1/2 lg:pt-12">
        <div className="flex flex-col space-y-6 max-w-xl mx-auto lg:mx-0">
          <div className="mb-2">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary mb-6">
              {icon}
            </div>
            <h3 className="text-3xl font-bold mb-4 font-display">{title}</h3>
            <p className="text-lg text-muted-foreground">
              {description}
            </p>
          </div>
          
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-foreground/90">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="glass-card rounded-3xl p-6 w-full max-w-md h-[400px] flex items-center justify-center shadow-elevated overflow-hidden">
          <div className="animate-float transition-all duration-300 ease-in-out">
            {/* This is where an image or visual representation of the feature would go */}
            <div className="bg-gradient-to-tr from-primary/30 to-primary/10 rounded-3xl p-8 backdrop-blur-sm border border-white/20 w-full max-w-sm h-[300px] flex items-center justify-center">
              <div className="text-4xl text-primary/90">
                {icon}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;

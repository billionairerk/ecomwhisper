
import React from 'react';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  content: string;
  author: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  rating?: number;
  className?: string;
}

const TestimonialCard = ({
  content,
  author,
  rating = 5,
  className,
}: TestimonialCardProps) => {
  return (
    <div 
      className={cn(
        "glass-card rounded-2xl p-8 transition-all duration-300 hover:shadow-hover h-full flex flex-col justify-between gap-6",
        className
      )}
    >
      <div>
        <div className="flex mb-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={cn(
                "h-5 w-5", 
                index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              )}
            />
          ))}
        </div>
        <p className="text-foreground/90 text-balance italic">{content}</p>
      </div>
      
      <div className="flex items-center mt-4">
        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
          {author.avatarUrl ? (
            <img 
              src={author.avatarUrl} 
              alt={author.name} 
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <span className="text-xl font-medium text-primary">
              {author.name.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <h4 className="font-medium text-foreground">{author.name}</h4>
          <p className="text-sm text-muted-foreground">{author.role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

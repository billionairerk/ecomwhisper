
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  description: string;
  icon?: React.ReactNode;
}

const StatCard = ({ title, value, change, trend, description, icon }: StatCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline mt-1 space-x-2">
              <p className="text-3xl font-bold">{value}</p>
              <div className={cn(
                "flex items-center text-xs font-medium",
                trend === 'up' ? "text-green-500" : trend === 'down' ? "text-destructive" : "text-muted-foreground"
              )}>
                {trend === 'up' ? (
                  <ArrowUp className="h-3 w-3 mr-0.5" />
                ) : trend === 'down' ? (
                  <ArrowDown className="h-3 w-3 mr-0.5" />
                ) : null}
                {change}
              </div>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          </div>
          {icon && (
            <div className="p-2 bg-primary/10 rounded-full text-primary">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;

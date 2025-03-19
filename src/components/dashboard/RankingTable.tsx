
import React from 'react';
import { ArrowUp, ArrowDown, Minus, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Sample data for the table
const rankingData = [
  { 
    id: 1, 
    keyword: 'ecommerce seo tools', 
    position: 1, 
    change: 0,
    volume: '8.5K',
    competitors: [
      { name: 'Competitor A', position: 2 },
      { name: 'Competitor B', position: 5 },
      { name: 'Competitor C', position: 8 }
    ]
  },
  { 
    id: 2, 
    keyword: 'ai seo assistant', 
    position: 2, 
    change: 1,
    volume: '5.2K',
    competitors: [
      { name: 'Competitor A', position: 1 },
      { name: 'Competitor B', position: 4 },
      { name: 'Competitor C', position: 9 }
    ]
  },
  { 
    id: 3, 
    keyword: 'competitor tracking software', 
    position: 3, 
    change: 2,
    volume: '3.7K',
    competitors: [
      { name: 'Competitor A', position: 1 },
      { name: 'Competitor B', position: 2 },
      { name: 'Competitor C', position: 7 }
    ]
  },
  { 
    id: 4, 
    keyword: 'backlink monitoring tool', 
    position: 5, 
    change: -2,
    volume: '2.9K',
    competitors: [
      { name: 'Competitor A', position: 2 },
      { name: 'Competitor B', position: 3 },
      { name: 'Competitor C', position: 4 }
    ]
  },
  { 
    id: 5, 
    keyword: 'real-time seo alerts', 
    position: 4, 
    change: 3,
    volume: '1.8K',
    competitors: [
      { name: 'Competitor A', position: 5 },
      { name: 'Competitor B', position: 8 },
      { name: 'Competitor C', position: 12 }
    ]
  },
];

const RankingTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 font-medium text-muted-foreground text-sm">Keyword</th>
            <th className="text-center py-3 font-medium text-muted-foreground text-sm">Position</th>
            <th className="text-center py-3 font-medium text-muted-foreground text-sm">Change</th>
            <th className="text-center py-3 font-medium text-muted-foreground text-sm">Volume</th>
            <th className="text-left py-3 font-medium text-muted-foreground text-sm">Top Competitors</th>
            <th className="text-right py-3 font-medium text-muted-foreground text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rankingData.map((item) => (
            <tr key={item.id} className="border-b border-border hover:bg-muted/50">
              <td className="py-3 text-sm font-medium">{item.keyword}</td>
              <td className="py-3 text-center text-sm">{item.position}</td>
              <td className="py-3 text-center">
                <div className={cn(
                  "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                  item.change > 0 
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                    : item.change < 0 
                      ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" 
                      : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                )}>
                  {item.change > 0 ? (
                    <><ArrowUp className="h-3 w-3 mr-0.5" /> {item.change}</>
                  ) : item.change < 0 ? (
                    <><ArrowDown className="h-3 w-3 mr-0.5" /> {Math.abs(item.change)}</>
                  ) : (
                    <><Minus className="h-3 w-3 mr-0.5" /> 0</>
                  )}
                </div>
              </td>
              <td className="py-3 text-center text-sm">{item.volume}</td>
              <td className="py-3 text-sm">
                <div className="flex flex-col space-y-1">
                  {item.competitors.map((competitor, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-muted-foreground">{competitor.name}</span>
                      <span className={cn(
                        "text-xs font-medium",
                        competitor.position < item.position ? "text-red-500" : "text-green-500"
                      )}>
                        #{competitor.position}
                      </span>
                    </div>
                  ))}
                </div>
              </td>
              <td className="py-3 text-right">
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">View details</span>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankingTable;

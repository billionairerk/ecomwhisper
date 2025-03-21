
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRankings } from '@/services/rankingService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { ArrowUp, ArrowDown, Minus, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const RankingsView = ({ keywordId }: { keywordId?: string }) => {
  const { data: rankings, isLoading, error } = useQuery({
    queryKey: ['rankings', keywordId],
    queryFn: () => getRankings(keywordId)
  });

  // Helper to get change icon and styling
  const getChangeIndicator = (change: number) => {
    if (change > 0) {
      return {
        icon: <ArrowUp className="h-3 w-3 mr-0.5" />,
        text: `+${change}`,
        className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      };
    } else if (change < 0) {
      return {
        icon: <ArrowDown className="h-3 w-3 mr-0.5" />,
        text: String(change),
        className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      };
    } else {
      return {
        icon: <Minus className="h-3 w-3 mr-0.5" />,
        text: "0",
        className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      };
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Keyword Rankings</CardTitle>
        <CardDescription>Track your position for each keyword</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading rankings data...</p>
        ) : error ? (
          <div className="p-4 text-red-500">
            Error loading rankings. Please try again.
          </div>
        ) : !rankings || rankings.length === 0 ? (
          <div className="text-center p-6">
            <p className="mb-2">No rankings data yet.</p>
            <p className="text-sm text-muted-foreground">
              Add keywords and competitors to start tracking rankings.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Keyword</TableHead>
                  <TableHead>Search Engine</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Change</TableHead>
                  <TableHead>Domain</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rankings.map((ranking: any) => {
                  // For demo purposes, generate a random change
                  const change = Math.floor(Math.random() * 5) * (Math.random() > 0.5 ? 1 : -1);
                  const changeIndicator = getChangeIndicator(change);
                  
                  return (
                    <TableRow key={ranking.id}>
                      <TableCell className="font-medium">
                        {ranking.keywords?.keyword || 'Unknown'}
                      </TableCell>
                      <TableCell>
                        {ranking.keywords?.search_engine || 'google'}
                      </TableCell>
                      <TableCell>{ranking.position || 'N/A'}</TableCell>
                      <TableCell>
                        <div className={cn(
                          "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                          changeIndicator.className
                        )}>
                          {changeIndicator.icon} {changeIndicator.text}
                        </div>
                      </TableCell>
                      <TableCell>{ranking.competitors?.domain || 'Your site'}</TableCell>
                      <TableCell>{new Date(ranking.timestamp).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">View details</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RankingsView;


import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSeoMetrics, getScrapedPages, scrapeCompetitor } from '@/services/scrapingService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { RefreshCw, ExternalLink, FileText } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

interface CompetitorDetailProps {
  competitor: any;
  onClose: () => void;
}

const CompetitorDetail = ({ competitor, onClose }: CompetitorDetailProps) => {
  const [isScanning, setIsScanning] = useState(false);

  const { 
    data: seoMetrics, 
    isLoading: metricsLoading, 
    refetch: refetchMetrics 
  } = useQuery({
    queryKey: ['seoMetrics', competitor.id],
    queryFn: () => getSeoMetrics(competitor.id),
    enabled: !!competitor.id,
  });

  const { 
    data: scrapedPages, 
    isLoading: pagesLoading, 
    refetch: refetchPages 
  } = useQuery({
    queryKey: ['scrapedPages', competitor.id],
    queryFn: () => getScrapedPages(competitor.id),
    enabled: !!competitor.id,
  });

  const handleScan = async () => {
    try {
      setIsScanning(true);
      await scrapeCompetitor(competitor.domain);
      toast.success(`Successfully scanned ${competitor.domain}`);
      refetchMetrics();
      refetchPages();
    } catch (error) {
      toast.error(`Failed to scan competitor: ${error.message}`);
    } finally {
      setIsScanning(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded bg-muted flex items-center justify-center text-xl font-bold">
            {competitor.domain.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{competitor.domain}</h2>
            <p className="text-sm text-muted-foreground">
              Added on {new Date(competitor.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm" onClick={onClose}>
            Back to competitors
          </Button>
          <Button 
            size="sm" 
            onClick={handleScan}
            disabled={isScanning}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isScanning ? 'animate-spin' : ''}`} />
            {isScanning ? 'Scanning...' : 'Scan Now'}
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.open(`https://${competitor.domain}`, '_blank')}>
            <ExternalLink className="h-4 w-4 mr-2" />
            Visit Site
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>SEO Metrics</CardTitle>
            <CardDescription>Last updated: {seoMetrics ? new Date(seoMetrics.created_at).toLocaleString() : 'Never'}</CardDescription>
          </CardHeader>
          <CardContent>
            {metricsLoading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : seoMetrics ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Backlinks</p>
                    <p className="text-2xl font-bold">{seoMetrics.backlinks.toLocaleString()}</p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Domain Authority</p>
                    <p className="text-2xl font-bold">{seoMetrics.domain_authority}/100</p>
                  </div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Est. Monthly Traffic</p>
                  <p className="text-2xl font-bold">{seoMetrics.traffic_estimate.toLocaleString()}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground mb-4">No data available yet</p>
                <Button variant="outline" size="sm" onClick={handleScan}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Scan Now
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Scraped Pages</CardTitle>
            <CardDescription>Content analysis from competitor pages</CardDescription>
          </CardHeader>
          <CardContent>
            {pagesLoading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : scrapedPages && scrapedPages.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page</TableHead>
                    <TableHead>Word Count</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scrapedPages.map((page: any) => (
                    <TableRow key={page.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{page.page_title || 'Untitled'}</p>
                          <p className="text-sm text-muted-foreground truncate max-w-[300px]">{page.page_url}</p>
                        </div>
                      </TableCell>
                      <TableCell>{page.word_count.toLocaleString()} words</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => window.open(page.page_url, '_blank')}>
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-6">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground mb-4">No pages have been scraped yet</p>
                <Button variant="outline" size="sm" onClick={handleScan}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Scan Pages Now
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompetitorDetail;

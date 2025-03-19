
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import { ArrowUp, ArrowDown, AlertCircle, ChevronRight, Award, LineChart, Link2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import StatCard from '@/components/ui/card/StatCard';
import RankingTable from '@/components/dashboard/RankingTable';

// Sample data
const rankingData = [
  { name: 'Jan', value: 54 },
  { name: 'Feb', value: 58 },
  { name: 'Mar', value: 52 },
  { name: 'Apr', value: 65 },
  { name: 'May', value: 72 },
  { name: 'Jun', value: 68 },
  { name: 'Jul', value: 82 },
];

const backlinksData = [
  { name: 'Jan', value: 12 },
  { name: 'Feb', value: 18 },
  { name: 'Mar', value: 15 },
  { name: 'Apr', value: 24 },
  { name: 'May', value: 28 },
  { name: 'Jun', value: 32 },
  { name: 'Jul', value: 38 },
];

const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <Button>
          Add Competitor <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Keyword Rankings"
          value="82"
          change="+14"
          trend="up"
          description="Top 10 positions"
          icon={<LineChart className="h-5 w-5" />}
        />
        
        <StatCard 
          title="Backlinks"
          value="38"
          change="+6"
          trend="up"
          description="New this month"
          icon={<Link2 className="h-5 w-5" />}
        />
        
        <StatCard 
          title="Competitor Content"
          value="24"
          change="+3"
          trend="up"
          description="New articles detected"
          icon={<Award className="h-5 w-5" />}
        />
        
        <StatCard 
          title="Growth Opportunities"
          value="17"
          change="+5"
          trend="up"
          description="AI-generated insights"
          icon={<Zap className="h-5 w-5" />}
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Keyword Rankings</CardTitle>
            <CardDescription>Keywords in top 10 positions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer config={{}} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={rankingData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorRanking" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--primary))" 
                      fillOpacity={1} 
                      fill="url(#colorRanking)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Backlinks Growth</CardTitle>
            <CardDescription>New backlinks by month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer config={{}} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={backlinksData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Rankings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Ranking Keywords</CardTitle>
          <CardDescription>Monitoring 250 keywords across competitors</CardDescription>
        </CardHeader>
        <CardContent>
          <RankingTable />
        </CardContent>
      </Card>
      
      {/* Alerts */}
      <Card className="border-destructive/20 bg-destructive/5">
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <AlertCircle className="h-5 w-5 text-destructive mr-2" />
          <CardTitle className="text-base font-medium">Ranking Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Alert 
              title="Position Drop" 
              description="'SEO Tools for E-commerce' dropped from #3 to #8" 
              time="2 hours ago" 
              change={-5} 
            />
            <Alert 
              title="Competitor Move" 
              description="Competitor X moved up for 'Dropshipping Platforms'" 
              time="4 hours ago" 
              change={-3} 
            />
            <Alert 
              title="New Competitor Content" 
              description="Competitor Z published new article on 'AI SEO Tools'" 
              time="Yesterday" 
              isContent 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface AlertProps {
  title: string;
  description: string;
  time: string;
  change?: number;
  isContent?: boolean;
}

const Alert = ({ title, description, time, change, isContent }: AlertProps) => (
  <div className="flex items-center justify-between border-b border-destructive/10 pb-3 last:border-0 last:pb-0">
    <div>
      <p className="font-medium text-sm">{title}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
      <p className="text-xs text-muted-foreground mt-1">{time}</p>
    </div>
    {!isContent && (
      <div className={cn(
        "flex items-center font-semibold text-sm",
        change && change < 0 ? "text-destructive" : "text-green-500"
      )}>
        {change && change < 0 ? <ArrowDown className="h-4 w-4 mr-1" /> : <ArrowUp className="h-4 w-4 mr-1" />}
        {Math.abs(change || 0)}
      </div>
    )}
  </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border border-border rounded-md shadow-md">
        <p className="font-medium text-sm">{label}</p>
        <p className="text-primary font-semibold">{payload[0].value}</p>
      </div>
    );
  }

  return null;
};

export default DashboardOverview;

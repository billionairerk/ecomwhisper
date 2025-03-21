
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/ui/card/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import RankingsView from './RankingsView';
import AlertsDisplay from './AlertsDisplay';

const data = [
  { name: 'Jan', traffic: 400 },
  { name: 'Feb', traffic: 600 },
  { name: 'Mar', traffic: 800 },
  { name: 'Apr', traffic: 1000 },
  { name: 'May', traffic: 1400 },
  { name: 'Jun', traffic: 2000 },
  { name: 'Jul', traffic: 2400 }
];

const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Organic SEO growth tracker and insights</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Keywords Tracked" 
          value="24" 
          description="+12% from last month" 
          action="View Keywords"
          href="/dashboard/keywords"
        />
        <StatCard 
          title="Avg. Rank Position" 
          value="12.6" 
          description="+2.4 positions" 
          action="Rankings"
          href="/dashboard/keywords"
        />
        <StatCard 
          title="Competitors" 
          value="5" 
          description="Top industry players" 
          action="View Competitors"
          href="/dashboard/competitors"
        />
        <StatCard 
          title="Est. Ad Savings" 
          value="$4,200" 
          description="Organic vs PPC" 
          action="Growth"
          href="/dashboard/growth"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Organic Traffic Growth</CardTitle>
            <CardDescription>Monthly estimated organic visits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="traffic" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-1">
          <AlertsDisplay />
        </div>
      </div>

      <div>
        <RankingsView />
      </div>
    </div>
  );
};

export default DashboardOverview;

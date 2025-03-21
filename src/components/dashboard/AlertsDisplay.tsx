
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface Alert {
  id: string;
  message: string;
  timestamp: string;
  is_read: boolean;
}

export const AlertsDisplay = () => {
  // Fetch existing alerts
  const { data: existingAlerts, refetch } = useQuery({
    queryKey: ['alerts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data as Alert[];
    }
  });

  // Set up real-time subscription to alerts table
  useEffect(() => {
    // Subscribe to inserts on the alerts table
    const channel = supabase
      .channel('alerts-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'alerts'
        },
        (payload) => {
          // Show toast notification for new alert
          const newAlert = payload.new as Alert;
          toast.info(newAlert.message, {
            icon: <Bell className="h-4 w-4" />,
          });
          
          // Refetch alerts to update the list
          refetch();
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Alerts</CardTitle>
        <CardDescription>Stay updated on changes and events</CardDescription>
      </CardHeader>
      <CardContent>
        {existingAlerts && existingAlerts.length > 0 ? (
          <div className="space-y-3">
            {existingAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`p-3 border rounded-md ${alert.is_read ? 'bg-background' : 'bg-muted'}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4 text-primary" />
                    <p className="text-sm font-medium">{alert.message}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(alert.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-40" />
            <p>No recent alerts</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AlertsDisplay;

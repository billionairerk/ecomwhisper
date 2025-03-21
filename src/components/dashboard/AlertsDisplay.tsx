
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, CheckCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';

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
    },
    refetchInterval: 60000 // Refetch every minute
  });

  const markAsRead = async (alertId: string) => {
    try {
      await supabase
        .from('alerts')
        .update({ is_read: true })
        .eq('id', alertId);
      
      refetch();
      toast.success('Alert marked as read');
    } catch (error) {
      console.error('Error marking alert as read:', error);
      toast.error('Failed to mark alert as read');
    }
  };

  // Set up real-time subscription to alerts table
  useEffect(() => {
    console.log('Setting up real-time subscription to alerts table');
    
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

    console.log('Real-time subscription to alerts table established');

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>Stay updated on changes and events</CardDescription>
        </div>
        {existingAlerts && existingAlerts.length > 0 && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => toast.info("Alerts refreshed")}
          >
            Refresh
          </Button>
        )}
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
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">
                      {new Date(alert.timestamp).toLocaleString()}
                    </span>
                    {!alert.is_read && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={() => markAsRead(alert.id)}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-40" />
            <p>No recent alerts</p>
            <p className="text-xs mt-1">Alerts will appear here as they happen</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AlertsDisplay;


import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCompetitors } from '@/services/competitorService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Plus, Trash2, ExternalLink, Search } from 'lucide-react';
import { deleteCompetitor } from '@/services/competitorService';
import AddCompetitorForm from './AddCompetitorForm';
import CompetitorDetail from './CompetitorDetail';

const Competitors = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCompetitor, setSelectedCompetitor] = useState<any>(null);
  
  const { data: competitors, isLoading, error, refetch } = useQuery({
    queryKey: ['competitors'],
    queryFn: getCompetitors
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteCompetitor(id);
      toast.success('Competitor deleted successfully');
      refetch();
    } catch (error: any) {
      toast.error(`Failed to delete competitor: ${error.message}`);
    }
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const viewCompetitorDetail = (competitor: any) => {
    setSelectedCompetitor(competitor);
  };

  // If a competitor is selected, show the detail view
  if (selectedCompetitor) {
    return (
      <CompetitorDetail 
        competitor={selectedCompetitor}
        onClose={() => setSelectedCompetitor(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Competitors</h1>
          <p className="text-muted-foreground">Monitor your competitors' performance and strategies.</p>
        </div>
        <Button onClick={toggleAddForm}>
          <Plus className="mr-2 h-4 w-4" /> Add Competitor
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {isLoading ? (
            <Card>
              <CardContent className="p-4">
                <p>Loading competitors...</p>
              </CardContent>
            </Card>
          ) : error ? (
            <Card>
              <CardContent className="p-4 text-destructive">
                <p>Error loading competitors. Please try again.</p>
              </CardContent>
            </Card>
          ) : competitors && competitors.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Your Competitors</CardTitle>
                <CardDescription>Monitoring {competitors.length} competitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {competitors.map((competitor: any) => (
                    <div key={competitor.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <div className="w-10 h-10 mr-3 rounded bg-muted flex items-center justify-center">
                          {competitor.domain.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium">{competitor.domain}</p>
                          <p className="text-sm text-muted-foreground">
                            Added on {new Date(competitor.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon" onClick={() => viewCompetitorDetail(competitor)}>
                          <Search className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => window.open(`https://${competitor.domain}`, '_blank')}>
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(competitor.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <h2 className="text-xl font-semibold mb-2">No Competitors Yet</h2>
                <p className="text-muted-foreground mb-4">Start by adding competitors you want to monitor.</p>
                <Button onClick={toggleAddForm}>
                  <Plus className="mr-2 h-4 w-4" /> Add Your First Competitor
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="md:col-span-1">
          {showAddForm && <AddCompetitorForm onSuccess={() => {refetch(); setShowAddForm(false);}} />}
        </div>
      </div>
    </div>
  );
};

export default Competitors;

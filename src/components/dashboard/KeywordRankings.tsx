
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getKeywords } from '@/services/keywordService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';
import { deleteKeyword } from '@/services/keywordService';
import AddKeywordForm from './AddKeywordForm';
import RankingsView from './RankingsView';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const KeywordRankings = () => {
  const [selectedKeywordId, setSelectedKeywordId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const { data: keywords, isLoading, error, refetch } = useQuery({
    queryKey: ['keywords'],
    queryFn: getKeywords
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteKeyword(id);
      toast.success('Keyword deleted successfully');
      refetch();
    } catch (error: any) {
      toast.error(`Failed to delete keyword: ${error.message}`);
    }
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Keyword Rankings</h1>
          <p className="text-muted-foreground">Track your keyword positions and competitor rankings in real-time.</p>
        </div>
        <Button onClick={toggleAddForm}>
          <Plus className="mr-2 h-4 w-4" /> Add Keyword
        </Button>
      </div>
      
      <Tabs defaultValue="keywords" className="w-full">
        <TabsList>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="rankings">Rankings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="keywords" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              {isLoading ? (
                <Card>
                  <CardContent className="p-4">
                    <p>Loading keywords...</p>
                  </CardContent>
                </Card>
              ) : error ? (
                <Card>
                  <CardContent className="p-4 text-destructive">
                    <p>Error loading keywords. Please try again.</p>
                  </CardContent>
                </Card>
              ) : keywords && keywords.length > 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Your Keywords</CardTitle>
                    <CardDescription>Tracking {keywords.length} keywords across search engines</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {keywords.map((keyword: any) => (
                        <div 
                          key={keyword.id} 
                          className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-muted/50"
                          onClick={() => setSelectedKeywordId(keyword.id)}
                        >
                          <div>
                            <p className="font-medium">{keyword.keyword}</p>
                            <p className="text-sm text-muted-foreground">
                              Engine: {keyword.search_engine.charAt(0).toUpperCase() + keyword.search_engine.slice(1)}
                            </p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(keyword.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <h2 className="text-xl font-semibold mb-2">No Keywords Yet</h2>
                    <p className="text-muted-foreground mb-4">Start by adding keywords you want to track.</p>
                    <Button onClick={toggleAddForm}>
                      <Plus className="mr-2 h-4 w-4" /> Add Your First Keyword
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div className="md:col-span-1">
              {showAddForm && <AddKeywordForm onSuccess={() => {refetch(); setShowAddForm(false);}} />}
              
              {selectedKeywordId && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Keyword Details</CardTitle>
                    <CardDescription>View and manage this keyword</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" onClick={() => setSelectedKeywordId(null)}>
                      Back to All Keywords
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="rankings" className="mt-6">
          <RankingsView keywordId={selectedKeywordId || undefined} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KeywordRankings;

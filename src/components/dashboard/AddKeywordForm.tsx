
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addKeyword } from '@/services/keywordService';
import { toast } from "sonner";

interface AddKeywordFormProps {
  onSuccess?: () => void;
}

const AddKeywordForm = ({ onSuccess }: AddKeywordFormProps) => {
  const [keyword, setKeyword] = useState('');
  const [searchEngine, setSearchEngine] = useState<'google' | 'youtube' | 'amazon' | 'flipkart'>('google');
  const queryClient = useQueryClient();

  const addKeywordMutation = useMutation({
    mutationFn: ({ keyword, searchEngine }: { keyword: string, searchEngine: 'google' | 'youtube' | 'amazon' | 'flipkart' }) => 
      addKeyword(keyword, searchEngine),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['keywords'] });
      setKeyword('');
      toast.success('Keyword added successfully');
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      toast.error(`Failed to add keyword: ${error.message}`);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) {
      toast.error('Please enter a keyword');
      return;
    }
    addKeywordMutation.mutate({ keyword, searchEngine });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-card">
      <h3 className="text-lg font-medium">Add New Keyword</h3>
      <div className="flex flex-col space-y-2">
        <label htmlFor="keyword" className="text-sm font-medium">
          Keyword
        </label>
        <Input
          id="keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter a keyword to track"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="searchEngine" className="text-sm font-medium">
          Search Engine
        </label>
        <Select value={searchEngine} onValueChange={(value: any) => setSearchEngine(value)}>
          <SelectTrigger id="searchEngine">
            <SelectValue placeholder="Select a search engine" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="google">Google</SelectItem>
            <SelectItem value="youtube">YouTube</SelectItem>
            <SelectItem value="amazon">Amazon</SelectItem>
            <SelectItem value="flipkart">Flipkart</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button 
        type="submit" 
        className="w-full"
        disabled={addKeywordMutation.isPending}
      >
        {addKeywordMutation.isPending ? 'Adding...' : 'Add Keyword'}
      </Button>
    </form>
  );
};

export default AddKeywordForm;

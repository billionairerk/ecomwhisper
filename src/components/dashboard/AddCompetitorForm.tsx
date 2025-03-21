
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCompetitor } from '@/services/competitorService';
import { toast } from "sonner";

const AddCompetitorForm = () => {
  const [domain, setDomain] = useState('');
  const queryClient = useQueryClient();

  const addCompetitorMutation = useMutation({
    mutationFn: (domain: string) => addCompetitor(domain),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['competitors'] });
      setDomain('');
      toast.success('Competitor added successfully');
    },
    onError: (error) => {
      toast.error(`Failed to add competitor: ${error.message}`);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) {
      toast.error('Please enter a domain');
      return;
    }
    addCompetitorMutation.mutate(domain);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-card">
      <h3 className="text-lg font-medium">Add New Competitor</h3>
      <div className="flex flex-col space-y-2">
        <label htmlFor="domain" className="text-sm font-medium">
          Domain
        </label>
        <Input
          id="domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="example.com"
        />
      </div>
      <Button 
        type="submit" 
        className="w-full"
        disabled={addCompetitorMutation.isPending}
      >
        {addCompetitorMutation.isPending ? 'Adding...' : 'Add Competitor'}
      </Button>
    </form>
  );
};

export default AddCompetitorForm;

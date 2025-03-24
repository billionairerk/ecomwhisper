
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export async function getCompetitors() {
  const { data, error } = await supabase
    .from('competitors')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching competitors:', error);
    throw error;
  }
  
  return data || [];
}

export async function addCompetitor(domain: string) {
  // Get the current user's ID
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('You must be logged in to add a competitor');
  }

  // Sanitize domain - Remove http/https and www
  let cleanDomain = domain.trim().toLowerCase();
  cleanDomain = cleanDomain.replace(/^https?:\/\//, '');
  cleanDomain = cleanDomain.replace(/^www\./, '');
  cleanDomain = cleanDomain.split('/')[0]; // Remove any paths
  
  try {
    // Call the edge function to handle the scraping
    const { data, error } = await supabase.functions.invoke('scrape-competitor', {
      body: { 
        domain: cleanDomain,
        userId: user.id
      }
    });
    
    if (error) throw error;
    
    toast.success(`Successfully added competitor: ${cleanDomain}`);
    return data;
  } catch (error) {
    console.error('Error adding competitor:', error);
    toast.error(`Failed to add competitor: ${error.message}`);
    throw error;
  }
}

export async function deleteCompetitor(id: string) {
  const { error } = await supabase
    .from('competitors')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting competitor:', error);
    throw error;
  }
  
  return true;
}

export async function analyzeCompetitor(domain: string) {
  try {
    // This would ideally call an edge function for more advanced analysis
    // For now, return mock data
    const insights = {
      strength: ["Strong brand recognition", "Extensive content library", "High domain authority"],
      weakness: ["Limited product range", "Outdated UI/UX", "Slow page loading speeds"],
      opportunity: ["Expand into related markets", "Improve mobile experience", "Add more interactive elements"],
      recommendations: [
        "Focus on improving page speed optimization",
        "Expand content in areas where they're weak",
        "Target keywords they're not ranking for"
      ]
    };
    
    return insights;
  } catch (error) {
    console.error('Error analyzing competitor:', error);
    throw error;
  }
}

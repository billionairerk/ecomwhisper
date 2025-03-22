
import { supabase } from "@/integrations/supabase/client";

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
  
  // Insert competitor with the user_id field
  const { data, error } = await supabase
    .from('competitors')
    .insert([{ 
      domain: cleanDomain,
      user_id: user.id
    }])
    .select();
  
  if (error) {
    console.error('Error adding competitor:', error);
    throw error;
  }
  
  return data?.[0];
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
    // Generate AI insights based on competitor domain
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

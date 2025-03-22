
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

  // Insert competitor with the user_id field
  const { data, error } = await supabase
    .from('competitors')
    .insert([{ 
      domain,
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

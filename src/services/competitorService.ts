
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
  const { data, error } = await supabase
    .from('competitors')
    .insert([{ domain }])
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

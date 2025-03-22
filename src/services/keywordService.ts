
import { supabase } from "@/integrations/supabase/client";

export async function getKeywords() {
  const { data, error } = await supabase
    .from('keywords')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching keywords:', error);
    throw error;
  }
  
  return data || [];
}

export async function addKeyword(keyword: string) {
  // Get the current user's ID
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('You must be logged in to add a keyword');
  }

  const { data, error } = await supabase
    .from('keywords')
    .insert([{ 
      keyword,
      user_id: user.id,
      search_engine: 'google' // Default search engine
    }])
    .select();
  
  if (error) {
    console.error('Error adding keyword:', error);
    throw error;
  }
  
  return data?.[0];
}

export async function deleteKeyword(id: string) {
  const { error } = await supabase
    .from('keywords')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting keyword:', error);
    throw error;
  }
  
  return true;
}

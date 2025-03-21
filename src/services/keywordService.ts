
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

export async function addKeyword(keyword: string, searchEngine: 'google' | 'youtube' | 'amazon' | 'flipkart') {
  const { data, error } = await supabase
    .from('keywords')
    .insert([{ 
      keyword,
      search_engine: searchEngine,
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

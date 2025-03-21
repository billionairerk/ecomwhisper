
import { supabase } from "@/integrations/supabase/client";

export async function getRankings(keywordId?: string) {
  let query = supabase
    .from('rankings')
    .select(`
      *,
      keywords:keyword_id(keyword, search_engine),
      competitors:competitor_id(domain)
    `)
    .order('timestamp', { ascending: false });
  
  if (keywordId) {
    query = query.eq('keyword_id', keywordId);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching rankings:', error);
    throw error;
  }
  
  return data || [];
}

export async function addRanking(keywordId: string, competitorId: string | null, position: number, trafficEstimate?: number) {
  const { data, error } = await supabase
    .from('rankings')
    .insert([{ 
      keyword_id: keywordId,
      competitor_id: competitorId,
      position,
      traffic_estimate: trafficEstimate
    }])
    .select();
  
  if (error) {
    console.error('Error adding ranking:', error);
    throw error;
  }
  
  return data?.[0];
}


import { supabase } from "@/integrations/supabase/client";

// Get SEO metrics for a competitor
export async function getSeoMetrics(competitorId: string) {
  const { data, error } = await supabase
    .from('seo_metrics')
    .select('*')
    .eq('competitor_id', competitorId)
    .order('created_at', { ascending: false })
    .limit(1);
    
  if (error) {
    console.error('Error fetching SEO metrics:', error);
    throw error;
  }
  
  return data?.[0] || null;
}

// Get scraped pages for a competitor
export async function getScrapedPages(competitorId: string) {
  const { data, error } = await supabase
    .from('scraped_pages')
    .select('*')
    .eq('competitor_id', competitorId)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching scraped pages:', error);
    throw error;
  }
  
  return data || [];
}

// Trigger scraping for a domain
export async function scrapeCompetitor(domain: string) {
  try {
    const { data, error } = await supabase.functions.invoke('scrape-competitor', {
      body: { domain }
    });
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error scraping competitor:', error);
    throw error;
  }
}

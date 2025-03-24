
import { supabase } from "@/integrations/supabase/client";

// Define interfaces for the response types
export interface SeoMetrics {
  id: string;
  competitor_id: string;
  backlinks: number;
  domain_authority: number;
  traffic_estimate: number;
  created_at: string;
}

export interface ScrapedPage {
  id: string;
  competitor_id: string;
  page_url: string;
  page_title: string | null;
  word_count: number;
  created_at: string;
}

export interface SeoSuggestion {
  id: string;
  suggestion: string;
  type: string;
  timestamp: string;
}

// Get SEO metrics for a competitor
export async function getSeoMetrics(competitorId: string): Promise<SeoMetrics | null> {
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
export async function getScrapedPages(competitorId: string): Promise<ScrapedPage[]> {
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

// Get SEO suggestions for a competitor
export async function getSeoSuggestions(competitorId: string): Promise<SeoSuggestion[]> {
  const { data, error } = await supabase
    .from('suggestions')
    .select('*')
    .eq('type', 'seo_improvement')
    .order('timestamp', { ascending: false })
    .limit(5);
    
  if (error) {
    console.error('Error fetching SEO suggestions:', error);
    throw error;
  }
  
  return data || [];
}

// Trigger comprehensive scraping for a domain
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

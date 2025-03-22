
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Parse request body
    const { domain } = await req.json();

    if (!domain) {
      return new Response(
        JSON.stringify({ error: "Domain is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Starting scrape for domain: ${domain}`);

    // Mock scraping operation - in a real implementation, you would:
    // 1. Use fetch to request the domain
    // 2. Parse the HTML response
    // 3. Extract the relevant information
    // 4. Store the results in the database
    const mockScrapeData = await mockScrapeCompetitor(domain);

    // Store the scraped SEO metrics
    const { data: seoData, error: seoError } = await supabase
      .from('seo_metrics')
      .insert({
        competitor_id: mockScrapeData.competitor_id,
        backlinks: mockScrapeData.backlinks,
        domain_authority: mockScrapeData.domain_authority,
        traffic_estimate: mockScrapeData.traffic_estimate
      })
      .select()
      .single();

    if (seoError) {
      throw new Error(`Error storing SEO metrics: ${seoError.message}`);
    }

    // Get sample content pages
    for (const page of mockScrapeData.pages) {
      const { error: pageError } = await supabase
        .from('scraped_pages')
        .insert({
          competitor_id: mockScrapeData.competitor_id,
          page_url: page.url,
          page_title: page.title,
          word_count: page.word_count
        });

      if (pageError) {
        console.error(`Error storing page data: ${pageError.message}`);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully scraped ${domain}`,
        data: seoData
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200
      }
    );
  } catch (error) {
    console.error(`Error in scrape-competitor function:`, error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500
      }
    );
  }
});

// Mock function to simulate scraping a competitor website
// In a real implementation, this would be replaced with actual web scraping
async function mockScrapeCompetitor(domain: string) {
  // Get the competitor ID from the database
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // First check if the competitor exists
  const { data: competitor, error: competitorError } = await supabase
    .from('competitors')
    .select('id')
    .eq('domain', domain)
    .single();

  if (competitorError) {
    throw new Error(`Competitor not found: ${competitorError.message}`);
  }

  const competitorId = competitor.id;

  // Generate random SEO metrics
  const backlinks = Math.floor(Math.random() * 1000) + 100;
  const domainAuthority = Math.floor(Math.random() * 70) + 10;
  const trafficEstimate = Math.floor(Math.random() * 50000) + 1000;

  // Generate mock scraped pages
  const pages = [
    {
      url: `https://${domain}/`,
      title: `${domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1)} - Home Page`,
      word_count: Math.floor(Math.random() * 2000) + 500
    },
    {
      url: `https://${domain}/about`,
      title: `About ${domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1)}`,
      word_count: Math.floor(Math.random() * 1000) + 300
    },
    {
      url: `https://${domain}/products`,
      title: `Products - ${domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1)}`,
      word_count: Math.floor(Math.random() * 3000) + 1000
    }
  ];

  return {
    competitor_id: competitorId,
    backlinks,
    domain_authority,
    traffic_estimate,
    pages
  };
}

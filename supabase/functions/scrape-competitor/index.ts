
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

    // Check if the competitor exists
    const { data: competitor, error: competitorError } = await supabase
      .from('competitors')
      .select('id')
      .eq('domain', domain)
      .single();

    if (competitorError) {
      throw new Error(`Competitor not found: ${competitorError.message}`);
    }

    const competitorId = competitor.id;

    // Advanced scraping simulation with more realistic metrics
    const scrapedData = await simulateScrapeCompetitor(domain);

    // Store the scraped SEO metrics
    const { data: seoData, error: seoError } = await supabase
      .from('seo_metrics')
      .insert({
        competitor_id: competitorId,
        backlinks: scrapedData.backlinks,
        domain_authority: scrapedData.domain_authority,
        traffic_estimate: scrapedData.traffic_estimate
      })
      .select()
      .single();

    if (seoError) {
      throw new Error(`Error storing SEO metrics: ${seoError.message}`);
    }

    // Get sample content pages
    for (const page of scrapedData.pages) {
      const { error: pageError } = await supabase
        .from('scraped_pages')
        .insert({
          competitor_id: competitorId,
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

// Advanced function to simulate scraping a competitor website
// In a real implementation, this would use actual web scraping
async function simulateScrapeCompetitor(domain: string) {
  // Get competitor industry to adjust metrics (e.g. e-commerce, tech, health)
  const industry = detectIndustry(domain);
  
  // Generate more realistic SEO metrics based on domain characteristics and industry
  const backlinks = calculateBacklinks(domain, industry);
  const domainAuthority = calculateDomainAuthority(domain, backlinks);
  const trafficEstimate = calculateTrafficEstimate(domain, domainAuthority, industry);

  // Generate realistic page data
  const pages = generatePages(domain, industry);

  return {
    backlinks,
    domain_authority: domainAuthority,
    traffic_estimate: trafficEstimate,
    pages
  };
}

// Helper functions for more realistic scraping simulation

function detectIndustry(domain: string) {
  // Simplified industry detection based on domain name keywords
  const domainParts = domain.toLowerCase().split('.');
  const name = domainParts[0];
  
  if (name.includes('shop') || name.includes('store') || name.includes('buy')) return 'ecommerce';
  if (name.includes('tech') || name.includes('soft') || name.includes('app')) return 'technology';
  if (name.includes('health') || name.includes('med') || name.includes('care')) return 'healthcare';
  if (name.includes('travel') || name.includes('tour') || name.includes('trip')) return 'travel';
  if (name.includes('blog') || name.includes('news') || name.includes('post')) return 'media';
  
  // Use domain age as fallback - simulate with random "established" scoring
  const establishedScore = Math.random();
  if (establishedScore > 0.7) return 'established';
  
  return 'general';
}

function calculateBacklinks(domain: string, industry: string) {
  // Base backlink count depending on industry
  const industryBaselines = {
    'ecommerce': 5000,
    'technology': 8000,
    'healthcare': 3000,
    'travel': 4000,
    'media': 10000,
    'established': 15000,
    'general': 2000
  };
  
  const baseline = industryBaselines[industry] || 2000;
  
  // Add randomization factor (70% - 130% of baseline)
  const randomFactor = 0.7 + (Math.random() * 0.6);
  
  // Domain name length can affect SEO - shorter domains often have more backlinks
  const lengthFactor = Math.max(0.8, 1.2 - (domain.length * 0.02));
  
  return Math.floor(baseline * randomFactor * lengthFactor);
}

function calculateDomainAuthority(domain: string, backlinks: number) {
  // Domain authority is heavily influenced by backlinks but has a logarithmic relationship
  const baseDA = Math.log(backlinks) * 4;
  
  // Domain age factor (simulated)
  const ageFactorRandom = 0.8 + (Math.random() * 0.4);
  
  // Domain length factor - shorter domains often have higher DA
  const lengthFactor = Math.max(0.9, 1.1 - (domain.length * 0.01));
  
  // Calculate final DA (1-100 scale)
  let da = Math.floor(baseDA * ageFactorRandom * lengthFactor);
  
  // Ensure within scale
  return Math.min(100, Math.max(1, da));
}

function calculateTrafficEstimate(domain: string, domainAuthority: number, industry: string) {
  // Industry traffic multipliers
  const industryMultipliers = {
    'ecommerce': 120,
    'technology': 100,
    'healthcare': 80,
    'travel': 90,
    'media': 150,
    'established': 200,
    'general': 50
  };
  
  const multiplier = industryMultipliers[industry] || 50;
  
  // Traffic has exponential relationship with domain authority
  const baseTraffic = Math.pow(domainAuthority, 2) * multiplier;
  
  // Add randomization (80% - 120%)
  const randomFactor = 0.8 + (Math.random() * 0.4);
  
  return Math.floor(baseTraffic * randomFactor);
}

function generatePages(domain: string, industry: string) {
  // Common page patterns by industry
  const pagePatterns = {
    'ecommerce': [
      { path: '/', title: 'Home', type: 'homepage' },
      { path: '/products', title: 'Products', type: 'listing' },
      { path: '/about', title: 'About Us', type: 'about' },
      { path: '/contact', title: 'Contact', type: 'contact' },
      { path: '/cart', title: 'Shopping Cart', type: 'utility' },
    ],
    'technology': [
      { path: '/', title: 'Home', type: 'homepage' },
      { path: '/solutions', title: 'Solutions', type: 'service' },
      { path: '/products', title: 'Products', type: 'product' },
      { path: '/blog', title: 'Blog', type: 'blog' },
      { path: '/contact', title: 'Contact', type: 'contact' },
    ],
    'general': [
      { path: '/', title: 'Home', type: 'homepage' },
      { path: '/about', title: 'About', type: 'about' },
      { path: '/services', title: 'Services', type: 'service' },
      { path: '/contact', title: 'Contact Us', type: 'contact' },
    ]
  };
  
  // Get page patterns for the industry or use general
  const patterns = pagePatterns[industry] || pagePatterns.general;
  
  // Generate the page data with realistic word counts
  return patterns.map(pattern => {
    const wordCountMap = {
      'homepage': 800 + Math.floor(Math.random() * 400),
      'about': 600 + Math.floor(Math.random() * 300),
      'product': 1000 + Math.floor(Math.random() * 500),
      'service': 900 + Math.floor(Math.random() * 400),
      'blog': 1200 + Math.floor(Math.random() * 800),
      'listing': 400 + Math.floor(Math.random() * 200),
      'contact': 300 + Math.floor(Math.random() * 150),
      'utility': 200 + Math.floor(Math.random() * 100)
    };
    
    return {
      url: `https://${domain}${pattern.path}`,
      title: `${pattern.title} - ${domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1)}`,
      word_count: wordCountMap[pattern.type] || 500 + Math.floor(Math.random() * 300)
    };
  });
}

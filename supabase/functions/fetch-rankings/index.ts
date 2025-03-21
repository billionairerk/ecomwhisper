
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const serpApiKey = Deno.env.get('SERPAPI_API_KEY') || '';

    // Initialize Supabase client with service role key for admin access
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch all keywords from the database
    const { data: keywords, error: keywordsError } = await supabase
      .from('keywords')
      .select('*');

    if (keywordsError) {
      throw new Error(`Error fetching keywords: ${keywordsError.message}`);
    }

    if (!keywords || keywords.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No keywords found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${keywords.length} keywords to check rankings for`);

    // Process each keyword
    const results = await Promise.all(
      keywords.map(async (keyword) => {
        try {
          // Call SerpAPI to get current rankings for the keyword
          const query = encodeURIComponent(keyword.keyword);
          const url = `https://serpapi.com/search.json?q=${query}&engine=${keyword.search_engine}&api_key=${serpApiKey}`;
          
          console.log(`Checking rankings for "${keyword.keyword}" on ${keyword.search_engine}`);
          const response = await fetch(url);
          
          if (!response.ok) {
            throw new Error(`SerpAPI request failed: ${response.statusText}`);
          }
          
          const data = await response.json();
          
          // Extract organic results
          const organicResults = data.organic_results || [];
          
          // Get our competitors from the database
          const { data: competitors, error: competitorsError } = await supabase
            .from('competitors')
            .select('*');
            
          if (competitorsError) {
            throw new Error(`Error fetching competitors: ${competitorsError.message}`);
          }
          
          // Process rankings for each competitor
          if (competitors && competitors.length > 0) {
            for (const competitor of competitors) {
              // Find the competitor in the search results
              const position = organicResults.findIndex((result: any) => 
                result.link && result.link.includes(competitor.domain)
              );
              
              if (position !== -1) {
                // Competitor found in search results, save ranking
                const { data: existingRanking, error: rankingQueryError } = await supabase
                  .from('rankings')
                  .select('position')
                  .eq('keyword_id', keyword.id)
                  .eq('competitor_id', competitor.id)
                  .order('timestamp', { ascending: false })
                  .limit(1);
                
                if (rankingQueryError) {
                  console.error(`Error checking existing ranking: ${rankingQueryError.message}`);
                }
                
                const actualPosition = position + 1; // Convert from 0-based to 1-based index
                const hasChanged = !existingRanking?.length || existingRanking[0].position !== actualPosition;
                
                // Insert new ranking
                const { error: insertError } = await supabase
                  .from('rankings')
                  .insert({
                    keyword_id: keyword.id,
                    competitor_id: competitor.id,
                    position: actualPosition,
                    timestamp: new Date().toISOString()
                  });
                
                if (insertError) {
                  console.error(`Error inserting ranking: ${insertError.message}`);
                  continue;
                }
                
                // Create alert if ranking changed
                if (hasChanged) {
                  const changeDirection = !existingRanking?.length ? 'initial' : 
                    (actualPosition < existingRanking[0].position ? 'improved' : 'declined');
                  const changeMessage = !existingRanking?.length 
                    ? `Initial ranking for ${competitor.domain} on "${keyword.keyword}": position ${actualPosition}`
                    : `${competitor.domain} has ${changeDirection} from position ${existingRanking[0].position} to ${actualPosition} for "${keyword.keyword}"`;
                  
                  const { error: alertError } = await supabase
                    .from('alerts')
                    .insert({
                      message: changeMessage,
                      timestamp: new Date().toISOString()
                    });
                  
                  if (alertError) {
                    console.error(`Error creating alert: ${alertError.message}`);
                  } else {
                    console.log(`Created alert: ${changeMessage}`);
                  }
                }
              } else {
                console.log(`${competitor.domain} not found in top results for "${keyword.keyword}"`);
              }
            }
          }
          
          return { keyword: keyword.keyword, success: true };
        } catch (error) {
          console.error(`Error processing keyword "${keyword.keyword}":`, error);
          return { keyword: keyword.keyword, success: false, error: error.message };
        }
      })
    );

    return new Response(
      JSON.stringify({ message: 'Rankings fetched and updated', results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in fetch-rankings function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

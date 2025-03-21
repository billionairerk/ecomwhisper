
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
    const ahrefsApiKey = Deno.env.get('AHREFS_API_KEY') || '';

    // Initialize Supabase client with service role key for admin access
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch all competitors from the database
    const { data: competitors, error: competitorsError } = await supabase
      .from('competitors')
      .select('*');

    if (competitorsError) {
      throw new Error(`Error fetching competitors: ${competitorsError.message}`);
    }

    if (!competitors || competitors.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No competitors found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${competitors.length} competitors to check backlinks for`);

    // Process each competitor
    const results = await Promise.all(
      competitors.map(async (competitor) => {
        try {
          console.log(`Checking backlinks for ${competitor.domain}`);
          
          // Call Ahrefs API to get backlinks for the competitor
          const url = `https://apiv2.ahrefs.com/v3/site-explorer/backlinks?target=${competitor.domain}&mode=exact&limit=50&token=${ahrefsApiKey}`;
          
          const response = await fetch(url);
          
          if (!response.ok) {
            throw new Error(`Ahrefs API request failed: ${response.statusText}`);
          }
          
          const data = await response.json();
          const backlinks = data.backlinks || [];
          
          console.log(`Found ${backlinks.length} backlinks for ${competitor.domain}`);
          
          // Insert backlinks into database
          for (const backlink of backlinks) {
            const { error: insertError } = await supabase
              .from('backlinks')
              .insert({
                competitor_id: competitor.id,
                source_url: backlink.url,
                domain_authority: backlink.domain_rating || null,
                timestamp: new Date().toISOString()
              });
            
            if (insertError) {
              console.error(`Error inserting backlink: ${insertError.message}`);
            }
          }
          
          // Create an alert
          const { error: alertError } = await supabase
            .from('alerts')
            .insert({
              message: `Found ${backlinks.length} backlinks for ${competitor.domain}`,
              timestamp: new Date().toISOString()
            });
          
          if (alertError) {
            console.error(`Error creating alert: ${alertError.message}`);
          }
          
          return { domain: competitor.domain, success: true, count: backlinks.length };
        } catch (error) {
          console.error(`Error processing competitor "${competitor.domain}":`, error);
          return { domain: competitor.domain, success: false, error: error.message };
        }
      })
    );

    return new Response(
      JSON.stringify({ message: 'Backlinks monitored and updated', results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in monitor-backlinks function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

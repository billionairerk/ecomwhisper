
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

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

    console.log(`Found ${competitors.length} competitors to scrape content from`);

    // Process each competitor
    const results = await Promise.all(
      competitors.map(async (competitor) => {
        try {
          console.log(`Scraping content from ${competitor.domain}`);
          
          // Fetch the competitor's homepage
          const url = `https://${competitor.domain}`;
          const response = await fetch(url);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
          }
          
          const html = await response.text();
          const parser = new DOMParser();
          const document = parser.parseFromString(html, "text/html");
          
          if (!document) {
            throw new Error(`Failed to parse HTML from ${url}`);
          }
          
          // Extract title and content
          const title = document.querySelector("title")?.textContent || "No title found";
          
          // Get content from common content containers
          const contentSelectors = [
            "article", "main", ".content", "#content", 
            ".post", ".entry", ".blog-post", ".article"
          ];
          
          let contentElement = null;
          for (const selector of contentSelectors) {
            contentElement = document.querySelector(selector);
            if (contentElement) break;
          }
          
          // If no specific content container found, use the body
          if (!contentElement) {
            contentElement = document.querySelector("body");
          }
          
          const contentText = contentElement
            ? contentElement.textContent?.trim() || "No content found"
            : "No content found";
          
          // Only store first 5000 characters to avoid storage issues
          const truncatedContent = contentText.substring(0, 5000);
          
          // Check if we already have content for this URL
          const { data: existingContent, error: contentQueryError } = await supabase
            .from('content')
            .select('*')
            .eq('url', url)
            .order('timestamp', { ascending: false })
            .limit(1);
          
          if (contentQueryError) {
            console.error(`Error checking existing content: ${contentQueryError.message}`);
          }
          
          // Only insert if content has changed or doesn't exist
          const shouldInsert = !existingContent?.length || 
                              existingContent[0].content_text !== truncatedContent || 
                              existingContent[0].title !== title;
          
          if (shouldInsert) {
            // Insert content into database
            const { data: insertedContent, error: insertError } = await supabase
              .from('content')
              .insert({
                competitor_id: competitor.id,
                url: url,
                title: title,
                content_text: truncatedContent,
                type: 'homepage',
                timestamp: new Date().toISOString()
              })
              .select();
            
            if (insertError) {
              throw new Error(`Error inserting content: ${insertError.message}`);
            }
            
            console.log(`Inserted new content for ${url}`);
            
            // Create an alert
            const { error: alertError } = await supabase
              .from('alerts')
              .insert({
                message: `New content detected on ${competitor.domain}`,
                timestamp: new Date().toISOString()
              });
            
            if (alertError) {
              console.error(`Error creating alert: ${alertError.message}`);
            }
            
            // Trigger the OpenAI analysis function for the new content
            try {
              const analysisUrl = new URL('/functions/v1/generate-ai-insights', req.url);
              const analysisResponse = await fetch(analysisUrl.toString(), {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${supabaseServiceKey}`
                },
                body: JSON.stringify({
                  contentId: insertedContent[0].id
                })
              });
              
              if (!analysisResponse.ok) {
                console.error(`Failed to trigger AI analysis: ${analysisResponse.statusText}`);
              }
            } catch (analysisError) {
              console.error('Error triggering AI analysis:', analysisError);
            }
            
            return { 
              domain: competitor.domain, 
              success: true, 
              changed: true,
              title: title
            };
          } else {
            console.log(`No content changes detected for ${url}`);
            return { 
              domain: competitor.domain, 
              success: true, 
              changed: false 
            };
          }
        } catch (error) {
          console.error(`Error processing competitor "${competitor.domain}":`, error);
          return { domain: competitor.domain, success: false, error: error.message };
        }
      })
    );

    return new Response(
      JSON.stringify({ message: 'Content monitored and updated', results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in monitor-content function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});


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
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY') || '';

    // Parse the request body
    const { contentId } = await req.json();
    
    if (!contentId) {
      return new Response(
        JSON.stringify({ error: 'contentId is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client with service role key for admin access
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch the content from the database
    const { data: contentData, error: contentError } = await supabase
      .from('content')
      .select('*, competitors(domain)')
      .eq('id', contentId)
      .single();

    if (contentError) {
      throw new Error(`Error fetching content: ${contentError.message}`);
    }

    if (!contentData) {
      return new Response(
        JSON.stringify({ error: 'Content not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Generating AI insights for content from ${contentData.competitors.domain}`);

    // Get a sample of the content text (first 3000 characters to save tokens)
    const contentSample = contentData.content_text?.substring(0, 3000) || '';
    const competitorDomain = contentData.competitors.domain;
    
    // Generate insights using OpenAI
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert SEO analyst and content strategist. Analyze competitor content and provide actionable insights.'
          },
          {
            role: 'user',
            content: `Analyze this content from competitor website ${competitorDomain} and provide 3 specific, actionable insights for how to create better content for this topic. Focus on SEO strategy, content gaps, and unique value proposition. Here's the content:\n\n${contentSample}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json();
      throw new Error(`OpenAI API error: ${JSON.stringify(errorData)}`);
    }

    const openaiData = await openaiResponse.json();
    const insights = openaiData.choices[0].message.content;

    // Store the insights in the suggestions table
    const { error: insertError } = await supabase
      .from('suggestions')
      .insert({
        suggestion: insights,
        type: 'content_analysis',
        timestamp: new Date().toISOString()
      });

    if (insertError) {
      throw new Error(`Error inserting suggestion: ${insertError.message}`);
    }

    // Create an alert about the new insights
    const { error: alertError } = await supabase
      .from('alerts')
      .insert({
        message: `New AI insights generated for content from ${competitorDomain}`,
        timestamp: new Date().toISOString()
      });

    if (alertError) {
      console.error(`Error creating alert: ${alertError.message}`);
    }

    return new Response(
      JSON.stringify({ message: 'AI insights generated successfully', insights }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-ai-insights function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

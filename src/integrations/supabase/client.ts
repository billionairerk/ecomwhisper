// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ocpmvagnozqxmuzxzbim.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jcG12YWdub3pxeG11enh6YmltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1ODI3MTUsImV4cCI6MjA1ODE1ODcxNX0.loY-9QOYa64CN-e2996fNj3pQXh_1IlzD3lxOTDxibQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
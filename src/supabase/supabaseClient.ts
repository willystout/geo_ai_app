import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export default async function fetchQueries() {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: countries, error } = await supabase.from("GeoAI-supabase-db").select();

  if (error) {
    console.error('Error fetching queries:', error);
    return { error };
  }

  return { countries };
}
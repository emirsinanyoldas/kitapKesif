import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if we have valid Supabase credentials
const hasValidCredentials = 
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'your-project-url-here' && 
  supabaseAnonKey !== 'your-anon-key-here' &&
  supabaseUrl.includes('supabase.co');

if (!hasValidCredentials) {
  console.warn(
    '⚠️ Supabase credentials not configured!\n' +
    '\n' +
    '📝 To fix this:\n' +
    '1. Get your credentials from: https://supabase.com/dashboard\n' +
    '2. Update the .env file with your actual values\n' +
    '3. Restart the dev server\n' +
    '\n' +
    '📖 See HOW_TO_GET_SUPABASE_CREDENTIALS.md for detailed instructions\n' +
    '\n' +
    '🔄 The app will now use Open Library API as fallback (limited features)'
  );
}

// Create Supabase client (will use fallback if credentials invalid)
export const supabase = hasValidCredentials 
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : createClient('https://placeholder.supabase.co', 'placeholder-key');

// Export flag to check if we have valid connection
export const hasSupabaseConnection = hasValidCredentials;

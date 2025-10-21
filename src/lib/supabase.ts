import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if we have valid Supabase credentials
const hasValidCredentials = 
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'your-project-url-here' && 
  supabaseAnonKey !== 'your-anon-key-here' &&
  supabaseUrl.includes('supabase.co') &&
  supabaseUrl.startsWith('https://');

// Enhanced validation with detailed feedback
const validateSupabaseConfig = (): { isValid: boolean; issues: string[] } => {
  const issues: string[] = [];
  
  if (!supabaseUrl) {
    issues.push('VITE_SUPABASE_URL is missing from .env file');
  } else if (supabaseUrl === 'your-project-url-here') {
    issues.push('VITE_SUPABASE_URL still contains placeholder value');
  } else if (!supabaseUrl.startsWith('https://')) {
    issues.push('VITE_SUPABASE_URL must start with https://');
  } else if (!supabaseUrl.includes('supabase.co')) {
    issues.push('VITE_SUPABASE_URL must be a valid Supabase URL ending with .supabase.co');
  }
  
  if (!supabaseAnonKey) {
    issues.push('VITE_SUPABASE_ANON_KEY is missing from .env file');
  } else if (supabaseAnonKey === 'your-anon-key-here') {
    issues.push('VITE_SUPABASE_ANON_KEY still contains placeholder value');
  } else if (!supabaseAnonKey.startsWith('eyJ')) {
    issues.push('VITE_SUPABASE_ANON_KEY does not appear to be a valid JWT token');
  }
  
  return {
    isValid: issues.length === 0 && hasValidCredentials,
    issues
  };
};

const validation = validateSupabaseConfig();

if (!validation.isValid) {
  console.warn(
    '⚠️ Supabase configuration issues detected!\n' +
    '\n' +
    '🔧 Issues found:\n' +
    validation.issues.map(issue => `  • ${issue}`).join('\n') +
    '\n\n' +
    '📝 To fix this:\n' +
    '1. Create a free Supabase project at: https://supabase.com/dashboard\n' +
    '2. Get your credentials from Project Settings → API\n' +
    '3. Update the .env file with your actual values\n' +
    '4. Restart the dev server\n' +
    '\n' +
    '📖 See HOW_TO_GET_SUPABASE_CREDENTIALS.md for detailed instructions\n' +
    '\n' +
    '🔄 The app will use Open Library API as fallback (limited features)\n' +
    '   but will combine with database books when credentials are valid'
  );
}

// Create Supabase client (will use fallback if credentials invalid)
export const supabase = validation.isValid 
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : createClient('https://placeholder.supabase.co', 'placeholder-key');

// Export flag to check if we have valid connection
export const hasSupabaseConnection = validation.isValid;

// Export validation info for debugging
export const supabaseConfigValidation = validation;
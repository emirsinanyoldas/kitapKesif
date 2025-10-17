/**
 * SQL Execution Script
 * 
 * A general-purpose script to run SQL queries against your Supabase database.
 * This allows you to execute any SQL without needing to use the dashboard.
 * 
 * Usage: 
 *   node scripts/run-sql.js "SELECT * FROM books LIMIT 5;"
 *   npm run sql -- "SELECT COUNT(*) FROM books;"
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Get SQL query from command line argument
const sqlQuery = process.argv[2];

if (!sqlQuery) {
  console.log('📋 SQL Execution Tool\n');
  console.log('Usage: npm run sql -- "YOUR_SQL_QUERY_HERE"\n');
  console.log('Examples:');
  console.log('  npm run sql -- "SELECT COUNT(*) FROM books;"');
  console.log('  npm run sql -- "SELECT title, author FROM books LIMIT 5;"');
  console.log('  npm run sql -- "SELECT category, COUNT(*) as count FROM books GROUP BY category;"\n');
  console.log('💡 Tip: Check DATABASE_GUIDE.md for common SQL queries\n');
  process.exit(1);
}

async function runSQL(query) {
  console.log('🔍 Executing SQL query...\n');
  console.log('Query:', query, '\n');
  console.log('='.repeat(60));

  try {
    // For SELECT queries, use the Supabase client
    if (query.trim().toUpperCase().startsWith('SELECT')) {
      const { data, error } = await supabase.rpc('exec_sql', { sql: query });
      
      if (error) {
        // If RPC doesn't work, provide instructions
        console.log('⚠️  Direct SQL execution requires service role key or SQL Editor.\n');
        console.log('📋 Please run this query in Supabase SQL Editor:');
        console.log('https://supabase.com/dashboard\n');
        return false;
      }

      console.log('✅ Query executed successfully!\n');
      console.log('Results:');
      console.table(data);
      return true;
    } else {
      console.log('⚠️  Non-SELECT queries should be run in Supabase SQL Editor for security.\n');
      console.log('📋 Run this query at:');
      console.log('https://supabase.com/dashboard\n');
      return false;
    }
  } catch (error) {
    console.error('❌ Error executing SQL:', error.message);
    console.log('\n💡 For complex queries, use Supabase SQL Editor:');
    console.log('https://supabase.com/dashboard\n');
    return false;
  }
}

runSQL(sqlQuery)
  .then(success => {
    console.log('='.repeat(60));
    console.log(success ? '\n✅ Done!\n' : '\n⚠️  See instructions above\n');
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });

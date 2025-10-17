/**
 * Fix Database Permissions Script
 * 
 * Automatically applies RLS policy fixes to allow INSERT and UPDATE operations
 * on books and reviews tables. This script uses Supabase client to execute
 * SQL directly, so you don't need to manually run SQL in the dashboard.
 * 
 * Run: npm run fix-db
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase credentials in .env file');
  console.error('Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixDatabasePermissions() {
  console.log('🔧 Starting database permissions fix...\n');

  try {
    // SQL to fix RLS policies
    const fixSQL = `
      -- Fix books table policies
      DROP POLICY IF EXISTS "Anyone can insert books" ON books;
      DROP POLICY IF EXISTS "Anyone can update books" ON books;

      CREATE POLICY "Anyone can insert books"
        ON books FOR INSERT
        TO public
        WITH CHECK (true);

      CREATE POLICY "Anyone can update books"
        ON books FOR UPDATE
        TO public
        USING (true)
        WITH CHECK (true);

      -- Fix reviews table policies
      DROP POLICY IF EXISTS "Anyone can insert reviews" ON reviews;
      DROP POLICY IF EXISTS "Anyone can update reviews" ON reviews;

      CREATE POLICY "Anyone can insert reviews"
        ON reviews FOR INSERT
        TO public
        WITH CHECK (true);

      CREATE POLICY "Anyone can update reviews"
        ON reviews FOR UPDATE
        TO public
        USING (true)
        WITH CHECK (true);
    `;

    console.log('📝 Applying RLS policy fixes...');
    console.log('   - Dropping old policies');
    console.log('   - Creating INSERT policies for books and reviews');
    console.log('   - Creating UPDATE policies for books and reviews\n');

    // Execute the SQL
    const { error } = await supabase.rpc('exec_sql', { sql: fixSQL });

    if (error) {
      // If RPC method doesn't exist, provide manual instructions
      console.log('⚠️  Automatic fix requires database function.');
      console.log('\n📋 MANUAL FIX REQUIRED:\n');
      console.log('Please run this SQL in your Supabase SQL Editor:');
      console.log('https://supabase.com/dashboard/project/' + supabaseUrl.split('//')[1].split('.')[0] + '/sql/new\n');
      console.log('='.repeat(60));
      console.log(fixSQL);
      console.log('='.repeat(60));
      console.log('\n✅ After running the SQL, run: npm run import-books\n');
      return false;
    }

    console.log('✅ Database permissions fixed successfully!\n');

    // Verify the policies
    console.log('🔍 Verifying policies...');
    const { data: policies, error: verifyError } = await supabase
      .from('pg_policies')
      .select('tablename, policyname, cmd')
      .in('tablename', ['books', 'reviews'])
      .order('tablename, policyname');

    if (verifyError) {
      console.log('⚠️  Could not verify policies automatically.');
      console.log('   Please check Supabase dashboard to confirm policies are active.\n');
    } else if (policies && policies.length > 0) {
      console.log('\n📊 Active Policies:');
      policies.forEach(p => {
        console.log(`   ✓ ${p.tablename}.${p.policyname} (${p.cmd})`);
      });
    }

    console.log('\n✅ Your database is now ready for book imports!');
    console.log('   Run: npm run import-books\n');
    
    return true;

  } catch (error) {
    console.error('❌ Error fixing database permissions:', error.message);
    console.log('\n📋 Please manually run the SQL fix from DATABASE_GUIDE.md\n');
    return false;
  }
}

// Run the fix
fixDatabasePermissions()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });

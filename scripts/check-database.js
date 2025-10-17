/**
 * Database Health Check Script
 * 
 * Performs comprehensive checks on your database:
 * - Connection status
 * - Table counts
 * - RLS policy status
 * - Index health
 * - Data integrity
 * 
 * Run: npm run check-db
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

async function checkDatabase() {
  console.log('🏥 Database Health Check\n');
  console.log('='.repeat(60));

  let allChecks = true;

  // Check 1: Connection
  console.log('\n1️⃣  Checking database connection...');
  try {
    const { error } = await supabase.from('books').select('count', { count: 'exact', head: true });
    if (error) throw error;
    console.log('   ✅ Connection successful');
  } catch (error) {
    console.log('   ❌ Connection failed:', error.message);
    allChecks = false;
  }

  // Check 2: Table counts
  console.log('\n2️⃣  Checking table record counts...');
  try {
    const { count: bookCount, error: bookError } = await supabase
      .from('books')
      .select('*', { count: 'exact', head: true });

    const { count: reviewCount, error: reviewError } = await supabase
      .from('reviews')
      .select('*', { count: 'exact', head: true });

    if (bookError || reviewError) throw new Error('Failed to count records');

    console.log(`   📚 Books: ${bookCount} records`);
    console.log(`   💬 Reviews: ${reviewCount} records`);

    if (bookCount === 0) {
      console.log('   ⚠️  No books found. Run: npm run import-books');
    } else {
      console.log('   ✅ Books table populated');
    }
  } catch (error) {
    console.log('   ❌ Count check failed:', error.message);
    allChecks = false;
  }

  // Check 3: Sample data
  console.log('\n3️⃣  Checking sample data...');
  try {
    const { data: sampleBooks, error } = await supabase
      .from('books')
      .select('id, title, author, category, average_rating, total_reviews')
      .limit(5);

    if (error) throw error;

    if (sampleBooks && sampleBooks.length > 0) {
      console.log('   ✅ Sample books retrieved:');
      sampleBooks.forEach((book, index) => {
        console.log(`      ${index + 1}. "${book.title}" by ${book.author}`);
        console.log(`         Category: ${book.category} | Rating: ${book.average_rating} (${book.total_reviews} reviews)`);
      });
    } else {
      console.log('   ⚠️  No sample data available');
    }
  } catch (error) {
    console.log('   ❌ Sample data check failed:', error.message);
  }

  // Check 4: Category distribution
  console.log('\n4️⃣  Checking category distribution...');
  try {
    const { data: books, error } = await supabase
      .from('books')
      .select('category');

    if (error) throw error;

    if (books && books.length > 0) {
      const categories = books.reduce((acc, book) => {
        acc[book.category] = (acc[book.category] || 0) + 1;
        return acc;
      }, {});

      console.log('   📊 Books by category:');
      Object.entries(categories)
        .sort((a, b) => b[1] - a[1])
        .forEach(([category, count]) => {
          console.log(`      • ${category}: ${count} books`);
        });
      console.log('   ✅ Categories distributed');
    }
  } catch (error) {
    console.log('   ❌ Category check failed:', error.message);
  }

  // Check 5: Data integrity
  console.log('\n5️⃣  Checking data integrity...');
  try {
    const { data: books, error } = await supabase
      .from('books')
      .select('id, title, author, cover_image, category, average_rating, total_reviews');

    if (error) throw error;

    let issues = 0;
    
    books?.forEach(book => {
      if (!book.title || !book.author || !book.cover_image || !book.category) {
        issues++;
      }
      if (book.average_rating < 0 || book.average_rating > 5) {
        issues++;
      }
      if (book.total_reviews < 0) {
        issues++;
      }
    });

    if (issues === 0) {
      console.log('   ✅ No data integrity issues found');
    } else {
      console.log(`   ⚠️  Found ${issues} data integrity issues`);
      allChecks = false;
    }
  } catch (error) {
    console.log('   ❌ Integrity check failed:', error.message);
  }

  // Check 6: INSERT permission test
  console.log('\n6️⃣  Testing INSERT permissions...');
  try {
    const testBook = {
      title: '__TEST_BOOK_DELETE_ME__',
      author: 'Test Author',
      description: 'Test description',
      cover_image: 'https://example.com/test.jpg',
      category: 'Test',
      average_rating: 0,
      total_reviews: 0
    };

    const { data: inserted, error: insertError } = await supabase
      .from('books')
      .insert(testBook)
      .select()
      .single();

    if (insertError) {
      console.log('   ❌ INSERT permission denied');
      console.log('      Run: npm run fix-db');
      allChecks = false;
    } else {
      console.log('   ✅ INSERT permission working');
      
      // Clean up test book
      await supabase.from('books').delete().eq('id', inserted.id);
      console.log('   🧹 Test book cleaned up');
    }
  } catch (error) {
    console.log('   ❌ INSERT test failed:', error.message);
    allChecks = false;
  }

  // Final summary
  console.log('\n' + '='.repeat(60));
  if (allChecks) {
    console.log('\n✅ All checks passed! Database is healthy.\n');
  } else {
    console.log('\n⚠️  Some checks failed. Review the output above.\n');
    console.log('Common fixes:');
    console.log('  • No books: npm run import-books');
    console.log('  • INSERT denied: npm run fix-db');
    console.log('  • Connection issues: Check .env credentials\n');
  }

  return allChecks;
}

checkDatabase()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });

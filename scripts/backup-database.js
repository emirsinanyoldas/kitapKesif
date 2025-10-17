/**
 * Database Backup Script
 * 
 * Creates a JSON backup of all books and reviews from your database.
 * This backup can be used to restore data or migrate to another database.
 * 
 * Run: npm run backup-db
 * 
 * Output: Creates backup file in backups/ directory with timestamp
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function backupDatabase() {
  console.log('💾 Database Backup Tool\n');
  console.log('='.repeat(60));

  try {
    // Create backups directory if it doesn't exist
    const backupsDir = path.join(process.cwd(), 'backups');
    if (!fs.existsSync(backupsDir)) {
      fs.mkdirSync(backupsDir, { recursive: true });
      console.log('📁 Created backups directory\n');
    }

    // Get all books
    console.log('📚 Backing up books...');
    const { data: books, error: booksError } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: true });

    if (booksError) throw booksError;
    console.log(`   ✅ Retrieved ${books.length} books`);

    // Get all reviews
    console.log('💬 Backing up reviews...');
    const { data: reviews, error: reviewsError } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: true });

    if (reviewsError) throw reviewsError;
    console.log(`   ✅ Retrieved ${reviews.length} reviews\n`);

    // Create backup object
    const backup = {
      metadata: {
        backup_date: new Date().toISOString(),
        database_url: supabaseUrl,
        total_books: books.length,
        total_reviews: reviews.length,
        version: '1.0',
        generator: 'KitapKeşif Backup Tool'
      },
      books: books,
      reviews: reviews
    };

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const filename = `backup_${timestamp}.json`;
    const filepath = path.join(backupsDir, filename);

    // Write backup file
    fs.writeFileSync(filepath, JSON.stringify(backup, null, 2), 'utf-8');

    // Calculate file size
    const stats = fs.statSync(filepath);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

    console.log('='.repeat(60));
    console.log('\n✅ Backup completed successfully!\n');
    console.log('📊 Backup Summary:');
    console.log(`   • Books: ${books.length}`);
    console.log(`   • Reviews: ${reviews.length}`);
    console.log(`   • File size: ${fileSizeMB} MB`);
    console.log(`   • Location: ${filepath}\n`);

    // Category breakdown
    const categoryCount = books.reduce((acc, book) => {
      acc[book.category] = (acc[book.category] || 0) + 1;
      return acc;
    }, {});

    console.log('📂 Categories backed up:');
    Object.entries(categoryCount)
      .sort((a, b) => b[1] - a[1])
      .forEach(([category, count]) => {
        console.log(`   • ${category}: ${count} books`);
      });

    console.log('\n💡 To restore this backup, run:');
    console.log(`   npm run restore-db -- "${filename}"\n`);

    return true;

  } catch (error) {
    console.error('\n❌ Backup failed:', error.message);
    return false;
  }
}

backupDatabase()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });

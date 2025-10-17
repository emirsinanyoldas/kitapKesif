/**
 * Database Restore Script
 * 
 * Restores books and reviews from a backup JSON file.
 * This can restore a previous backup or import data from another source.
 * 
 * Usage: npm run restore-db -- "backup_2025-10-17T14-30-00.json"
 * 
 * Options:
 *   --clear    Delete existing data before restore (DANGEROUS!)
 *   --merge    Keep existing data and add backup data (default)
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

// Get command line arguments
const backupFile = process.argv[2];
const clearFirst = process.argv.includes('--clear');

if (!backupFile) {
  console.log('📋 Database Restore Tool\n');
  console.log('Usage: npm run restore-db -- "backup_filename.json"\n');
  console.log('Options:');
  console.log('  --clear    Delete existing data before restore (DANGEROUS!)');
  console.log('  --merge    Keep existing data and add backup (default)\n');
  console.log('Available backups:');
  
  const backupsDir = path.join(process.cwd(), 'backups');
  if (fs.existsSync(backupsDir)) {
    const files = fs.readdirSync(backupsDir)
      .filter(f => f.endsWith('.json'))
      .sort()
      .reverse();
    
    if (files.length > 0) {
      files.forEach((file, index) => {
        const stats = fs.statSync(path.join(backupsDir, file));
        const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
        console.log(`  ${index + 1}. ${file} (${sizeMB} MB)`);
      });
    } else {
      console.log('  No backups found. Run: npm run backup-db');
    }
  } else {
    console.log('  No backups directory. Run: npm run backup-db');
  }
  console.log();
  process.exit(0);
}

async function restoreDatabase(backupFilePath) {
  console.log('♻️  Database Restore Tool\n');
  console.log('='.repeat(60));

  try {
    // Read backup file
    console.log(`📂 Reading backup file: ${backupFilePath}`);
    
    const backupsDir = path.join(process.cwd(), 'backups');
    const fullPath = path.join(backupsDir, backupFilePath);
    
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Backup file not found: ${fullPath}`);
    }

    const backupData = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
    
    console.log('   ✅ Backup file loaded\n');
    console.log('📊 Backup Information:');
    console.log(`   • Created: ${backupData.metadata.backup_date}`);
    console.log(`   • Books: ${backupData.metadata.total_books}`);
    console.log(`   • Reviews: ${backupData.metadata.total_reviews}`);
    console.log(`   • Version: ${backupData.metadata.version}\n`);

    // Warning if clear flag is used
    if (clearFirst) {
      console.log('⚠️  WARNING: --clear flag detected!');
      console.log('   All existing data will be DELETED before restore.');
      console.log('   Waiting 5 seconds... Press Ctrl+C to cancel.\n');
      await new Promise(resolve => setTimeout(resolve, 5000));

      console.log('🗑️  Clearing existing data...');
      
      // Delete all reviews first (due to foreign key)
      const { error: deleteReviewsError } = await supabase
        .from('reviews')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

      if (deleteReviewsError) {
        console.log('   ⚠️  Could not clear reviews:', deleteReviewsError.message);
      } else {
        console.log('   ✅ Reviews cleared');
      }

      // Delete all books
      const { error: deleteBooksError } = await supabase
        .from('books')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

      if (deleteBooksError) {
        console.log('   ⚠️  Could not clear books:', deleteBooksError.message);
      } else {
        console.log('   ✅ Books cleared');
      }

      console.log();
    }

    // Restore books
    console.log('📚 Restoring books...');
    
    let booksSuccess = 0;
    let booksError = 0;
    
    // Insert books in batches of 50
    const batchSize = 50;
    for (let i = 0; i < backupData.books.length; i += batchSize) {
      const batch = backupData.books.slice(i, i + batchSize);
      
      const { error } = await supabase
        .from('books')
        .upsert(batch, { onConflict: 'id' });

      if (error) {
        console.log(`   ⚠️  Batch ${Math.floor(i / batchSize) + 1} failed:`, error.message);
        booksError += batch.length;
      } else {
        booksSuccess += batch.length;
      }
    }

    console.log(`   ✅ Books restored: ${booksSuccess} succeeded, ${booksError} failed\n`);

    // Restore reviews
    console.log('💬 Restoring reviews...');
    
    let reviewsSuccess = 0;
    let reviewsError = 0;
    
    // Insert reviews in batches of 100
    const reviewBatchSize = 100;
    for (let i = 0; i < backupData.reviews.length; i += reviewBatchSize) {
      const batch = backupData.reviews.slice(i, i + reviewBatchSize);
      
      const { error } = await supabase
        .from('reviews')
        .upsert(batch, { onConflict: 'id' });

      if (error) {
        console.log(`   ⚠️  Batch ${Math.floor(i / reviewBatchSize) + 1} failed:`, error.message);
        reviewsError += batch.length;
      } else {
        reviewsSuccess += batch.length;
      }
    }

    console.log(`   ✅ Reviews restored: ${reviewsSuccess} succeeded, ${reviewsError} failed\n`);

    // Recalculate ratings
    console.log('🔄 Recalculating book ratings...');
    const { data: books } = await supabase.from('books').select('id');
    
    if (books) {
      for (const book of books) {
        const { data: bookReviews } = await supabase
          .from('reviews')
          .select('rating')
          .eq('book_id', book.id);

        if (bookReviews && bookReviews.length > 0) {
          const avgRating = bookReviews.reduce((sum, r) => sum + r.rating, 0) / bookReviews.length;
          
          await supabase
            .from('books')
            .update({
              average_rating: parseFloat(avgRating.toFixed(1)),
              total_reviews: bookReviews.length
            })
            .eq('id', book.id);
        }
      }
      console.log('   ✅ Ratings recalculated\n');
    }

    console.log('='.repeat(60));
    console.log('\n✅ Restore completed!\n');
    console.log('📊 Restore Summary:');
    console.log(`   • Books: ${booksSuccess} restored, ${booksError} failed`);
    console.log(`   • Reviews: ${reviewsSuccess} restored, ${reviewsError} failed`);
    console.log(`   • Mode: ${clearFirst ? 'CLEAR & RESTORE' : 'MERGE'}\n`);

    console.log('💡 Verify the restore with:');
    console.log('   npm run check-db\n');

    return true;

  } catch (error) {
    console.error('\n❌ Restore failed:', error.message);
    return false;
  }
}

restoreDatabase(backupFile)
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });

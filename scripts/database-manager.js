/**
 * Interactive Database Manager
 * 
 * A menu-driven tool to manage all database operations without remembering commands.
 * This is your one-stop tool for all database tasks.
 * 
 * Run: npm run db-manager
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { spawn } from 'child_process';
import readline from 'readline';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function clearScreen() {
  console.clear();
}

function showHeader() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║         📊 KitapKeşif Database Manager v1.0               ║');
  console.log('║         Your SQL Database Specialist                      ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log();
}

function showMainMenu() {
  console.log('┌────────────────────────────────────────────────────────────┐');
  console.log('│                       MAIN MENU                            │');
  console.log('├────────────────────────────────────────────────────────────┤');
  console.log('│                                                            │');
  console.log('│  1. 🏥 Check Database Health                              │');
  console.log('│  2. 🔧 Fix Database Permissions (First Time Setup)        │');
  console.log('│  3. 📚 Import Books from Open Library                     │');
  console.log('│  4. 💬 Add Sample Reviews                                 │');
  console.log('│  5. 💾 Backup Database                                    │');
  console.log('│  6. ♻️  Restore from Backup                               │');
  console.log('│  7. 📊 View Database Statistics                           │');
  console.log('│  8. 🔍 Search Books                                       │');
  console.log('│  9. 📖 Quick Reference Guides                             │');
  console.log('│  0. 🚪 Exit                                               │');
  console.log('│                                                            │');
  console.log('└────────────────────────────────────────────────────────────┘');
  console.log();
}

async function runCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    const child = spawn('npm', ['run', command, '--', ...args], {
      shell: true,
      stdio: 'inherit'
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });
  });
}

async function checkHealth() {
  clearScreen();
  showHeader();
  console.log('Running health check...\n');
  
  try {
    await runCommand('check-db');
    console.log('\n✅ Health check complete!');
  } catch (error) {
    console.log('\n❌ Health check failed:', error.message);
  }
  
  await question('\nPress Enter to continue...');
}

async function fixPermissions() {
  clearScreen();
  showHeader();
  console.log('⚠️  Database Permission Fix\n');
  console.log('This will enable INSERT and UPDATE operations on your database.');
  console.log('This is required before importing books.\n');
  
  const confirm = await question('Continue? (y/n): ');
  
  if (confirm.toLowerCase() === 'y') {
    console.log('\nFixing permissions...\n');
    try {
      await runCommand('fix-db');
      console.log('\n✅ Permissions fixed!');
    } catch (error) {
      console.log('\n⚠️  Automated fix failed.');
      console.log('Please run FIX_DATABASE_NOW.sql manually in Supabase SQL Editor.');
    }
  }
  
  await question('\nPress Enter to continue...');
}

async function importBooks() {
  clearScreen();
  showHeader();
  console.log('📚 Import Books from Open Library\n');
  console.log('This will import 150+ books across 25+ diverse topics.');
  console.log('Estimated time: 2-3 minutes\n');
  
  const confirm = await question('Start import? (y/n): ');
  
  if (confirm.toLowerCase() === 'y') {
    console.log('\nImporting books...\n');
    try {
      await runCommand('import-books');
      console.log('\n✅ Books imported successfully!');
    } catch (error) {
      console.log('\n❌ Import failed:', error.message);
      console.log('Make sure you ran "Fix Database Permissions" first!');
    }
  }
  
  await question('\nPress Enter to continue...');
}

async function addReviews() {
  clearScreen();
  showHeader();
  console.log('💬 Add Sample Reviews\n');
  console.log('This will add realistic reviews to all books in the database.\n');
  
  const confirm = await question('Add reviews? (y/n): ');
  
  if (confirm.toLowerCase() === 'y') {
    console.log('\nAdding reviews...\n');
    try {
      await runCommand('add-reviews');
      console.log('\n✅ Reviews added successfully!');
    } catch (error) {
      console.log('\n❌ Adding reviews failed:', error.message);
    }
  }
  
  await question('\nPress Enter to continue...');
}

async function backupDatabase() {
  clearScreen();
  showHeader();
  console.log('💾 Backup Database\n');
  console.log('This will create a JSON backup of all books and reviews.\n');
  
  const confirm = await question('Create backup? (y/n): ');
  
  if (confirm.toLowerCase() === 'y') {
    console.log('\nCreating backup...\n');
    try {
      await runCommand('backup-db');
      console.log('\n✅ Backup created successfully!');
    } catch (error) {
      console.log('\n❌ Backup failed:', error.message);
    }
  }
  
  await question('\nPress Enter to continue...');
}

async function restoreDatabase() {
  clearScreen();
  showHeader();
  console.log('♻️  Restore from Backup\n');
  
  try {
    await runCommand('restore-db');
  } catch (error) {
    console.log('No backups available or selection cancelled.');
  }
  
  await question('\nPress Enter to continue...');
}

async function viewStatistics() {
  clearScreen();
  showHeader();
  console.log('📊 Database Statistics\n');
  
  try {
    // Get counts
    const { count: bookCount } = await supabase
      .from('books')
      .select('*', { count: 'exact', head: true });
    
    const { count: reviewCount } = await supabase
      .from('reviews')
      .select('*', { count: 'exact', head: true });
    
    console.log('┌────────────────────────────────────────────────┐');
    console.log('│                 QUICK STATS                    │');
    console.log('├────────────────────────────────────────────────┤');
    console.log(`│  📚 Total Books:      ${String(bookCount).padEnd(24)}│`);
    console.log(`│  💬 Total Reviews:    ${String(reviewCount).padEnd(24)}│`);
    console.log(`│  📖 Avg Reviews/Book: ${String((reviewCount / bookCount).toFixed(1)).padEnd(24)}│`);
    console.log('└────────────────────────────────────────────────┘');
    console.log();
    
    // Get top books
    const { data: topBooks } = await supabase
      .from('books')
      .select('title, author, average_rating, total_reviews')
      .order('average_rating', { ascending: false })
      .limit(5);
    
    if (topBooks && topBooks.length > 0) {
      console.log('🏆 Top Rated Books:');
      topBooks.forEach((book, index) => {
        console.log(`   ${index + 1}. "${book.title}" by ${book.author}`);
        console.log(`      ⭐ ${book.average_rating} (${book.total_reviews} reviews)`);
      });
      console.log();
    }
    
    // Get category distribution
    const { data: books } = await supabase
      .from('books')
      .select('category');
    
    if (books && books.length > 0) {
      const categories = books.reduce((acc, book) => {
        acc[book.category] = (acc[book.category] || 0) + 1;
        return acc;
      }, {});
      
      console.log('📂 Books by Category:');
      Object.entries(categories)
        .sort((a, b) => b[1] - a[1])
        .forEach(([category, count]) => {
          const bar = '█'.repeat(Math.ceil(count / 2));
          console.log(`   ${category.padEnd(20)} ${bar} ${count}`);
        });
      console.log();
    }
    
  } catch (error) {
    console.log('❌ Error fetching statistics:', error.message);
  }
  
  await question('Press Enter to continue...');
}

async function searchBooks() {
  clearScreen();
  showHeader();
  console.log('🔍 Search Books\n');
  
  const query = await question('Enter search term (title, author, category): ');
  
  if (query.trim()) {
    console.log('\nSearching...\n');
    
    try {
      const { data: results, error } = await supabase
        .from('books')
        .select('title, author, category, average_rating, total_reviews')
        .or(`title.ilike.%${query}%,author.ilike.%${query}%,category.ilike.%${query}%`)
        .order('average_rating', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      
      if (results && results.length > 0) {
        console.log(`Found ${results.length} results:\n`);
        results.forEach((book, index) => {
          console.log(`${index + 1}. "${book.title}" by ${book.author}`);
          console.log(`   Category: ${book.category} | ⭐ ${book.average_rating} (${book.total_reviews} reviews)`);
          console.log();
        });
      } else {
        console.log('No books found matching your search.');
      }
      
    } catch (error) {
      console.log('❌ Search failed:', error.message);
    }
  }
  
  await question('\nPress Enter to continue...');
}

function showGuides() {
  clearScreen();
  showHeader();
  console.log('📖 Quick Reference Guides\n');
  console.log('Available documentation files:\n');
  console.log('1. DATABASE_README.md     - Main guide & quick start');
  console.log('2. DATABASE_GUIDE.md      - Complete documentation (600+ lines)');
  console.log('3. SQL_OPERATIONS.md      - SQL query reference (600+ lines)');
  console.log('4. DATABASE_STATUS.md     - Current status & overview');
  console.log('5. FIX_DATABASE_NOW.sql   - Permission fix script');
  console.log();
  console.log('💡 Open these files in your code editor to view detailed guides!');
  console.log();
}

async function showGuidesMenu() {
  showGuides();
  await question('Press Enter to continue...');
}

async function mainLoop() {
  let running = true;
  
  while (running) {
    clearScreen();
    showHeader();
    showMainMenu();
    
    const choice = await question('Enter your choice (0-9): ');
    
    switch (choice.trim()) {
      case '1':
        await checkHealth();
        break;
      case '2':
        await fixPermissions();
        break;
      case '3':
        await importBooks();
        break;
      case '4':
        await addReviews();
        break;
      case '5':
        await backupDatabase();
        break;
      case '6':
        await restoreDatabase();
        break;
      case '7':
        await viewStatistics();
        break;
      case '8':
        await searchBooks();
        break;
      case '9':
        await showGuidesMenu();
        break;
      case '0':
        running = false;
        clearScreen();
        showHeader();
        console.log('Thank you for using KitapKeşif Database Manager!');
        console.log('Your SQL Database Specialist is always ready to help! 🚀\n');
        break;
      default:
        console.log('\n❌ Invalid choice. Please enter a number from 0-9.');
        await question('Press Enter to continue...');
    }
  }
  
  rl.close();
}

// Start the interactive manager
console.log('Starting Database Manager...\n');
mainLoop().catch(error => {
  console.error('Fatal error:', error);
  rl.close();
  process.exit(1);
});

/**
 * Book Import Script
 * 
 * This script fetches books from Open Library API and imports them into Supabase
 * 
 * Usage:
 *   npm run import-books
 * 
 * Environment Variables Required:
 *   VITE_SUPABASE_URL - Your Supabase project URL
 *   VITE_SUPABASE_ANON_KEY - Your Supabase anonymous key
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Book search queries - diverse topics to get a variety of books
const SEARCH_QUERIES = [
  // Fiction
  'fantasy fiction',
  'mystery thriller',
  'science fiction',
  'romance novel',
  'historical fiction',
  
  // Non-Fiction
  'biography',
  'history',
  'philosophy',
  'psychology',
  'business',
  
  // Science & Tech
  'computer science',
  'physics',
  'biology',
  'technology',
  
  // Arts & Culture
  'art history',
  'music',
  'photography',
  'poetry',
  
  // Self-improvement
  'self help',
  'motivation',
  'productivity',
  
  // Popular topics
  'adventure',
  'drama',
  'classic literature',
];

/**
 * Fetch books from Open Library API
 */
async function fetchBooksFromOpenLibrary(query, limit = 20) {
  try {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://openlibrary.org/search.json?q=${encodedQuery}&limit=${limit}`;

    console.log(`📚 Fetching books for: "${query}"...`);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.docs || [];
  } catch (error) {
    console.error(`❌ Error fetching books for "${query}":`, error.message);
    return [];
  }
}

/**
 * Generate description from book metadata
 */
function generateDescription(book) {
  const parts = [];

  if (book.first_publish_year) {
    parts.push(`First published in ${book.first_publish_year}.`);
  }

  if (book.publisher && book.publisher.length > 0) {
    parts.push(`Published by ${book.publisher[0]}.`);
  }

  if (book.number_of_pages_median) {
    parts.push(`Approximately ${book.number_of_pages_median} pages.`);
  }

  if (book.subject && book.subject.length > 0) {
    const subjects = book.subject.slice(0, 3).join(', ');
    parts.push(`Topics include: ${subjects}.`);
  }

  return parts.length > 0
    ? parts.join(' ')
    : 'A fascinating book waiting to be discovered.';
}

/**
 * Determine category from subjects
 */
function determineCategory(book) {
  if (!book.subject || book.subject.length === 0) {
    return 'General';
  }

  const subjects = book.subject.map(s => s.toLowerCase());

  const categoryMap = {
    'Fiction': ['fiction', 'novel', 'literature', 'fantasy', 'science fiction'],
    'Non-Fiction': ['nonfiction', 'biography', 'history', 'philosophy'],
    'Mystery': ['mystery', 'detective', 'crime', 'thriller'],
    'Romance': ['romance', 'love story'],
    'Science Fiction': ['science fiction', 'sci-fi', 'space'],
    'Fantasy': ['fantasy', 'magic', 'adventure'],
    'History': ['history', 'historical'],
    'Biography': ['biography', 'autobiography', 'memoir'],
    'Science': ['science', 'physics', 'chemistry', 'biology'],
    'Technology': ['technology', 'computer', 'programming'],
    'Business': ['business', 'economics', 'finance'],
    'Self-Help': ['self-help', 'psychology', 'motivation'],
    'Children': ['children', 'juvenile', 'kids'],
    'Poetry': ['poetry', 'poems'],
    'Drama': ['drama', 'play', 'theater'],
  };

  for (const [category, keywords] of Object.entries(categoryMap)) {
    if (subjects.some(subject => keywords.some(keyword => subject.includes(keyword)))) {
      return category;
    }
  }

  return book.subject[0] || 'General';
}

/**
 * Transform Open Library book to our format
 */
function transformBook(openLibBook) {
  if (!openLibBook.title) {
    return null;
  }

  const isbn = openLibBook.isbn?.[0];
  const coverId = openLibBook.cover_i;

  let coverImage = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800';
  if (isbn) {
    coverImage = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
  } else if (coverId) {
    coverImage = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
  }

  return {
    title: openLibBook.title,
    author: openLibBook.author_name?.[0] || 'Unknown Author',
    description: generateDescription(openLibBook),
    cover_image: coverImage,
    back_cover_image: isbn ? `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg` : null,
    category: determineCategory(openLibBook),
    average_rating: 0,
    total_reviews: 0,
  };
}

/**
 * Import books into Supabase
 */
async function importBooks() {
  console.log('🚀 Starting book import from Open Library...\n');

  const allBooks = [];
  const seenTitles = new Set();

  // Fetch books for each query
  for (let i = 0; i < SEARCH_QUERIES.length; i++) {
    const query = SEARCH_QUERIES[i];
    const openLibBooks = await fetchBooksFromOpenLibrary(query, 15);

    let addedCount = 0;
    for (const openLibBook of openLibBooks) {
      const book = transformBook(openLibBook);

      if (book && book.title && !seenTitles.has(book.title)) {
        seenTitles.add(book.title);
        allBooks.push(book);
        addedCount++;
      }
    }

    console.log(`   ✓ Added ${addedCount} unique books from "${query}"`);

    // Rate limiting - wait 1 second between requests
    if (i < SEARCH_QUERIES.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  console.log(`\n📊 Total unique books collected: ${allBooks.length}`);

  if (allBooks.length === 0) {
    console.log('⚠️  No books to import');
    return;
  }

  // Insert books into Supabase
  console.log('\n💾 Inserting books into database...');

  // Insert in batches of 50
  const batchSize = 50;
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < allBooks.length; i += batchSize) {
    const batch = allBooks.slice(i, i + batchSize);

    const { data, error } = await supabase
      .from('books')
      .insert(batch)
      .select();

    if (error) {
      console.error(`❌ Error inserting batch ${i / batchSize + 1}:`, error.message);
      errorCount += batch.length;
    } else {
      successCount += data.length;
      console.log(`   ✓ Batch ${i / batchSize + 1}: Inserted ${data.length} books`);
    }
  }

  console.log('\n✅ Import completed!');
  console.log(`   Success: ${successCount} books`);
  if (errorCount > 0) {
    console.log(`   Errors: ${errorCount} books`);
  }

  // Show category breakdown
  const categories = {};
  allBooks.forEach(book => {
    categories[book.category] = (categories[book.category] || 0) + 1;
  });

  console.log('\n📚 Books by category:');
  Object.entries(categories)
    .sort((a, b) => b[1] - a[1])
    .forEach(([category, count]) => {
      console.log(`   ${category}: ${count}`);
    });
}

// Run the import
importBooks()
  .then(() => {
    console.log('\n🎉 All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });

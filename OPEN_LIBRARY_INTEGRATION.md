# Open Library Integration Guide

This guide explains how to import books from Open Library API into your KitapKeşif database.

## 🎯 Overview

The Open Library integration allows you to:
- 📚 Import hundreds of books automatically
- 🔍 Search books by keywords, titles, or topics
- 🖼️ Automatically fetch book cover images
- 📊 Organize books by categories
- 💾 Bulk insert into Supabase database

## 🗂️ New Files Added

### 1. `src/services/openLibraryService.ts`
TypeScript service for Open Library API integration with:
- Search functionality
- Cover image URL generation
- Book data transformation
- Category mapping

### 2. `scripts/import-books.js`
Node.js script to import books from Open Library:
- Fetches books from 25+ diverse topics
- Removes duplicates
- Batch inserts into Supabase
- Progress logging

### 3. `supabase/migrations/20251016000000_import_open_library_books.sql`
SQL migration with sample books for manual insertion.

## 🚀 Quick Start

### Method 1: Using the Import Script (Recommended)

1. **Ensure your `.env` file has Supabase credentials:**
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

2. **Run the import script:**
```bash
npm run import-books
```

This will:
- Fetch ~300+ books from various categories
- Remove duplicates
- Insert them into your database
- Show progress and statistics

### Method 2: Using SQL Migration

1. **Open Supabase SQL Editor**
2. **Copy and paste** the content from:
   `supabase/migrations/20251016000000_import_open_library_books.sql`
3. **Run the SQL** to insert sample books

### Method 3: Using the Service in Code

```typescript
import { OpenLibraryService } from './services';

// Search for books
const { data, error } = await OpenLibraryService.searchBooks('fantasy', 20);

// Transform for database
const books = data
  .map(book => OpenLibraryService.transformToBook(book))
  .filter(book => book !== null);

// Insert to Supabase
const { error: insertError } = await supabase
  .from('books')
  .insert(books);
```

## 📚 Import Categories

The import script fetches books from these topics:

**Fiction:**
- Fantasy, Mystery/Thriller, Science Fiction, Romance, Historical Fiction

**Non-Fiction:**
- Biography, History, Philosophy, Psychology, Business

**Science & Tech:**
- Computer Science, Physics, Biology, Technology

**Arts & Culture:**
- Art History, Music, Photography, Poetry

**Self-Improvement:**
- Self-Help, Motivation, Productivity

**Others:**
- Adventure, Drama, Classic Literature

## 🎨 Book Data Structure

Each imported book includes:

```typescript
{
  title: string;           // Book title
  author: string;          // Primary author
  description: string;     // Auto-generated from metadata
  cover_image: string;     // Large cover (L size)
  back_cover_image: string | null; // Medium cover (M size)
  category: string;        // Auto-detected category
  average_rating: 0;       // Default rating
  total_reviews: 0;        // Default review count
}
```

## 🔧 Customization

### Change Number of Books Per Topic

Edit `scripts/import-books.js`:

```javascript
const openLibBooks = await fetchBooksFromOpenLibrary(query, 15); // Change 15 to desired number
```

### Add More Topics

Edit `SEARCH_QUERIES` array in `scripts/import-books.js`:

```javascript
const SEARCH_QUERIES = [
  // ... existing queries
  'your custom topic',
  'another topic',
];
```

### Modify Category Mapping

Edit `determineCategory()` function in either:
- `src/services/openLibraryService.ts` (TypeScript)
- `scripts/import-books.js` (JavaScript)

## 📊 API Endpoints Used

### Search Books
```
GET https://openlibrary.org/search.json?q={query}&limit={limit}
```

**Response:**
```json
{
  "numFound": 1234,
  "docs": [
    {
      "title": "Book Title",
      "author_name": ["Author Name"],
      "first_publish_year": 2020,
      "isbn": ["9781234567890"],
      "subject": ["topic1", "topic2"],
      "cover_i": 12345
    }
  ]
}
```

### Book Covers

**By ISBN:**
```
https://covers.openlibrary.org/b/isbn/{ISBN}-{size}.jpg
```

**By Cover ID:**
```
https://covers.openlibrary.org/b/id/{cover_id}-{size}.jpg
```

**Sizes:** S (small), M (medium), L (large)

## ⚠️ Important Notes

1. **Rate Limiting:** The script includes 1-second delays between requests to respect API limits
2. **Duplicates:** Books are deduplicated by title during import
3. **Cover Images:** Some books may not have cover images (fallback image used)
4. **Batch Size:** Books are inserted in batches of 50 for optimal performance
5. **Environment Variables:** Required for script execution

## 🐛 Troubleshooting

### "Missing Supabase credentials" error
- Ensure `.env` file exists in project root
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set

### No books imported
- Check your internet connection
- Verify Supabase is accessible
- Check console for API errors

### Duplicate key errors
- Some books may already exist in database
- The script will skip duplicates and continue

### Cover images not loading
- Open Library may not have covers for all books
- Fallback images are used automatically

## 📈 Expected Results

Running `npm run import-books` typically imports:
- **~300+ unique books**
- **15+ different categories**
- **From 25+ diverse topics**

Time: ~2-3 minutes (due to rate limiting)

## 🎯 Next Steps

After importing books:

1. **Add Reviews:** Run `npm run add-reviews` to populate reviews
2. **Verify Data:** Check your Supabase dashboard
3. **Test Frontend:** Run `npm run dev` to see books in UI
4. **Customize:** Modify queries/categories as needed

## 📝 API Reference

### OpenLibraryService Methods

```typescript
// Search books
searchBooks(query: string, limit?: number): Promise<{data, error}>

// Get cover URL from ISBN
getCoverImageUrl(isbn: string, size?: 'S'|'M'|'L'): string

// Get cover URL from ID
getCoverImageUrlById(coverId: number, size?: 'S'|'M'|'L'): string

// Transform API response to Book type
transformToBook(openLibBook: OpenLibraryBook): Partial<Book> | null

// Fetch books ready for import
fetchBooksForImport(queries: string[], booksPerQuery?: number): Promise<{data, error}>
```

## 🌟 Tips

- Import books during off-peak hours for better API performance
- Start with fewer topics to test the integration
- Monitor console output for errors
- Check Supabase logs if issues persist

---

**Happy Reading! 📚✨**

# 📚 Book Import Guide

This guide explains how to import books from Open Library into your Supabase database for the KitapKesif project.

## 📋 Prerequisites

1. Supabase database set up and configured
2. Database permissions fixed (RLS policies applied)
3. `.env` file with correct Supabase credentials
4. Node.js installed

## 🚀 How the Import Process Works

The import script fetches books from the Open Library API and imports them into your Supabase database. Here's how it works:

1. **Search Queries**: The script uses diverse search queries to find books across multiple categories
2. **Data Fetching**: Books are fetched from Open Library API
3. **Data Transformation**: Book data is transformed to match the database schema
4. **Duplicate Prevention**: Duplicate books are filtered out
5. **Database Insertion**: Books are inserted into the Supabase database in batches

## 🛠️ Running the Import

### Method 1: Using npm script (Recommended)

```bash
npm run import-books
```

### Method 2: Direct node execution

```bash
node scripts/import-books.js
```

## 📊 What Happens During Import

1. The script searches for books using predefined queries:
   - Fantasy fiction
   - Mystery thriller
   - Science fiction
   - Romance novel
   - Historical fiction
   - Biography
   - History
   - Philosophy
   - Psychology
   - Business
   - Computer science
   - Physics
   - Biology
   - Technology
   - Art history
   - Music
   - Photography
   - Poetry
   - Self help
   - Motivation
   - Productivity
   - Adventure
   - Drama
   - Classic literature

2. For each query, it fetches up to 15 books
3. Books are transformed to match the database schema:
   - Title, author, description
   - Cover images (front and back)
   - Category classification
   - Initial rating (0) and review count (0)

4. Duplicates are filtered out based on title
5. Books are inserted into the database in batches of 50

## 📈 Expected Results

After a successful import, you should have:
- 150+ unique books
- Books distributed across 25+ categories
- Cover images for most books
- Properly formatted descriptions
- Initial ratings set to 0

## 🧪 Verifying the Import

To verify that books were imported successfully:

1. **Check the console output** during import for success messages
2. **View the books table** in Supabase Table Editor
3. **Run a count query** in Supabase SQL Editor:
   ```sql
   SELECT COUNT(*) as total_books FROM books;
   ```

4. **Check category distribution**:
   ```sql
   SELECT category, COUNT(*) as count 
   FROM books 
   GROUP BY category 
   ORDER BY count DESC;
   ```

## ⚙️ Customizing the Import

### Modifying Search Queries

You can modify the search queries by editing the `SEARCH_QUERIES` array in `scripts/import-books.js`:

```javascript
const SEARCH_QUERIES = [
  'your custom query 1',
  'your custom query 2',
  // ... more queries
];
```

### Adjusting Batch Size

You can adjust the batch size for database insertion by modifying the `batchSize` variable:

```javascript
const batchSize = 50; // Change this number
```

### Changing Number of Books per Query

You can change how many books are fetched per query by modifying the limit parameter in the `fetchBooksFromOpenLibrary` function call.

## 🛠️ Troubleshooting

### "Permission denied" Errors

If you get permission errors:
1. Make sure you've run `npm run fix-db`
2. Verify that INSERT policies are applied to the books table

### "No books imported" or "0 books"

If no books are imported:
1. Check your internet connection
2. Verify that the Open Library API is accessible
3. Check that your Supabase credentials are correct
4. Make sure the books table exists

### "Rate limit exceeded" Errors

If you get rate limit errors:
1. The script already includes a 1-second delay between requests
2. Try running the import during off-peak hours
3. Reduce the number of search queries

### "Invalid credentials" Errors

If you get credential errors:
1. Check that your `.env` file has the correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
2. Make sure there are no extra spaces or quotes
3. Restart your development server after updating credentials

## 🔄 Re-running the Import

You can safely re-run the import multiple times. The script will:
1. Fetch new books from Open Library
2. Filter out duplicates based on title
3. Only insert new unique books

However, if you want to start fresh:
1. Clear the existing books in your database:
   ```sql
   DELETE FROM books;
   ```
2. Run the import script again

## 📚 Sample Imported Books

The import process typically includes books like:
- Classic literature (Pride and Prejudice, 1984, etc.)
- Fantasy (Harry Potter, Lord of the Rings, etc.)
- Science Fiction (Dune, Foundation series, etc.)
- Mystery/Thriller (Sherlock Holmes, etc.)
- Biography (Autobiographies of famous figures)
- Self-help (Popular productivity and motivation books)

## 🎯 Next Steps

After importing books:
1. Add sample reviews: `npm run add-reviews`
2. Verify database health: `npm run check-db`
3. Create a backup: `npm run backup-db`
4. Test the application in the browser

## 📖 Additional Resources

- [DATABASE_README.md](./DATABASE_README.md) - Main database documentation
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) - Complete database guide
- [DATABASE_PERMISSIONS_FIX_GUIDE.md](./DATABASE_PERMISSIONS_FIX_GUIDE.md) - Fixing database permissions
- [SUPABASE_SETUP_GUIDE.md](./SUPABASE_SETUP_GUIDE.md) - Setting up Supabase

Need help? Check the documentation or ask for assistance!
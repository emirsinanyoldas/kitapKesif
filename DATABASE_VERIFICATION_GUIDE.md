# 🏥 Database Verification Guide

This guide explains how to verify the functionality and data integrity of your Supabase database for the KitapKesif project.

## 📋 Prerequisites

1. Supabase database set up and configured
2. Books imported into the database
3. Reviews added to books
4. Database permissions fixed (RLS policies applied)
5. `.env` file with correct Supabase credentials

## 🚀 How the Verification Process Works

The verification script performs comprehensive checks on your database to ensure everything is working correctly:

1. **Connection Check**: Verifies database connectivity
2. **Table Count Check**: Counts records in books and reviews tables
3. **Sample Data Check**: Retrieves sample books to verify data
4. **Category Distribution Check**: Analyzes book categories
5. **Data Integrity Check**: Validates data quality
6. **INSERT Permission Test**: Tests database write permissions

## 🛠️ Running the Verification

### Method 1: Using npm script (Recommended)

```bash
npm run check-db
```

### Method 2: Direct node execution

```bash
node scripts/check-database.js
```

## 📊 What Happens During Verification

### 1️⃣ Connection Check
- Tests database connectivity
- Verifies Supabase credentials
- Confirms API access

### 2️⃣ Table Count Check
- Counts books in the database
- Counts reviews in the database
- Reports totals for both tables

### 3️⃣ Sample Data Check
- Retrieves 5 sample books
- Displays title, author, category, rating, and review count
- Verifies data structure

### 4️⃣ Category Distribution Check
- Analyzes book categories
- Shows distribution of books across categories
- Identifies most popular categories

### 5️⃣ Data Integrity Check
- Validates required fields (title, author, cover_image, category)
- Checks rating values (0-5 range)
- Validates review counts (non-negative)

### 6️⃣ INSERT Permission Test
- Tests INSERT operations on books table
- Creates a temporary test book
- Cleans up test data after verification

## ✅ Expected Results

After a successful verification, you should see:

```
✅ All checks passed! Database is healthy.
```

The detailed output should show:
- ✅ Connection successful
- 📚 Books: [count] records
- 💬 Reviews: [count] records
- ✅ Sample books retrieved
- 📊 Books by category: [distribution]
- ✅ No data integrity issues found
- ✅ INSERT permission working

## 🧪 Manual Verification Methods

You can also verify database functionality manually using Supabase tools:

### Using Supabase Table Editor
1. Go to your Supabase dashboard
2. Navigate to Table Editor
3. View the `books` and `reviews` tables
4. Check that data is present and correctly formatted

### Using Supabase SQL Editor
1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Run queries to check data:

```sql
-- Check total counts
SELECT 
  (SELECT COUNT(*) FROM books) as book_count,
  (SELECT COUNT(*) FROM reviews) as review_count;

-- Check sample books
SELECT title, author, category, average_rating, total_reviews 
FROM books 
LIMIT 5;

-- Check category distribution
SELECT category, COUNT(*) as count 
FROM books 
GROUP BY category 
ORDER BY count DESC;

-- Check books with reviews
SELECT b.title, b.average_rating, b.total_reviews
FROM books b
WHERE b.total_reviews > 0
ORDER BY b.average_rating DESC
LIMIT 10;

-- Check recent reviews
SELECT b.title, r.user_name, r.rating, r.created_at
FROM reviews r
JOIN books b ON r.book_id = b.id
ORDER BY r.created_at DESC
LIMIT 10;
```

## 🔍 Interpreting Verification Results

### ✅ All Checks Passed
Your database is healthy and ready for use.

### ⚠️ Some Checks Failed
Review the specific failures:

**No books found**
- Run: `npm run import-books`

**INSERT permission denied**
- Run: `npm run fix-db`

**Data integrity issues**
- Check for missing required fields
- Look for invalid rating values
- Verify review counts are non-negative

**Connection issues**
- Check your `.env` file credentials
- Verify your Supabase project is active
- Ensure internet connectivity

## 🛠️ Troubleshooting Common Issues

### "Connection failed" Errors
1. Verify `.env` file contains correct credentials
2. Check that `VITE_SUPABASE_URL` starts with `https://` and ends with `.supabase.co`
3. Confirm `VITE_SUPABASE_ANON_KEY` is a valid JWT token
4. Ensure your Supabase project is not paused

### "No books found"
1. Run the book import script: `npm run import-books`
2. Check that the import completed successfully
3. Verify books table exists in Supabase

### "INSERT permission denied"
1. Run the permission fix script: `npm run fix-db`
2. Verify that INSERT policies are applied to books table
3. Check that you've run the SQL fix from `FIX_DATABASE_NOW.sql`

### "Data integrity issues found"
1. Check for books with missing required fields
2. Look for invalid rating values (should be 0-5)
3. Verify review counts are non-negative

### "Sample data check failed"
1. Ensure books table contains data
2. Check that book records have required fields
3. Verify database connectivity

## 🔄 Regular Verification

It's recommended to run database verification regularly:

1. **After initial setup**: Verify everything is working
2. **After importing data**: Confirm data was imported correctly
3. **After adding reviews**: Check that reviews were added properly
4. **Weekly maintenance**: Regular health checks
5. **Before backups**: Ensure data integrity before backing up

## 📈 Monitoring Database Health

### Key Metrics to Watch
- **Book count**: Should match expected import totals
- **Review count**: Should reflect added reviews
- **Category distribution**: Should show diverse categories
- **Average ratings**: Should be within 0-5 range
- **Review counts**: Should be non-negative

### Warning Signs
- Sudden drops in book or review counts
- Books with missing required fields
- Invalid rating values
- Unexpected category distributions
- INSERT permission failures

## 🎯 Next Steps

After successful verification:
1. Create a backup: `npm run backup-db`
2. Test the complete application
3. Document the setup process

## 📖 Additional Resources

- [DATABASE_README.md](./DATABASE_README.md) - Main database documentation
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) - Complete database guide
- [DATABASE_PERMISSIONS_FIX_GUIDE.md](./DATABASE_PERMISSIONS_FIX_GUIDE.md) - Fixing database permissions
- [BOOK_IMPORT_GUIDE.md](./BOOK_IMPORT_GUIDE.md) - Importing books
- [REVIEW_ADDITION_GUIDE.md](./REVIEW_ADDITION_GUIDE.md) - Adding reviews
- [SUPABASE_SETUP_GUIDE.md](./SUPABASE_SETUP_GUIDE.md) - Setting up Supabase

Need help? Check the documentation or ask for assistance!
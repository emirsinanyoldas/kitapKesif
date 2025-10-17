# 🎯 SQL Operations Guide - Quick Reference

**Your SQL Database Specialist - Ready-to-Use Queries**

This guide contains all the SQL queries you might need for managing your book database. Simply copy and paste into Supabase SQL Editor.

---

## 📍 Quick Access

**Supabase SQL Editor:** https://supabase.com/dashboard → Your Project → SQL Editor → New Query

**Available NPM Commands:**
```bash
npm run check-db        # Check database health
npm run import-books    # Import books from Open Library
npm run add-reviews     # Add sample reviews
npm run fix-db          # Fix database permissions (if needed)
npm run sql -- "QUERY"  # Run custom SQL query
```

---

## 🚨 CRITICAL: First-Time Setup

**Before importing books, run this once:**

See file: [`FIX_DATABASE_NOW.sql`](./FIX_DATABASE_NOW.sql)

Or run: `npm run fix-db`

---

## 📊 Common Queries

### 1. View All Books

```sql
-- Get all books with ratings
SELECT 
  id,
  title,
  author,
  category,
  average_rating,
  total_reviews,
  created_at
FROM books
ORDER BY average_rating DESC, created_at DESC
LIMIT 50;
```

### 2. Count Books by Category

```sql
-- See distribution of books across categories
SELECT 
  category,
  COUNT(*) as book_count,
  ROUND(AVG(average_rating), 2) as avg_category_rating,
  SUM(total_reviews) as total_reviews
FROM books
GROUP BY category
ORDER BY book_count DESC;
```

### 3. Top Rated Books

```sql
-- Best books with at least 3 reviews
SELECT 
  title,
  author,
  category,
  average_rating,
  total_reviews,
  created_at
FROM books
WHERE total_reviews >= 3
ORDER BY average_rating DESC, total_reviews DESC
LIMIT 20;
```

### 4. Recently Added Books

```sql
-- Books added in the last 7 days
SELECT 
  title,
  author,
  category,
  average_rating,
  total_reviews,
  created_at,
  CASE 
    WHEN created_at > NOW() - INTERVAL '1 day' THEN 'Today'
    WHEN created_at > NOW() - INTERVAL '2 days' THEN 'Yesterday'
    ELSE to_char(created_at, 'Mon DD, YYYY')
  END as added_when
FROM books
WHERE created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

### 5. Books Without Reviews

```sql
-- Books that need reviews
SELECT 
  id,
  title,
  author,
  category,
  created_at
FROM books
WHERE total_reviews = 0
ORDER BY created_at DESC;
```

### 6. Search Books

```sql
-- Search by title, author, or category (case-insensitive)
SELECT 
  id,
  title,
  author,
  category,
  average_rating,
  total_reviews
FROM books
WHERE 
  title ILIKE '%tolkien%' OR
  author ILIKE '%tolkien%' OR
  description ILIKE '%tolkien%' OR
  category ILIKE '%tolkien%'
ORDER BY average_rating DESC
LIMIT 20;
```

### 7. Get Book Details with All Reviews

```sql
-- Complete book information including all reviews
SELECT 
  b.id as book_id,
  b.title,
  b.author,
  b.category,
  b.description,
  b.average_rating,
  b.total_reviews,
  r.id as review_id,
  r.user_name,
  r.rating,
  r.comment,
  r.created_at as review_date
FROM books b
LEFT JOIN reviews r ON b.id = r.book_id
WHERE b.title ILIKE '%hobbit%'  -- Change book title here
ORDER BY r.created_at DESC;
```

### 8. Recent Reviews Across All Books

```sql
-- Latest reviews with book information
SELECT 
  r.id,
  b.title as book_title,
  b.author,
  r.user_name,
  r.rating,
  r.comment,
  r.created_at,
  CASE 
    WHEN r.created_at > NOW() - INTERVAL '1 hour' THEN 'Just now'
    WHEN r.created_at > NOW() - INTERVAL '1 day' THEN 'Today'
    WHEN r.created_at > NOW() - INTERVAL '2 days' THEN 'Yesterday'
    ELSE to_char(r.created_at, 'Mon DD, YYYY')
  END as review_time
FROM reviews r
JOIN books b ON r.book_id = b.id
ORDER BY r.created_at DESC
LIMIT 30;
```

### 9. Rating Distribution

```sql
-- See how many books have each rating range
SELECT 
  CASE 
    WHEN average_rating >= 4.5 THEN '⭐⭐⭐⭐⭐ Excellent (4.5+)'
    WHEN average_rating >= 4.0 THEN '⭐⭐⭐⭐ Very Good (4.0-4.4)'
    WHEN average_rating >= 3.0 THEN '⭐⭐⭐ Good (3.0-3.9)'
    WHEN average_rating >= 2.0 THEN '⭐⭐ Fair (2.0-2.9)'
    ELSE '⭐ Needs Improvement (<2.0)'
  END as rating_category,
  COUNT(*) as book_count,
  ARRAY_AGG(title ORDER BY average_rating DESC) as sample_books
FROM books
WHERE total_reviews > 0
GROUP BY rating_category
ORDER BY MIN(average_rating) DESC;
```

### 10. Statistics Overview

```sql
-- Complete database statistics
SELECT 
  (SELECT COUNT(*) FROM books) as total_books,
  (SELECT COUNT(*) FROM reviews) as total_reviews,
  (SELECT COUNT(DISTINCT category) FROM books) as total_categories,
  (SELECT ROUND(AVG(average_rating), 2) FROM books WHERE total_reviews > 0) as overall_avg_rating,
  (SELECT COUNT(*) FROM books WHERE total_reviews = 0) as books_without_reviews,
  (SELECT COUNT(*) FROM books WHERE created_at > NOW() - INTERVAL '7 days') as books_added_this_week;
```

---

## 🔧 Maintenance Queries

### Recalculate Book Ratings

```sql
-- Update average ratings for all books based on their reviews
UPDATE books
SET 
  average_rating = COALESCE((
    SELECT ROUND(AVG(rating)::numeric, 1)
    FROM reviews
    WHERE book_id = books.id
  ), 0),
  total_reviews = (
    SELECT COUNT(*)
    FROM reviews
    WHERE book_id = books.id
  );
```

### Find Orphaned Reviews

```sql
-- Reviews with no matching book (should be empty)
SELECT r.*
FROM reviews r
LEFT JOIN books b ON r.book_id = b.id
WHERE b.id IS NULL;
```

### Check Database Size

```sql
-- See how much space your data is using
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS total_size,
  pg_size_pretty(pg_relation_size(schemaname||'.'||tablename)) AS table_size,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename) - pg_relation_size(schemaname||'.'||tablename)) AS index_size,
  pg_stat_get_live_tuples(c.oid) AS row_count
FROM pg_tables t
JOIN pg_class c ON t.tablename = c.relname
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### Verify Indexes

```sql
-- Check all indexes are in place
SELECT 
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;
```

### Check RLS Policies

```sql
-- Verify Row Level Security policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  cmd as operation,
  qual as using_expression,
  with_check as check_expression
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, cmd, policyname;
```

---

## ➕ Data Modification

### Add a Single Book

```sql
-- Insert a new book manually
INSERT INTO books (
  title,
  author,
  description,
  cover_image,
  back_cover_image,
  category,
  average_rating,
  total_reviews
) VALUES (
  'The Hobbit',
  'J.R.R. Tolkien',
  'A fantasy adventure following Bilbo Baggins on an unexpected journey.',
  'https://covers.openlibrary.org/b/isbn/9780261103344-L.jpg',
  'https://covers.openlibrary.org/b/isbn/9780261103344-M.jpg',
  'Fantasy',
  0,
  0
)
RETURNING id, title, author;
```

### Add a Review

```sql
-- Add a review to a book (replace book_id with actual UUID)
INSERT INTO reviews (
  book_id,
  user_name,
  user_avatar,
  rating,
  comment
) VALUES (
  'REPLACE_WITH_BOOK_ID',  -- Get from books table
  'John Doe',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoe',
  5,
  'This is an excellent book! Highly recommended.'
)
RETURNING *;

-- Then update the book's rating
UPDATE books
SET 
  average_rating = (SELECT AVG(rating) FROM reviews WHERE book_id = 'REPLACE_WITH_BOOK_ID'),
  total_reviews = (SELECT COUNT(*) FROM reviews WHERE book_id = 'REPLACE_WITH_BOOK_ID')
WHERE id = 'REPLACE_WITH_BOOK_ID';
```

### Update Book Information

```sql
-- Update book details
UPDATE books
SET 
  description = 'New description here',
  category = 'New Category'
WHERE title = 'Book Title Here'
RETURNING *;
```

### Delete Books Without Reviews (Older than 30 days)

```sql
-- Clean up old books with no reviews
DELETE FROM books
WHERE total_reviews = 0
  AND created_at < NOW() - INTERVAL '30 days'
RETURNING title, author, created_at;
```

---

## 🔍 Advanced Analytics

### Books Performance Report

```sql
-- Comprehensive performance metrics per category
SELECT 
  category,
  COUNT(*) as total_books,
  ROUND(AVG(average_rating), 2) as avg_rating,
  SUM(total_reviews) as total_reviews,
  ROUND(AVG(total_reviews), 1) as avg_reviews_per_book,
  MAX(average_rating) as highest_rating,
  MIN(average_rating) as lowest_rating,
  STRING_AGG(
    CASE WHEN average_rating >= 4.5 THEN title ELSE NULL END, 
    ', ' 
    ORDER BY average_rating DESC
  ) as top_rated_books
FROM books
GROUP BY category
ORDER BY avg_rating DESC, total_books DESC;
```

### Review Activity Timeline

```sql
-- Reviews per day for the last 30 days
SELECT 
  DATE(created_at) as review_date,
  COUNT(*) as reviews_count,
  ROUND(AVG(rating), 2) as avg_rating,
  STRING_AGG(DISTINCT user_name, ', ') as reviewers
FROM reviews
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY review_date DESC;
```

### Most Active Reviewers

```sql
-- Top reviewers by number of reviews
SELECT 
  user_name,
  COUNT(*) as total_reviews,
  ROUND(AVG(rating), 2) as avg_rating_given,
  MIN(created_at) as first_review,
  MAX(created_at) as latest_review
FROM reviews
GROUP BY user_name
ORDER BY total_reviews DESC, avg_rating_given DESC
LIMIT 20;
```

### Books Needing Attention

```sql
-- Books with low ratings or few reviews
SELECT 
  title,
  author,
  category,
  average_rating,
  total_reviews,
  CASE 
    WHEN total_reviews = 0 THEN '🆕 No reviews yet'
    WHEN total_reviews < 3 THEN '📝 Needs more reviews'
    WHEN average_rating < 3.0 THEN '⚠️ Low rating'
    ELSE '✅ Good'
  END as status,
  created_at
FROM books
WHERE total_reviews < 3 OR average_rating < 3.0
ORDER BY total_reviews ASC, average_rating ASC;
```

---

## 🎯 Performance Optimization

### Add Missing Indexes (if needed)

```sql
-- Full-text search indexes
CREATE INDEX IF NOT EXISTS idx_books_title_search 
ON books USING gin(to_tsvector('english', title));

CREATE INDEX IF NOT EXISTS idx_books_author_search 
ON books USING gin(to_tsvector('english', author));

-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_books_category_rating 
ON books(category, average_rating DESC);

CREATE INDEX IF NOT EXISTS idx_books_created_at 
ON books(created_at DESC);

-- Partial index for books with reviews
CREATE INDEX IF NOT EXISTS idx_books_with_reviews 
ON books(average_rating DESC) 
WHERE total_reviews > 0;
```

### Analyze Table Statistics

```sql
-- Update table statistics for query optimizer
ANALYZE books;
ANALYZE reviews;

-- Check last analyze time
SELECT 
  schemaname,
  relname,
  last_analyze,
  last_autoanalyze,
  n_live_tup,
  n_dead_tup
FROM pg_stat_user_tables
WHERE schemaname = 'public';
```

---

## 🔐 Security Checks

### Verify All RLS Policies

```sql
-- Complete RLS policy check
SELECT 
  tablename,
  'SELECT' as operation,
  EXISTS(
    SELECT 1 FROM pg_policies 
    WHERE tablename = t.tablename AND cmd = 'SELECT'
  ) as has_policy
FROM (VALUES ('books'), ('reviews')) AS t(tablename)
UNION ALL
SELECT 
  tablename,
  'INSERT' as operation,
  EXISTS(
    SELECT 1 FROM pg_policies 
    WHERE tablename = t.tablename AND cmd = 'INSERT'
  ) as has_policy
FROM (VALUES ('books'), ('reviews')) AS t(tablename)
UNION ALL
SELECT 
  tablename,
  'UPDATE' as operation,
  EXISTS(
    SELECT 1 FROM pg_policies 
    WHERE tablename = t.tablename AND cmd = 'UPDATE'
  ) as has_policy
FROM (VALUES ('books'), ('reviews')) AS t(tablename)
ORDER BY tablename, operation;
```

### Check Foreign Key Constraints

```sql
-- Verify referential integrity constraints
SELECT
  tc.table_name, 
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name,
  rc.delete_rule,
  rc.update_rule
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
JOIN information_schema.referential_constraints AS rc
  ON tc.constraint_name = rc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_schema = 'public';
```

---

## 📋 Quick Troubleshooting

### Problem: Can't insert books
**Solution:** Run [`FIX_DATABASE_NOW.sql`](./FIX_DATABASE_NOW.sql) or `npm run fix-db`

### Problem: Books have wrong rating
**Solution:** Run the "Recalculate Book Ratings" query above

### Problem: Slow queries
**Solution:** Run the "Add Missing Indexes" query above

### Problem: Need to check database health
**Solution:** Run `npm run check-db`

### Problem: Want to see all data
**Solution:** Run "Statistics Overview" query above

---

## 💡 Tips

1. **Always backup before DELETE queries** - Supabase has automatic backups, but be careful
2. **Use RETURNING clause** - See what was inserted/updated/deleted
3. **Test with LIMIT first** - For UPDATE/DELETE, test with WHERE clause on small subset
4. **Use transactions for multiple operations** - Wrap in BEGIN/COMMIT if needed
5. **Check execution plans** - Use EXPLAIN ANALYZE for slow queries

---

## ✅ Summary

**You now have:**
- ✅ All common SQL operations ready to use
- ✅ Maintenance and troubleshooting queries
- ✅ Performance optimization scripts
- ✅ Security verification queries
- ✅ Analytics and reporting queries

**No SQL knowledge required** - Just copy, paste, and run! 🚀

For any SQL task not covered here, let me know and I'll create the query for you!

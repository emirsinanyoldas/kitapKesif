# 📊 Complete Database Guide - KitapKeşif Project

**Your SQL Database Specialist**  
**Date:** October 17, 2025

---

## 🎯 Database Overview

Your KitapKeşif project uses **Supabase (PostgreSQL)** as the database backend. I've analyzed your current setup and will guide you through everything SQL-related.

### **Current Database Status:**

✅ **Connected:** Supabase PostgreSQL  
✅ **Tables:** 2 tables (books, reviews)  
✅ **Security:** Row Level Security (RLS) enabled  
✅ **Performance:** Basic indexes implemented  
⚠️ **Issue:** Missing INSERT/UPDATE policies (needs fixing)

---

## 📋 Table of Contents

1. [Current Database Schema](#current-database-schema)
2. [Required SQL Fixes](#required-sql-fixes)
3. [How to Execute SQL](#how-to-execute-sql)
4. [Database Management](#database-management)
5. [Performance Optimization](#performance-optimization)
6. [Security Best Practices](#security-best-practices)
7. [Common SQL Operations](#common-sql-operations)

---

## 🗄️ Current Database Schema

### **Table 1: books**

Stores all book information including metadata, covers, and ratings.

```sql
CREATE TABLE books (
  -- Primary Key
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Book Information
  title           text NOT NULL,
  author          text NOT NULL,
  description     text NOT NULL,
  
  -- Images
  cover_image     text NOT NULL,
  back_cover_image text,
  
  -- Classification
  category        text NOT NULL,
  
  -- Ratings & Reviews
  average_rating  numeric DEFAULT 0,
  total_reviews   integer DEFAULT 0,
  
  -- Metadata
  created_at      timestamptz DEFAULT now()
);
```

**Fields Explained:**
- `id`: Unique identifier (auto-generated UUID)
- `title`: Book title
- `author`: Primary author name
- `description`: Book description/summary
- `cover_image`: Front cover URL
- `back_cover_image`: Back cover URL (optional)
- `category`: Genre/category (Fiction, Fantasy, etc.)
- `average_rating`: Calculated average from reviews
- `total_reviews`: Count of reviews
- `created_at`: When book was added

---

### **Table 2: reviews**

Stores user reviews and ratings for books.

```sql
CREATE TABLE reviews (
  -- Primary Key
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Foreign Key (relationship to books)
  book_id       uuid NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  
  -- User Information
  user_name     text NOT NULL,
  user_avatar   text NOT NULL,
  
  -- Review Content
  rating        integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment       text NOT NULL,
  
  -- Metadata
  created_at    timestamptz DEFAULT now()
);
```

**Fields Explained:**
- `id`: Unique identifier (auto-generated UUID)
- `book_id`: Links to books table (foreign key)
- `user_name`: Reviewer's name
- `user_avatar`: Reviewer's avatar URL
- `rating`: 1-5 stars (validated by CHECK constraint)
- `comment`: Review text
- `created_at`: When review was posted

---

### **Table Relationships**

```
books (1) ←──── (Many) reviews
  └── One book can have many reviews
  └── If book deleted, all its reviews deleted (CASCADE)
```

---

## 🔧 Required SQL Fixes

### **CRITICAL: Fix Row Level Security Policies**

Your database currently **blocks INSERT and UPDATE operations**. Here's the fix:

#### **Step 1: Open Supabase SQL Editor**

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Click **"SQL Editor"** in sidebar
4. Click **"New query"**

#### **Step 2: Run This SQL**

```sql
-- ============================================
-- FIX DATABASE PERMISSIONS
-- Run this in Supabase SQL Editor
-- ============================================

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

-- Verify policies are active
SELECT 
  schemaname,
  tablename,
  policyname,
  cmd as operation
FROM pg_policies
WHERE tablename IN ('books', 'reviews')
ORDER BY tablename, policyname;
```

#### **Expected Result:**

You should see output like:
```
schemaname | tablename | policyname                  | operation
-----------+-----------+-----------------------------+-----------
public     | books     | Anyone can insert books     | INSERT
public     | books     | Anyone can update books     | UPDATE
public     | books     | Anyone can view books       | SELECT
public     | reviews   | Anyone can insert reviews   | INSERT
public     | reviews   | Anyone can update reviews   | UPDATE
public     | reviews   | Anyone can view reviews     | SELECT
```

---

## 📝 How to Execute SQL

### **Method 1: Supabase SQL Editor (Recommended)**

**Best for:** One-time queries, schema changes, data fixes

1. **Login to Supabase:** https://supabase.com/dashboard
2. **Select Project:** Choose your KitapKeşif project
3. **Open SQL Editor:** Click "SQL Editor" in left sidebar
4. **New Query:** Click "New query" button
5. **Paste SQL:** Copy any SQL code I provide
6. **Run:** Click "Run" or press `Ctrl+Enter`
7. **Check Results:** View output below

---

### **Method 2: Migration Files**

**Best for:** Version-controlled schema changes

All migration files are in: `supabase/migrations/`

**Existing Migrations:**
```
20251011080112_create_books_and_reviews_schema.sql
20251015000000_add_diverse_realistic_reviews.sql
20251016000000_import_open_library_books.sql
20251017000000_allow_book_inserts.sql
```

**To create new migration:**
1. Create file: `supabase/migrations/YYYYMMDDHHMMSS_description.sql`
2. Add your SQL code
3. Run in Supabase SQL Editor

---

## 🎯 Common SQL Operations

### **1. View All Books**

```sql
-- Get all books with their ratings
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

---

### **2. Count Books by Category**

```sql
-- See how many books in each category
SELECT 
  category,
  COUNT(*) as book_count,
  ROUND(AVG(average_rating), 2) as avg_rating
FROM books
GROUP BY category
ORDER BY book_count DESC;
```

---

### **3. Find Books Without Reviews**

```sql
-- Books that need reviews
SELECT 
  b.id,
  b.title,
  b.author,
  b.total_reviews
FROM books b
WHERE b.total_reviews = 0
ORDER BY b.created_at DESC;
```

---

### **4. Top Rated Books**

```sql
-- Best books with at least 3 reviews
SELECT 
  title,
  author,
  category,
  average_rating,
  total_reviews
FROM books
WHERE total_reviews >= 3
ORDER BY average_rating DESC, total_reviews DESC
LIMIT 10;
```

---

### **5. Recent Reviews**

```sql
-- Latest reviews across all books
SELECT 
  r.id,
  b.title as book_title,
  r.user_name,
  r.rating,
  r.comment,
  r.created_at
FROM reviews r
JOIN books b ON r.book_id = b.id
ORDER BY r.created_at DESC
LIMIT 20;
```

---

### **6. Book Details with Reviews**

```sql
-- Get a specific book with all its reviews
SELECT 
  b.title,
  b.author,
  b.average_rating,
  b.total_reviews,
  r.user_name,
  r.rating,
  r.comment,
  r.created_at as review_date
FROM books b
LEFT JOIN reviews r ON b.id = r.book_id
WHERE b.title ILIKE '%hobbit%'  -- Change book title here
ORDER BY r.created_at DESC;
```

---

### **7. Add a Book Manually**

```sql
-- Insert a single book
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
  'A fantasy adventure following Bilbo Baggins',
  'https://covers.openlibrary.org/b/isbn/9780261103344-L.jpg',
  'https://covers.openlibrary.org/b/isbn/9780261103344-M.jpg',
  'Fantasy',
  0,
  0
);
```

---

### **8. Update Book Rating**

```sql
-- Recalculate average rating for a book
UPDATE books
SET 
  average_rating = (
    SELECT AVG(rating)::numeric
    FROM reviews
    WHERE book_id = books.id
  ),
  total_reviews = (
    SELECT COUNT(*)
    FROM reviews
    WHERE book_id = books.id
  )
WHERE id IN (
  SELECT DISTINCT book_id FROM reviews
);
```

---

### **9. Delete Old Books**

```sql
-- Remove books older than 1 year with no reviews
DELETE FROM books
WHERE total_reviews = 0
  AND created_at < NOW() - INTERVAL '1 year';
```

---

### **10. Search Books**

```sql
-- Full-text search across title, author, description
SELECT 
  id,
  title,
  author,
  category,
  average_rating
FROM books
WHERE 
  title ILIKE '%fantasy%' OR
  author ILIKE '%fantasy%' OR
  description ILIKE '%fantasy%' OR
  category ILIKE '%fantasy%'
ORDER BY average_rating DESC;
```

---

## 🚀 Performance Optimization

### **Current Indexes**

Your database already has these performance indexes:

```sql
-- Existing indexes
idx_books_category          -- Fast category filtering
idx_books_rating            -- Fast sorting by rating
idx_reviews_book_id         -- Fast review lookups
idx_reviews_created_at      -- Fast recent reviews
```

### **Recommended Additional Indexes**

```sql
-- Add text search index for better search performance
CREATE INDEX idx_books_title_search 
ON books USING gin(to_tsvector('english', title));

CREATE INDEX idx_books_author_search 
ON books USING gin(to_tsvector('english', author));

-- Add composite index for common queries
CREATE INDEX idx_books_category_rating 
ON books(category, average_rating DESC);

-- Add index for book lookups by creation date
CREATE INDEX idx_books_created_at 
ON books(created_at DESC);
```

---

## 🔒 Security Best Practices

### **Row Level Security (RLS)**

✅ **Already Enabled:** Both tables have RLS active

**Current Policies:**
- ✅ SELECT (read) - Public access
- ⚠️ INSERT (create) - **NEEDS FIXING** (see Required SQL Fixes)
- ⚠️ UPDATE (modify) - **NEEDS FIXING** (see Required SQL Fixes)
- ❌ DELETE (remove) - Not allowed (good for data integrity)

### **Best Practices Applied:**

1. ✅ **UUID Primary Keys** - Unpredictable, secure
2. ✅ **Foreign Key Constraints** - Data integrity
3. ✅ **CHECK Constraints** - Valid ratings (1-5)
4. ✅ **CASCADE Deletes** - Automatic cleanup
5. ✅ **NOT NULL Constraints** - Required fields enforced
6. ✅ **Timestamps** - Audit trail

---

## 📊 Database Maintenance

### **Regular Health Checks**

```sql
-- Check database statistics
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size,
  pg_stat_get_live_tuples(c.oid) AS row_count
FROM pg_tables t
JOIN pg_class c ON t.tablename = c.relname
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### **Backup Verification**

```sql
-- Count total records
SELECT 
  'books' as table_name,
  COUNT(*) as total_records
FROM books
UNION ALL
SELECT 
  'reviews' as table_name,
  COUNT(*) as total_records
FROM reviews;
```

### **Check for Orphaned Reviews**

```sql
-- Reviews with no matching book (should be empty)
SELECT r.*
FROM reviews r
LEFT JOIN books b ON r.book_id = b.id
WHERE b.id IS NULL;
```

---

## 🎯 Next Steps

### **Immediate Actions:**

1. ✅ **Fix RLS Policies** - Run the SQL from "Required SQL Fixes" section
2. ✅ **Import Books** - Run `npm run import-books` after fixing policies
3. ✅ **Add Reviews** - Run `npm run add-reviews` to populate reviews
4. ✅ **Verify Data** - Use SQL queries to check everything works

### **Optional Enhancements:**

1. **Add Full-Text Search Indexes** - Better search performance
2. **Create Database Functions** - Automate rating calculations
3. **Add Triggers** - Auto-update ratings when reviews added
4. **Implement Soft Deletes** - Keep deleted items for recovery

---

## 📞 Need Help?

### **Quick SQL Help Commands:**

```sql
-- List all tables
\dt

-- Describe table structure
\d books
\d reviews

-- Show all policies
SELECT * FROM pg_policies;

-- Show all indexes
SELECT * FROM pg_indexes WHERE schemaname = 'public';
```

---

## ✅ Summary

**Your Database:**
- ✅ PostgreSQL via Supabase
- ✅ Well-structured schema
- ✅ Proper relationships
- ✅ Performance indexes
- ⚠️ Needs RLS policy fixes

**I'm handling:**
- ✅ All SQL operations
- ✅ Schema management
- ✅ Performance optimization
- ✅ Security configuration
- ✅ Data integrity

**You need to:**
1. Run the RLS fix SQL (one time)
2. Use provided SQL queries when needed
3. Let me know if you need any database changes

---

**Your SQL Database Specialist is ready!** 🚀

All SQL operations are documented, optimized, and ready to use. No SQL knowledge required from your end - just follow the instructions above!

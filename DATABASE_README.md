# 🗄️ Database Management Guide

**Your Complete SQL & Database Operations Reference**

As your SQL Database Specialist, I've set up everything you need to manage your database without any SQL knowledge. This guide shows you how to use all the automated tools.

---

## 🚀 Quick Start

### 1️⃣ First-Time Setup (REQUIRED)

Before importing books, you must fix the database permissions:

```bash
# Option A: Automated fix (try this first)
npm run fix-db

# Option B: Manual fix (if option A doesn't work)
# Open FIX_DATABASE_NOW.sql and run it in Supabase SQL Editor
```

**Why?** Your database currently blocks INSERT operations. This is a one-time fix.

### 2️⃣ Check Database Health

```bash
npm run check-db
```

This checks:
- ✅ Database connection
- ✅ Table record counts
- ✅ Data integrity
- ✅ INSERT permissions
- ✅ Sample data

### 3️⃣ Import Books

```bash
npm run import-books
```

Imports 150+ books from Open Library API across 25+ diverse topics.

---

## 📋 Available Commands

### Database Health & Maintenance

| Command | Description | When to Use |
|---------|-------------|-------------|
| `npm run check-db` | Full database health check | Anytime, to verify everything is working |
| `npm run fix-db` | Fix INSERT/UPDATE permissions | One-time, before importing books |
| `npm run backup-db` | Create backup of all data | Before major changes, weekly backups |
| `npm run restore-db -- "filename.json"` | Restore from backup | If data is lost or corrupted |

### Data Import & Population

| Command | Description | Output |
|---------|-------------|--------|
| `npm run import-books` | Import books from Open Library | 150+ books across 25+ categories |
| `npm run add-reviews` | Add sample reviews to books | Realistic reviews for all books |
| `npm run test-api` | Test Open Library API connection | Verifies API is accessible |

### SQL Operations

| Command | Description | Example |
|---------|-------------|---------|
| `npm run sql -- "QUERY"` | Run custom SQL query | `npm run sql -- "SELECT COUNT(*) FROM books;"` |

---

## 🔧 Detailed Usage

### Database Health Check

**Command:** `npm run check-db`

**What it does:**
- Connects to your database
- Counts books and reviews
- Shows sample data
- Checks category distribution
- Verifies data integrity
- Tests INSERT permissions

**Example Output:**
```
🏥 Database Health Check
1️⃣  Checking database connection...
   ✅ Connection successful

2️⃣  Checking table record counts...
   📚 Books: 15 records
   💬 Reviews: 33 records
   ✅ Books table populated

3️⃣  Checking sample data...
   ✅ Sample books retrieved:
      1. "1984" by George Orwell
         Category: Distopya | Rating: 4.9 (521 reviews)

6️⃣  Testing INSERT permissions...
   ✅ INSERT permission working
```

---

### Fix Database Permissions

**Command:** `npm run fix-db`

**What it does:**
- Fixes Row Level Security (RLS) policies
- Enables INSERT operations on books table
- Enables UPDATE operations on books table
- Enables INSERT/UPDATE on reviews table

**When to run:**
- ⚠️ **Required before first import**
- If `check-db` shows "INSERT permission denied"
- After database reset

**What if automated fix doesn't work?**

Run the SQL manually:
1. Open [`FIX_DATABASE_NOW.sql`](./FIX_DATABASE_NOW.sql)
2. Copy all the SQL
3. Go to: https://supabase.com/dashboard → Your Project → SQL Editor
4. Paste and click "Run"

---

### Import Books

**Command:** `npm run import-books`

**What it does:**
- Fetches books from Open Library API
- Imports 150+ diverse books
- Covers 25+ topics and genres
- Removes duplicates
- Adds Turkish-appropriate content

**Topics Covered:**
- Classic Literature
- Science Fiction
- Fantasy
- Philosophy
- Psychology
- History
- Science
- Art
- Biography
- And many more!

**Example Output:**
```
📚 Open Library Book Import Tool
Collecting books across 25 diverse topics...

Progress: ████████████████████ 100% (25/25 topics)

✅ Book collection completed!
📊 Books to import: 186 unique books

Starting import to database...
Progress: ████████████████████ 100% (186/186)

✅ Import completed!
Success: 186 books
```

**Note:** Requires `npm run fix-db` to be run first!

---

### Backup Database

**Command:** `npm run backup-db`

**What it does:**
- Exports all books and reviews to JSON
- Saves to `backups/` directory
- Includes metadata and timestamps
- Shows category breakdown

**Example Output:**
```
💾 Database Backup Tool

📚 Backing up books...
   ✅ Retrieved 186 books
💬 Backing up reviews...
   ✅ Retrieved 450 reviews

✅ Backup completed successfully!

📊 Backup Summary:
   • Books: 186
   • Reviews: 450
   • File size: 2.45 MB
   • Location: backups/backup_2025-10-17T14-30-00.json

📂 Categories backed up:
   • Fiction: 45 books
   • Fantasy: 32 books
   • Science: 28 books
   ...
```

---

### Restore Database

**Command:** `npm run restore-db -- "backup_filename.json"`

**What it does:**
- Restores books and reviews from backup
- Recalculates ratings
- Can merge or replace existing data

**Options:**
```bash
# Merge with existing data (default - safe)
npm run restore-db -- "backup_2025-10-17T14-30-00.json"

# Clear all data and restore (DANGEROUS!)
npm run restore-db -- "backup_2025-10-17T14-30-00.json" --clear
```

**List available backups:**
```bash
npm run restore-db
```

---

### Run Custom SQL

**Command:** `npm run sql -- "YOUR_SQL_QUERY"`

**Examples:**

```bash
# Count all books
npm run sql -- "SELECT COUNT(*) FROM books;"

# Get top rated books
npm run sql -- "SELECT title, author, average_rating FROM books ORDER BY average_rating DESC LIMIT 5;"

# Count books by category
npm run sql -- "SELECT category, COUNT(*) FROM books GROUP BY category;"
```

**For more queries, see:** [`SQL_OPERATIONS.md`](./SQL_OPERATIONS.md)

---

## 📚 Reference Files

| File | Description |
|------|-------------|
| [`DATABASE_GUIDE.md`](./DATABASE_GUIDE.md) | Complete database documentation (600+ lines) |
| [`SQL_OPERATIONS.md`](./SQL_OPERATIONS.md) | Ready-to-use SQL queries for common tasks |
| [`FIX_DATABASE_NOW.sql`](./FIX_DATABASE_NOW.sql) | Critical permissions fix (run once) |

---

## 🎯 Common Workflows

### Setting Up a New Database

```bash
1. npm run fix-db              # Fix permissions
2. npm run import-books        # Import books
3. npm run add-reviews         # Add reviews
4. npm run check-db            # Verify everything
5. npm run backup-db           # Create initial backup
```

### Weekly Maintenance

```bash
1. npm run backup-db           # Create backup
2. npm run check-db            # Health check
```

### After Making Changes

```bash
1. npm run check-db            # Verify changes
2. npm run backup-db           # Backup new state
```

### Disaster Recovery

```bash
1. npm run restore-db          # List backups
2. npm run restore-db -- "backup_file.json"  # Restore
3. npm run check-db            # Verify restore
```

---

## 🔍 Troubleshooting

### Problem: "INSERT permission denied"

**Solution:**
```bash
npm run fix-db
```

Or manually run [`FIX_DATABASE_NOW.sql`](./FIX_DATABASE_NOW.sql) in Supabase SQL Editor.

---

### Problem: "No books in database"

**Solution:**
```bash
# First check if permissions are fixed
npm run check-db

# If permissions OK, import books
npm run import-books
```

---

### Problem: "Wrong book ratings"

**Solution:** Run this SQL in Supabase SQL Editor:
```sql
UPDATE books
SET 
  average_rating = COALESCE((
    SELECT ROUND(AVG(rating)::numeric, 1)
    FROM reviews WHERE book_id = books.id
  ), 0),
  total_reviews = (
    SELECT COUNT(*) FROM reviews WHERE book_id = books.id
  );
```

Or see [`SQL_OPERATIONS.md`](./SQL_OPERATIONS.md) → "Recalculate Book Ratings"

---

### Problem: "Slow queries"

**Solution:** Run this SQL to add performance indexes:
```sql
CREATE INDEX IF NOT EXISTS idx_books_title_search 
ON books USING gin(to_tsvector('english', title));

CREATE INDEX IF NOT EXISTS idx_books_category_rating 
ON books(category, average_rating DESC);
```

See [`SQL_OPERATIONS.md`](./SQL_OPERATIONS.md) → "Performance Optimization"

---

### Problem: "Need to see database statistics"

**Solution:**
```bash
npm run check-db
```

Or run this SQL:
```bash
npm run sql -- "SELECT (SELECT COUNT(*) FROM books) as books, (SELECT COUNT(*) FROM reviews) as reviews;"
```

---

## 🛠️ Database Structure

### Books Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Unique identifier (auto-generated) |
| `title` | TEXT | Book title |
| `author` | TEXT | Author name |
| `description` | TEXT | Book description |
| `cover_image` | TEXT | Cover image URL |
| `back_cover_image` | TEXT | Back cover URL (optional) |
| `category` | TEXT | Genre/category |
| `average_rating` | NUMERIC | Calculated average (0-5) |
| `total_reviews` | INTEGER | Number of reviews |
| `created_at` | TIMESTAMP | When book was added |

### Reviews Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Unique identifier (auto-generated) |
| `book_id` | UUID | Links to books table (foreign key) |
| `user_name` | TEXT | Reviewer's name |
| `user_avatar` | TEXT | Reviewer's avatar URL |
| `rating` | INTEGER | 1-5 stars (validated) |
| `comment` | TEXT | Review text |
| `created_at` | TIMESTAMP | When review was posted |

### Relationships

```
books (1) ←──── (Many) reviews
  └── One book can have many reviews
  └── If book deleted, all its reviews deleted (CASCADE)
```

---

## 📊 Database Dashboard

**Access your Supabase Dashboard:**

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Use these tools:
   - **Table Editor** - View/edit data visually
   - **SQL Editor** - Run custom queries
   - **Database** - See structure and policies
   - **Logs** - Monitor queries and errors

---

## 🎓 Learning SQL (Optional)

You don't need to learn SQL to use this project, but if you're curious:

- **See common queries:** [`SQL_OPERATIONS.md`](./SQL_OPERATIONS.md)
- **Understand structure:** [`DATABASE_GUIDE.md`](./DATABASE_GUIDE.md)
- **Practice safely:** Use `npm run sql -- "SELECT * FROM books LIMIT 5;"`

All queries are documented and ready to copy-paste!

---

## ✅ Summary

**You now have complete database control:**

✅ **Automated Tools** - No SQL knowledge required  
✅ **Health Monitoring** - Check database status anytime  
✅ **Data Import** - 150+ books ready to import  
✅ **Backup & Restore** - Protect your data  
✅ **Custom Queries** - Run SQL when needed  
✅ **Full Documentation** - Every operation documented  
✅ **Troubleshooting** - Solutions for common issues  

**Your SQL Database Specialist has set up everything!** 🚀

Just run the commands, and I'll handle all the SQL complexity behind the scenes.

---

## 🆘 Need Help?

If you encounter any issues:

1. Run `npm run check-db` to diagnose
2. Check the output for specific error messages
3. Look up the error in "Troubleshooting" section above
4. Check reference files for detailed documentation
5. Let me know the error and I'll create the exact SQL you need!

**Remember:** You never need to write SQL yourself. All operations are automated or pre-written for you!

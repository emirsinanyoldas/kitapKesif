# 🔧 Database Permissions Fix Guide

This guide explains how to fix the database permissions for the KitapKesif project. The issue is that INSERT and UPDATE operations are blocked by Row Level Security (RLS) policies.

## 📋 Problem Overview

When you try to import books or add reviews, you may encounter permission errors like:
```
"INSERT permission denied"
"UPDATE permission denied"
```

This happens because the default database setup only allows SELECT (read) operations on the books and reviews tables.

## 🛠️ Solution

You need to add RLS policies that allow INSERT and UPDATE operations. There are two ways to do this:

## 🚀 Method 1: Automated Fix (Recommended)

If you have configured your Supabase credentials in the `.env` file, you can run the automated fix script:

```bash
npm run fix-db
```

This script will:
1. Connect to your Supabase database
2. Apply the necessary RLS policies
3. Verify the policies were applied correctly

## 📝 Method 2: Manual Fix

If the automated fix doesn't work or you prefer to do it manually:

### Step 1: Access Supabase SQL Editor

1. Go to https://supabase.com/dashboard
2. Select your KitapKesif project
3. Click "SQL Editor" in the left sidebar
4. Click "New query"

### Step 2: Run the Fix SQL

Copy and paste the following SQL into the editor:

```sql
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
```

Click "Run" or press Ctrl+Enter to execute the query.

### Step 3: Verify the Fix

To verify that the policies were applied correctly, run this query:

```sql
SELECT 
  schemaname,
  tablename,
  policyname,
  cmd as operation,
  CASE 
    WHEN cmd = 'SELECT' THEN '✅ Read'
    WHEN cmd = 'INSERT' THEN '✅ Create'
    WHEN cmd = 'UPDATE' THEN '✅ Update'
    WHEN cmd = 'DELETE' THEN '✅ Delete'
  END as status
FROM pg_policies
WHERE tablename IN ('books', 'reviews')
ORDER BY tablename, cmd;
```

You should see 6 policies listed:
- books - Anyone can view books (SELECT)
- books - Anyone can insert books (INSERT) ← NEW
- books - Anyone can update books (UPDATE) ← NEW
- reviews - Anyone can view reviews (SELECT)
- reviews - Anyone can insert reviews (INSERT) ← NEW
- reviews - Anyone can update reviews (UPDATE) ← NEW

## ✅ Expected Outcome

After applying the fix, you should be able to:
- Import books using `npm run import-books`
- Add reviews using `npm run add-reviews`
- Update existing books and reviews

## 🧪 Testing the Fix

To test that the permissions are working correctly:

1. Try importing books:
   ```bash
   npm run import-books
   ```

2. Check the database to see if books were imported:
   - In Supabase, go to Table Editor
   - View the "books" table
   - You should see imported books

3. Try adding reviews:
   ```bash
   npm run add-reviews
   ```

4. Check the reviews table:
   - In Supabase, go to Table Editor
   - View the "reviews" table
   - You should see added reviews

## 🛠️ Troubleshooting

### "RPC method not found" Error
If you get this error when running `npm run fix-db`, it means the automated method isn't available. Use the manual method instead.

### Still Getting Permission Errors
1. Double-check that you ran the SQL query correctly
2. Make sure there were no errors in the SQL execution
3. Verify the policies are active using the verification query

### Connection Errors
If you're getting connection errors:
1. Check that your `.env` file has the correct credentials
2. Verify that your Supabase project is active (not paused)
3. Ensure your internet connection is working

## 📚 Additional Resources

- [DATABASE_README.md](./DATABASE_README.md) - Main database documentation
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) - Complete database guide
- [FIX_DATABASE_NOW.sql](./FIX_DATABASE_NOW.sql) - The exact SQL to fix permissions
- [HOW_TO_GET_SUPABASE_CREDENTIALS.md](./HOW_TO_GET_SUPABASE_CREDENTIALS.md) - Credential setup guide

## 🎉 Success!

Once the permissions are fixed, your database will be fully functional with:
- ✅ Read access (already working)
- ✅ Create access (INSERT operations)
- ✅ Update access (UPDATE operations)
- ❌ Delete access (still blocked for data protection)

This setup ensures your application can:
- Import books from Open Library
- Add user reviews
- Update book ratings automatically
- Maintain data integrity

Need help? Check the documentation or ask for assistance!
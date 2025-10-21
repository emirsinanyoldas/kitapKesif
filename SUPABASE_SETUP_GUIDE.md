# 🚀 Supabase Database Setup Guide

This guide will help you set up the Supabase database for the KitapKesif project.

## 📋 Prerequisites

1. A Supabase account (free at https://supabase.com)
2. Node.js installed on your system
3. This project cloned locally

## 🛠️ Step-by-Step Setup

### Step 1: Create a Supabase Project

1. Go to https://supabase.com/dashboard
2. Sign in or create a new account
3. Click "New Project"
4. Fill in the project details:
   - **Name**: KitapKesif
   - **Database Password**: Choose a strong password
   - **Region**: Select the region closest to you
5. Click "Create New Project"
6. Wait 2-3 minutes for the project to be created

### Step 2: Get Your Credentials

1. Once your project is ready, go to the project dashboard
2. In the left sidebar, click on "Project Settings" (gear icon)
3. Click on "API"
4. Copy the following values:
   - **Project URL**: The full URL (e.g., `https://your-project-id.supabase.co`)
   - **Project API Keys**: Copy the "anon" "public" key (starts with `eyJ...`)

### Step 3: Configure Your Environment

1. In your project root, create a `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your credentials:
   ```env
   VITE_SUPABASE_URL=your-project-url-here
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. Save the file

### Step 4: Create Database Tables

1. In your Supabase dashboard, click "SQL Editor" in the left sidebar
2. Click "New Query"
3. Copy and paste the content of `supabase/migrations/20251011080112_create_books_and_reviews_schema.sql`
4. Click "Run" to create the tables

### Step 5: Set Up Database Permissions

1. Still in the SQL Editor, create a new query
2. Copy and paste the content of `supabase/migrations/20251017000000_allow_book_inserts.sql`
3. Click "Run" to set up the permissions

### Step 6: Import Books

You have two options:

**Option A: Use the automated script (recommended)**
```bash
npm run import-books
```

**Option B: Manual import**
1. In the SQL Editor, create a new query
2. Copy and paste the content of `supabase/migrations/20251016000000_import_open_library_books.sql`
3. Replace the placeholder book IDs with actual UUIDs from your database
4. Click "Run"

### Step 7: Add Sample Reviews

```bash
npm run add-reviews
```

### Step 8: Verify Setup

```bash
npm run check-db
```

## 🧪 Testing the Setup

1. Restart the development server:
   ```bash
   npm run dev
   ```

2. Open your browser to http://localhost:5173
3. You should now see books from your Supabase database instead of the fallback Open Library API

## 🛠️ Troubleshooting

### "Invalid supabaseUrl" Error
- Make sure your `.env` file has the correct URL format
- The URL should start with `https://` and end with `.supabase.co`

### "INSERT permission denied" Error
- Run the permission fix script:
  ```bash
  npm run fix-db
  ```

### No Books Displaying
- Verify that books were imported successfully
- Check the Supabase table editor to see if books exist

### Still Having Issues?
- Check the browser console for specific error messages
- Review the documentation in `DATABASE_README.md`

## 🎉 Success!

Once everything is set up correctly, your application will:
- Use the Supabase database as its primary data source
- Have full CRUD capabilities for books and reviews
- Display realistic sample data
- Be ready for production use

## 📚 Additional Resources

- [DATABASE_README.md](./DATABASE_README.md) - Main database documentation
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) - Complete database guide
- [SQL_OPERATIONS.md](./SQL_OPERATIONS.md) - SQL reference guide
- [HOW_TO_GET_SUPABASE_CREDENTIALS.md](./HOW_TO_GET_SUPABASE_CREDENTIALS.md) - Credential setup guide

Need help? Check the documentation or ask for assistance!
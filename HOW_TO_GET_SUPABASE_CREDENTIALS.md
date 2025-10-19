# 🔑 How to Get Your Supabase Credentials

## 📋 Step-by-Step Guide

### Step 1: Go to Supabase Dashboard
1. Open your browser
2. Go to: **https://supabase.com/dashboard**
3. Sign in to your account

### Step 2: Find Your Project
- If you already have a KitapKesif project, click on it
- **If you DON'T see a project yet**, you may need to create one (see below)

### Step 3: Get Your Credentials
1. In your project dashboard, click on the **⚙️ Settings** icon (left sidebar)
2. Click on **"API"** under Project Settings
3. You'll see two important values:

   **A) Project URL**
   - Look for: "Project URL" or "URL"
   - It looks like: `https://xxxxxxxxxxxxx.supabase.co`
   - Copy this entire URL

   **B) API Key (anon key)**
   - Look for: "Project API keys" → "anon" "public"
   - It's a long string starting with `eyJ...`
   - Click the copy icon next to it

### Step 4: Update Your .env File
1. Open the `.env` file in your project root
2. Replace the placeholder values:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...
```

3. **Save the file**

### Step 5: Restart the Server
1. Stop the current dev server (Ctrl+C)
2. Run: `npm run dev`
3. Open: http://localhost:5173

---

## 🆕 Don't Have a Supabase Project Yet?

### Create a New Project (FREE):

1. Go to: https://supabase.com/dashboard
2. Click **"New Project"**
3. Fill in:
   - **Name:** KitapKesif
   - **Database Password:** Choose a strong password (save it!)
   - **Region:** Choose closest to you
4. Click **"Create new project"**
5. Wait 2-3 minutes for setup
6. Follow "Step 3" above to get your credentials

---

## 🏗️ After Adding Credentials

Once your `.env` is configured, you need to set up the database:

### 1. Create Database Tables
The project includes migration files. You need to run them in Supabase:

1. Go to your Supabase project
2. Click **"SQL Editor"** in the left sidebar
3. Copy the contents of: `supabase/migrations/20251011080112_create_books_and_reviews_schema.sql`
4. Paste into SQL Editor
5. Click **"Run"**

### 2. Fix Permissions
```bash
npm run fix-db
```

### 3. Import Books
```bash
npm run import-books
```

### 4. Verify
```bash
npm run check-db
```

---

## ✅ Verification Checklist

- [ ] Supabase project created
- [ ] Project URL copied to `.env`
- [ ] Anon key copied to `.env`
- [ ] Database tables created (via migrations)
- [ ] Permissions fixed (`npm run fix-db`)
- [ ] Books imported (`npm run import-books`)
- [ ] Dev server running (`npm run dev`)
- [ ] App loads without errors

---

## 🆘 Troubleshooting

### "I don't see my project"
- Make sure you're signed into the correct Supabase account
- Check if you need to create a new project

### "Invalid API key" error
- Make sure you copied the **anon/public** key, not the service_role key
- Check for extra spaces in the `.env` file

### "Connection refused"
- Verify the URL is correct (should end with `.supabase.co`)
- Make sure your Supabase project is active (not paused)

### "Still seeing errors"
- Restart the dev server after updating `.env`
- Clear browser cache
- Check browser console for specific error messages

---

## 📞 Need More Help?

If you're stuck at any step, just ask! I can:
- Help you create a Supabase project
- Verify your credentials are correct
- Set up the database for you
- Troubleshoot any errors

**You don't need to know SQL or databases - I'll handle everything!** 🚀

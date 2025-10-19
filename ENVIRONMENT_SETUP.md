# Environment Setup Guide

## Issue Identified
Your project couldn't preview because:
1. ❌ PowerShell execution policy was blocking npm commands
2. ❌ Missing `.env` file with Supabase credentials

## Resolution Steps

### ✅ Step 1: PowerShell Execution Policy (COMPLETED)
The execution policy has been set to bypass for this session.

**Note:** If you open a new terminal, run this command first:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

### ✅ Step 2: Environment Variables File Created
A `.env` file has been created in your project root.

### 🔧 Step 3: Add Your Supabase Credentials (ACTION REQUIRED)

You need to add your actual Supabase credentials to the `.env` file:

1. **Get your Supabase credentials:**
   - Go to: https://supabase.com/dashboard
   - Select your project (or create a new one)
   - Navigate to: **Settings** → **API**
   - Copy:
     - **Project URL** (looks like: `https://xxxxx.supabase.co`)
     - **anon/public key** (a long string starting with `eyJ...`)

2. **Update the `.env` file:**
   Open `.env` and replace the placeholder values:
   ```env
   VITE_SUPABASE_URL=https://your-actual-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **Save the file**

### 🚀 Step 4: Start the Development Server

After adding your credentials, run:
```bash
npm run dev
```

The application will be available at: **http://localhost:5173**

## Alternative: Use Demo Mode (Optional)

If you don't have Supabase set up yet, you can modify the code to work with local data only. Let me know if you'd like me to implement a demo/offline mode.

## Troubleshooting

### If you still see errors:
1. Make sure the `.env` file is in the project root (next to `package.json`)
2. Verify your Supabase credentials are correct
3. Restart the dev server after updating `.env`
4. Check that your Supabase project is active

### Common Issues:
- **"Missing Supabase environment variables"** → `.env` file not configured
- **npm command blocked** → Run the PowerShell bypass command
- **Port already in use** → Stop other servers or use a different port

## Need Help?
Let me know if you:
- Don't have a Supabase account (I can guide you through setup)
- Want to use demo/offline mode instead
- Encounter any other errors

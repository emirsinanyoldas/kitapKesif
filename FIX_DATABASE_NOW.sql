-- ============================================================================
-- CRITICAL DATABASE FIX - RUN THIS IN SUPABASE SQL EDITOR
-- ============================================================================
--
-- Problem: INSERT and UPDATE operations are blocked by Row Level Security
-- Solution: Add proper RLS policies to allow these operations
--
-- Instructions:
-- 1. Go to: https://supabase.com/dashboard
-- 2. Select your KitapKeşif project
-- 3. Click "SQL Editor" in the left sidebar
-- 4. Click "New query"
-- 5. Copy and paste this ENTIRE file
-- 6. Click "Run" or press Ctrl+Enter
-- 7. Verify you see "Success. No rows returned" message
--
-- After running this, you can import books with: npm run import-books
-- ============================================================================

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

-- Verify the policies are now active
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

-- ============================================================================
-- EXPECTED OUTPUT:
-- You should see 6 policies listed (3 for books, 3 for reviews):
--   books   - Anyone can view books      (SELECT)
--   books   - Anyone can insert books    (INSERT)  ← NEW
--   books   - Anyone can update books    (UPDATE)  ← NEW
--   reviews - Anyone can view reviews    (SELECT)
--   reviews - Anyone can insert reviews  (INSERT)  ← NEW
--   reviews - Anyone can update reviews  (UPDATE)  ← NEW
--
-- If you see these 6 policies, the fix is successful! ✅
-- ============================================================================

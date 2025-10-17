-- Allow Public Book Inserts
--
-- This migration adds INSERT policy to allow importing books from scripts
--
-- Date: 2025-10-17

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can insert books" ON books;
DROP POLICY IF EXISTS "Anyone can update books" ON books;

-- Create policy for inserting books (needed for import scripts)
CREATE POLICY "Anyone can insert books"
  ON books FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy for updating books (needed for review count updates)
CREATE POLICY "Anyone can update books"
  ON books FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Verify policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE tablename = 'books'
ORDER BY policyname;

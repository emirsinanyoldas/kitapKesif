-- Open Library Books Import Migration
--
-- This migration provides sample SQL for importing books from Open Library
-- You can run this directly in Supabase SQL Editor or modify as needed
--
-- Date: 2025-10-16

-- Example: Insert sample books from Open Library
-- You can generate more using the import-books.js script

INSERT INTO books (title, author, description, cover_image, back_cover_image, category, average_rating, total_reviews)
VALUES
  (
    'The Hobbit',
    'J.R.R. Tolkien',
    'First published in 1937. A classic fantasy adventure following Bilbo Baggins on his unexpected journey. Topics include: fantasy, adventure, Middle-earth.',
    'https://covers.openlibrary.org/b/isbn/9780261103344-L.jpg',
    'https://covers.openlibrary.org/b/isbn/9780261103344-M.jpg',
    'Fantasy',
    0,
    0
  ),
  (
    '1984',
    'George Orwell',
    'First published in 1949. A dystopian social science fiction novel. Topics include: dystopia, totalitarianism, surveillance.',
    'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg',
    'https://covers.openlibrary.org/b/isbn/9780451524935-M.jpg',
    'Science Fiction',
    0,
    0
  ),
  (
    'Pride and Prejudice',
    'Jane Austen',
    'First published in 1813. A romantic novel of manners. Topics include: romance, society, English literature.',
    'https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg',
    'https://covers.openlibrary.org/b/isbn/9780141439518-M.jpg',
    'Romance',
    0,
    0
  ),
  (
    'To Kill a Mockingbird',
    'Harper Lee',
    'First published in 1960. A novel about racial injustice and childhood innocence. Topics include: justice, racism, coming of age.',
    'https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg',
    'https://covers.openlibrary.org/b/isbn/9780061120084-M.jpg',
    'Fiction',
    0,
    0
  ),
  (
    'The Great Gatsby',
    'F. Scott Fitzgerald',
    'First published in 1925. A novel about the American Dream and the Jazz Age. Topics include: American literature, wealth, tragedy.',
    'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg',
    'https://covers.openlibrary.org/b/isbn/9780743273565-M.jpg',
    'Fiction',
    0,
    0
  ),
  (
    'Harry Potter and the Philosopher''s Stone',
    'J.K. Rowling',
    'First published in 1997. The first book in the Harry Potter series. Topics include: magic, wizards, adventure.',
    'https://covers.openlibrary.org/b/isbn/9780747532699-L.jpg',
    'https://covers.openlibrary.org/b/isbn/9780747532699-M.jpg',
    'Fantasy',
    0,
    0
  ),
  (
    'The Catcher in the Rye',
    'J.D. Salinger',
    'First published in 1951. A story about teenage rebellion and alienation. Topics include: adolescence, identity, American literature.',
    'https://covers.openlibrary.org/b/isbn/9780316769488-L.jpg',
    'https://covers.openlibrary.org/b/isbn/9780316769488-M.jpg',
    'Fiction',
    0,
    0
  ),
  (
    'The Lord of the Rings',
    'J.R.R. Tolkien',
    'First published in 1954. An epic high fantasy novel. Topics include: fantasy, adventure, epic.',
    'https://covers.openlibrary.org/b/isbn/9780618640157-L.jpg',
    'https://covers.openlibrary.org/b/isbn/9780618640157-M.jpg',
    'Fantasy',
    0,
    0
  ),
  (
    'Animal Farm',
    'George Orwell',
    'First published in 1945. A satirical allegorical novella. Topics include: politics, satire, allegory.',
    'https://covers.openlibrary.org/b/isbn/9780451526342-L.jpg',
    'https://covers.openlibrary.org/b/isbn/9780451526342-M.jpg',
    'Fiction',
    0,
    0
  ),
  (
    'Brave New World',
    'Aldous Huxley',
    'First published in 1932. A dystopian novel about a futuristic society. Topics include: dystopia, science fiction, society.',
    'https://covers.openlibrary.org/b/isbn/9780060850524-L.jpg',
    'https://covers.openlibrary.org/b/isbn/9780060850524-M.jpg',
    'Science Fiction',
    0,
    0
  );

-- Verify the insert
SELECT 
  COUNT(*) as total_books,
  COUNT(DISTINCT category) as total_categories
FROM books;

-- Show books by category
SELECT 
  category,
  COUNT(*) as book_count
FROM books
GROUP BY category
ORDER BY book_count DESC;

-- Note: For importing hundreds of books, use the import-books.js script instead:
-- npm run import-books

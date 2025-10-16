# How to Add Realistic Reviews to Your Books

## Step 1: Get Your Book IDs

First, you need to get the actual book IDs from your Supabase database. Run this query in Supabase SQL Editor:

```sql
SELECT id, title FROM books ORDER BY created_at;
```

This will show you all your books with their UUIDs.

## Step 2: Replace Book IDs in Migration File

Open the file: `20251015000000_add_diverse_realistic_reviews.sql`

Replace these placeholders with your actual book UUIDs:
- `BOOK_ID_1` → Your first book's UUID
- `BOOK_ID_2` → Your second book's UUID
- `BOOK_ID_3` → Your third book's UUID
- ... and so on

## Step 3: Run the Migration

Copy the modified SQL and run it in your Supabase SQL Editor.

## Step 4: Update Book Ratings

After inserting reviews, update each book's rating by running:

```sql
SELECT update_book_rating('your-book-uuid-here');
```

Run this for each book that has new reviews.

## Alternative: Use the Helper Script

If you want to run this programmatically, use the `add-reviews.js` script (see below).

---

## Review Distribution

The migration includes **50+ diverse reviews** across 10 books with:

### Rating Distribution:
- **5 stars**: ~35% (Excellent reviews)
- **4 stars**: ~30% (Good reviews)
- **3 stars**: ~20% (Neutral reviews)
- **2 stars**: ~10% (Below average)
- **1 star**: ~5% (Poor reviews)

### Review Characteristics:
- ✅ Realistic Turkish comments
- ✅ Varied perspectives (positive, negative, neutral)
- ✅ Different writing styles
- ✅ Authentic user names
- ✅ Avatar URLs from pravatar.cc
- ✅ Different timestamps (spread over weeks)

### Review Types Included:

**Highly Positive (5 stars):**
- Enthusiastic recommendations
- Emotional connections
- Praise for writing style
- Character development appreciation

**Positive (4 stars):**
- Generally satisfied
- Minor criticisms
- Balanced perspectives
- Recommends with caveats

**Neutral (3 stars):**
- Mixed feelings
- "It's okay" sentiment
- Moderate expectations
- Average experience

**Critical (2 stars):**
- Disappointed but not angry
- Specific criticisms
- Below expectations
- Constructive feedback

**Very Critical (1 star):**
- Strong dissatisfaction
- Waste of time/money
- Major flaws mentioned
- Not recommended

---

## Tips for Realistic Reviews:

1. **Varied Length**: Some short, some detailed
2. **Different Tones**: Enthusiastic, analytical, casual, critical
3. **Personal Touch**: "I loved", "Not for me", "Expected more"
4. **Specific Details**: Mentions plot, characters, pacing
5. **Authentic Language**: Natural Turkish expressions

---

## Sample Book Mapping:

If your books are:
1. "Sefiller" → Use BOOK_ID_1 reviews (classic, mixed positive)
2. "1984" → Use BOOK_ID_2 reviews (thought-provoking, mixed)
3. "Suç ve Ceza" → Use BOOK_ID_3 reviews (masterpiece, very positive)
4. Contemporary novel → Use BOOK_ID_4 reviews (balanced)
5. Popular fiction → Use BOOK_ID_5 reviews (more critical)
6. Philosophy book → Use BOOK_ID_6 reviews (deep, positive)
7. Thriller → Use BOOK_ID_7 reviews (action-focused)
8. Fantasy → Use BOOK_ID_8 reviews (creative, imaginative)
9. Sci-fi → Use BOOK_ID_9 reviews (technical, futuristic)
10. Historical → Use BOOK_ID_10 reviews (period-focused)

---

## Need More Reviews?

If you need additional reviews, follow the pattern in the migration file:
- Use different names (Turkish names)
- Vary the avatar numbers (1-70)
- Mix ratings (1-5 stars)
- Write authentic comments
- Spread timestamps realistically

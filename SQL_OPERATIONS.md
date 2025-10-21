# 🎯 SQL İşlemleri Rehberi - Hızlı Referans

**SQL Veritabanı Uzmanınız - Kullanıma Hazır Sorgular**

Bu rehber, kitap veritabanınızı yönetmek için ihtiyacınız olabilecek tüm SQL sorgularını içerir. Sadece kopyalayıp Supabase SQL Düzenleyiciye yapıştırın.

---

## 📍 Hızlı Erişim

**Supabase SQL Düzenleyici:** https://supabase.com/dashboard → Projeniz → SQL Düzenleyici → Yeni Sorgu

**Mevcut NPM Komutları:**
```bash
npm run check-db        # Veritabanı sağlığını kontrol et
npm run import-books    # Open Library'den kitap içe aktar
npm run add-reviews     # Örnek incelemeler ekle
npm run fix-db          # Veritabanı izinlerini düzelt (gerekirse)
npm run sql -- "SORGU"  # Özel SQL sorgusu çalıştır
```

---

## 🚨 KRİTİK: İlk Kurulum

**Kitapları içe aktarmadan önce bunu bir kez çalıştırın:**

Dosyaya bakın: [`FIX_DATABASE_NOW.sql`](./FIX_DATABASE_NOW.sql)

Veya çalıştırın: `npm run fix-db`

---

## 📊 Yaygın Sorgular

### 1. Tüm Kitapları Görüntüle

```sql
-- Puanlarla birlikte tüm kitapları getir
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

### 2. Kategoriye Göre Kitap Sayısı

```sql
-- Kitapların kategorilere dağılımını gör
SELECT 
  category,
  COUNT(*) as book_count,
  ROUND(AVG(average_rating), 2) as avg_category_rating,
  SUM(total_reviews) as total_reviews
FROM books
GROUP BY category
ORDER BY book_count DESC;
```

### 3. En Yüksek Puanlı Kitaplar

```sql
-- En az 3 incelemeye sahip en iyi kitaplar
SELECT 
  title,
  author,
  category,
  average_rating,
  total_reviews,
  created_at
FROM books
WHERE total_reviews >= 3
ORDER BY average_rating DESC, total_reviews DESC
LIMIT 20;
```

### 4. Son Eklenen Kitaplar

```sql
-- Son 7 günde eklenen kitaplar
SELECT 
  title,
  author,
  category,
  average_rating,
  total_reviews,
  created_at,
  CASE 
    WHEN created_at > NOW() - INTERVAL '1 day' THEN 'Bugün'
    WHEN created_at > NOW() - INTERVAL '2 days' THEN 'Dün'
    ELSE to_char(created_at, 'DD Mon YYYY')
  END as added_when
FROM books
WHERE created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

### 5. İncelemesi Olmayan Kitaplar

```sql
-- İncelemeye ihtiyacı olan kitaplar
SELECT 
  id,
  title,
  author,
  category,
  created_at
FROM books
WHERE total_reviews = 0
ORDER BY created_at DESC;
```

### 6. Kitap Ara

```sql
-- Başlığa, yazara veya kategoriye göre ara (büyük/küçük harf duyarsız)
SELECT 
  id,
  title,
  author,
  category,
  average_rating,
  total_reviews
FROM books
WHERE 
  title ILIKE '%tolkien%' OR
  author ILIKE '%tolkien%' OR
  description ILIKE '%tolkien%' OR
  category ILIKE '%tolkien%'
ORDER BY average_rating DESC
LIMIT 20;
```

### 7. Tüm İncelemelerle Kitap Detaylarını Al

```sql
-- Tüm incelemeler dahil olmak üzere eksiksiz kitap bilgisi
SELECT 
  b.id as book_id,
  b.title,
  b.author,
  b.category,
  b.description,
  b.average_rating,
  b.total_reviews,
  r.id as review_id,
  r.user_name,
  r.rating,
  r.comment,
  r.created_at as review_date
FROM books b
LEFT JOIN reviews r ON b.id = r.book_id
WHERE b.title ILIKE '%hobbit%'  -- Burada kitap başlığını değiştirin
ORDER BY r.created_at DESC;
```

### 8. Tüm Kitaplardaki Son İncelemeler

```sql
-- Kitap bilgileriyle birlikte son incelemeler
SELECT 
  r.id,
  b.title as book_title,
  b.author,
  r.user_name,
  r.rating,
  r.comment,
  r.created_at,
  CASE 
    WHEN r.created_at > NOW() - INTERVAL '1 hour' THEN 'Şimdi'
    WHEN r.created_at > NOW() - INTERVAL '1 day' THEN 'Bugün'
    WHEN r.created_at > NOW() - INTERVAL '2 days' THEN 'Dün'
    ELSE to_char(r.created_at, 'DD Mon YYYY')
  END as review_time
FROM reviews r
JOIN books b ON r.book_id = b.id
ORDER BY r.created_at DESC
LIMIT 30;
```

### 9. Puan Dağılımı

```sql
-- Her puan aralığında kaç kitap olduğunu gör
SELECT 
  CASE 
    WHEN average_rating >= 4.5 THEN '⭐⭐⭐⭐⭐ Mükemmel (4.5+)'
    WHEN average_rating >= 4.0 THEN '⭐⭐⭐⭐ Çok İyi (4.0-4.4)'
    WHEN average_rating >= 3.0 THEN '⭐⭐⭐ İyi (3.0-3.9)'
    WHEN average_rating >= 2.0 THEN '⭐⭐ Orta (2.0-2.9)'
    ELSE '⭐ Geliştirilmeli (<2.0)'
  END as rating_category,
  COUNT(*) as book_count,
  ARRAY_AGG(title ORDER BY average_rating DESC) as sample_books
FROM books
WHERE total_reviews > 0
GROUP BY rating_category
ORDER BY MIN(average_rating) DESC;
```

### 10. İstatistik Genel Bakış

```sql
-- Tam veritabanı istatistikleri
SELECT 
  (SELECT COUNT(*) FROM books) as total_books,
  (SELECT COUNT(*) FROM reviews) as total_reviews,
  (SELECT COUNT(DISTINCT category) FROM books) as total_categories,
  (SELECT ROUND(AVG(average_rating), 2) FROM books WHERE total_reviews > 0) as overall_avg_rating,
  (SELECT COUNT(*) FROM books WHERE total_reviews = 0) as books_without_reviews,
  (SELECT COUNT(*) FROM books WHERE created_at > NOW() - INTERVAL '7 days') as books_added_this_week;
```

---

## 🔧 Bakım Sorguları

### Kitap Puanlarını Yeniden Hesapla

```sql
-- Tüm kitapların ortalama puanlarını incelemelere göre güncelle
UPDATE books
SET 
  average_rating = COALESCE((
    SELECT ROUND(AVG(rating)::numeric, 1)
    FROM reviews
    WHERE book_id = books.id
  ), 0),
  total_reviews = (
    SELECT COUNT(*)
    FROM reviews
    WHERE book_id = books.id
  );
```

### Sahipsiz İncelemeleri Bul

```sql
-- Eşleşen kitabı olmayan incelemeler (boş olmalı)
SELECT r.*
FROM reviews r
LEFT JOIN books b ON r.book_id = b.id
WHERE b.id IS NULL;
```

### Veritabanı Boyutunu Kontrol Et

```sql
-- Verinizin ne kadar alan kullandığını gör
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS total_size,
  pg_size_pretty(pg_relation_size(schemaname||'.'||tablename)) AS table_size,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename) - pg_relation_size(schemaname||'.'||tablename)) AS index_size,
  pg_stat_get_live_tuples(c.oid) AS row_count
FROM pg_tables t
JOIN pg_class c ON t.tablename = c.relname
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### İndeksleri Doğrula

```sql
-- Tüm indekslerin yerinde olduğunu kontrol et
SELECT 
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;
```

### RLS Politikalarını Kontrol Et

```sql
-- Satır Düzeyi Güvenlik politikalarını doğrula
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  cmd as operation,
  qual as using_expression,
  with_check as check_expression
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, cmd, policyname;
```

---

## ➕ Veri Değişikliği

### Tek Kitap Ekle

```sql
-- Manuel olarak yeni bir kitap ekle
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
  'Bilbo Baggins'ın beklenmedik yolculuğunu anlatan bir fantezi macerası.',
  'https://covers.openlibrary.org/b/isbn/9780261103344-L.jpg',
  'https://covers.openlibrary.org/b/isbn/9780261103344-M.jpg',
  'Fantazi',
  0,
  0
)
RETURNING id, title, author;
```

### İnceleme Ekle

```sql
-- Bir kitaba inceleme ekle (book_id'yi gerçek UUID ile değiştirin)
INSERT INTO reviews (
  book_id,
  user_name,
  user_avatar,
  rating,
  comment
) VALUES (
  'REPLACE_WITH_BOOK_ID',  -- Kitaplar tablosundan al
  'John Doe',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoe',
  5,
  'Bu harika bir kitap! Şiddetle tavsiye ederim.'
)
RETURNING *;

-- Ardından kitabın puanını güncelle
UPDATE books
SET 
  average_rating = (SELECT AVG(rating) FROM reviews WHERE book_id = 'REPLACE_WITH_BOOK_ID'),
  total_reviews = (SELECT COUNT(*) FROM reviews WHERE book_id = 'REPLACE_WITH_BOOK_ID')
WHERE id = 'REPLACE_WITH_BOOK_ID';
```

### Kitap Bilgilerini Güncelle

```sql
-- Kitap detaylarını güncelle
UPDATE books
SET 
  description = 'Yeni açıklama burada',
  category = 'Yeni Kategori'
WHERE title = 'Kitap Başlığı Burada'
RETURNING *;
```

### İncelemesi Olmayan Kitapları Sil (30 günden eski)

```sql
-- İncelemesi olmayan eski kitapları temizle
DELETE FROM books
WHERE total_reviews = 0
  AND created_at < NOW() - INTERVAL '30 days'
RETURNING title, author, created_at;
```

---

## 🔍 Gelişmiş Analizler

### Kitap Performans Raporu

```sql
-- Kategori bazında kapsamlı performans metrikleri
SELECT 
  category,
  COUNT(*) as total_books,
  ROUND(AVG(average_rating), 2) as avg_rating,
  SUM(total_reviews) as total_reviews,
  ROUND(AVG(total_reviews), 1) as avg_reviews_per_book,
  MAX(average_rating) as highest_rating,
  MIN(average_rating) as lowest_rating,
  STRING_AGG(
    CASE WHEN average_rating >= 4.5 THEN title ELSE NULL END, 
    ', ' 
    ORDER BY average_rating DESC
  ) as top_rated_books
FROM books
GROUP BY category
ORDER BY avg_rating DESC, total_books DESC;
```

### İnceleme Aktivite Zaman Çizelgesi

```sql
-- Son 30 gün için günlük inceleme sayısı
SELECT 
  DATE(created_at) as review_date,
  COUNT(*) as reviews_count,
  ROUND(AVG(rating), 2) as avg_rating,
  STRING_AGG(DISTINCT user_name, ', ') as reviewers
FROM reviews
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY review_date DESC;
```

### En Aktif İnceleyiciler

```sql
-- İnceleme sayısına göre en iyi inceleyiciler
SELECT 
  user_name,
  COUNT(*) as total_reviews,
  ROUND(AVG(rating), 2) as avg_rating_given,
  MIN(created_at) as first_review,
  MAX(created_at) as latest_review
FROM reviews
GROUP BY user_name
ORDER BY total_reviews DESC, avg_rating_given DESC
LIMIT 20;
```

### Dikkat Çekmesi Gereken Kitaplar

```sql
-- Düşük puanlı veya az incelemeli kitaplar
SELECT 
  title,
  author,
  category,
  average_rating,
  total_reviews,
  CASE 
    WHEN total_reviews = 0 THEN '🆕 Henüz inceleme yok'
    WHEN total_reviews < 3 THEN '📝 Daha fazla inceleme gerekli'
    WHEN average_rating < 3.0 THEN '⚠️ Düşük puan'
    ELSE '✅ İyi'
  END as status,
  created_at
FROM books
WHERE total_reviews < 3 OR average_rating < 3.0
ORDER BY total_reviews ASC, average_rating ASC;
```

---

## 🎯 Performans Optimizasyonu

### Eksik İndeksleri Ekle (gerekirse)

```sql
-- Tam metin arama indeksleri
CREATE INDEX IF NOT EXISTS idx_books_title_search 
ON books USING gin(to_tsvector('english', title));

CREATE INDEX IF NOT EXISTS idx_books_author_search 
ON books USING gin(to_tsvector('english', author));

-- Yaygın sorgular için bileşik indeksler
CREATE INDEX IF NOT EXISTS idx_books_category_rating 
ON books(category, average_rating DESC);

CREATE INDEX IF NOT EXISTS idx_books_created_at 
ON books(created_at DESC);

-- İncelemesi olan kitaplar için kısmi indeks
CREATE INDEX IF NOT EXISTS idx_books_with_reviews 
ON books(average_rating DESC) 
WHERE total_reviews > 0;
```

### Tablo İstatistiklerini Analiz Et

```sql
-- Sorgu optimizasyonu için tablo istatistiklerini güncelle
ANALYZE books;
ANALYZE reviews;

-- Son analiz zamanını kontrol et
SELECT 
  schemaname,
  relname,
  last_analyze,
  last_autoanalyze,
  n_live_tup,
  n_dead_tup
FROM pg_stat_user_tables
WHERE schemaname = 'public';
```

---

## 🔐 Güvenlik Kontrolleri

### Tüm RLS Politikalarını Doğrula

```sql
-- Tam RLS politikası kontrolü
SELECT 
  tablename,
  'SELECT' as operation,
  EXISTS(
    SELECT 1 FROM pg_policies 
    WHERE tablename = t.tablename AND cmd = 'SELECT'
  ) as has_policy
FROM (VALUES ('books'), ('reviews')) AS t(tablename)
UNION ALL
SELECT 
  tablename,
  'INSERT' as operation,
  EXISTS(
    SELECT 1 FROM pg_policies 
    WHERE tablename = t.tablename AND cmd = 'INSERT'
  ) as has_policy
FROM (VALUES ('books'), ('reviews')) AS t(tablename)
UNION ALL
SELECT 
  tablename,
  'UPDATE' as operation,
  EXISTS(
    SELECT 1 FROM pg_policies 
    WHERE tablename = t.tablename AND cmd = 'UPDATE'
  ) as has_policy
FROM (VALUES ('books'), ('reviews')) AS t(tablename)
ORDER BY tablename, operation;
```

### Yabancı Anahtar Kısıtlamalarını Kontrol Et

```sql
-- Referans bütünlüğü kısıtlamalarını doğrula
SELECT
  tc.table_name, 
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name,
  rc.delete_rule,
  rc.update_rule
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
JOIN information_schema.referential_constraints AS rc
  ON tc.constraint_name = rc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_schema = 'public';
```

---

## 📋 Hızlı Sorun Giderme

### Problem: Kitap eklenemiyor
**Çözüm:** [`FIX_DATABASE_NOW.sql`](./FIX_DATABASE_NOW.sql) dosyasını çalıştırın veya `npm run fix-db` komutunu kullanın

### Problem: Kitapların yanlış puanı var
**Çözüm:** Yukarıdaki "Kitap Puanlarını Yeniden Hesapla" sorgusunu çalıştırın

### Problem: Yavaş sorgular
**Çözüm:** Yukarıdaki "Eksik İndeksleri Ekle" sorgusunu çalıştırın

### Problem: Veritabanı sağlığını kontrol etmek gerek
**Çözüm:** `npm run check-db` komutunu çalıştırın

### Problem: Tüm veriyi görmek istiyorum
**Çözüm:** Yukarıdaki "İstatistik Genel Bakış" sorgusunu çalıştırın

---

## 💡 İpuçları

1. **DELETE sorgularından önce her zaman yedek alın** - Supabase otomatik yedeklemeye sahiptir, ancak dikkatli olun
2. **RETURNING yan tümcesini kullanın** - Ne eklendi/güncellendi/silindiğini görün
3. **Önce LIMIT ile test edin** - UPDATE/DELETE için küçük bir alt kümede WHERE yan tümcesiyle test edin
4. **Birden fazla işlem için işlemleri kullanın** - Gerekirse BEGIN/COMMIT ile sarın
5. **Yürütme planlarını kontrol edin** - Yavaş sorgular için EXPLAIN ANALYZE kullanın

---

## ✅ Özet

**Artık şunlara sahipsiniz:**
- ✅ Kullanıma hazır tüm yaygın SQL işlemleri
- ✅ Bakım ve sorun giderme sorguları
- ✅ Performans optimizasyon scriptleri
- ✅ Güvenlik doğrulama sorguları
- ✅ Analiz ve raporlama sorguları

**SQL bilgisi gerekmez** - Sadece kopyalayın, yapıştırın ve çalıştırın! 🚀

Burada kapsanmayan herhangi bir SQL görevi için bana bildirin ve sorguyu sizin için oluşturayım!

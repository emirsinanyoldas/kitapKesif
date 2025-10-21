# 📊 Complete Database Guide - KitapKeşif Project

**Your SQL Database Specialist**  
**Date:** October 17, 2025

---

## 🎯 Veritabanı Genel Bakışı

KitapKeşif projeniz veritabanı arka ucu olarak **Supabase (PostgreSQL)** kullanır. Mevcut kurulumunuzu analiz ettim ve size SQL ile ilgili her şeyi rehberlik edeceğim.

### **Mevcut Veritabanı Durumu:**

✅ **Bağlandı:** Supabase PostgreSQL  
✅ **Tablolar:** 2 tablo (books, reviews)  
✅ **Güvenlik:** Satır Seviyesi Güvenlik (RLS) etkin  
✅ **Performans:** Temel dizinler uygulandı  
⚠️ **Sorun:** INSERT/UPDATE politikaları eksik (düzeltme gerekiyor)

---

## 📋 İçindekiler

1. [Mevcut Veritabanı Şeması](#mevcut-veritabanı-şeması)
2. [Gerekli SQL Düzeltmeleri](#gerekli-sql-düzeltmeleri)
3. [SQL Nasıl Yürütülür](#sql-nasıl-yürütülür)
4. [Veritabanı Yönetimi](#veritabanı-yönetimi)
5. [Performans Optimizasyonu](#performans-optimizasyonu)
6. [Güvenlik En İyi Uygulamaları](#güvenlik-en-iyi-uygulamaları)
7. [Yaygın SQL İşlemleri](#yaygın-sql-işlemleri)

---

## 🗄️ Mevcut Veritabanı Şeması

### **Tablo 1: books**

Tüm kitap bilgilerini, meta verileri, kapakları ve derecelendirmeleri saklar.

```sql
CREATE TABLE books (
  -- Birincil Anahtar
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Kitap Bilgileri
  title           text NOT NULL,
  author          text NOT NULL,
  description     text NOT NULL,
  
  -- Görseller
  cover_image     text NOT NULL,
  back_cover_image text,
  
  -- Sınıflandırma
  category        text NOT NULL,
  
  -- Derecelendirmeler ve İncelemeler
  average_rating  numeric DEFAULT 0,
  total_reviews   integer DEFAULT 0,
  
  -- Meta Veriler
  created_at      timestamptz DEFAULT now()
);
```

**Alanlar Açıklanmıştır:**
- `id`: Benzersiz tanımlayıcı (otomatik oluşturulan UUID)
- `title`: Kitap başlığı
- `author`: Birincil yazar adı
- `description`: Kitap açıklaması/özeti
- `cover_image`: Ön kapak URL'si
- `back_cover_image`: Arka kapak URL'si (isteğe bağlı)
- `category`: Tür/kategori (Kurgu, Fantastik, vb.)
- `average_rating`: İncelemelerden hesaplanan ortalama
- `total_reviews`: İnceleme sayısı
- `created_at`: Kitabın eklendiği zaman

---

### **Tablo 2: reviews**

Kitaplar için kullanıcı incelemelerini ve derecelendirmelerini saklar.

```sql
CREATE TABLE reviews (
  -- Birincil Anahtar
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Yabancı Anahtar (kitaplar tablosuyla ilişki)
  book_id       uuid NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  
  -- Kullanıcı Bilgileri
  user_name     text NOT NULL,
  user_avatar   text NOT NULL,
  
  -- İnceleme İçeriği
  rating        integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment       text NOT NULL,
  
  -- Meta Veriler
  created_at    timestamptz DEFAULT now()
);
```

**Alanlar Açıklanmıştır:**
- `id`: Benzersiz tanımlayıcı (otomatik oluşturulan UUID)
- `book_id`: Kitaplar tablosuna bağlar (yabancı anahtar)
- `user_name`: İnceleyenin adı
- `user_avatar`: İnceleyenin avatar URL'si
- `rating`: 1-5 yıldız (CHECK kısıtlaması ile doğrulanır)
- `comment`: İnceleme metni
- `created_at`: İncelemenin yayınlandığı zaman

---

### **Tablo İlişkileri**

```
books (1) ←──── (Çok) reviews
  └── Bir kitabın birçok incelemesi olabilir
  └── Kitap silinirse, tüm incelemeleri silinir (CASCADE)
```

---

## 🔧 Gerekli SQL Düzeltmeleri

### **KRİTİK: Satır Seviyesi Güvenlik Politikalarını Düzeltin**

Veritabanınız şu anda **INSERT ve UPDATE işlemlerini engelliyor**. İşte düzeltme:

#### **1. Adım: Supabase SQL Düzenleyiciyi Açın**

1. Şuraya gidin: https://supabase.com/dashboard
2. Projenizi seçin
3. Kenar çubuğunda **"SQL Editor"**'a tıklayın
4. **"New query"**'e tıklayın

#### **2. Adım: Bu SQL'i Çalıştırın**

```sql
-- ============================================
-- VERİTABANI İZİNLERİNİ DÜZELT
-- Bunu Supabase SQL Düzenleyicide çalıştırın
-- ============================================

-- Kitaplar tablosu politikalarını düzelt
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

-- İncelemeler tablosu politikalarını düzelt
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

-- Politikaların aktif olduğunu doğrula
SELECT 
  schemaname,
  tablename,
  policyname,
  cmd as operation
FROM pg_policies
WHERE tablename IN ('books', 'reviews')
ORDER BY tablename, policyname;
```

#### **Beklenen Sonuç:**

Şu çıktıyı görmelisiniz:
```sql
schemaname | tablename | policyname                  | operation
-----------+-----------+-----------------------------+-----------
public     | books     | Anyone can insert books     | INSERT
public     | books     | Anyone can update books     | UPDATE
public     | books     | Anyone can view books       | SELECT
public     | reviews   | Anyone can insert reviews   | INSERT
public     | reviews   | Anyone can update reviews   | UPDATE
public     | reviews   | Anyone can view reviews     | SELECT
```

---

## 📝 SQL Nasıl Yürütülür

### **Yöntem 1: Supabase SQL Düzenleyici (Önerilen)**

**En iyi kullanım:** Tek seferlik sorgular, şema değişiklikleri, veri düzeltmeleri

1. **Supabase'e Giriş Yapın:** https://supabase.com/dashboard
2. **Proje Seçin:** KitapKeşif projenizi seçin
3. **SQL Düzenleyiciyi Açın:** Sol kenar çubuğunda "SQL Editor"a tıklayın
4. **Yeni Sorgu:** "New query" düğmesine tıklayın
5. **SQL Yapıştırın:** Size verdiğim SQL kodunu kopyalayın
6. **Çalıştırın:** "Run" veya `Ctrl+Enter` tuşuna basın
7. **Sonuçları Kontrol Edin:** Aşağıdaki çıktıyı görüntüleyin

---

### **Yöntem 2: Geçiş Dosyaları**

**En iyi kullanım:** Sürüm kontrolü ile şema değişiklikleri

Tüm geçiş dosyaları şurada: `supabase/migrations/`

**Mevcut Geçişler:**
```
20251011080112_create_books_and_reviews_schema.sql
20251015000000_add_diverse_realistic_reviews.sql
20251016000000_import_open_library_books.sql
20251017000000_allow_book_inserts.sql
```

**Yeni geçiş oluşturmak için:**
1. Dosya oluşturun: `supabase/migrations/YYYYMMDDHHMMSS_aciklama.sql`
2. SQL kodunuzu ekleyin
3. Supabase SQL Düzenleyicide çalıştırın

---

## 🎯 Yaygın SQL İşlemleri

### **1. Tüm Kitapları Görüntüle**

```sql
-- Tüm kitapları derecelendirmeleriyle birlikte alın
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

---

### **2. Kategoriye Göre Kitap Sayısı**

```sql
-- Her kategoride kaç kitap olduğunu görün
SELECT 
  category,
  COUNT(*) as book_count,
  ROUND(AVG(average_rating), 2) as avg_rating
FROM books
GROUP BY category
ORDER BY book_count DESC;
```

---

### **3. İncelemesiz Kitapları Bul**

```sql
-- İncelemeye ihtiyacı olan kitaplar
SELECT 
  b.id,
  b.title,
  b.author,
  b.total_reviews
FROM books b
WHERE b.total_reviews = 0
ORDER BY b.created_at DESC;
```

---

### **4. En İyi Dereceli Kitaplar**

```sql
-- En az 3 incelemeye sahip en iyi kitaplar
SELECT 
  title,
  author,
  category,
  average_rating,
  total_reviews
FROM books
WHERE total_reviews >= 3
ORDER BY average_rating DESC, total_reviews DESC
LIMIT 10;
```

---

### **5. Son İncelemeler**

```sql
-- Tüm kitaplardaki en son incelemeler
SELECT 
  r.id,
  b.title as book_title,
  r.user_name,
  r.rating,
  r.comment,
  r.created_at
FROM reviews r
JOIN books b ON r.book_id = b.id
ORDER BY r.created_at DESC
LIMIT 20;
```

---

### **6. Kitap Detayları ve İncelemeler**

```sql
-- Belirli bir kitabı tüm incelemeleriyle birlikte alın
SELECT 
  b.title,
  b.author,
  b.average_rating,
  b.total_reviews,
  r.user_name,
  r.rating,
  r.comment,
  r.created_at as review_date
FROM books b
LEFT JOIN reviews r ON b.id = r.book_id
WHERE b.title ILIKE '%hobbit%'  -- Kitap başlığını burada değiştirin
ORDER BY r.created_at DESC;
```

---

### **7. Manuel Olarak Kitap Ekleyin**

```sql
-- Tek bir kitap ekleyin
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
  'A fantasy adventure following Bilbo Baggins',
  'https://covers.openlibrary.org/b/isbn/9780261103344-L.jpg',
  'https://covers.openlibrary.org/b/isbn/9780261103344-M.jpg',
  'Fantasy',
  0,
  0
);
```

---

### **8. Kitap Derecelendirmesini Güncelle**

```sql
-- Bir kitap için ortalama derecelendirmeyi yeniden hesaplayın
UPDATE books
SET 
  average_rating = (
    SELECT AVG(rating)::numeric
    FROM reviews
    WHERE book_id = books.id
  ),
  total_reviews = (
    SELECT COUNT(*)
    FROM reviews
    WHERE book_id = books.id
  )
WHERE id IN (
  SELECT DISTINCT book_id FROM reviews
);
```

---

### **9. Eski Kitapları Sil**

```sql
-- 1 yıldan fazla süredir incelemesi olmayan kitapları kaldır
DELETE FROM books
WHERE total_reviews = 0
  AND created_at < NOW() - INTERVAL '1 year';
```

---

### **10. Kitapları Ara**

```sql
-- Başlık, yazar, açıklama ve kategori genelinde tam metin araması
SELECT 
  id,
  title,
  author,
  category,
  average_rating
FROM books
WHERE 
  title ILIKE '%fantasy%' OR
  author ILIKE '%fantasy%' OR
  description ILIKE '%fantasy%' OR
  category ILIKE '%fantasy%'
ORDER BY average_rating DESC;
```

---

## 🚀 Performans Optimizasyonu

### **Mevcut Dizinler**

Veritabanınızda zaten şu performans dizinleri var:

```sql
-- Mevcut dizinler
idx_books_category          -- Hızlı kategori filtreleme
idx_books_rating            -- Derecelendirmeye göre hızlı sıralama
idx_reviews_book_id         -- Hızlı inceleme aramaları
idx_reviews_created_at      -- Hızlı son incelemeler
```

### **Önerilen Ek Dizinler**

```sql
-- Daha iyi arama performansı için tam metin arama dizini ekleyin
CREATE INDEX idx_books_title_search 
ON books USING gin(to_tsvector('english', title));

CREATE INDEX idx_books_author_search 
ON books USING gin(to_tsvector('english', author));

-- Ortak sorgular için bileşik dizin ekleyin
CREATE INDEX idx_books_category_rating 
ON books(category, average_rating DESC);

-- Oluşturma tarihine göre kitap aramaları için dizin ekleyin
CREATE INDEX idx_books_created_at 
ON books(created_at DESC);
```

---

## 🔒 Güvenlik En İyi Uygulamaları

### **Satır Seviyesi Güvenlik (RLS)**

✅ **Zaten Etkin:** Her iki tabloda da RLS aktif

**Mevcut Politikalar:**
- ✅ SELECT (okuma) - Genel erişim
- ⚠️ INSERT (oluşturma) - **DÜZELTME GEREKİR** (bkz. Gerekli SQL Düzeltmeleri)
- ⚠️ UPDATE (değiştirme) - **DÜZELTME GEREKİR** (bkz. Gerekli SQL Düzeltmeleri)
- ❌ DELETE (kaldırma) - İzin verilmez (veri bütünlüğü için iyi)

### **Uygulanan En İyi Uygulamalar:**

1. ✅ **UUID Birincil Anahtarlar** - Tahmin edilemeyen, güvenli
2. ✅ **Yabancı Anahtar Kısıtlamaları** - Veri bütünlüğü
3. ✅ **CHECK Kısıtlamaları** - Geçerli derecelendirmeler (1-5)
4. ✅ **CASCADE Silmeler** - Otomatik temizlik
5. ✅ **NOT NULL Kısıtlamaları** - Gerekli alanlar zorunlu
6. ✅ **Zaman Damgaları** - Denetim izi

---

## 📊 Veritabanı Bakımı

### **Düzenli Sağlık Kontrolleri**

```sql
-- Veritabanı istatistiklerini kontrol edin
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size,
  pg_stat_get_live_tuples(c.oid) AS row_count
FROM pg_tables t
JOIN pg_class c ON t.tablename = c.relname
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### **Yedekleme Doğrulama**

```sql
-- Toplam kayıtları say
SELECT 
  'books' as table_name,
  COUNT(*) as total_records
FROM books
UNION ALL
SELECT 
  'reviews' as table_name,
  COUNT(*) as total_records
FROM reviews;
```

### **Sahipsiz İncelemeleri Kontrol Edin**

```sql
-- Eşleşen kitabı olmayan incelemeler (boş olmalıdır)
SELECT r.*
FROM reviews r
LEFT JOIN books b ON r.book_id = b.id
WHERE b.id IS NULL;
```

---

## 🎯 Sonraki Adımlar

### **Acil Eylemler:**

1. ✅ **RLS Politikalarını Düzelt** - "Gerekli SQL Düzeltmeleri" bölümünden SQL'i çalıştır
2. ✅ **Kitapları İçe Aktar** - Politikaları düzelttikten sonra `npm run import-books` komutunu çalıştır
3. ✅ **İnceleme Ekle** - `npm run add-reviews` komutunu çalıştırarak incelemeleri doldur
4. ✅ **Verileri Doğrula** - Her şeyin çalıştığını kontrol etmek için SQL sorgularını kullan

### **İsteğe Bağlı Geliştirmeler:**

1. **Tam Metin Arama Dizinleri Ekle** - Daha iyi arama performansı
2. **Veritabanı Fonksiyonları Oluştur** - Derecelendirme hesaplamalarını otomatikleştir
3. **Tetikleyiciler Ekle** - İnceleme eklendiğinde derecelendirmeleri otomatik güncelle
4. **Yumuşak Silmeleri Uygula** - Kurtarma için silinen öğeleri sakla

---

## 📞 Yardıma mı İhtiyacınız Var?

### **Hızlı SQL Yardım Komutları:**

```sql
-- Tüm tabloları listele
\dt

-- Tablo yapısını tanımla
\d books
\d reviews

-- Tüm politikaları göster
SELECT * FROM pg_policies;

-- Tüm dizinleri göster
SELECT * FROM pg_indexes WHERE schemaname = 'public';
```

---

## ✅ Özet

**Veritabanınız:**
- ✅ PostgreSQL via Supabase
- ✅ İyi yapılandırılmış şema
- ✅ Uygun ilişkiler
- ✅ Performans dizinleri
- ⚠️ RLS politikası düzeltmeleri gerekiyor

**Ben hallediyorum:**
- ✅ Tüm SQL işlemleri
- ✅ Şema yönetimi
- ✅ Performans optimizasyonu
- ✅ Güvenlik yapılandırması
- ✅ Veri bütünlüğü

**Sizin yapmanız gerekenler:**
1. RLS düzeltme SQL'ini çalıştır (bir kez)
2. Gerektiğinde sağlanan SQL sorgularını kullan
3. Herhangi bir veritabanı değişikliği gerektiğinde bana bildir

---

**SQL Veritabanı Uzmanınız Hazır!** 🚀
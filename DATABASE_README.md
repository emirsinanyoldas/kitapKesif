# 🗄️ Veritabanı Yönetim Rehberi

**Tam SQL & Veritabanı İşlemleri Referansınız**

SQL Veritabanı Uzmanınız olarak, SQL bilgisi olmadan veritabanınızı yönetmek için ihtiyacınız olan her şeyi kurdum. Bu rehber size tüm otomatik araçların nasıl kullanılacağını gösterir.

---

## 🚀 Hızlı Başlangıç

### 1️⃣ İlk Kurulum (GEREKLİ)

Kitapları içe aktarmadan önce veritabanı izinlerini düzeltmelisiniz:

```bash
# Seçenek A: Otomatik düzeltme (ilk önce bunu deneyin)
npm run fix-db

# Seçenek B: Manuel düzeltme (seçenek A işe yaramazsa)
# FIX_DATABASE_NOW.sql dosyasını açın ve Supabase SQL Düzenleyicide çalıştırın
```

**Neden?** Veritabanınız şu anda INSERT işlemlerini engelliyor. Bu tek seferlik bir düzeltmedir.

### 2️⃣ Veritabanı Sağlığını Kontrol Edin

```bash
npm run check-db
```

Bu kontrolleri yapar:
- ✅ Veritabanı bağlantısı
- ✅ Tablo kayıt sayıları
- ✅ Veri bütünlüğü
- ✅ INSERT izinleri
- ✅ Örnek veri

### 3️⃣ Kitapları İçe Aktar

```bash
npm run import-books
```

Open Library API'den 150+ kitap içe aktarır.

---

## 📋 Mevcut Komutlar

### Veritabanı Sağlığı & Bakımı

| Komut | Açıklama | Ne Zaman Kullanılır |
|-------|----------|---------------------|
| `npm run check-db` | Tam veritabanı sağlık kontrolü | Her zaman, her şeyin çalıştığını doğrulamak için |
| `npm run fix-db` | INSERT/UPDATE izinlerini düzelt | Tek seferlik, kitapları içe aktarmadan önce |
| `npm run backup-db` | Tüm verilerin yedeğini oluştur | Büyük değişikliklerden önce, haftalık yedeklemeler |

### Veri İçe Aktarma & Doldurma

| Komut | Açıklama | Çıktı |
|-------|----------|-------|
| `npm run import-books` | Open Library'den kitapları içe aktar | 150+ kitap 25+ kategoride |
| `npm run add-reviews` | Kitaplara örnek incelemeler ekle | Tüm kitaplar için gerçekçi incelemeler |
| `npm run test-api` | Open Library API bağlantısını test et | API'nin erişilebilir olduğunu doğrular |

### SQL İşlemleri

| Komut | Açıklama | Örnek |
|-------|----------|-------|
| `npm run sql -- "SORGU"` | Özel SQL sorgusu çalıştır | `npm run sql -- "SELECT COUNT(*) FROM books;"` |

---

## 🔧 Detaylı Kullanım

### Veritabanı Sağlık Kontrolü

**Komut:** `npm run check-db`

**Ne yapar:**
- Veritabanınıza bağlanır
- Kitap ve inceleme sayılarını sayar
- Örnek verileri gösterir
- Kategori dağılımını kontrol eder
- Veri bütünlüğünü doğrular
- INSERT izinlerini test eder

**Örnek Çıktı:**
```bash
🏥 Veritabanı Sağlık Kontrolü
1️⃣  Veritabanı bağlantısı kontrol ediliyor...
   ✅ Bağlantı başarılı

2️⃣  Tablo kayıt sayıları kontrol ediliyor...
   📚 Kitaplar: 15 kayıt
   💬 İncelemeler: 33 kayıt
   ✅ Kitaplar tablosu dolduruldu

3️⃣  Örnek veriler kontrol ediliyor...
   ✅ Örnek kitaplar alındı:
      1. "1984" by George Orwell
         Kategori: Distopya | Derecelendirme: 4.9 (521 inceleme)

6️⃣  INSERT izinleri test ediliyor...
   ✅ INSERT izni çalışıyor
```

---

### Veritabanı İzinlerini Düzelt

**Komut:** `npm run fix-db`

**Ne yapar:**
- Satır Seviyesi Güvenlik (RLS) politikalarını düzeltir
- Kitaplar tablosunda INSERT işlemlerini etkinleştirir
- Kitaplar tablosunda UPDATE işlemlerini etkinleştirir
- İncelemeler tablosunda INSERT/UPDATE işlemlerini etkinleştirir

**Ne zaman çalıştırılır:**
- ⚠️ **İlk içe aktarmadan önce gerekli**
- `check-db` "INSERT izni reddedildi" gösterirse
- Veritabanı sıfırlandıktan sonra

**Otomatik düzeltme işe yaramazsa ne olur?**

SQL'i manuel olarak çalıştırın:
1. [`FIX_DATABASE_NOW.sql`](./FIX_DATABASE_NOW.sql) dosyasını açın
2. Tüm SQL'i kopyalayın
3. Şuraya gidin: https://supabase.com/dashboard → Projeniz → SQL Düzenleyici
4. Yapıştırın ve "Run" tıklayın

---

### Kitapları İçe Aktar

**Komut:** `npm run import-books`

**Ne yapar:**
- Open Library API'den kitaplar getirir
- 150+ çeşitli kitap içe aktarır
- 25+ konu ve türü kapsar
- Yinelenenleri kaldırır
- Türkçe uygun içerik ekler

**Kapsanan Konular:**
- Klasik Edebiyat
- Bilim Kurgu
- Fantastik
- Felsefe
- Psikoloji
- Tarih
- Bilim
- Sanat
- Biyografi
- Ve daha fazlası!

**Örnek Çıktı:**
```bash
📚 Open Library Kitap İçe Aktarma Aracı
25 çeşitli konu boyunca kitaplar toplanıyor...

İlerleme: ████████████████████ 100% (25/25 konu)

✅ Kitap koleksiyonu tamamlandı!
📊 İçe aktarılacak kitaplar: 186 benzersiz kitap

Veritabanına içe aktarma başlatılıyor...
İlerleme: ████████████████████ 100% (186/186)

✅ İçe aktarma tamamlandı!
Başarı: 186 kitap
```

**Not:** Önce `npm run fix-db` çalıştırılmalıdır!

---

### Veritabanını Yedekle

**Komut:** `npm run backup-db`

**Ne yapar:**
- Tüm kitapları ve incelemeleri JSON'a dışa aktarır
- `backups/` dizinine kaydeder
- Meta verileri ve zaman damgalarını içerir
- Kategori dağılımını gösterir

**Örnek Çıktı:**
```bash
💾 Veritabanı Yedekleme Aracı

📚 Kitaplar yedekleniyor...
   ✅ 186 kitap alındı
💬 İncelemeler yedekleniyor...
   ✅ 450 inceleme alındı

✅ Yedekleme başarıyla tamamlandı!

📊 Yedekleme Özeti:
   • Kitaplar: 186
   • İncelemeler: 450
   • Dosya boyutu: 2.45 MB
   • Konum: backups/backup_2025-10-17T14-30-00.json

📂 Yedeklenen kategoriler:
   • Kurgu: 45 kitap
   • Fantastik: 32 kitap
   • Bilim: 28 kitap
   ...
```

---

### Veritabanını Geri Yükle

**Komut:** `npm run restore-db -- "yedek_dosya_adı.json"`

**Ne yapar:**
- Kitapları ve incelemeleri yedekten geri yükler
- Derecelendirmeleri yeniden hesaplar
- Mevcut verilerle birleştirebilir veya değiştirebilir

**Seçenekler:**
```bash
# Mevcut verilerle birleştir (varsayılan - güvenli)
npm run restore-db -- "backup_2025-10-17T14-30-00.json"

# Tüm verileri temizle ve geri yükle (TEHLİKELİ!)
npm run restore-db -- "backup_2025-10-17T14-30-00.json" --clear
```

**Mevcut yedekleri listele:**
```bash
npm run restore-db
```

---

### Özel SQL Çalıştır

**Komut:** `npm run sql -- "SQL_SORGUNUZ"`

**Örnekler:**

```bash
# Tüm kitapları say
npm run sql -- "SELECT COUNT(*) FROM books;"

# En iyi dereceli kitapları al
npm run sql -- "SELECT title, author, average_rating FROM books ORDER BY average_rating DESC LIMIT 5;"

# Kategoriye göre kitap say
npm run sql -- "SELECT category, COUNT(*) FROM books GROUP BY category;"
```

**Daha fazla sorgu için:** [`SQL_OPERATIONS.md`](./SQL_OPERATIONS.md)

---

## 📚 Referans Dosyaları

| Dosya | Açıklama |
|-------|----------|
| [`DATABASE_GUIDE.md`](./DATABASE_GUIDE.md) | Tam veritabanı belgeleri (600+ satır) |
| [`SQL_OPERATIONS.md`](./SQL_OPERATIONS.md) | Yaygın görevler için kullanıma hazır SQL sorguları |
| [`FIX_DATABASE_NOW.sql`](./FIX_DATABASE_NOW.sql) | Kritik izin düzeltmesi (bir kez çalıştır) |

---

## 🎯 Yaygın İş Akışları

### Yeni Veritabanı Kurulumu

```bash
1. npm run fix-db              # İzinleri düzelt
2. npm run import-books        # Kitapları içe aktar
3. npm run add-reviews         # İncelemeler ekle
4. npm run check-db            # Her şeyi doğrula
5. npm run backup-db           # İlk yedek oluştur
```

### Haftalık Bakım

```bash
1. npm run backup-db           # Yedek oluştur
2. npm run check-db            # Sağlık kontrolü
```

### Değişiklik Yaptıktan Sonra

```bash
1. npm run check-db            # Değişiklikleri doğrula
2. npm run backup-db           # Yeni durumu yedekle
```

### Felaket Kurtarma

```bash
1. npm run restore-db          # Yedekleri listele
2. npm run restore-db -- "yedek_dosya.json"  # Geri yükle
3. npm run check-db            # Geri yüklemeyi doğrula
```

---

## 🔍 Sorun Giderme

### Sorun: "INSERT izni reddedildi"

**Çözüm:**
```bash
npm run fix-db
```

Veya [`FIX_DATABASE_NOW.sql`](./FIX_DATABASE_NOW.sql) dosyasını Supabase SQL Düzenleyicide manuel olarak çalıştırın.

---

### Sorun: "Veritabanında kitap yok"

**Çözüm:**
```bash
# Önce izinlerin düzeltildiğini kontrol edin
npm run check-db

# İzinler TAMAMSA, kitapları içe aktarın
npm run import-books
```

---

### Sorun: "Yanlış kitap derecelendirmeleri"

**Çözüm:** Supabase SQL Düzenleyicide bu SQL'i çalıştırın:
```sql
UPDATE books
SET 
  average_rating = COALESCE((
    SELECT ROUND(AVG(rating)::numeric, 1)
    FROM reviews WHERE book_id = books.id
  ), 0),
  total_reviews = (
    SELECT COUNT(*) FROM reviews WHERE book_id = books.id
  );
```

Veya [`SQL_OPERATIONS.md`](./SQL_OPERATIONS.md) → "Kitap Derecelendirmelerini Yeniden Hesapla" bölümüne bakın

---

### Sorun: "Yavaş sorgular"

**Çözüm:** Performans dizinleri eklemek için bu SQL'i çalıştırın:
```sql
CREATE INDEX IF NOT EXISTS idx_books_title_search 
ON books USING gin(to_tsvector('english', title));

CREATE INDEX IF NOT EXISTS idx_books_category_rating 
ON books(category, average_rating DESC);
```

[`SQL_OPERATIONS.md`](./SQL_OPERATIONS.md) → "Performans Optimizasyonu" bölümüne bakın

---

### Sorun: "Veritabanı istatistiklerini görmek istiyorum"

**Çözüm:**
```bash
npm run check-db
```

Veya bu SQL'i çalıştırın:
```bash
npm run sql -- "SELECT (SELECT COUNT(*) FROM books) as books, (SELECT COUNT(*) FROM reviews) as reviews;"
```

---

## 🛠️ Veritabanı Yapısı

### Kitaplar Tablosu

| Sütun | Tür | Açıklama |
|-------|-----|----------|
| `id` | UUID | Benzersiz tanımlayıcı (otomatik oluşturulan) |
| `title` | TEXT | Kitap başlığı |
| `author` | TEXT | Yazar adı |
| `description` | TEXT | Kitap açıklaması |
| `cover_image` | TEXT | Kapak görseli URL'si |
| `back_cover_image` | TEXT | Arka kapak URL'si (isteğe bağlı) |
| `category` | TEXT | Tür/kategori |
| `average_rating` | NUMERIC | Hesaplanan ortalama (0-5) |
| `total_reviews` | INTEGER | İnceleme sayısı |
| `created_at` | TIMESTAMP | Kitabın eklendiği zaman |

### İncelemeler Tablosu

| Sütun | Tür | Açıklama |
|-------|-----|----------|
| `id` | UUID | Benzersiz tanımlayıcı (otomatik oluşturulan) |
| `book_id` | UUID | Kitaplar tablosuna bağlar (yabancı anahtar) |
| `user_name` | TEXT | İnceleyenin adı |
| `user_avatar` | TEXT | İnceleyenin avatar URL'si |
| `rating` | INTEGER | 1-5 yıldız (doğrulanmış) |
| `comment` | TEXT | İnceleme metni |
| `created_at` | TIMESTAMP | İncelemenin yayınlandığı zaman |

### İlişkiler

```
books (1) ←──── (Çok) reviews
  └── Bir kitabın birçok incelemesi olabilir
  └── Kitap silinirse, tüm incelemeleri silinir (CASCADE)
```

---

## 📊 Veritabanı Kontrol Paneli

**Supabase Kontrol Panelinize Erişin:**

1. Şuraya gidin: https://supabase.com/dashboard
2. Projenizi seçin
3. Bu araçları kullanın:
   - **Table Editor** - Verileri görsel olarak görüntüleyin/düzenleyin
   - **SQL Editor** - Özel sorgular çalıştırın
   - **Database** - Yapıyı ve politikaları görün
   - **Logs** - Sorguları ve hataları izleyin

---

## 🎓 SQL Öğrenme (İsteğe Bağlı)

Bu projeyi kullanmak için SQL öğrenmeniz gerekmez, ama merak ediyorsanız:

- **Yaygın sorguları görün:** [`SQL_OPERATIONS.md`](./SQL_OPERATIONS.md)
- **Yapıyı anlayın:** [`DATABASE_GUIDE.md`](./DATABASE_GUIDE.md)
- **Güvenli bir şekilde pratik yapın:** `npm run sql -- "SELECT * FROM books LIMIT 5;"` komutunu kullanın

Tüm sorgular belgelenmiştir ve kopyalayıp yapıştırılabilir!

---

## ✅ Özet

**Artık tam veritabanı kontrolüne sahipsiniz:**

✅ **Otomatik Araçlar** - SQL bilgisi gerekmez  
✅ **Sağlık İzleme** - Veritabanı durumunu istediğiniz zaman kontrol edin  
✅ **Veri İçe Aktarma** - 150+ kitap içe aktarmaya hazır  
✅ **Yedekleme & Geri Yükleme** - Verilerinizi koruyun  
✅ **Özel Sorgular** - Gerektiğinde SQL çalıştırın  
✅ **Tam Belgeme** - Her işlem belgelenmiştir  
✅ **Sorun Giderme** - Yaygın sorunlar için çözümler  

**SQL Veritabanı Uzmanınız her şeyi kurdu!** 🚀

Sadece komutları çalıştırın ve tüm SQL karmaşasını ben halledeceğim.

---

## 🆘 Yardıma mı İhtiyacınız Var?

Herhangi bir sorunla karşılaşırsanız:

1. `npm run check-db` komutunu çalıştırarak teşhis yapın
2. Çıktıda belirli hata mesajlarını arayın
3. Yukarıdaki "Sorun Giderme" bölümünde hatayı bulun
4. Ayrıntılı belgeler için referans dosyalarına bakın
5. Hata mesajını bana bildirin ve size tam SQL'i oluşturayım!

**Unutmayın:** SQL'i kendiniz yazmanıza gerek yok. Tüm işlemler otomatikleştirilmiştir veya sizin için önceden yazılmıştır!
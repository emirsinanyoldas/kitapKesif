# Open Library Entegrasyon Rehberi

Bu rehber, Open Library API'sinden KitapKeşif veritabanınıza kitapları nasıl içe aktaracağınızı açıklar.

## 🎯 Genel Bakış

Open Library entegrasyonu şunları yapmanızı sağlar:
- 📚 Yüzlerce kitabı otomatik olarak içe aktar
- 🔍 Kitapları anahtar kelimelere, başlıklara veya konulara göre ara
- 🖼️ Kitap kapak resimlerini otomatik olarak getir
- 📊 Kitapları kategorilere göre organize et
- 💾 Supabase veritabanına toplu ekleme yap

## 🗂️ Eklenen Yeni Dosyalar

### 1. `src/services/openLibraryService.ts`
Open Library API entegrasyonu için TypeScript servisi:
- Arama işlevselliği
- Kapak resmi URL oluşturma
- Kitap veri dönüştürme
- Kategori eşleme

### 2. `scripts/import-books.js`
Open Library'den kitap içe aktarmak için Node.js scripti:
- 25+ çeşitli konudan kitap getirir
- Yinelenenleri kaldırır
- Supabase'e toplu ekleme yapar
- İlerleme günlüğü tutar

### 3. `supabase/migrations/20251016000000_import_open_library_books.sql`
Manuel ekleme için örnek kitaplarla SQL geçişi.

## 🚀 Hızlı Başlangıç

### Yöntem 1: İçe Aktarma Scriptini Kullanma (Önerilen)

1. **`.env` dosyanızın Supabase kimlik bilgilerine sahip olduğundan emin olun:**
```env
VITE_SUPABASE_URL=supabase_url_niz
VITE_SUPABASE_ANON_KEY=anon_anahtarınız
```

2. **İçe aktarma scriptini çalıştırın:**
```bash
npm run import-books
```

Bu işlem:
- Çeşitli kategorilerden ~300+ kitap getirir
- Yinelenenleri kaldırır
- Veritabanınıza ekler
- İlerleme ve istatistikleri gösterir

### Yöntem 2: SQL Geçişi Kullanma

1. **Supabase SQL Düzenleyiciyi açın**
2. **İçeriği kopyalayıp yapıştırın:**
   `supabase/migrations/20251016000000_import_open_library_books.sql`
3. **Örnek kitapları eklemek için SQL'i çalıştırın**

### Yöntem 3: Kodda Servisi Kullanma

```typescript
import { OpenLibraryService } from './services';

// Kitap ara
const { data, error } = await OpenLibraryService.searchBooks('fantazi', 20);

// Veritabanı için dönüştür
const books = data
  .map(book => OpenLibraryService.transformToBook(book))
  .filter(book => book !== null);

// Supabase'e ekle
const { error: insertError } = await supabase
  .from('books')
  .insert(books);
```

## 📚 İçe Aktarma Kategorileri

İçe aktarma scripti bu konulardan kitap getirir:

**Kurgu:**
- Fantazi, Gizem/Gerilim, Bilim Kurgu, Romantik, Tarihi Kurgu

**Kurgu Dışı:**
- Biyografi, Tarih, Felsefe, Psikoloji, İş

**Bilim ve Teknoloji:**
- Bilgisayar Bilimi, Fizik, Biyoloji, Teknoloji

**Sanat ve Kültür:**
- Sanat Tarihi, Müzik, Fotoğrafçılık, Şiir

**Kişisel Gelişim:**
- Kendi Kendine Yardım, Motivasyon, Verimlilik

**Diğerleri:**
- Macera, Drama, Klasik Edebiyat

## 🎨 Kitap Veri Yapısı

Her içe aktarılan kitap şunları içerir:

```typescript
{
  title: string;           // Kitap başlığı
  author: string;          // Ana yazar
  description: string;     // Meta veriden otomatik oluşturulmuş
  cover_image: string;     // Büyük kapak (L boyutu)
  back_cover_image: string | null; // Orta kapak (M boyutu)
  category: string;        // Otomatik algılanan kategori
  average_rating: 0;       // Varsayılan puan
  total_reviews: 0;        // Varsayılan inceleme sayısı
}
```

## 🔧 Özelleştirme

### Konu Başına Kitap Sayısını Değiştirme

`scripts/import-books.js` dosyasını düzenleyin:

```javascript
const openLibBooks = await fetchBooksFromOpenLibrary(query, 15); // 15'i istediğiniz sayı ile değiştirin
```

### Daha Fazla Konu Ekleme

`scripts/import-books.js` dosyasındaki `SEARCH_QUERIES` dizisini düzenleyin:

```javascript
const SEARCH_QUERIES = [
  // ... mevcut sorgular
  'özel konunuz',
  'başka bir konu',
];
```

### Kategori Eşlemesini Değiştirme

Aşağıdaki dosyalardaki `determineCategory()` fonksiyonunu düzenleyin:
- `src/services/openLibraryService.ts` (TypeScript)
- `scripts/import-books.js` (JavaScript)

## 📊 Kullanılan API Uç Noktaları

### Kitap Arama
```
GET https://openlibrary.org/search.json?q={sorgu}&limit={limit}
```

**Yanıt:**
```json
{
  "numFound": 1234,
  "docs": [
    {
      "title": "Kitap Başlığı",
      "author_name": ["Yazar Adı"],
      "first_publish_year": 2020,
      "isbn": ["9781234567890"],
      "subject": ["konu1", "konu2"],
      "cover_i": 12345
    }
  ]
}
```

### Kitap Kapakları

**ISBN ile:**
```
https://covers.openlibrary.org/b/isbn/{ISBN}-{boyut}.jpg
```

**Kapak ID ile:**
```
https://covers.openlibrary.org/b/id/{kapak_id}-{boyut}.jpg
```

**Boyutlar:** S (küçük), M (orta), L (büyük)

## ⚠️ Önemli Notlar

1. **Oran Sınırlama:** API sınırlarına saygı duymak için script, istekler arasında 1 saniyelik gecikmeler içerir
2. **Yinelenenler:** Kitaplar içe aktarma sırasında başlığa göre yinelenenlerden arındırılır
3. **Kapak Resimleri:** Bazı kitapların kapak resimleri olmayabilir (yedek resim kullanılır)
4. **Toplu İş Boyutu:** Optimum performans için kitaplar 50'lik gruplar halinde eklenir
5. **Ortam Değişkenleri:** Script çalıştırması için gereklidir

## 🐛 Sorun Giderme

### "Missing Supabase credentials" hatası
- `.env` dosyasının proje kök dizininde olduğundan emin olun
- `VITE_SUPABASE_URL` ve `VITE_SUPABASE_ANON_KEY` değerlerinin ayarlandığını doğrulayın

### Kitap içe aktarılmadı
- İnternet bağlantınızı kontrol edin
- Supabase'in erişilebilir olduğunu doğrulayın
- API hataları için konsolu kontrol edin

### Yinelenen anahtar hataları
- Bazı kitaplar veritabanında zaten mevcut olabilir
- Script yinelenenleri atlayıp devam edecektir

### Kapak resimleri yüklenmiyor
- Open Library tüm kitaplar için kapaklara sahip olmayabilir
- Yedek resimler otomatik olarak kullanılır

## 📈 Beklenen Sonuçlar

`npm run import-books` komutunu çalıştırmak genellikle şunları içe aktarır:
- **~300+ benzersiz kitap**
- **15+ farklı kategori**
- **25+ çeşitli konudan**

Süre: ~2-3 dakika (oran sınırlaması nedeniyle)

## 🎯 Sonraki Adımlar

Kitapları içe aktardıktan sonra:

1. **İncelemeler Ekle:** İncelemeleri doldurmak için `npm run add-reviews` komutunu çalıştırın
2. **Veriyi Doğrula:** Supabase kontrol panelinizi kontrol edin
3. **Ön Yüzü Test Et:** Kitapları UI'da görmek için `npm run dev` komutunu çalıştırın
4. **Özelleştir:** Sorguları/kategorileri gerektiği gibi değiştirin

## 📝 API Referansı

### OpenLibraryService Metotları

```typescript
// Kitap ara
searchBooks(query: string, limit?: number): Promise<{data, error}>

// ISBN'den kapak URL'si al
getCoverImageUrl(isbn: string, size?: 'S'|'M'|'L'): string

// ID'den kapak URL'si al
getCoverImageUrlById(coverId: number, size?: 'S'|'M'|'L'): string

// API yanıtını Kitap türüne dönüştür
transformToBook(openLibBook: OpenLibraryBook): Partial<Book> | null

// İçe aktarma için hazır kitapları getir
fetchBooksForImport(queries: string[], booksPerQuery?: number): Promise<{data, error}>
```

## 🌟 İpuçları

- Daha iyi API performansı için kitapları yoğun olmayan saatlerde içe aktarın
- Entegrasyonu test etmek için daha az konuyla başlayın
- Hatalar için konsol çıktısını izleyin
- Sorunlar devam ederse Supabase günlüklerini kontrol edin

---

**İyi Okumalar! 📚✨**

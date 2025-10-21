# KitapKeşif - Kitap Keşfetme ve İnceleme Platformu

React, TypeScript ve Supabase ile oluşturulmuş modern, duyarlı bir kitap keşfetme ve inceleme platformu.

## 🏗️ Mimari

Bu proje, endüstriyel en iyi uygulamalara dayanan temiz, modüler bir mimari izler:

### Dizin Yapısı

```
src/
├── components/          # React bileşenleri (UI katmanı)
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── BookCard.tsx
│   ├── BookModal.tsx
│   ├── SearchBar.tsx
│   ├── ScrollToTop.tsx
│   └── AIAssistant.tsx
├── hooks/              # Özel React hook'ları (iş mantığı)
│   ├── useTheme.ts     # Tema yönetimi hook'u
│   ├── useBooks.ts     # Kitap veri yönetimi hook'u
│   ├── useBookModal.ts # Kitap modal durumu hook'u
│   └── index.ts
├── services/           # Servis katmanı (API ve iş mantığı)
│   ├── bookService.ts   # Kitap ile ilgili API çağrıları
│   ├── reviewService.ts # İnceleme ile ilgili API çağrıları
│   ├── themeService.ts  # Tema yönetimi mantığı
│   └── index.ts
├── utils/              # Yardımcı fonksiyonlar
│   ├── helpers.ts      # Ortak yardımcı fonksiyonlar
│   └── index.ts
├── constants/          # Uygulama sabitleri
│   └── index.ts        # Sabitler ve mesajlar
├── lib/                # Üçüncü taraf kütüphane yapılandırmaları
│   └── supabase.ts     # Supabase istemcisi
├── types.ts            # TypeScript tip tanımlamaları
├── App.tsx             # Ana uygulama bileşeni
├── main.tsx            # Uygulama giriş noktası
└── index.css           # Genel stiller
```

## 🎨 Tasarım Kalıpları

### 1. **İşlerin Ayrılması**
- **Bileşenler**: Saf sunum bileşenleri (sadece UI)
- **Hook'lar**: İş mantığı ve durum yönetimi
- **Servisler**: API çağrıları ve veri dönüştürme
- **Yardımcılar**: Yeniden kullanılabilir yardımcı fonksiyonlar

### 2. **Özel Hook'lar Kalıbı**
- `useTheme`: Tema durumu ve kalıcılığını yönetir
- `useBooks`: Kitap veri getirme, filtreleme ve aramayı işler
- `useBookModal`: Modal durumu ve inceleme yüklemeyi yönetir

### 3. **Servis Katmanı Kalıbı**
- `BookService`: Merkezi kitap ile ilgili işlemler
- `ReviewService`: Merkezi inceleme ile ilgili işlemler
- `ThemeService`: Tema yönetimi yardımcıları

### 4. **Performans Optimizasyonları**
- Gereksiz yeniden oluşturmaları önlemek için tüm bileşenlerde React.memo
- Hook'larda kararlı fonksiyon referansları için useCallback
- Lazy loading ve kod bölme hazır

## 🚀 Özellikler

- **Tema Yönetimi**: Kalıcı açık/koyu mod
- **Kitap Keşfi**: Kitaplara göz atma, arama ve filtreleme
- **İncelemeler**: Kitap incelemelerini okuma ve görüntüleme
- **Duyarlı Tasarım**: Mobil öncelikli yaklaşım
- **Modern UI**: Gradyan arka planlar, düzgün geçişler

## 🛠️ Teknolojiler

- **React 18** - UI kütüphanesi
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Stil
- **Supabase** - Arka uç ve Veritabanı
- **Vite** - Derleme aracı
- **Lucide React** - İkonlar

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu çalıştır
npm run dev

# Üretim için derle
npm run build

# Üretim derlemesini önizle
npm run preview
```

## 🔧 Ortam Değişkenleri

Kök dizinde bir `.env` dosyası oluşturun:

```env
VITE_SUPABASE_URL=supabase_url_niz
VITE_SUPABASE_ANON_KEY=supabase_anon_anahtarınız
```

## 📝 Kod Kalitesi

### TypeScript
- Sıkı tip kontrolü etkin
- Tüm bileşenler düzgün bir şekilde tiplenmiş
- Hiçbir yerde `any` tipi kullanılmamış

### Kod Organizasyonu
- Tek Sorumluluk İlkesi
- DRY (Kendini Tekrarlama)
- Tutarlı adlandırma kuralları
- Uygun hata işleme

### Performans
- Belleğe alınmış bileşenler
- Optimize edilmiş yeniden oluşturmalar
- Verimli durum yönetimi

## 🎯 Uygulanan En İyi Uygulamalar

1. **Bileşen Yapısı**: Her bileşenin tek bir sorumluluğu vardır
2. **Tip Güvenliği**: Tam TypeScript kapsamı
3. **Hata İşleme**: Uygun hata durumları ve kullanıcı geri bildirimi
4. **Yükleme Durumları**: Kullanıcı dostu yükleme göstergeleri
5. **Sabitler**: Sihirli dizgiler veya sayılar yok
6. **Yeniden Kullanılabilirlik**: Paylaşılan yardımcılar ve servisler
7. **Bakım Kolaylığı**: Net kod organizasyonu ve belgeler

## 📄 Lisans

MIT Lisansı - bu projeyi öğrenme ve geliştirme için özgürce kullanabilirsiniz.

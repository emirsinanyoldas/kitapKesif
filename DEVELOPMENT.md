# Geliştirme Rehberi

## 🎯 Yeni Özellikler Nasıl Eklenir

### Yeni Bir Servis Ekleme

1. `src/services/` dizininde yeni bir servis dosyası oluşturun:
```typescript
// src/services/yourService.ts
export class YourService {
  static async yourMethod(): Promise<{ data: any; error: Error | null }> {
    try {
      // Mantığınız burada
      return { data: result, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }
}
```

2. `src/services/index.ts` dosyasında dışa aktarın:
```typescript
export { YourService } from './yourService';
```

### Yeni Bir Hook Ekleme

1. `src/hooks/` dizininde yeni bir hook dosyası oluşturun:
```typescript
// src/hooks/useYourHook.ts
import { useState, useEffect } from 'react';

export function useYourHook() {
  const [state, setState] = useState();
  
  // Mantığınız burada
  
  return { state, /* diğer değerler */ };
}
```

2. `src/hooks/index.ts` dosyasında dışa aktarın:
```typescript
export { useYourHook } from './useYourHook';
```

### Yeni Bir Bileşen Ekleme

1. `src/components/` dizininde yeni bir bileşen dosyası oluşturun:
```typescript
// src/components/YourComponent.tsx
import { memo } from 'react';

interface YourComponentProps {
  // Özellikleriniz
}

export const YourComponent = memo(function YourComponent({ }: YourComponentProps) {
  return (
    <div>
      {/* JSX'iniz */}
    </div>
  );
});
```

### Yeni Sabitler Ekleme

`src/constants/index.ts` dosyasına ekleyin:
```typescript
export const YOUR_CONSTANT = 'value';
```

### Yeni Yardımcı Fonksiyonlar Ekleme

`src/utils/helpers.ts` dosyasına ekleyin:
```typescript
export function yourHelper(param: string): string {
  // Mantığınız
  return result;
}
```

## 🧪 Test Rehberi

### Servislerin Birim Testi
```typescript
import { BookService } from '../services';

describe('BookService', () => {
  it('should filter books by query', () => {
    const books = [/* test verisi */];
    const result = BookService.filterBooks(books, 'query');
    expect(result).toHaveLength(1);
  });
});
```

### Hook'ların Testi
```typescript
import { renderHook } from '@testing-library/react-hooks';
import { useBooks } from '../hooks';

describe('useBooks', () => {
  it('should fetch books on mount', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useBooks());
    await waitForNextUpdate();
    expect(result.current.books).toBeDefined();
  });
});
```

### Bileşenlerin Testi
```typescript
import { render, screen } from '@testing-library/react';
import { BookCard } from '../components';

describe('BookCard', () => {
  it('should render book title', () => {
    const book = {/* sahte veri */};
    render(<BookCard book={book} onClick={() => {}} />);
    expect(screen.getByText(book.title)).toBeInTheDocument();
  });
});
```

## 📝 Kod Stili Rehberi

### Adlandırma Kuralları

- **Bileşenler**: PascalCase (`BookCard`, `Header`)
- **Hook'lar**: `use` önekiyle camelCase (`useTheme`, `useBooks`)
- **Servisler**: `Service` sonekiyle PascalCase (`BookService`)
- **Yardımcılar**: camelCase (`formatDate`, `scrollToTop`)
- **Sabitler**: UPPER_SNAKE_CASE (`THEME_STORAGE_KEY`)

### Dosya Organizasyonu

```
ComponentName.tsx
├── İçe Aktarımlar (gruplandırılmış: react, üçüncü taraf, yerel)
├── Türler/Arayüzler
├── Bileşen Tanımı (memo ile)
└── Dışa Aktarma
```

### TypeScript Rehberi

- Fonksiyonlar için her zaman dönüş türlerini belirtin
- Nesne şekilleri için arayüzleri kullanın
- `any` türünden kaçının
- Uygun generic'leri kullanın
- Karmaşık türleri belgeleyin

### Bileşen Rehberi

- Fonksiyonel bileşenler kullanın
- Performans için `memo` ile sarın
- Bileşenleri küçük ve odaklı tutun
- Mantığı hook'lara çıkarın
- Özellikler arayüzler olmalıdır

### Hook Rehberi

- `use` önekiyle başlayın
- İsimlendirilmiş değerlerle bir nesne döndürün
- Fonksiyonlar için `useCallback` kullanın
- Hesaplanmış değerler için `useMemo` kullanın
- Hataları uygun şekilde işleyin

### Servis Rehberi

- Statik metotlar kullanın
- `{ data, error }` kalıbını döndürün
- Tüm hataları işleyin
- JSDoc yorumları ekleyin
- Metotları odaklı tutun

## 🔧 Yaygın Görevler

### Tema Renklerini Güncelleme

`tailwind.config.js` dosyasını düzenleyin ve bileşenleri güncelleyin:
```typescript
// Açık mod: from-orange-100
// Koyu mod: dark:from-slate-900
```

### Yeni API Uç Noktası Ekleme

1. Uygun servise metot ekleyin
2. Servisi kullanmak için hook oluşturun/güncelleyin
3. Hook'u kullanmak için bileşeni güncelleyin

### Yükleme Durumları Ekleme

```typescript
const [loading, setLoading] = useState(false);

try {
  setLoading(true);
  // Asenkron işleminiz
} finally {
  setLoading(false);
}
```

### Hata İşleme Kalıbı

```typescript
const [error, setError] = useState<string | null>(null);

try {
  setError(null);
  const { data, error: fetchError } = await Service.method();
  if (fetchError) {
    setError('Kullanıcı dostu mesaj');
    console.error('Detaylı hata:', fetchError);
  }
} catch (e) {
  setError('Beklenmeyen hata');
  console.error(e);
}
```

## 🚀 Performans İpuçları

1. **React.memo** kullanın tüm bileşenler için
2. **useCallback** kullanın olay işleyicileri için
3. **useMemo** kullanın maliyetli hesaplamalar için
4. **Lazy load** bileşenleri mümkün olduğunda
5. **Görüntüleri optimize** edin (WebP, lazy loading)
6. **Kod bölme** büyük özellikler için

## 🐛 Hata Ayıklama

### Yaygın Sorunlar

1. **Tema uygulanmıyor**: `tailwind.config.js` dosyasında `darkMode: 'class'` olduğundan emin olun
2. **Veri yüklenmiyor**: .env dosyasındaki Supabase kimlik bilgilerini kontrol edin
3. **TypeScript hataları**: `npm run typecheck` komutunu çalıştırın
4. **Stil sorunları**: Tarayıcı önbelleğini temizleyin

### Hata Ayıklama Araçları

- React DevTools
- Redux DevTools (kullanıyorsanız)
- API çağrıları için Ağ sekmesi
- Hatalar için Konsol

## 📚 Kaynaklar

- [React Belgeleri](https://react.dev)
- [TypeScript El Kitabı](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase Belgeleri](https://supabase.com/docs)

## 🤝 Katkıda Bulunma

1. Özellik dalı oluşturun
2. Kod stilini takip edin
3. Testler ekleyin
4. Belgeleri güncelleyin
5. PR gönderin

## ✅ Commit Öncesi Kontrol Listesi

- [ ] Kod stil rehberlerini takip eder
- [ ] TypeScript hatası yok
- [ ] Üretimde console.log yok
- [ ] Bileşenler belleğe alınmış
- [ ] Hata işleme yerinde
- [ ] Yükleme durumları uygulanmış
- [ ] Türler uygun şekilde tanımlanmış
- [ ] Sabitler kullanılmış (sihirli değerler yok)

# 🎨 Önizleme Rehberi - Preview Guide

## 🚀 Projenizi Önizleme Yöntemleri

---

## Yöntem 1: Development Server (Geliştirme Sunucusu) - En Kolay

### Adım 1: Development Server'ı Başlatın

Terminal'de şu komutu çalıştırın:

```bash
npm run dev
```

### Adım 2: Tarayıcıda Açın

Server başladığında şu mesajı göreceksiniz:

```
VITE v5.4.8 ready in 898 ms
➜ Local:   http://localhost:5173/
➜ Network: use --host to expose
```

**3 farklı yolla açabilirsiniz:**

#### A) Qoder IDE'de Preview Button 🔵

1. IDE'de sağ üstte **Preview** butonu görünecek
2. Butona tıklayın
3. Önizleme otomatik açılır!

#### B) Link'e Tıklayarak 🖱️

1. Terminal'deki `http://localhost:5173/` linkine **Ctrl + Click** yapın
2. Tarayıcınızda otomatik açılır

#### C) Manuel Olarak 🌐

1. Tarayıcınızı açın (Chrome, Firefox, Edge, vb.)
2. Adres çubuğuna yazın: `http://localhost:5173/`
3. Enter'a basın

---

## Yöntem 2: Production Preview (Production Önizleme)

Production build'i önizlemek için:

### Adım 1: Build Yapın

```bash
npm run build
```

Bu komut `dist` klasörü oluşturur.

### Adım 2: Preview Server'ı Başlatın

```bash
npm run preview
```

### Adım 3: Açın

```
➜ Local:   http://localhost:4173/
```

Bu adresi tarayıcınızda açın.

---

## 🎯 Hangi Yöntemi Kullanmalıyım?

### Development Server (`npm run dev`) - Önerilen ✅

**Ne zaman kullanılır:**
- Kod yazarken
- Test ederken
- Geliştirme yaparken

**Avantajları:**
- ⚡ Çok hızlı başlar
- 🔄 Hot Module Replacement (HMR)
- 🎨 Kod değişikliklerini anında görürsünüz
- 🐛 Debug için uygun

**Nasıl kullanılır:**
```bash
# Terminal'de
npm run dev

# Tarayıcıda
http://localhost:5173/
```

---

### Production Preview (`npm run preview`) - Test İçin 🧪

**Ne zaman kullanılır:**
- Production'a göndermeden önce test
- Build sonrasını görmek için
- Performance testi için

**Avantajları:**
- 📦 Gerçek build'i gösterir
- ⚡ Optimizasyonları test edersiniz
- 🎯 Son haline yakın

**Nasıl kullanılır:**
```bash
# Önce build yapın
npm run build

# Sonra preview'ı açın
npm run preview

# Tarayıcıda
http://localhost:4173/
```

---

## 🔥 Hot Module Replacement (HMR) Nedir?

Development server çalışırken:

1. **Kod değiştirin** → Dosyayı kaydedin
2. **Otomatik güncelleme** → Tarayıcı anında yenilenir
3. **State korunur** → Sayfa baştan yüklenmez

### Örnek:

```typescript
// BookCard.tsx dosyasında bir renk değiştirin
className="text-orange-600"  // eski
className="text-blue-600"    // yeni

// Kaydet (Ctrl + S)
// Tarayıcıda anında değişir! 🎉
```

---

## 🌐 Mobil Cihazlarda Önizleme

Telefonunuz veya tabletinizde test etmek için:

### Adım 1: Network Adresini Bulun

Server'ı `--host` ile başlatın:

```bash
npm run dev -- --host
```

Şu çıktıyı göreceksiniz:

```
➜ Local:   http://localhost:5173/
➜ Network: http://192.168.1.100:5173/
```

### Adım 2: Mobil Cihazda Açın

1. Mobil cihazınız **aynı WiFi**'de olmalı
2. Mobil tarayıcıda `Network` adresini açın
3. Örnek: `http://192.168.1.100:5173/`

---

## 🎨 Qoder IDE Preview Features

### Preview Button Kullanımı:

1. **Development server çalışırken**
2. IDE'de **Preview** butonu belirir
3. Butona tıklayın
4. Built-in browser açılır
5. Kod değiştirin → Otomatik yenilenir

### Preview Özellikleri:

- ✅ Entegre tarayıcı
- ✅ Otomatik yenileme
- ✅ Developer tools
- ✅ Responsive görünüm
- ✅ Console görüntüleme

---

## 🐛 Sorun Giderme

### Server Başlamıyor?

```bash
# Port kullanımda olabilir, farklı port deneyin:
npm run dev -- --port 3000
```

### Sayfa Yüklenmiyor?

1. **Server çalışıyor mu kontrol edin**
   ```bash
   # Terminal'de "VITE ready" mesajı var mı?
   ```

2. **Doğru adresi kullanıyor musunuz?**
   ```
   ✅ http://localhost:5173/
   ❌ https://localhost:5173/  (https değil!)
   ```

3. **Firewall sorunu mu var?**
   - Windows Firewall'da port 5173'ü açın

### Değişiklikler Görünmüyor?

1. **Hard Refresh yapın:**
   - Windows: `Ctrl + F5`
   - Mac: `Cmd + Shift + R`

2. **Cache'i temizleyin:**
   - `Ctrl + Shift + Delete`
   - "Cached images and files" seçin
   - Clear

3. **Server'ı yeniden başlatın:**
   ```bash
   # Terminal'de Ctrl + C
   # Sonra tekrar:
   npm run dev
   ```

---

## 📱 Responsive Test

Farklı ekran boyutlarında test etmek için:

### Chrome DevTools:

1. `F12` tuşuna basın
2. `Ctrl + Shift + M` (Toggle device toolbar)
3. Cihaz seçin:
   - iPhone 12 Pro
   - iPad
   - Desktop
   - Custom size

### Farklı Tarayıcılarda Test:

```
✅ Chrome:  http://localhost:5173/
✅ Firefox: http://localhost:5173/
✅ Edge:    http://localhost:5173/
✅ Safari:  http://localhost:5173/ (Mac)
```

---

## 🎯 Pratik Örnekler

### Örnek 1: Tema Değiştirme Testi

1. **Server başlatın:**
   ```bash
   npm run dev
   ```

2. **Tarayıcıda açın:**
   ```
   http://localhost:5173/
   ```

3. **Tema butonuna tıklayın:**
   - Sağ üstte ay/güneş ikonu
   - Light ↔ Dark geçiş yapın

4. **Sonuç:**
   - Anında tema değişir
   - LocalStorage'a kaydedilir
   - Sayfa yenilense bile kalır

### Örnek 2: Arama Testi

1. **Ana sayfada search bar'ı bulun**

2. **Bir kitap adı yazın:**
   - Örnek: "Suç"
   - Debouncing sayesinde 300ms sonra filtreler

3. **Sonuç:**
   - Canlı filtreleme
   - Smooth animasyon
   - Hızlı sonuçlar

### Örnek 3: Kitap Detay Modal

1. **Herhangi bir kitap kartına tıklayın**

2. **Modal açılır:**
   - Kitap detayları
   - Yorumlar
   - Puanlamalar

3. **Kapatmak için:**
   - X butonuna tıklayın
   - Modal dışına tıklayın
   - ESC tuşuna basın

---

## 🚀 Hızlı Başlangıç (Quick Start)

### En basit yöntem (3 adım):

```bash
# 1. Terminal'i açın
# 2. Bu komutu çalıştırın:
npm run dev

# 3. Tarayıcıda açılacak linke tıklayın!
```

**İşte bu kadar!** 🎉

---

## 📊 Performance Monitoring

Preview yaparken performansı kontrol etmek için:

### Chrome DevTools:

1. `F12` → Performance tab
2. `Ctrl + Shift + P` → "Show FPS meter"
3. FPS sayacı görünür

### Lighthouse Audit:

1. `F12` → Lighthouse tab
2. "Generate report" tıklayın
3. Skorları görün:
   - Performance
   - Accessibility
   - Best Practices
   - SEO

---

## 🎨 Theme Preview

Her iki temayı test etmek için:

### Light Theme (Gündüz):
- Sıcak turuncu tonları
- Beyaz arka plan
- Kolay okunur

### Dark Theme (Gece):
- Koyu lacivert tonları
- Siyah arka plan
- Göz yormaz

**Test:**
1. Preview'ı açın
2. Tema butonuna tıklayın
3. Her iki temayı deneyin
4. Hangisi daha hoşunuza gidiyor?

---

## 📱 Mobile Preview Tips

Mobilde daha iyi görünüm için:

1. **Responsive olduğunu test edin:**
   - Küçük ekranda grid 1 kolon
   - Tablet'te 2-3 kolon
   - Desktop'ta 5 kolon

2. **Touch events'i test edin:**
   - Kaydırma (scroll)
   - Tıklama (tap)
   - Pinch zoom (çalışmıyor olmalı)

3. **Performance'ı kontrol edin:**
   - Yükleme hızı
   - Smooth scroll
   - Animasyonlar

---

## 🎉 Başarı Kriterleri

Preview başarılı sayılır eğer:

✅ Sayfa 1-2 saniyede yüklenirse
✅ Tüm görseller görünüyorsa
✅ Tema değiştirme çalışıyorsa
✅ Arama filtreleme yapıyorsa
✅ Kitap modali açılıyorsa
✅ Animasyonlar smooth ise
✅ Mobilde responsive ise
✅ Console'da hata yoksa

---

## 💡 Pro Tips

1. **İki monitör kullanın:**
   - Bir monitörde kod
   - Diğerinde preview
   - Değişiklikleri anında görün

2. **Auto-save açın:**
   - VS Code: `File > Auto Save`
   - Kod yazdıkça otomatik kaydolur
   - Preview anında güncellenir

3. **DevTools açık tutun:**
   - Console hatalarını görün
   - Network tab'da yüklemeyi izleyin
   - Performance'ı monitor edin

4. **Multiple browser test:**
   - Aynı anda Chrome, Firefox, Edge
   - Tüm tarayıcılarda test edin
   - Cross-browser uyumluluğu kontrol edin

---

## 🎓 Öğrenme Kaynakları

- [Vite Documentation](https://vitejs.dev/guide/)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Chrome DevTools Guide](https://developer.chrome.com/docs/devtools/)

---

## ✅ Checklist

Preview yapmadan önce:

- [ ] Node.js yüklü mü? (`node -v`)
- [ ] Dependencies yüklü mü? (`npm install`)
- [ ] `.env` dosyası var mı?
- [ ] Port 5173 boş mu?
- [ ] Firewall izin veriyor mu?

Preview sırasında kontrol edin:

- [ ] Sayfa yüklendi mi?
- [ ] Görüntü doğru mu?
- [ ] Tema çalışıyor mu?
- [ ] Arama çalışıyor mu?
- [ ] Modal açılıyor mu?
- [ ] Responsive mi?
- [ ] Console'da hata var mı?

---

## 🎉 Sonuç

Artık projenizi önizleyebilirsiniz!

**En basit yöntem:**
```bash
npm run dev
```
Sonra tarayıcıda:
```
http://localhost:5173/
```

**İyi çalışmalar!** 🚀

---

**Son Güncelleme**: 2025-10-16  
**Durum**: ✅ Hazır ve Çalışıyor  
**Preview URL**: http://localhost:5173/

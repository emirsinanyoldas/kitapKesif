# 🔧 Önizleme Bağlantısı Düzeltme Rehberi

## 📋 Sorun Özeti
Önizleme bağlantısı çalışmıyor çünkü farklı bağlantı noktalarında çalışan birden fazla sunucu var ve hangisine erişmeye çalıştığınız belirsiz.

## 🎯 Mevcut Sunucu Durumu

### Geliştirme Sunucusu
- **Komut**: `npm run dev`
- **Bağlantı Noktası**: http://localhost:5175/ (şu anda çalışıyor)
- **Amaç**: Hot reload ile geliştirme
- **Özellikler**: Kod değişikliklerinde otomatik yeniden yükleme

### Önizleme Sunucusu
- **Komut**: `npm run preview`
- **Bağlantı Noktası**: http://localhost:4173/ (şu anda çalışıyor)
- **Amaç**: Üretim derlemesini önizleme
- **Özellikler**: Üretim ortamını simüle eder

## 🚀 Uygulamaya Nasıl Erişilir

### Seçenek 1: Geliştirme Sürümü (Geliştirme için önerilir)
```bash
# Henüz çalışmıyorsa, geliştirme sunucusunu başlatın:
npm run dev

# Ardından tarayıcıda açın:
http://localhost:5175/
```

### Seçenek 2: Üretim Önizlemesi (Üretim derlemesini test etmek için)
```bash
# Henüz çalışmıyorsa, önizleme sunucusunu başlatın:
npm run preview

# Ardından tarayıcıda açın:
http://localhost:4173/
```

## 🔍 Sorun Giderme

### Bağlantı noktaları zaten kullanılıyorsa:
Sistem otomatik olarak farklı bağlantı noktaları dener:
- İlk olarak 5173'i dener
- Kullanılıyorsa, 5174'ü dener
- Kullanılıyorsa, 5175'i dener
- Ve böyle devam eder...

Hangi bağlantı noktasının gerçekten kullanıldığını görmek için terminal çıktısını kontrol edin.

### Tüm çalışan Node.js süreçlerini görmek için:
```bash
tasklist /fi "imagename eq node.exe"
```

### Belirli bir süreci sonlandırmak için:
```bash
taskkill /pid [SÜREÇ_KİMLİĞİ] /f
```

## 📝 Yaygın Sorunlar ve Çözümleri

### Sorun: "Bağlantı noktası zaten kullanılıyor"
**Çözüm**: Sistem otomatik olarak bir sonraki uygun bağlantı noktasını kullanır. Gerçek bağlantı noktası için terminal çıktısını kontrol edin.

### Sorun: Önizleme bağlantısı çalışmıyor
**Çözüm**: Başlattığınız sunucu için doğru URL'yi kullandığınızdan emin olun:
- Geliştirme sunucusu: `npm run dev` → Terminalde bağlantı noktasını kontrol edin (genellikle 5175)
- Önizleme sunucusu: `npm run preview` → Bağlantı noktası 4173

### Sorun: Değişiklikler hemen görünmüyor
**Çözüm**: 
- Geliştirme için: `npm run dev` kullanın (hot reload)
- Önizleme için: `npm run build` ile yeniden derleyin, ardından `npm run preview`

## 🔄 İş Akışı Önerileri

### Geliştirme İçin:
1. `npm run dev` komutunu çalıştırın
2. http://localhost:5175/ adresini açın (veya terminalin gösterdiği bağlantı noktası)
3. Kod değişiklikleri yapın - otomatik olarak görünürler

### Üretim Testi İçin:
1. `npm run build` komutunu çalıştırın
2. `npm run preview` komutunu çalıştırın
3. http://localhost:4173/ adresini açın
4. Bu, üretim ortamını simüle eder

## 🛠️ Gelişmiş Seçenekler

### Geliştirme sunucusu için bağlantı noktası belirtme:
```bash
npm run dev -- --port 3000
```

### Önizleme sunucusu için bağlantı noktası belirtme:
```bash
npm run preview -- --port 3001
```

## ✅ Doğrulama Adımları

1. Sunucuyu başlatmak için hangi komutu kullandığınızı kontrol edin
2. Gerçek bağlantı noktasını görmek için terminal çıktısına bakın
3. Tarayıcınızda bu belirli URL'yi açın
4. Hala çalışmıyorsa, terminalde herhangi bir hata mesajı olup olmadığını kontrol edin

## 🆘 Hâlâ Sorunlar Yaşıyor Musunuz?

1. Önce projeyi derlediğinizden emin olun:
   ```bash
   npm run build
   ```

2. Terminalde herhangi bir hata mesajı olup olmadığını kontrol edin

3. Uygulamaya gizli/tarayıcı özel penceresinden erişmeyi deneyin

4. Tarayıcı önbelleğinizi temizleyin

5. Sunucuyu yeniden başlatın:
   - Mevcut sunucuyu durdurun (Ctrl+C)
   - Uygun komutu tekrar çalıştırın

## 🎯 Hızlı Referans

| Komut | Bağlantı Noktası | Amaç | En İyi Kullanım |
|---------|------|---------|----------|
| `npm run dev` | 5175 (veya bir sonraki uygun) | Hot reload ile geliştirme | Aktif geliştirme |
| `npm run preview` | 4173 | Üretim derlemesini önizleme | Üretim derlemesini test etme |

Uygulamaya, hangi sunucuyu başlattığınıza bağlı olarak bu URL'lerden birinde erişilebilir olmalıdır.
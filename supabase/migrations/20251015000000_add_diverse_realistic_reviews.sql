-- Add Diverse and Realistic Book Reviews
-- This migration adds realistic reviews with varying ratings and perspectives

-- Note: Replace book_id values with actual UUIDs from your books table
-- You can get book IDs by running: SELECT id, title FROM books;

-- Helper function to update book ratings
CREATE OR REPLACE FUNCTION update_book_rating(book_uuid uuid)
RETURNS void AS $$
BEGIN
  UPDATE books
  SET 
    average_rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM reviews
      WHERE book_id = book_uuid
    ),
    total_reviews = (
      SELECT COUNT(*)
      FROM reviews
      WHERE book_id = book_uuid
    )
  WHERE id = book_uuid;
END;
$$ LANGUAGE plpgsql;

-- Sample realistic reviews
-- NOTE: You need to replace 'BOOK_ID_HERE' with actual book IDs from your database

-- Example for a highly rated book (4-5 stars)
INSERT INTO reviews (book_id, user_name, user_avatar, rating, comment, created_at) VALUES
-- Book 1 Reviews (Mixed - mostly positive)
('BOOK_ID_1', 'Ayşe Yılmaz', 'https://i.pravatar.cc/150?img=1', 5, 
'Muhteşem bir kitap! Karakterler çok gerçekçi yazılmış, kendimi hikayenin içinde hissettim. Özellikle ana karakterin gelişimi beni çok etkiledi. Her sayfasında yeni bir sürpriz var. Kesinlikle tavsiye ediyorum!', 
NOW() - INTERVAL '2 days'),

('BOOK_ID_1', 'Mehmet Demir', 'https://i.pravatar.cc/150?img=12', 4, 
'Güzel bir roman. Akıcı bir dili var, saatlerce okuyup bitirdim. Bazı bölümler biraz uzun gelse de genel olarak keyifli bir okuma deneyimiydi. Yazarın üslubu hoşuma gitti.', 
NOW() - INTERVAL '5 days'),

('BOOK_ID_1', 'Zeynep Kaya', 'https://i.pravatar.cc/150?img=5', 3, 
'Fena değil ama beklediğim kadar iyi olmadı. Hikaye ortalarına doğru biraz yavaşlıyor. Son kısmı daha hareketli olmuş ama genel olarak ortalama bir kitap. Belki beklentilerim çok yüksekti.', 
NOW() - INTERVAL '1 week'),

('BOOK_ID_1', 'Can Öztürk', 'https://i.pravatar.cc/150?img=13', 5, 
'Yılın en iyi kitabı! Her cümlesi özenle kurulmuş. Okuduğum en etkileyici eserlerden biri. Konusu, anlatımı, karakterleri her şeyiyle mükemmel. Bitirmek istemedim.', 
NOW() - INTERVAL '10 days'),

('BOOK_ID_1', 'Elif Şahin', 'https://i.pravatar.cc/150?img=9', 2, 
'Maalesef beğenmedim. Hikaye çok tahmin edilebilir, karakterler klişe. Daha özgün bir anlatım beklerken hayal kırıklığına uğradım. Sonunu tahmin etmek çok kolaydı.', 
NOW() - INTERVAL '12 days'),

('BOOK_ID_1', 'Burak Arslan', 'https://i.pravatar.cc/150?img=14', 4, 
'İyi bir kitap, arkadaşımın tavsiyesi üzerine okudum ve pişman olmadım. Özellikle sosyal mesajları güçlü. Bazı sahneler gerçekten düşündürücü. Okumaya değer.', 
NOW() - INTERVAL '2 weeks'),

-- Book 2 Reviews (More critical - mixed ratings)
('BOOK_ID_2', 'Deniz Acar', 'https://i.pravatar.cc/150?img=2', 3, 
'Orta seviye bir eser. İlk yarısı iyiydi ama sonrası beklediğim gibi gitmedi. Yazar bazı konuları yüzeysel işlemiş. Daha derin bir anlatım beklerken hayal kırıklığına uğradım.', 
NOW() - INTERVAL '3 days'),

('BOOK_ID_2', 'Selin Yurt', 'https://i.pravatar.cc/150?img=47', 2, 
'Ne yazık ki çok beğenmedim. Anlatım tarzı bana göre değildi, çok yavaş ilerliyor. 100 sayfa okudum ama devam edemedim. Belki başkaları için uygun olabilir ama benim tarzım değil.', 
NOW() - INTERVAL '1 week'),

('BOOK_ID_2', 'Cem Yıldız', 'https://i.pravatar.cc/150?img=15', 4, 
'Güzel bir çalışma. Konuyu farklı bir açıdan ele almış yazar, bu taze bir bakış açısı sunuyor. Bazı teknik detaylar sıkıcı olsa da genel olarak öğretici ve keyifli.', 
NOW() - INTERVAL '10 days'),

('BOOK_ID_2', 'Merve Koç', 'https://i.pravatar.cc/150?img=27', 1, 
'Okumak için harcadığım zamana değmedi. Hikaye çok dağınık, karakterler gelişmemiş. Editöre ihtiyacı var bence. Maalesef tavsiye edemem.', 
NOW() - INTERVAL '2 weeks'),

('BOOK_ID_2', 'Ahmet Çelik', 'https://i.pravatar.cc/150?img=33', 5, 
'Harika bir kitap! Eleştirileri okuyunca tereddüt ettim ama ben çok sevdim. Konusu ilginç, anlatımı akıcı. Farklı düşünen biriyseniz mutlaka okuyun.', 
NOW() - INTERVAL '3 weeks'),

-- Book 3 Reviews (Very positive)
('BOOK_ID_3', 'Fatma Ak', 'https://i.pravatar.cc/150?img=20', 5, 
'Olağanüstü! Bu kitabı okumak beni çok mutlu etti. Yazar gerçekten yetenekli, her sayfada bunu hissediyorsunuz. Duygusal derinliği ve anlatım gücü çok etkileyici.', 
NOW() - INTERVAL '1 day'),

('BOOK_ID_3', 'Emre Aydın', 'https://i.pravatar.cc/150?img=11', 5, 
'Mükemmel bir başyapıt! Uzun zamandır böyle bir kitap okumamıştım. Finali muhteşemdi, gözyaşlarımı tutamadım. Herkese tavsiye ediyorum.', 
NOW() - INTERVAL '4 days'),

('BOOK_ID_3', 'Gizem Şen', 'https://i.pravatar.cc/150?img=24', 4, 
'Çok güzel bir kitap. Sadece bazı bölümler biraz uzun gelse de genel olarak harika. Karakterlere çok bağlandım. İkinci okumamı yapmayı düşünüyorum.', 
NOW() - INTERVAL '1 week'),

('BOOK_ID_3', 'Hakan Demirci', 'https://i.pravatar.cc/150?img=52', 5, 
'Kesinlikle okumalısınız! Bu yıl okuduğum en iyi kitaplardan biri. Kitabı kapatamadım, bir gecede bitirdim. Yazarın diğer kitaplarını da okumak istiyorum.', 
NOW() - INTERVAL '9 days'),

-- Book 4 Reviews (Balanced - mixed opinions)
('BOOK_ID_4', 'İrem Bulut', 'https://i.pravatar.cc/150?img=31', 4, 
'Güzel bir eser. Konusu ilgi çekici ve güncel. Bazı karakterler biraz yüzeysel kalmış olsa da genel olarak başarılı. Akıcı bir dili var.', 
NOW() - INTERVAL '2 days'),

('BOOK_ID_4', 'Kerem Özkan', 'https://i.pravatar.cc/150?img=8', 3, 
'İdare eder. Çok kötü değil ama çok iyi de değil. Vasat bir kitap. Boş zamanınız varsa okuyabilirsiniz ama öncelik vermenize gerek yok.', 
NOW() - INTERVAL '6 days'),

('BOOK_ID_4', 'Leyla Yavuz', 'https://i.pravatar.cc/150?img=45', 5, 
'Benim için harika bir deneyimdi! Konusu tam benim ilgi alanıma giriyordu. Çok şey öğrendim ve keyif aldım. Yazarı tebrik ediyorum.', 
NOW() - INTERVAL '1 week'),

('BOOK_ID_4', 'Murat Kılıç', 'https://i.pravatar.cc/150?img=51', 2, 
'Sıkıcı buldum açıkçası. Çok fazla gereksiz detay var. Daha öz ve net bir anlatım olsaydı daha iyi olurdu. Zorlandım bitirmek için.', 
NOW() - INTERVAL '10 days'),

('BOOK_ID_4', 'Nur Aksoy', 'https://i.pravatar.cc/150?img=38', 4, 
'Genel olarak beğendim. Özellikle son bölümler çok iyiydi. Başlangıç biraz yavaş olsa da sabırlı olursanız keyif alırsınız.', 
NOW() - INTERVAL '2 weeks'),

-- Book 5 Reviews (More critical)
('BOOK_ID_5', 'Okan Ertürk', 'https://i.pravatar.cc/150?img=17', 3, 
'Beklentilerimi karşılamadı. İyi yanları da var elbette ama genel olarak ortalama bir yapım. Daha iyi olabilirdi.', 
NOW() - INTERVAL '3 days'),

('BOOK_ID_5', 'Pınar Çetin', 'https://i.pravatar.cc/150?img=26', 2, 
'Maalesef hayal kırıklığı. Kapak tasarımı ve tanıtımı çok iyiydi ama içerik zayıf kaldı. Beklediğim kalitede değildi.', 
NOW() - INTERVAL '5 days'),

('BOOK_ID_5', 'Ramazan Güneş', 'https://i.pravatar.cc/150?img=60', 4, 
'Eleştirilere rağmen ben beğendim. Her kitap herkese göre değildir. Bana göre güzel bir çalışmaydı. Farklı bir bakış açısı sunuyor.', 
NOW() - INTERVAL '8 days'),

('BOOK_ID_5', 'Sevgi Taş', 'https://i.pravatar.cc/150?img=41', 1, 
'Çok kötü. Paramı boşa harcadığımı düşünüyorum. Ne anlatımı güzel ne de konusu ilgi çekici. Tavsiye etmiyorum.', 
NOW() - INTERVAL '12 days'),

-- Additional diverse reviews for remaining books
('BOOK_ID_6', 'Tuncay Yalçın', 'https://i.pravatar.cc/150?img=19', 5, 
'Enfes bir kitap! Her kelimesi özenle seçilmiş. Okuduğum en derin eserlerden biri. Felsefik boyutu çok güçlü. Muhteşem!', 
NOW() - INTERVAL '1 day'),

('BOOK_ID_6', 'Ülkü Eren', 'https://i.pravatar.cc/150?img=44', 4, 
'Çok beğendim. Duygusal yönü kuvvetli, karakterler çok gerçekçi. Bazı sahneler çok etkileyiciydi. Okumanızı tavsiye ederim.', 
NOW() - INTERVAL '4 days'),

('BOOK_ID_6', 'Volkan Şimşek', 'https://i.pravatar.cc/150?img=56', 3, 
'Fena değil ama çok da özel değil. Vakit geçirmek için okunabilir. Daha fazlasını beklerken ortalama bir kitapla karşılaştım.', 
NOW() - INTERVAL '1 week'),

('BOOK_ID_7', 'Yasemin Öz', 'https://i.pravatar.cc/150?img=28', 5, 
'Harika bir roman! Sabahlara kadar okudum. Konusu çok sürükleyici, karakterlere o kadar bağlandım ki. Kesinlikle tavsiye ediyorum!', 
NOW() - INTERVAL '2 days'),

('BOOK_ID_7', 'Zafer Kara', 'https://i.pravatar.cc/150?img=59', 4, 
'Güzel bir kitap. Aksiyon dolu sahneleri var. Heyecan arıyorsanız tam size göre. Bazı diyaloglar biraz yapay olsa da eğlenceli.', 
NOW() - INTERVAL '6 days'),

('BOOK_ID_7', 'Aylin Vural', 'https://i.pravatar.cc/150?img=36', 2, 
'Bana göre değildi. Çok abartılı sahneler var. Gerçekçilik açısından zayıf. Farklı bir tarz bekliyordum.', 
NOW() - INTERVAL '10 days'),

('BOOK_ID_8', 'Berk Aslan', 'https://i.pravatar.cc/150?img=18', 5, 
'Olağanüstü bir yapıt! Yazarın hayal gücü muazzam. Her sayfa yeni bir macera. Fantastik edebiyat sevenlere şiddetle tavsiye ederim.', 
NOW() - INTERVAL '3 days'),

('BOOK_ID_8', 'Canan Doğan', 'https://i.pravatar.cc/150?img=21', 4, 
'Çok keyifli bir okuma deneyimiydi. Yaratıcı ve özgün. Bazı bölümler biraz karmaşık olsa da genel olarak harika bir eser.', 
NOW() - INTERVAL '1 week'),

('BOOK_ID_8', 'Derya Mutlu', 'https://i.pravatar.cc/150?img=25', 3, 
'Ortalama. İlginç yerler var ama genel olarak sıradan. Daha önceki kitapları daha iyiymiş diye duydum. Bu biraz düşüş sayılır.', 
NOW() - INTERVAL '2 weeks'),

('BOOK_ID_9', 'Efe Kaplan', 'https://i.pravatar.cc/150?img=34', 5, 
'Muhteşem! Bilim kurgu severler için birebir. Teknolojik detaylar çok iyi işlenmiş. Gelecek vizyonu çok etkileyici. Harika bir eser.', 
NOW() - INTERVAL '1 day'),

('BOOK_ID_9', 'Filiz Çakır', 'https://i.pravatar.cc/150?img=48', 4, 
'Güzel bir bilim kurgu romanı. Olay örgüsü sağlam, karakterler ilginç. Türk edebiyatında bu tür eserlere ihtiyaç var. Başarılı.', 
NOW() - INTERVAL '5 days'),

('BOOK_ID_9', 'Gökhan Tekin', 'https://i.pravatar.cc/150?img=50', 2, 
'Çok teknik geldi bana. Bilim kurgu sevsem de bu fazla karmaşıktı. Sıradan okuyucu için ağır olabilir. Anlamakta zorlandım.', 
NOW() - INTERVAL '9 days'),

('BOOK_ID_10', 'Hacer Polat', 'https://i.pravatar.cc/150?img=40', 5, 
'Nefis bir tarih romanı! Dönemin atmosferini çok güzel yansıtmış yazar. Tarihi sevenlerin mutlaka okuması gereken bir kitap.', 
NOW() - INTERVAL '2 days'),

('BOOK_ID_10', 'İbrahim Sarı', 'https://i.pravatar.cc/150?img=53', 4, 
'Güzel bir çalışma. Tarihi olayları romanlaştırırken dikkatli davranmış. Hem eğlenceli hem öğretici. Beğendim.', 
NOW() - INTERVAL '7 days'),

('BOOK_ID_10', 'Jale Yüksel', 'https://i.pravatar.cc/150?img=42', 3, 
'İyi ama mükemmel değil. Tarihi roman okumayı seviyorum ama bu ortalama kaldı. Daha iyi örnekleri var bu türde.', 
NOW() - INTERVAL '11 days');

-- Update book ratings after adding reviews
-- Run these for each book after inserting reviews:
-- SELECT update_book_rating('BOOK_ID_1');
-- SELECT update_book_rating('BOOK_ID_2');
-- ... etc for all books

-- Note: Remember to replace BOOK_ID_1, BOOK_ID_2, etc. with actual UUIDs

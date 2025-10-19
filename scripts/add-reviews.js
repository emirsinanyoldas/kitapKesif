/**
 * Script to add realistic, diverse reviews to books in Supabase
 * 
 * Usage:
 * 1. Make sure you have your Supabase credentials in .env file
 * 2. Run: node add-reviews.js
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Bilingual realistic review templates organized by rating
const reviewTemplates = {
  5: [
    {
      tr: 'Muhteşem bir kitap! Karakterler çok gerçekçi yazılmış, kendimi hikayenin içinde hissettim. Her sayfada yeni bir şey keşfettim. Kesinlikle tavsiye ediyorum!',
      en: 'Amazing book! The characters are written so realistically, I felt like I was part of the story. I discovered something new on every page. Highly recommend!'
    },
    {
      tr: 'Yılın en iyi kitabı! Her cümlesi özenle kurulmuş, anlatım akıcı ve sürükleyici. Okuduğum en etkileyici eserlerden biri. Başyapıt niteliğinde!',
      en: 'Book of the year! Every sentence is carefully crafted, the narrative is smooth and captivating. One of the most impressive works I\'ve read. A true masterpiece!'
    },
    {
      tr: 'Olağanüstü! Bu kitabı okumak beni çok mutlu etti. Duygusal derinliği, karakter gelişimi ve anlatım gücü müthiş. Hayatımda okuduğum en iyi 10 kitaptan biri.',
      en: 'Extraordinary! Reading this book made me so happy. The emotional depth, character development, and narrative power are amazing. One of the top 10 books I\'ve ever read.'
    },
    {
      tr: 'Kesinlikle okumalısınız! Kitabı elimden bırakamadım, tek oturuşta bitirdim. Final bölümü muhteşemdi, gözyaşlarımı tutamadım. Yazarın tüm eserlerini okuyacağım.',
      en: 'You absolutely must read this! I couldn\'t put the book down, finished it in one sitting. The final chapters were magnificent, I couldn\'t hold back my tears. Will read all the author\'s works.'
    },
    {
      tr: 'Harika bir başyapıt! Uzun zamandır böyle derin ve etkileyici bir kitap okumamıştım. Hem eğlendirici hem de düşündürücü. Herkese tavsiye ediyorum!',
      en: 'A wonderful masterpiece! I haven\'t read such a deep and impactful book in a long time. Both entertaining and thought-provoking. I recommend it to everyone!'
    },
    {
      tr: 'Mükemmel ötesi! Kitabın her yönü kusursuz. Hikaye kurgusu, diyaloglar, karakter derinliği... Her şey tam yerinde. Bırakmak istemedim!',
      en: 'Beyond perfect! Every aspect of the book is flawless. Plot structure, dialogues, character depth... Everything is just right. I didn\'t want to put it down!'
    },
    {
      tr: 'İnanılmaz güzel bir eser! Sayfalar uçup gitti. Kitap bittikten sonra kendimi boşlukta hissettim. Keşke daha uzun olsaydı!',
      en: 'Incredibly beautiful work! The pages flew by. After finishing the book, I felt empty. I wish it were longer!'
    },
    {
      tr: 'Şimdiye kadar okuduğum en iyi kitap olabilir. Her detay mükemmel işlenmiş. Yazarı tebrik ediyorum, gerçekten harika bir iş çıkarmış!',
      en: 'This might be the best book I\'ve ever read. Every detail is perfectly crafted. Congratulations to the author, truly amazing work!'
    }
  ],
  4: [
    {
      tr: 'Güzel bir roman. Akıcı bir dili var, saatlerce okuyup bitirdim. Bazı bölümler biraz yavaş ilerliyor ama genel olarak keyifli bir okuma deneyimiydi.',
      en: 'A nice novel. It has a fluent language, I read and finished it in hours. Some parts progress a bit slowly but overall it was an enjoyable reading experience.'
    },
    {
      tr: 'İyi bir kitap, arkadaşımın tavsiyesi üzerine okudum ve pişman olmadım. Karakterler ilgi çekici ama bazen öngörülebilir oluyorlar. Yine de okumaya değer.',
      en: 'A good book, I read it on my friend\'s recommendation and didn\'t regret it. The characters are interesting but sometimes predictable. Still worth reading.'
    },
    {
      tr: 'Çok güzel bir kitap. İlk yarısı gerçekten harikaydı, ikinci yarı biraz düştü ama yine de beğendim. Karakterlere çok bağlandım.',
      en: 'A very nice book. The first half was really great, the second half dropped a bit but I still enjoyed it. I became very attached to the characters.'
    },
    {
      tr: 'Güzel bir eser. Konuyu farklı bir açıdan ele almış yazar, bu taze bir bakış açısı sunuyor. Bazı kısımlar uzun gelse de sabırla okunur.',
      en: 'A beautiful work. The author approaches the subject from a different angle, offering a fresh perspective. Although some parts are long, it\'s worth reading patiently.'
    },
    {
      tr: 'Genel olarak beğendim. Özellikle son bölümler çok iyiydi, başlangıç biraz yavaştı. Sabırlı olursanız keyif alırsınız.',
      en: 'I liked it overall. Especially the final chapters were very good, the beginning was a bit slow. If you\'re patient, you\'ll enjoy it.'
    },
    {
      tr: 'Kaliteli bir kitap. Anlatım güzel, konusu ilgi çekici. Sadece bazı karakterler daha iyi geliştirilmiş olabilirdi. 4 yıldız hak ediyor.',
      en: 'A quality book. Nice narration, interesting subject. Only some characters could have been better developed. Deserves 4 stars.'
    },
    {
      tr: 'Beğendim, ama beklediğim kadar çok da değil. Güzel anlar var, bazı yerler sıkıcı olabiliyor. Ortalama üstü bir eser.',
      en: 'I liked it, but not as much as I expected. There are nice moments, some parts can be boring. An above-average work.'
    }
  ],
  3: [
    {
      tr: 'Fena değil ama beklediğim kadar iyi olmadı. Hikaye ortalarına doğru biraz yavaşlıyor ve tempo düşüyor. Okumak isterseniz okuyabilirsiniz.',
      en: 'Not bad but not as good as I expected. The story slows down towards the middle and the pace drops. You can read it if you want.'
    },
    {
      tr: 'Orta seviye bir eser. İlk yarısı iyiydi ama sonrası beklediğim gibi gitmedi. Bazı kısımlar gereksiz uzatılmış gibi.',
      en: 'A mid-level work. The first half was good but the rest didn\'t go as I expected. Some parts seem unnecessarily stretched.'
    },
    {
      tr: 'İdare eder. Çok kötü değil ama çok iyi de değil. Sıradan bir kitap. Boş zamanınız varsa okuyabilirsiniz.',
      en: 'It\'s okay. Not too bad but not too good either. An ordinary book. You can read it if you have free time.'
    },
    {
      tr: 'Fena değil ama çok da özel değil. Vakit geçirmek için okunabilir ama unutulmaya mahkum bir kitap gibi.',
      en: 'Not bad but nothing special either. Can be read to pass time but seems like a forgettable book.'
    },
    {
      tr: 'Beklentilerimi tam olarak karşılamadı. İyi yanları da var elbette ama genel olarak ortalama bir yapım. Bazı bölümleri ilgi çekiciydi.',
      en: 'Didn\'t fully meet my expectations. It has good sides of course but generally an average production. Some parts were interesting.'
    },
    {
      tr: 'Normal bir kitap. Çok kötü olmasa da çok iyi de değil. Orta düzeyde bir okuma deneyimi sunuyor.',
      en: 'A normal book. Not very bad but not very good either. Offers a mid-level reading experience.'
    }
  ],
  2: [
    {
      tr: 'Maalesef beğenmedim. Hikaye çok tahmin edilebilir, karakterler klişe. Sonunu çok önceden tahmin ettim. Hayal kırıklığı yarattı.',
      en: 'Unfortunately I didn\'t like it. The story is too predictable, characters are clichéd. I predicted the ending way ahead. It was disappointing.'
    },
    {
      tr: 'Ne yazık ki çok beğenmedim. Anlatım tarzı bana göre değildi, çok yavaş ilerliyor ve sıkıcı olabiliyor. Zorlandım okurken.',
      en: 'Unfortunately I didn\'t like it much. The narrative style wasn\'t for me, it progresses too slowly and can be boring. I struggled while reading.'
    },
    {
      tr: 'Sıkıcı buldum açıkçası. Çok fazla gereksiz detay var, hikaye bir türlü ilerleyemiyor. Bitirmek için kendimi zorladım.',
      en: 'I found it boring to be honest. Too many unnecessary details, the story just doesn\'t progress. I forced myself to finish it.'
    },
    {
      tr: 'Maalesef hayal kırıklığı. Kapak tasarımı ve tanıtımı çok iyiydi ama içerik o kadar zayıf ki... Beklediğimin çok altında kaldı.',
      en: 'Unfortunately disappointing. The cover design and promotion were very good but the content is so weak... It fell far below my expectations.'
    },
    {
      tr: 'Bana göre değildi. Karakterler çok yapay, diyaloglar samimiyetsiz. Gerçekçilik açısından çok zayıf.',
      en: 'It wasn\'t for me. Characters are too artificial, dialogues are insincere. Very weak in terms of realism.'
    }
  ],
  1: [
    {
      tr: 'Okumak için harcadığım zamana kesinlikle değmedi. Hikaye çok dağınık, karakterler hiç gelişmemiş. Maalesef tavsiye edemem.',
      en: 'Definitely not worth the time I spent reading. The story is very messy, characters are undeveloped. Unfortunately, I can\'t recommend it.'
    },
    {
      tr: 'Çok kötü. Paramı boşa harcadığımı düşünüyorum. Ne anlatımı güzel ne de konusu ilgi çekici. Tam bir hayal kırıklığı.',
      en: 'Very bad. I think I wasted my money. Neither the narration is good nor the subject interesting. A complete disappointment.'
    },
    {
      tr: 'Ne yazık ki çok kötü bir kitap. Ciddi bir editöre ihtiyacı var. Okurken çok sıkıldım ve bir an önce bitsin istedim.',
      en: 'Unfortunately a very bad book. It seriously needs an editor. I was very bored while reading and wanted it to end as soon as possible.'
    },
    {
      tr: 'Berbat. Neredeyse her şey yanlış: karakterler, olay örgüsü, anlatım... Böyle bir kitabı nasıl yayınladılar anlamadım.',
      en: 'Terrible. Almost everything is wrong: characters, plot, narration... I don\'t understand how they published such a book.'
    }
  ],
};

// Expanded Turkish names for more realistic variety (80+ names)
const turkishNames = [
  // Common Turkish names
  'Ayşe Yılmaz', 'Mehmet Demir', 'Zeynep Kaya', 'Can Öztürk', 'Elif Şahin',
  'Burak Arslan', 'Deniz Acar', 'Selin Yurt', 'Cem Yıldız', 'Merve Koç',
  'Ahmet Çelik', 'Fatma Ak', 'Emre Aydın', 'Gizem Şen', 'Hakan Demirci',
  'İrem Bulut', 'Kerem Özkan', 'Leyla Yavuz', 'Murat Kılıç', 'Nur Aksoy',
  'Okan Ertürk', 'Pınar Çetin', 'Ramazan Güneş', 'Sevgi Taş', 'Tuncay Yalçın',
  'Ülkü Eren', 'Volkan Şimşek', 'Yasemin Öz', 'Zafer Kara', 'Aylin Vural',
  'Berk Aslan', 'Canan Doğan', 'Derya Mutlu', 'Efe Kaplan', 'Filiz Çakır',
  'Gökhan Tekin', 'Hacer Polat', 'İbrahim Sarı', 'Jale Yüksel', 'Kaan Erdoğan',
  // Additional names for variety
  'Dilara Kurt', 'Emir Akar', 'Defne Yıldırım', 'Barış Özdemir', 'Esra Koçak',
  'Serkan Özen', 'Nihan Ateş', 'Tolga Başar', 'Begüm Yavuz', 'Onur Çevik',
  'Melisa Güler', 'Arda Toprak', 'Burcu Aydın', 'Ege Karaca', 'Sude Kılıç',
  'Alper Kaya', 'Ece Yıldız', 'Berkay Şahin', 'Duygu Özkan', 'Kağan Demir',
  'Ceyda Arslan', 'Tarık Özgür', 'Neslihan Erdem', 'Yiğit Acar', 'Özge Taş',
  'Umut Şen', 'Hazal Çetin', 'Doruk Polat', 'Ebru Aksoy', 'Sinan Vural',
  'Melis Doğan', 'Batuhan Mutlu', 'Ezgi Kaplan', 'Furkan Tekin', 'Sinem Sarı',
  'Yasin Erdoğan', 'Tuğba Yüksel', 'Oğuz Güneş', 'Pelin Eren', 'Selim Şimşek',
  'Damla Bulut', 'Çağlar Aslan', 'Ela Çakır', 'Tuna Demirci', 'İpek Kara',
  'Eren Ertürk', 'Aslı Çelik', 'Buğra Yurt', 'Betül Ak', 'Engin Öztürk',
];

// Generate bilingual review (both Turkish and English in one comment)
function generateBilingualReview(rating) {
  const templates = reviewTemplates[rating];
  const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
  
  // Combine Turkish and English with separator for authentic bilingual experience
  return `${selectedTemplate.tr}

---

${selectedTemplate.en}`;
}

// Generate random days ago (1-180 days for more variety)
function randomDaysAgo() {
  const days = Math.floor(Math.random() * 180) + 1; // 1-180 days
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

// Add reviews to a book with variable count (5-20 reviews per book)
async function addReviewsToBook(bookId, bookTitle, averageRating = 0, reviewCount = null) {
  // Generate 5-20 reviews per book for authentic variety
  if (reviewCount === null) {
    // Base count: 5-20 reviews, influenced by rating
    if (averageRating >= 4.5) {
      reviewCount = Math.floor(Math.random() * 8) + 13; // 13-20 reviews for highly rated books
    } else if (averageRating >= 4.0) {
      reviewCount = Math.floor(Math.random() * 7) + 10; // 10-16 reviews
    } else if (averageRating >= 3.5) {
      reviewCount = Math.floor(Math.random() * 6) + 7; // 7-12 reviews
    } else if (averageRating >= 3.0) {
      reviewCount = Math.floor(Math.random() * 4) + 5; // 5-8 reviews
    } else {
      reviewCount = Math.floor(Math.random() * 3) + 5; // 5-7 reviews for lower rated
    }
  }
  
  console.log(`\n📚 Adding ${reviewCount} bilingual reviews to "${bookTitle}" (avg rating: ${averageRating.toFixed(1)})...`);
  
  const usedNames = new Set();
  const reviews = [];
  
  // Generate rating distribution based on book's average rating
  const ratings = generateRealisticRatings(reviewCount, averageRating);
  
  for (let i = 0; i < reviewCount; i++) {
    // Get unique name
    let userName;
    let attempts = 0;
    do {
      userName = turkishNames[Math.floor(Math.random() * turkishNames.length)];
      attempts++;
      // If we've tried too many times, allow duplicate (rare books might need it)
      if (attempts > 50) break;
    } while (usedNames.has(userName));
    usedNames.add(userName);
    
    const review = {
      book_id: bookId,
      user_name: userName,
      user_avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
      rating: ratings[i],
      comment: generateBilingualReview(ratings[i]), // Generate bilingual review
      created_at: randomDaysAgo(),
    };
    
    reviews.push(review);
  }
  
  // Insert reviews
  const { data, error } = await supabase
    .from('reviews')
    .insert(reviews);
  
  if (error) {
    console.error(`❌ Error adding reviews to "${bookTitle}":`, error.message);
    return false;
  }
  
  console.log(`✅ Added ${reviewCount} bilingual reviews to "${bookTitle}" (${usedNames.size} unique reviewers)`);
  
  // Update book rating
  await updateBookRating(bookId);
  
  return true;
}

// Generate realistic rating distribution based on target average
function generateRealisticRatings(count, targetAverage) {
  const ratings = [];
  
  // For books with high average (4.5+): mostly 5s and 4s
  if (targetAverage >= 4.5) {
    for (let i = 0; i < count; i++) {
      const rand = Math.random();
      if (rand < 0.65) ratings.push(5);       // 65% - 5 stars
      else if (rand < 0.90) ratings.push(4);  // 25% - 4 stars
      else if (rand < 0.97) ratings.push(3);  // 7% - 3 stars
      else ratings.push(2);                   // 3% - 2 stars
    }
  }
  // For good books (4.0-4.5): balanced positive
  else if (targetAverage >= 4.0) {
    for (let i = 0; i < count; i++) {
      const rand = Math.random();
      if (rand < 0.45) ratings.push(5);       // 45% - 5 stars
      else if (rand < 0.80) ratings.push(4);  // 35% - 4 stars
      else if (rand < 0.93) ratings.push(3);  // 13% - 3 stars
      else if (rand < 0.98) ratings.push(2);  // 5% - 2 stars
      else ratings.push(1);                   // 2% - 1 star
    }
  }
  // For average books (3.0-4.0): bell curve distribution
  else if (targetAverage >= 3.0) {
    for (let i = 0; i < count; i++) {
      const rand = Math.random();
      if (rand < 0.25) ratings.push(5);       // 25% - 5 stars
      else if (rand < 0.55) ratings.push(4);  // 30% - 4 stars
      else if (rand < 0.80) ratings.push(3);  // 25% - 3 stars
      else if (rand < 0.93) ratings.push(2);  // 13% - 2 stars
      else ratings.push(1);                   // 7% - 1 star
    }
  }
  // For lower rated books: more negative reviews
  else {
    for (let i = 0; i < count; i++) {
      const rand = Math.random();
      if (rand < 0.15) ratings.push(5);       // 15% - 5 stars
      else if (rand < 0.35) ratings.push(4);  // 20% - 4 stars
      else if (rand < 0.55) ratings.push(3);  // 20% - 3 stars
      else if (rand < 0.80) ratings.push(2);  // 25% - 2 stars
      else ratings.push(1);                   // 20% - 1 star
    }
  }
  
  return ratings;
}

// Update book's average rating and total reviews
async function updateBookRating(bookId) {
  // Get all reviews for this book
  const { data: reviews, error } = await supabase
    .from('reviews')
    .select('rating')
    .eq('book_id', bookId);
  
  if (error) {
    console.error('❌ Error fetching reviews:', error.message);
    return;
  }
  
  if (reviews.length === 0) return;
  
  // Calculate average rating
  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  
  // Update book
  const { error: updateError } = await supabase
    .from('books')
    .update({
      average_rating: averageRating,
      total_reviews: reviews.length,
    })
    .eq('id', bookId);
  
  if (updateError) {
    console.error('❌ Error updating book rating:', updateError.message);
    return;
  }
  
  console.log(`   📊 Updated rating: ${averageRating.toFixed(2)} (${reviews.length} reviews)`);
}

// Main function
async function main() {
  console.log('🚀 Starting realistic bilingual review generation...\n');
  console.log('🌍 Review format: Turkish + English (both languages in each review)');
  console.log('👥 Reviewers: 5-20 unique people per book (80+ total names available)');
  console.log('📊 Review count: Proportional to book rating + randomized');
  console.log('⭐ Rating distribution: Realistic based on book quality\n');
  
  // Fetch all books
  const { data: books, error } = await supabase
    .from('books')
    .select('id, title, average_rating')
    .order('created_at');
  
  if (error) {
    console.error('❌ Error fetching books:', error.message);
    process.exit(1);
  }
  
  if (!books || books.length === 0) {
    console.log('⚠️  No books found in database');
    console.log('\n💡 Tip: Run "npm run import-books" first to import books');
    process.exit(0);
  }
  
  console.log(`📚 Found ${books.length} books\n`);
  console.log('='.repeat(60));
  
  let totalReviews = 0;
  let totalReviewers = 0;
  
  // Add reviews to each book (5-20 reviews, proportional to rating)
  for (const book of books) {
    // Use existing average_rating if available, otherwise default to 3.5
    const currentRating = book.average_rating || 3.5;
    
    const result = await addReviewsToBook(book.id, book.title, currentRating);
    
    if (result) {
      // Count approximate reviews based on rating
      if (currentRating >= 4.5) {
        totalReviews += 16; // Average of 13-20
        totalReviewers += 16;
      } else if (currentRating >= 4.0) {
        totalReviews += 13; // Average of 10-16
        totalReviewers += 13;
      } else if (currentRating >= 3.5) {
        totalReviews += 9; // Average of 7-12
        totalReviewers += 9;
      } else if (currentRating >= 3.0) {
        totalReviews += 6; // Average of 5-8
        totalReviewers += 6;
      } else {
        totalReviews += 6; // Average of 5-7
        totalReviewers += 6;
      }
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('\n✨ All reviews added successfully!');
  console.log(`📊 Total reviews generated: ~${totalReviews} (each with TR + EN)`);
  console.log(`👥 Total unique reviewers: ~${totalReviewers}`);
  console.log(`📚 Books with reviews: ${books.length}`);
  console.log(`🌍 Languages: Turkish & English (bilingual in each review)`);
  console.log('\n🔄 Refresh your app to see the new bilingual reviews');
  console.log('\n🎉 Enjoy your realistic review system!\n');
}

// Run the script
main().catch(console.error);

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

// Realistic review templates organized by rating
const reviewTemplates = {
  5: [
    'Muhteşem bir kitap! Karakterler çok gerçekçi yazılmış, kendimi hikayenin içinde hissettim. Kesinlikle tavsiye ediyorum!',
    'Yılın en iyi kitabı! Her cümlesi özenle kurulmuş. Okuduğum en etkileyici eserlerden biri.',
    'Olağanüstü! Bu kitabı okumak beni çok mutlu etti. Duygusal derinliği ve anlatım gücü çok etkileyici.',
    'Kesinlikle okumalısınız! Kitabı kapatamadım, bir gecede bitirdim. Yazarın diğer kitaplarını da okumak istiyorum.',
    'Harika bir başyapıt! Uzun zamandır böyle bir kitap okumamıştım. Finali muhteşemdi, gözyaşlarımı tutamadım.',
  ],
  4: [
    'Güzel bir roman. Akıcı bir dili var, saatlerce okuyup bitirdim. Genel olarak keyifli bir okuma deneyimiydi.',
    'İyi bir kitap, arkadaşımın tavsiyesi üzerine okudum ve pişman olmadım. Okumaya değer.',
    'Çok güzel bir kitap. Sadece bazı bölümler biraz uzun gelse de genel olarak harika. Karakterlere çok bağlandım.',
    'Güzel bir eser. Konuyu farklı bir açıdan ele almış yazar, bu taze bir bakış açısı sunuyor.',
    'Genel olarak beğendim. Özellikle son bölümler çok iyiydi. Sabırlı olursanız keyif alırsınız.',
  ],
  3: [
    'Fena değil ama beklediğim kadar iyi olmadı. Hikaye ortalarına doğru biraz yavaşlıyor.',
    'Orta seviye bir eser. İlk yarısı iyiydi ama sonrası beklediğim gibi gitmedi.',
    'İdare eder. Çok kötü değil ama çok iyi de değil. Vasat bir kitap.',
    'Fena değil ama çok da özel değil. Vakit geçirmek için okunabilir.',
    'Beklentilerimi karşılamadı. İyi yanları da var elbette ama genel olarak ortalama bir yapım.',
  ],
  2: [
    'Maalesef beğenmedim. Hikaye çok tahmin edilebilir, karakterler klişe. Sonunu tahmin etmek çok kolaydı.',
    'Ne yazık ki çok beğenmedim. Anlatım tarzı bana göre değildi, çok yavaş ilerliyor.',
    'Sıkıcı buldum açıkçası. Çok fazla gereksiz detay var. Zorlandım bitirmek için.',
    'Maalesef hayal kırıklığı. Kapak tasarımı ve tanıtımı çok iyiydi ama içerik zayıf kaldı.',
    'Bana göre değildi. Çok abartılı sahneler var. Gerçekçilik açısından zayıf.',
  ],
  1: [
    'Okumak için harcadığım zamana değmedi. Hikaye çok dağınık, karakterler gelişmemiş. Maalesef tavsiye edemem.',
    'Çok kötü. Paramı boşa harcadığımı düşünüyorum. Ne anlatımı güzel ne de konusu ilgi çekici.',
    'Ne yazık ki çok kötü. Editöre ihtiyacı var bence. Okurken sıkıldım.',
  ],
};

// Turkish names for realistic reviews
const turkishNames = [
  'Ayşe Yılmaz', 'Mehmet Demir', 'Zeynep Kaya', 'Can Öztürk', 'Elif Şahin',
  'Burak Arslan', 'Deniz Acar', 'Selin Yurt', 'Cem Yıldız', 'Merve Koç',
  'Ahmet Çelik', 'Fatma Ak', 'Emre Aydın', 'Gizem Şen', 'Hakan Demirci',
  'İrem Bulut', 'Kerem Özkan', 'Leyla Yavuz', 'Murat Kılıç', 'Nur Aksoy',
  'Okan Ertürk', 'Pınar Çetin', 'Ramazan Güneş', 'Sevgi Taş', 'Tuncay Yalçın',
  'Ülkü Eren', 'Volkan Şimşek', 'Yasemin Öz', 'Zafer Kara', 'Aylin Vural',
  'Berk Aslan', 'Canan Doğan', 'Derya Mutlu', 'Efe Kaplan', 'Filiz Çakır',
  'Gökhan Tekin', 'Hacer Polat', 'İbrahim Sarı', 'Jale Yüksel', 'Kaan Erdoğan',
];

// Generate random review based on rating
function generateReview(rating) {
  const templates = reviewTemplates[rating];
  return templates[Math.floor(Math.random() * templates.length)];
}

// Generate random days ago (1-30 days)
function randomDaysAgo() {
  const days = Math.floor(Math.random() * 30) + 1;
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

// Add reviews to a book
async function addReviewsToBook(bookId, bookTitle, reviewCount = 5) {
  console.log(`\n📚 Adding ${reviewCount} reviews to "${bookTitle}"...`);
  
  const usedNames = new Set();
  const reviews = [];
  
  // Generate rating distribution (realistic bell curve)
  const ratings = [];
  for (let i = 0; i < reviewCount; i++) {
    const rand = Math.random();
    if (rand < 0.35) ratings.push(5);       // 35% - 5 stars
    else if (rand < 0.65) ratings.push(4);  // 30% - 4 stars
    else if (rand < 0.85) ratings.push(3);  // 20% - 3 stars
    else if (rand < 0.95) ratings.push(2);  // 10% - 2 stars
    else ratings.push(1);                   // 5% - 1 star
  }
  
  for (let i = 0; i < reviewCount; i++) {
    // Get unique name
    let userName;
    do {
      userName = turkishNames[Math.floor(Math.random() * turkishNames.length)];
    } while (usedNames.has(userName) && usedNames.size < turkishNames.length);
    usedNames.add(userName);
    
    const review = {
      book_id: bookId,
      user_name: userName,
      user_avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
      rating: ratings[i],
      comment: generateReview(ratings[i]),
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
  
  console.log(`✅ Added ${reviewCount} reviews to "${bookTitle}"`);
  
  // Update book rating
  await updateBookRating(bookId);
  
  return true;
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
  console.log('🚀 Starting review generation...\n');
  
  // Fetch all books
  const { data: books, error } = await supabase
    .from('books')
    .select('id, title')
    .order('created_at');
  
  if (error) {
    console.error('❌ Error fetching books:', error.message);
    process.exit(1);
  }
  
  if (!books || books.length === 0) {
    console.log('⚠️  No books found in database');
    process.exit(0);
  }
  
  console.log(`📖 Found ${books.length} books\n`);
  
  // Add reviews to each book (5-8 reviews per book)
  for (const book of books) {
    const reviewCount = Math.floor(Math.random() * 4) + 5; // 5-8 reviews
    await addReviewsToBook(book.id, book.title, reviewCount);
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n✨ All reviews added successfully!');
  console.log('🔄 Refresh your app to see the new reviews');
}

// Run the script
main().catch(console.error);

/**
 * AI Assistant greeting messages
 * Provides varied, professional greetings for the book discovery platform
 */

export const AI_GREETINGS = [
  {
    message: "Merhaba! Kitap dünyasına hoş geldiniz. Size nasıl yardımcı olabilirim? Belirli bir yazar, tür veya konu hakkında öneri arıyorsanız, sormaktan çekinmeyin.",
    type: "welcoming"
  },
  {
    message: "Selam! Bugün hangi kitap macerasına çıkmak istersiniz? Roman, bilim kurgu, tarih ya da başka bir kategori mi arıyorsunuz?",
    type: "engaging"
  },
  {
    message: "İyi günler! Kitap keşif yolculuğunuzda size eşlik etmekten mutluluk duyarım. Hangi türde eserler ilginizi çekiyor?",
    type: "professional"
  },
  {
    message: "Merhaba okur dostu! Kütüphanemizde gezinmenize yardımcı olmak için buradayım. Popüler kitaplar mı yoksa gizli kalmış inciler mi arıyorsunuz?",
    type: "friendly"
  },
  {
    message: "Hoş geldiniz! Binlerce kitap arasından size en uygun olanları bulmak için buradayım. Favorilerinize benzer kitaplar veya yeni bir tür keşfetmek ister misiniz?",
    type: "helpful"
  },
  {
    message: "Selamlar! Kitap önerilerinden kategori araştırmalarına kadar her konuda size yardımcı olabilirim. Bugün ne arıyorsunuz?",
    type: "informative"
  },
  {
    message: "Merhaba değerli okuyucu! Okuduğunuz son kitabı beğendiniz mi? Size benzer veya farklı türlerde öneriler sunabilirim.",
    type: "conversational"
  }
] as const;

/**
 * Get a random greeting message
 * Uses current timestamp to ensure variation across sessions
 */
export function getRandomGreeting(): string {
  const randomIndex = Math.floor(Math.random() * AI_GREETINGS.length);
  return AI_GREETINGS[randomIndex].message;
}

/**
 * Get a greeting based on time of day (optional enhancement)
 */
export function getContextualGreeting(): string {
  const hour = new Date().getHours();
  
  // Morning (6-12)
  if (hour >= 6 && hour < 12) {
    return "Günaydın! Kahvenizle birlikte güzel bir kitap önerisi almaya ne dersiniz?";
  }
  // Afternoon (12-18)
  else if (hour >= 12 && hour < 18) {
    return "İyi günler! Bugün hangi kitap dünyasına dalmak istersiniz?";
  }
  // Evening (18-22)
  else if (hour >= 18 && hour < 22) {
    return "İyi akşamlar! Akşam okumalarınız için mükemmel bir kitap bulalım mı?";
  }
  // Night (22-6)
  else {
    return "Gece geç saatlerde kitap aramanız güzel! Size uyku öncesi rahatlatıcı veya heyecanlı bir okuma önerebilirim.";
  }
}

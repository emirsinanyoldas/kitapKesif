import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'KitapKeşif nedir ve nasıl kullanılır?',
      answer: 'KitapKeşif, kitapseverlerin yeni kitaplar keşfetmesini, diğer okuyucuların deneyimlerini öğrenmesini ve kendi görüşlerini paylaşmasını sağlayan bir platformdur. Arama çubuğunu kullanarak kitap arayabilir, kategorilere göre filtreleyebilir ve kitap detaylarını inceleyebilirsiniz.'
    },
    {
      question: 'Kitapları nasıl arayabilirim?',
      answer: 'Ana sayfadaki arama çubuğuna kitap adı, yazar adı veya kategori yazarak arama yapabilirsiniz. Arama otomatik olarak sonuçları filtreler ve ilgili kitapları gösterir. Ayrıca kategori filtresini kullanarak belirli türlerdeki kitaplara odaklanabilirsiniz.'
    },
    {
      question: 'Yorumlar gerçek mi?',
      answer: 'Platformumuzdaki yorumlar gerçek okuyucu deneyimlerini yansıtmak üzere tasarlanmış, çeşitli bakış açılarını içeren içeriklerdir. Hem Türkçe hem de İngilizce yorumlar bulabilirsiniz. Yorumlar, kitaplar hakkında dengeli ve çok yönlü bilgi sağlamak amacıyla oluşturulmuştur.'
    },
    {
      question: 'Kendi yorumumu nasıl yazabilirim?',
      answer: 'Şu anda yorum yazma özelliği geliştirme aşamasındadır. Yakında kullanıcıların kendi deneyimlerini paylaşabilecekleri, yıldız puanı verebilecekleri ve diğer okuyucularla etkileşime geçebilecekleri bir sistem eklenecektir.'
    },
    {
      question: 'Kitap puanlaması nasıl çalışır?',
      answer: 'Her kitap 1-5 yıldız arasında puanlanır. Ortalama puan, tüm yorumların ortalaması alınarak hesaplanır. Yüksek puanlı kitaplar genellikle daha fazla yoruma sahiptir, çünkü popüler kitaplar daha çok ilgi çeker.'
    },
    {
      question: 'Kaç tane kitap var platformda?',
      answer: 'Platformumuzda 150\'den fazla kitap bulunmaktadır. Çeşitli kategorilerde - roman, bilim kurgu, fantezi, gizem, tarih, biyografi ve daha fazlası - geniş bir koleksiyon sunuyoruz. Sürekli olarak yeni kitaplar eklenmektedir.'
    },
    {
      question: 'Mobil cihazlarda kullanabilir miyim?',
      answer: 'Evet! KitapKeşif tamamen responsive (duyarlı) tasarıma sahiptir. Telefon, tablet ve bilgisayarınızdan sorunsuz bir şekilde erişebilir ve kullanabilirsiniz. Arayüz otomatik olarak ekran boyutunuza uyum sağlar.'
    },
    {
      question: 'Karanlık mod var mı?',
      answer: 'Evet! Sağ üst köşedeki tema değiştirme butonunu kullanarak Sonbahar Turuncu (aydınlık) ve Gece Lacivert (karanlık) temalar arasında geçiş yapabilirsiniz. Tercihleriniz otomatik olarak kaydedilir.'
    },
    {
      question: 'Kitapları satın alabilir miyim?',
      answer: 'KitapKeşif bir keşif ve inceleme platformudur, doğrudan satış yapmamaktayız. Ancak kitap hakkında detaylı bilgi edinebilir, yorumları okuyabilir ve satın alma kararınızı verebilirsiniz. Kitabı beğendiyseniz yerel kitapçılardan veya online platformlardan temin edebilirsiniz.'
    },
    {
      question: 'Favori listem oluşturabilir miyim?',
      answer: 'Bu özellik yakında eklenecektir! Kullanıcıların beğendikleri kitapları kaydedebilecekleri, okuma listeleri oluşturabilecekleri ve favorilerini yönetebilecekleri bir sistem üzerinde çalışıyoruz.'
    },
    {
      question: 'Kitap öneri sistemi var mı?',
      answer: 'Şu anda manuel arama ve kategori filtreleme ile kitap bulabilirsiniz. Gelecekte, okuduğunuz ve beğendiğiniz kitaplara göre kişiselleştirilmiş öneriler sunacak bir yapay zeka destekli öneri sistemi eklenecektir.'
    },
    {
      question: 'Platform ücretsiz mi?',
      answer: 'Evet, KitapKeşif tamamen ücretsizdir! Kitap araması, yorumları okuma, detayları inceleme ve tüm özelliklere erişim herkes için ücretsizdir. Reklamsız ve temiz bir deneyim sunuyoruz.'
    },
    {
      question: 'Nasıl iletişime geçebilirim?',
      answer: 'Sorularınız, önerileriniz veya geri bildirimleriniz için "Bize Ulaşın" bölümünden iletişime geçebilirsiniz. Ekibimiz size en kısa sürede yanıt verecektir.'
    },
    {
      question: 'Yeni kitaplar ne sıklıkla ekleniyor?',
      answer: 'Kütüphanemizi düzenli olarak güncelliyoruz ve yeni kitaplar ekliyoruz. Popüler yayınları, klasikleri ve farklı türlerden eserleri koleksiyonumuza dahil ediyoruz. Güncel kalın!'
    },
    {
      question: 'Birden fazla dil desteği var mı?',
      answer: 'Şu anda arayüz Türkçe olup, kitap yorumları hem Türkçe hem de İngilizce olarak sunulmaktadır. Gelecekte tam çok dilli destek planlanmaktadır.'
    }
  ];

  return (
    <div className="space-y-4">
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        KitapKeşif hakkında en sık sorulan soruların yanıtlarını burada bulabilirsiniz.
        Aradığınız soruyu bulamadıysanız, lütfen bizimle iletişime geçin.
      </p>

      {faqs.map((faq, index) => (
        <FAQItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}

      <div className="mt-8 p-6 bg-orange-50 dark:bg-slate-700 rounded-xl">
        <h3 className="text-lg font-bold text-orange-900 dark:text-orange-400 mb-3">
          ❓ Başka sorunuz mu var?
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          Yukarıdaki sorular arasında aradığınızı bulamadıysanız, "Bize Ulaşın" bölümünden
          doğrudan bizimle iletişime geçebilirsiniz. Size yardımcı olmaktan mutluluk duyarız!
        </p>
      </div>
    </div>
  );
}

function FAQItem({ question, answer, isOpen, onClick }: { 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  onClick: () => void;
}) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={onClick}
        className="w-full px-6 py-4 flex items-center justify-between bg-white dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 transition-colors duration-200"
      >
        <span className="text-left font-semibold text-gray-900 dark:text-gray-100 pr-4">
          {question}
        </span>
        <ChevronDown 
          className={`w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

import { Search, Star, MessageSquare, Heart, BookOpen, Users } from 'lucide-react';

export function HowItWorks() {
  return (
    <div className="space-y-6 text-gray-700 dark:text-gray-300">
      <p className="text-lg leading-relaxed">
        KitapKeşif, kitapseverlerin yeni kitaplar keşfetmesini ve deneyimlerini paylaşmasını kolaylaştıran
        bir platformdur. İşte nasıl çalıştığımız:
      </p>

      <div className="space-y-6 mt-8">
        <Step 
          icon={<Search className="w-8 h-8" />}
          title="1. Kitap Keşfet"
          description="Geniş kitap koleksiyonumuzda arama yapın. Başlık, yazar veya kategoriye göre filtreleyerek istediğiniz kitapları bulun."
        />

        <Step 
          icon={<BookOpen className="w-8 h-8" />}
          title="2. Detayları İncele"
          description="Kitap kapağına tıklayarak açıklama, yazar bilgisi ve kapak görsellerini görüntüleyin. Kitap hakkında derinlemesine bilgi edinin."
        />

        <Step 
          icon={<Star className="w-8 h-8" />}
          title="3. Puanları Gör"
          description="Diğer okuyucuların verdiği yıldız puanlarını ve ortalama değerlendirmeleri kontrol edin. Böylece hangi kitapların beğenildiğini öğrenin."
        />

        <Step 
          icon={<MessageSquare className="w-8 h-8" />}
          title="4. Yorumları Oku"
          description="Gerçek okuyucuların deneyimlerini okuyun. Hem Türkçe hem de İngilizce yorumlarla kitap hakkında kapsamlı bilgi edinin."
        />

        <Step 
          icon={<Users className="w-8 h-8" />}
          title="5. Toplulukla Bağlan"
          description="Kitapsever topluluğumuzun bir parçası olun. Başkalarının görüşlerinden faydalanın ve kendi deneyimlerinizi paylaşın."
        />

        <Step 
          icon={<Heart className="w-8 h-8" />}
          title="6. Favorilerini Belirle"
          description="Beğendiğiniz kitapları not edin ve kitap listenizi oluşturun. İlginizi çeken eserleri daha sonra okumak üzere işaretleyin."
        />
      </div>

      <div className="mt-8 p-6 bg-orange-50 dark:bg-slate-700 rounded-xl">
        <h3 className="text-lg font-bold text-orange-900 dark:text-orange-400 mb-3">
          💡 İpucu
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          En iyi deneyim için arama çubuğunu kullanarak ilgilendiğiniz konularda kitap bulabilir,
          kategori filtresiyle belirli türlere odaklanabilir ve kitap detaylarını inceleyerek
          doğru seçimi yapabilirsiniz!
        </p>
      </div>
    </div>
  );
}

function Step({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-4 items-start p-4 rounded-lg hover:bg-orange-50 dark:hover:bg-slate-700 transition-colors duration-200">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 dark:bg-blue-900 flex items-center justify-center text-orange-600 dark:text-blue-400">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

import { Star, Send, BookOpen } from 'lucide-react';
import { useState } from 'react';

export function WriteReview() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setRating(0);
      setReviewText('');
      setName('');
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Teşekkürler!
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Yorumunuz alındı. Kısa süre içinde yayınlanacaktır.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          <strong>ℹ️ Bilgi:</strong> Yorum yazma özelliği şu anda demo modundadır. 
          Yakında gerçek yorum sistemi aktif hale gelecektir!
        </p>
      </div>

      <div>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Okuduğunuz bir kitap hakkında deneyiminizi paylaşın! Yorumunuz diğer kitapseverlere
          yol gösterecek ve topluluğumuzu zenginleştirecektir.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Adınız <span className="text-orange-600">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 dark:focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Örn: Ayşe Yılmaz"
            required
          />
        </div>

        {/* Book Selection */}
        <div>
          <label htmlFor="book" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Kitap Seçin <span className="text-orange-600">*</span>
          </label>
          <div className="relative">
            <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              id="book"
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 dark:focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
              required
            >
              <option value="">Kitap seçiniz...</option>
              <option value="1">1984 - George Orwell</option>
              <option value="2">Suç ve Ceza - Fyodor Dostoyevski</option>
              <option value="3">Yüzüklerin Efendisi - J.R.R. Tolkien</option>
              <option value="4">Simyacı - Paulo Coelho</option>
              <option value="5">Harry Potter - J.K. Rowling</option>
            </select>
          </div>
        </div>

        {/* Star Rating */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Puanınız <span className="text-orange-600">*</span>
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform duration-200 hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoveredRating || rating)
                      ? 'fill-orange-500 text-orange-500'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-2 text-gray-600 dark:text-gray-400 self-center">
                {rating} / 5
              </span>
            )}
          </div>
        </div>

        {/* Review Text */}
        <div>
          <label htmlFor="review" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Yorumunuz <span className="text-orange-600">*</span>
          </label>
          <textarea
            id="review"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows={6}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 dark:focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Kitap hakkındaki düşüncelerinizi paylaşın... Ne beğendiniz? Ne beğenmediniz? Kime önerirsiniz?"
            required
            minLength={20}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            En az 20 karakter ({reviewText.length}/20)
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!name || rating === 0 || reviewText.length < 20}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 dark:from-blue-600 dark:to-indigo-600 text-white font-bold py-4 px-6 rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          Yorumu Gönder
        </button>
      </form>

      <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <h4 className="font-bold text-yellow-900 dark:text-yellow-400 mb-2">
          💡 Yorum Yazma İpuçları
        </h4>
        <ul className="text-sm text-yellow-800 dark:text-yellow-300 space-y-1 list-disc list-inside">
          <li>Dürüst ve yapıcı olun</li>
          <li>Spoiler vermekten kaçının</li>
          <li>Kitabın hangi yönlerini beğendiğinizi/beğenmediğinizi açıklayın</li>
          <li>Diğer okuyuculara faydalı olacak detaylar paylaşın</li>
          <li>Saygılı bir dil kullanın</li>
        </ul>
      </div>
    </div>
  );
}

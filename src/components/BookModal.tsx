import { X, Star, User } from 'lucide-react';
import { Book, Review } from '../types';
import { formatDate, formatRating } from '../utils';
import { MESSAGES } from '../constants';
import { memo } from 'react';

interface BookModalProps {
  book: Book;
  reviews: Review[];
  onClose: () => void;
}

export const BookModal = memo(function BookModal({ book, reviews, onClose }: BookModalProps) {
  // Debug: Log book data to console
  console.log('BookModal - Book data:', book);
  console.log('BookModal - Reviews:', reviews);

  // Ensure we have valid book data
  if (!book) {
    console.error('BookModal - No book data provided');
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-6xl max-h-[90vh] bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 dark:bg-slate-700/90 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-slate-700 transition-all duration-300 hover:scale-110 hover:rotate-90"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="overflow-y-auto max-h-[90vh]">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-orange-100 to-blue-100 dark:from-gray-700 dark:to-gray-800 shadow-xl">
                <img
                  src={book.cover_image}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {book.title || 'Başlık Yok'}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                  {book.author || 'Yazar Bilinmiyor'}
                </p>

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-800/30 rounded-full border border-orange-200/50 dark:border-orange-700/50">
                    <Star className="w-5 h-5 fill-orange-500 text-orange-500 dark:fill-orange-400 dark:text-orange-400" />
                    <span className="text-lg font-bold text-orange-700 dark:text-orange-300">
                      {formatRating(book.average_rating)}
                    </span>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">
                    {book.total_reviews} değerlendirme
                  </span>
                </div>

                {book.category && (
                  <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-200/50 dark:border-blue-700/50">
                    {book.category}
                  </div>
                )}

                <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                  {book.description || 'Bu kitap için açıklama bulunmamaktadır.'}
                </p>
              </div>

              <div className="border-t border-gray-200 dark:border-blue-900/50 pt-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Okuyucu Yorumları
                </h3>

                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {reviews.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                      {MESSAGES.NO_REVIEWS_YET}
                    </p>
                  ) : (
                    reviews.map((review) => (
                      <div
                        key={review.id}
                        className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-2xl border border-gray-200/50 dark:border-blue-800/50 hover:border-orange-300 dark:hover:border-blue-600 transition-all duration-300"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-orange-400 to-blue-400 flex-shrink-0">
                            {review.user_avatar ? (
                              <img
                                src={review.user_avatar}
                                alt={review.user_name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <User className="w-6 h-6 text-white" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                {review.user_name}
                              </h4>
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? 'fill-orange-500 text-orange-500'
                                        : 'text-gray-300 dark:text-gray-600'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                              {review.comment}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                              {formatDate(review.created_at)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

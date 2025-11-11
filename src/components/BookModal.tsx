import { X, Star, User, Send } from 'lucide-react';
import { Book, Review } from '../types';
import { formatDate, formatRating } from '../utils';
import { MESSAGES } from '../constants';
import { memo, useEffect, useRef, useState } from 'react';
import { ReviewService } from '../services';

interface BookModalProps {
  book: Book;
  reviews: Review[];
  onClose: () => void;
  refreshReviews?: () => Promise<void>;
}

export const BookModal = memo(function BookModal({ book, reviews: initialReviews, onClose, refreshReviews }: BookModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
    user_name: '',
    user_avatar: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  // Handle escape key to close modal and scroll to modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Debug: Log book data to console
    console.log('BookModal - Book data:', book);
    console.log('BookModal - Reviews:', initialReviews);

    // Scroll to modal when it opens
    const scrollToModal = () => {
      if (modalRef.current) {
        // Check if modal is already in viewport
        const rect = modalRef.current.getBoundingClientRect();
        const isInViewport = (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );

        // Only scroll if modal is not in viewport
        if (!isInViewport) {
          modalRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
          });
        }
      }
    };

    // Use requestAnimationFrame for better timing
    if (modalRef.current) {
      requestAnimationFrame(() => {
        // Fallback to setTimeout if needed
        setTimeout(scrollToModal, 50);
      });
    }

    document.addEventListener('keydown', handleEscape);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Restore body scrolling when modal is closed
      document.body.style.overflow = 'unset';
    };
  }, [book, initialReviews, onClose]);

  // Update reviews when initialReviews change
  useEffect(() => {
    setReviews(initialReviews);
  }, [initialReviews]);

  // Ensure we have valid book data
  if (!book) {
    console.error('BookModal - No book data provided');
    return null;
  }

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newReview.user_name.trim() || !newReview.comment.trim() || newReview.rating === 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      // Generate a simple avatar URL based on the user's name
      const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(newReview.user_name)}`;

      const reviewData = {
        book_id: book.id,
        user_name: newReview.user_name,
        user_avatar: avatarUrl,
        rating: newReview.rating,
        comment: newReview.comment
      };

      const { data, error } = await ReviewService.addReview(reviewData);

      if (error) {
        console.error('Error adding review:', error);
      }

      // If we have a refreshReviews function, use it to fetch updated reviews
      if (refreshReviews) {
        await refreshReviews();
      } else {
        // Fallback: Add the new review to the local state
        if (data) {
          setReviews(prev => [data, ...prev]);
        } else {
          // Create a local review object for demo purposes
          const localReview: Review = {
            id: `local-${Date.now()}`,
            ...reviewData,
            created_at: new Date().toISOString()
          };
          setReviews(prev => [localReview, ...prev]);
        }
      }

      // Reset form
      setNewReview({
        rating: 0,
        comment: '',
        user_name: '',
        user_avatar: ''
      });
      
      setSubmitSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Unexpected error adding review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" 
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl max-h-[90vh] bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 dark:bg-slate-700/90 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-slate-700 transition-all duration-300 hover:scale-110 hover:rotate-90"
          aria-label="Close modal"
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
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://placehold.co/300x400?text=Kapak+Resmi+Yok';
                  }}
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

              {/* Add Review Form */}
              <div className="border-t border-gray-200 dark:border-blue-900/50 pt-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Yorum Ekle
                </h3>
                
                {submitSuccess ? (
                  <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-2xl p-4 mb-6">
                    <p className="text-green-700 dark:text-green-300 font-medium">
                      Yorumunuz başarıyla eklendi! Teşekkür ederiz.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleAddReview} className="space-y-4 mb-6">
                    <div>
                      <label htmlFor="user_name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Adınız <span className="text-orange-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="user_name"
                        value={newReview.user_name}
                        onChange={(e) => setNewReview({...newReview, user_name: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 dark:focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Adınızı girin"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Puanınız <span className="text-orange-600">*</span>
                      </label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReview({...newReview, rating: star})}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                          >
                            <Star
                              className={`w-8 h-8 ${
                                star <= (hoveredRating || newReview.rating)
                                  ? 'fill-orange-500 text-orange-500'
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          </button>
                        ))}
                        {newReview.rating > 0 && (
                          <span className="ml-2 text-gray-600 dark:text-gray-400 self-center">
                            {newReview.rating} / 5
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="comment" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Yorumunuz <span className="text-orange-600">*</span>
                      </label>
                      <textarea
                        id="comment"
                        value={newReview.comment}
                        onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 dark:focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                        placeholder="Bu kitap hakkında düşüncelerinizi paylaşın..."
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting || !newReview.user_name.trim() || !newReview.comment.trim() || newReview.rating === 0}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Gönderiliyor...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Yorumu Gönder</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Existing Reviews Section */}
              <div className="border-t border-gray-200 dark:border-blue-900/50 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Okuyucu Yorumları
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {reviews.length} yorum
                  </span>
                </div>

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
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.parentElement!.innerHTML = `
                                    <div class="w-full h-full flex items-center justify-center">
                                      <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                      </svg>
                                    </div>
                                  `;
                                }}
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
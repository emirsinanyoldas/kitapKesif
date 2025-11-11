import { useState, useCallback } from 'react';
import { Book, Review } from '../types';
import { ReviewService } from '../services';
import { MESSAGES } from '../constants';

export function useBookModal() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openModal = useCallback(async (book: Book) => {
    console.log('Opening modal for book:', book);
    setSelectedBook(book);
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await ReviewService.fetchReviewsByBookId(book.id);

      if (fetchError) {
        console.error('Error fetching reviews:', fetchError);
        setError(MESSAGES.ERROR_FETCHING_REVIEWS);
        setReviews([]);
      } else {
        console.log('Fetched reviews:', data);
        setReviews(data || []);
      }
    } catch (err) {
      console.error('Unexpected error fetching reviews:', err);
      setError(MESSAGES.ERROR_FETCHING_REVIEWS);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const closeModal = useCallback(() => {
    console.log('Closing modal');
    setSelectedBook(null);
    setReviews([]);
    setError(null);
  }, []);

  // Refresh reviews for the currently selected book
  const refreshReviews = useCallback(async () => {
    if (!selectedBook) return;

    try {
      const { data, error: fetchError } = await ReviewService.fetchReviewsByBookId(selectedBook.id);

      if (fetchError) {
        console.error('Error refreshing reviews:', fetchError);
        setError(MESSAGES.ERROR_FETCHING_REVIEWS);
      } else {
        setReviews(data || []);
        setError(null);
      }
    } catch (err) {
      console.error('Unexpected error refreshing reviews:', err);
      setError(MESSAGES.ERROR_FETCHING_REVIEWS);
    }
  }, [selectedBook]);

  return {
    selectedBook,
    reviews,
    loading,
    error,
    openModal,
    closeModal,
    refreshReviews,
  };
}
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
    setSelectedBook(book);
    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await ReviewService.fetchReviewsByBookId(book.id);

    if (fetchError) {
      setError(MESSAGES.ERROR_FETCHING_REVIEWS);
      console.error('Error fetching reviews:', fetchError);
      setLoading(false);
      return;
    }

    setReviews(data || []);
    setLoading(false);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedBook(null);
    setReviews([]);
    setError(null);
  }, []);

  return {
    selectedBook,
    reviews,
    loading,
    error,
    openModal,
    closeModal,
  };
}

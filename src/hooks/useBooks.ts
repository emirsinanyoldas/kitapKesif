import { useState, useEffect, useCallback, useMemo } from 'react';
import { Book } from '../types';
import { BookService } from '../services';
import { MESSAGES } from '../constants';
import { useDebounce } from './useDebounce';

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Debounce search query for better performance
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await BookService.fetchBooks();

    if (fetchError) {
      setError(MESSAGES.ERROR_FETCHING_BOOKS);
      console.error('Error fetching books:', fetchError);
      setLoading(false);
      return;
    }

    setBooks(data || []);
    setFilteredBooks(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  useEffect(() => {
    const filtered = BookService.applyFilters(books, debouncedSearchQuery, selectedCategory);
    setFilteredBooks(filtered);
  }, [books, debouncedSearchQuery, selectedCategory]);

  // Memoize categories to avoid recalculation
  const categories = useMemo(() => BookService.getCategories(books), [books]);

  return {
    books,
    filteredBooks,
    loading,
    error,
    searchQuery,
    selectedCategory,
    categories,
    setSearchQuery,
    setSelectedCategory,
    refetch: fetchBooks,
  };
}

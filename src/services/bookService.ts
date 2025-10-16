import { supabase } from '../lib/supabase';
import { Book } from '../types';

// Simple in-memory cache
let booksCache: { data: Book[] | null; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export class BookService {
  /**
   * Fetch all books ordered by rating (with caching)
   */
  static async fetchBooks(): Promise<{ data: Book[] | null; error: Error | null }> {
    try {
      // Check cache first
      const now = Date.now();
      if (booksCache && (now - booksCache.timestamp) < CACHE_DURATION) {
        return { data: booksCache.data, error: null };
      }

      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('average_rating', { ascending: false });

      if (error) {
        return { data: null, error: new Error(error.message) };
      }

      // Update cache
      booksCache = { data: data || [], timestamp: now };

      return { data: data || [], error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error : new Error('Unknown error occurred'),
      };
    }
  }

  /**
   * Clear the books cache
   */
  static clearCache(): void {
    booksCache = null;
  }

  /**
   * Search books by query (title, author, category)
   */
  static filterBooks(books: Book[], searchQuery: string): Book[] {
    if (!searchQuery) return books;

    const query = searchQuery.toLowerCase();
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query)
    );
  }

  /**
   * Filter books by category
   */
  static filterByCategory(books: Book[], category: string): Book[] {
    if (!category) return books;
    return books.filter((book) => book.category === category);
  }

  /**
   * Get unique categories from books
   */
  static getCategories(books: Book[]): string[] {
    return Array.from(new Set(books.map((book) => book.category)));
  }

  /**
   * Apply multiple filters
   */
  static applyFilters(
    books: Book[],
    searchQuery: string,
    category: string
  ): Book[] {
    let filtered = books;

    if (searchQuery) {
      filtered = this.filterBooks(filtered, searchQuery);
    }

    if (category) {
      filtered = this.filterByCategory(filtered, category);
    }

    return filtered;
  }
}

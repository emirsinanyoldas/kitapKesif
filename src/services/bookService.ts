import { supabase, hasSupabaseConnection } from '../lib/supabase';
import { Book } from '../types';
import { OpenLibraryService } from './openLibraryService';

// Simple in-memory cache
let booksCache: { data: Book[] | null; timestamp: number } | null = null;
let fallbackBooksCache: { data: Book[] | null; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export class BookService {
  /**
   * Fetch all books ordered by rating (with caching)
   * Combines database books and fallback books to ensure all content is displayed
   */
  static async fetchBooks(): Promise<{ data: Book[] | null; error: Error | null }> {
    try {
      // Check cache first
      const now = Date.now();
      if (booksCache && (now - booksCache.timestamp) < CACHE_DURATION) {
        return { data: booksCache.data, error: null };
      }

      let allBooks: Book[] = [];
      const errors: string[] = [];

      // Always try to fetch from Supabase if credentials are configured
      if (hasSupabaseConnection) {
        try {
          const { data, error } = await supabase
            .from('books')
            .select('*')
            .order('average_rating', { ascending: false });

          if (error) {
            errors.push(`Database error: ${error.message}`);
          } else {
            allBooks = [...allBooks, ...(data || [])];
          }
        } catch (dbError) {
          errors.push(`Database fetch failed: ${dbError instanceof Error ? dbError.message : 'Unknown error'}`);
        }
      }

      // If no Supabase connection or if database fetch failed, use Open Library API
      if (!hasSupabaseConnection || allBooks.length === 0) {
        console.warn('⚠️ Using Open Library API as fallback. Configure Supabase for full features.');
        const fallbackResult = await this.fetchBooksFromOpenLibrary();
        
        if (fallbackResult.error) {
          errors.push(`Fallback error: ${fallbackResult.error.message}`);
        } else {
          // Merge fallback books with existing books, avoiding duplicates
          const fallbackBooks = fallbackResult.data || [];
          const uniqueFallbackBooks = fallbackBooks.filter(fallbackBook => 
            !allBooks.some(existingBook => existingBook.title === fallbackBook.title)
          );
          allBooks = [...allBooks, ...uniqueFallbackBooks];
        }
      }

      // Update cache
      booksCache = { data: allBooks, timestamp: now };

      if (errors.length > 0) {
        console.warn('⚠️ Some book sources had errors:', errors.join('; '));
      }

      return { data: allBooks, error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error : new Error('Unknown error occurred'),
      };
    }
  }

  /**
   * Fetch books from Open Library API (fallback mode)
   */
  static async fetchBooksFromOpenLibrary(): Promise<{ data: Book[] | null; error: Error | null }> {
    try {
      // Check cache first
      const now = Date.now();
      if (fallbackBooksCache && (now - fallbackBooksCache.timestamp) < CACHE_DURATION) {
        return { data: fallbackBooksCache.data, error: null };
      }

      // Popular search queries for diverse books
      const queries = [
        'bestseller',
        'classic literature',
        'science fiction',
        'fantasy',
        'mystery'
      ];

      const { data, error } = await OpenLibraryService.fetchBooksForImport(queries, 10);

      if (error) {
        return { data: null, error };
      }

      // Transform to full Book objects with generated IDs
      const books: Book[] = (data || []).map((partialBook, index) => ({
        id: `demo-${index}`,
        title: partialBook.title || 'Unknown Title',
        author: partialBook.author || 'Unknown Author',
        description: partialBook.description || 'No description available.',
        cover_image: partialBook.cover_image || '',
        back_cover_image: partialBook.back_cover_image || null,
        category: partialBook.category || 'General',
        average_rating: partialBook.average_rating || 0,
        total_reviews: partialBook.total_reviews || 0,
        created_at: new Date().toISOString(),
      }));

      // Update cache
      fallbackBooksCache = { data: books, timestamp: now };

      return { data: books, error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error : new Error('Failed to fetch from Open Library'),
      };
    }
  }

  /**
   * Clear the books cache
   */
  static clearCache(): void {
    booksCache = null;
    fallbackBooksCache = null;
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
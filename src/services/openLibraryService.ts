/**
 * Open Library API Service
 * 
 * Provides integration with Open Library API for:
 * - Searching books by title or keyword
 * - Fetching book cover images
 * - Transforming API responses to match our Book type
 */

import { Book } from '../types';

const OPEN_LIBRARY_API_BASE = 'https://openlibrary.org';
const OPEN_LIBRARY_COVERS_BASE = 'https://covers.openlibrary.org/b/isbn';

export interface OpenLibraryBook {
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  isbn?: string[];
  subject?: string[];
  publisher?: string[];
  number_of_pages_median?: number;
  language?: string[];
  cover_i?: number;
  key?: string;
}

export interface OpenLibrarySearchResponse {
  numFound: number;
  docs: OpenLibraryBook[];
  start: number;
  num_found: number;
}

export class OpenLibraryService {
  /**
   * Search books by query (title, author, or keyword)
   */
  static async searchBooks(
    query: string,
    limit: number = 50
  ): Promise<{ data: OpenLibraryBook[] | null; error: Error | null }> {
    try {
      const encodedQuery = encodeURIComponent(query);
      const url = `${OPEN_LIBRARY_API_BASE}/search.json?q=${encodedQuery}&limit=${limit}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Open Library API error: ${response.status}`);
      }

      const data: OpenLibrarySearchResponse = await response.json();

      return { data: data.docs || [], error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error : new Error('Unknown error occurred'),
      };
    }
  }

  /**
   * Get cover image URL from ISBN
   */
  static getCoverImageUrl(isbn: string, size: 'S' | 'M' | 'L' = 'M'): string {
    return `${OPEN_LIBRARY_COVERS_BASE}/${isbn}-${size}.jpg`;
  }

  /**
   * Get cover image URL from cover ID
   */
  static getCoverImageUrlById(coverId: number, size: 'S' | 'M' | 'L' = 'M'): string {
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
  }

  /**
   * Generate a book description from available metadata
   */
  static generateDescription(book: OpenLibraryBook): string {
    const parts: string[] = [];

    if (book.first_publish_year) {
      parts.push(`First published in ${book.first_publish_year}.`);
    }

    if (book.publisher && book.publisher.length > 0) {
      parts.push(`Published by ${book.publisher[0]}.`);
    }

    if (book.number_of_pages_median) {
      parts.push(`Approximately ${book.number_of_pages_median} pages.`);
    }

    if (book.subject && book.subject.length > 0) {
      const subjects = book.subject.slice(0, 3).join(', ');
      parts.push(`Topics include: ${subjects}.`);
    }

    return parts.length > 0
      ? parts.join(' ')
      : 'A fascinating book waiting to be discovered.';
  }

  /**
   * Determine category from subjects
   */
  static determineCategory(book: OpenLibraryBook): string {
    if (!book.subject || book.subject.length === 0) {
      return 'General';
    }

    const subjects = book.subject.map((s) => s.toLowerCase());

    // Category mapping
    const categoryMap: { [key: string]: string[] } = {
      Fiction: ['fiction', 'novel', 'literature', 'fantasy', 'science fiction'],
      'Non-Fiction': ['nonfiction', 'biography', 'history', 'philosophy'],
      Mystery: ['mystery', 'detective', 'crime', 'thriller'],
      Romance: ['romance', 'love story'],
      'Science Fiction': ['science fiction', 'sci-fi', 'space'],
      Fantasy: ['fantasy', 'magic', 'adventure'],
      History: ['history', 'historical'],
      Biography: ['biography', 'autobiography', 'memoir'],
      Science: ['science', 'physics', 'chemistry', 'biology'],
      Technology: ['technology', 'computer', 'programming'],
      Business: ['business', 'economics', 'finance'],
      'Self-Help': ['self-help', 'psychology', 'motivation'],
      Children: ['children', 'juvenile', 'kids'],
      Poetry: ['poetry', 'poems'],
      Drama: ['drama', 'play', 'theater'],
    };

    for (const [category, keywords] of Object.entries(categoryMap)) {
      if (subjects.some((subject) => keywords.some((keyword) => subject.includes(keyword)))) {
        return category;
      }
    }

    return book.subject[0] || 'General';
  }

  /**
   * Transform Open Library book to our Book type format
   */
  static transformToBook(openLibBook: OpenLibraryBook): Partial<Book> | null {
    // Must have title and at least one identifier
    if (!openLibBook.title) {
      return null;
    }

    const isbn = openLibBook.isbn?.[0];
    const coverId = openLibBook.cover_i;

    // Get cover image
    let coverImage = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800';
    if (isbn) {
      coverImage = this.getCoverImageUrl(isbn, 'L');
    } else if (coverId) {
      coverImage = this.getCoverImageUrlById(coverId, 'L');
    }

    return {
      title: openLibBook.title,
      author: openLibBook.author_name?.[0] || 'Unknown Author',
      description: this.generateDescription(openLibBook),
      cover_image: coverImage,
      back_cover_image: isbn ? this.getCoverImageUrl(isbn, 'M') : null,
      category: this.determineCategory(openLibBook),
      average_rating: 0,
      total_reviews: 0,
    };
  }

  /**
   * Search and transform books ready for database insertion
   */
  static async fetchBooksForImport(
    queries: string[],
    booksPerQuery: number = 20
  ): Promise<{ data: Partial<Book>[] | null; error: Error | null }> {
    try {
      const allBooks: Partial<Book>[] = [];
      const seenTitles = new Set<string>();

      for (const query of queries) {
        const { data, error } = await this.searchBooks(query, booksPerQuery);

        if (error) {
          console.warn(`Failed to fetch books for query "${query}":`, error);
          continue;
        }

        if (data) {
          for (const openLibBook of data) {
            const book = this.transformToBook(openLibBook);

            // Skip duplicates and invalid books
            if (book && book.title && !seenTitles.has(book.title)) {
              seenTitles.add(book.title);
              allBooks.push(book);
            }
          }
        }

        // Add a small delay to respect API rate limits
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      return { data: allBooks, error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error : new Error('Unknown error occurred'),
      };
    }
  }
}

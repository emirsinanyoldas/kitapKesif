import { supabase } from '../lib/supabase';
import { Review } from '../types';

export class ReviewService {
  /**
   * Fetch reviews for a specific book
   */
  static async fetchReviewsByBookId(
    bookId: string
  ): Promise<{ data: Review[] | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('book_id', bookId)
        .order('created_at', { ascending: false });

      if (error) {
        return { data: null, error: new Error(error.message) };
      }

      return { data: data || [], error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error : new Error('Unknown error occurred'),
      };
    }
  }
}

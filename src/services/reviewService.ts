import { supabase, hasSupabaseConnection } from '../lib/supabase';
import { Review } from '../types';

export class ReviewService {
  /**
   * Fetch reviews for a specific book
   */
  static async fetchReviewsByBookId(
    bookId: string
  ): Promise<{ data: Review[] | null; error: Error | null }> {
    try {
      // If no Supabase connection, return empty reviews
      if (!hasSupabaseConnection) {
        console.warn('⚠️ Reviews require Supabase configuration.');
        return { data: [], error: null };
      }

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

  /**
   * Add a new review for a specific book
   */
  static async addReview(
    review: Omit<Review, 'id' | 'created_at'>
  ): Promise<{ data: Review | null; error: Error | null }> {
    try {
      // If no Supabase connection, return error
      if (!hasSupabaseConnection) {
        return { data: null, error: new Error('Supabase connection required to add reviews') };
      }

      const { data, error } = await supabase
        .from('reviews')
        .insert([{ ...review, created_at: new Date().toISOString() }])
        .select()
        .single();

      if (error) {
        return { data: null, error: new Error(error.message) };
      }

      // Update the book's rating and review count
      await this.updateBookRating(review.book_id);

      return { data: data as Review, error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error : new Error('Unknown error occurred'),
      };
    }
  }

  /**
   * Update book rating and review count after adding a review
   */
  static async updateBookRating(bookId: string): Promise<{ error: Error | null }> {
    try {
      // If no Supabase connection, return error
      if (!hasSupabaseConnection) {
        return { error: new Error('Supabase connection required to update book ratings') };
      }

      // Get all reviews for this book
      const { data: reviews, error: fetchError } = await supabase
        .from('reviews')
        .select('rating')
        .eq('book_id', bookId);

      if (fetchError) {
        return { error: new Error(fetchError.message) };
      }

      // Calculate new average rating and total reviews
      const totalReviews = reviews?.length || 0;
      const averageRating = totalReviews > 0 
        ? Number((reviews!.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1))
        : 0;

      // Update the book
      const { error: updateError } = await supabase
        .from('books')
        .update({ 
          average_rating: averageRating,
          total_reviews: totalReviews
        })
        .eq('id', bookId);

      if (updateError) {
        return { error: new Error(updateError.message) };
      }

      return { error: null };
    } catch (error) {
      return {
        error: error instanceof Error ? error : new Error('Unknown error occurred'),
      };
    }
  }
}
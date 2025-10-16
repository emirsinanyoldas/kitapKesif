export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  cover_image: string;
  back_cover_image: string | null;
  category: string;
  average_rating: number;
  total_reviews: number;
  created_at: string;
}

export interface Review {
  id: string;
  book_id: string;
  user_name: string;
  user_avatar: string;
  rating: number;
  comment: string;
  created_at: string;
}

export type Theme = 'light' | 'dark';

import { Star, MessageCircle } from 'lucide-react';
import { Book } from '../types';
import { formatRating } from '../utils';
import { memo } from 'react';

interface BookCardProps {
  book: Book;
  onClick: () => void;
}

export const BookCard = memo(function BookCard({ book, onClick }: BookCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-orange-100/50 dark:border-blue-900/30"
    >
      <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-orange-100 to-blue-100 dark:from-gray-700 dark:to-gray-800">
        <img
          src={book.cover_image}
          alt={book.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-1 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {book.author}
        </p>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-800/30 rounded-full border border-orange-200/50 dark:border-orange-700/50">
            <Star className="w-4 h-4 fill-orange-500 text-orange-500 dark:fill-orange-400 dark:text-orange-400" />
            <span className="text-sm font-semibold text-orange-700 dark:text-orange-300">
              {formatRating(book.average_rating)}
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/30 rounded-full border border-blue-200/50 dark:border-blue-700/50">
            <MessageCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
              {book.total_reviews}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

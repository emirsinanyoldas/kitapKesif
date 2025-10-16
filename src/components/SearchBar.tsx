import { Search, Filter } from 'lucide-react';
import { useState, memo } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (category: string) => void;
  categories: string[];
}

export const SearchBar = memo(function SearchBar({ onSearch, onCategoryFilter, categories }: SearchBarProps) {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Kitap adı, yazar veya kategori ara..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-orange-200/50 dark:border-blue-800/50 focus:border-orange-500 dark:focus:border-blue-500 outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400 transition-all duration-300 hover:border-orange-300 dark:hover:border-blue-700"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="p-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 text-white hover:from-orange-600 hover:to-orange-700 dark:hover:from-orange-700 dark:hover:to-orange-800 transition-all duration-300 hover:scale-105"
              aria-label="Filter by category"
            >
              <Filter className="w-5 h-5" />
            </button>

            {showCategories && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-orange-200/50 dark:border-blue-800/50 overflow-hidden">
                <div className="p-2">
                  <button
                    onClick={() => {
                      onCategoryFilter('');
                      setShowCategories(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-slate-700 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200"
                  >
                    Tüm Kategoriler
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        onCategoryFilter(category);
                        setShowCategories(false);
                      }}
                      className="w-full text-left px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-slate-700 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

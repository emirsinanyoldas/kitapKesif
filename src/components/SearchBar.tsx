import { Search, Filter } from 'lucide-react';
import { useState, useEffect, memo } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (category: string) => void;
  categories: string[];
  selectedCategory?: string;
}

export const SearchBar = memo(function SearchBar({ 
  onSearch, 
  onCategoryFilter, 
  categories,
  selectedCategory = ''
}: SearchBarProps) {
  const [showCategories, setShowCategories] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.category-filter-container')) {
        setShowCategories(false);
      }
    };

    if (showCategories) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showCategories]);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {selectedCategory && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Aktif Filtre:</span>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium border border-orange-200/50 dark:border-orange-700/50">
              <span>{selectedCategory}</span>
              <button
                onClick={() => onCategoryFilter('')}
                className="hover:bg-orange-200 dark:hover:bg-orange-800/50 rounded-full p-0.5 transition-colors"
                aria-label="Clear filter"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
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

          <div className="relative category-filter-container">
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="p-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 text-white hover:from-orange-600 hover:to-orange-700 dark:hover:from-orange-700 dark:hover:to-orange-800 transition-all duration-300 hover:scale-105 shadow-lg relative"
              aria-label="Filter by category"
            >
              <Filter className="w-5 h-5" />
              {selectedCategory && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white dark:border-slate-900"></span>
              )}
            </button>

            {showCategories && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-orange-200/50 dark:border-blue-800/50 overflow-hidden z-50 animate-fadeIn">
                <div className="p-2 max-h-96 overflow-y-auto">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Kategori Seçin
                  </div>
                  <button
                    onClick={() => {
                      onCategoryFilter('');
                      setShowCategories(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                      selectedCategory === ''
                        ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-slate-700 hover:text-orange-600 dark:hover:text-orange-400'
                    }`}
                  >
                    Tüm Kategoriler
                    {selectedCategory === '' && (
                      <span className="ml-2 text-orange-500">✓</span>
                    )}
                  </button>
                  {categories.length === 0 ? (
                    <div className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm text-center">
                      Kategori bulunamadı
                    </div>
                  ) : (
                    categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          onCategoryFilter(category);
                          setShowCategories(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                          selectedCategory === category
                            ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-semibold'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-slate-700 hover:text-orange-600 dark:hover:text-orange-400'
                        }`}
                      >
                        {category}
                        {selectedCategory === category && (
                          <span className="ml-2 text-orange-500">✓</span>
                        )}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

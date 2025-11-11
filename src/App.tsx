import { lazy, Suspense, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { BookCard } from './components/BookCard';
import { Footer } from './components/Footer';
import { useTheme, useBooks, useBookModal } from './hooks';
import { MESSAGES } from './constants';

// Lazy load heavy components
const BookModal = lazy(() => import('./components/BookModal').then(module => ({ default: module.BookModal })));
const ScrollToTop = lazy(() => import('./components/ScrollToTop').then(module => ({ default: module.ScrollToTop })));
const AIAssistant = lazy(() => import('./components/AIAssistant').then(module => ({ default: module.AIAssistant })));

function App() {
  const { theme, toggleTheme } = useTheme();
  const {
    filteredBooks,
    loading,
    error,
    searchQuery,
    selectedCategory,
    categories,
    setSearchQuery,
    setSelectedCategory,
  } = useBooks();
  const { selectedBook, reviews, openModal, closeModal, refreshReviews } = useBookModal();

  const handleSettingsClick = () => {
    alert(MESSAGES.SETTINGS_COMING_SOON);
  };

  // Log any errors with lazy loading
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.filename && event.filename.includes('BookModal')) {
        console.error('Error loading BookModal:', event.error);
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-amber-50 to-orange-200 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 transition-colors duration-300">
      <Header
        theme={theme}
        onThemeToggle={toggleTheme}
        onSettingsClick={handleSettingsClick}
      />

      <SearchBar
        onSearch={setSearchQuery}
        onCategoryFilter={setSelectedCategory}
        categories={categories}
        selectedCategory={selectedCategory}
      />

      <main className="container mx-auto px-6 pb-12">
        {error && (
          <div className="text-center py-8 mb-6">
            <p className="text-red-500 dark:text-red-400 text-lg">{error}</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            <p className="text-gray-500 dark:text-gray-400 text-lg mt-4">Yükleniyor...</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} onClick={() => openModal(book)} />
              ))}
            </div>

            {filteredBooks.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  {searchQuery || selectedCategory
                    ? MESSAGES.NO_BOOKS_FOUND
                    : MESSAGES.NO_BOOKS_YET}
                </p>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />

      <Suspense fallback={null}>
        {selectedBook && (
          <BookModal
            book={selectedBook}
            reviews={reviews}
            onClose={closeModal}
            refreshReviews={refreshReviews}
          />
        )}

        <ScrollToTop />
        <AIAssistant />
      </Suspense>
    </div>
  );
}

export default App;
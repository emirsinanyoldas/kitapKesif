import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { scrollToTop as scrollToTopUtil } from '../utils';
import { SCROLL_TO_TOP_THRESHOLD } from '../constants';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > SCROLL_TO_TOP_THRESHOLD) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleScrollToTop = () => {
    scrollToTopUtil();
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleScrollToTop}
      className="fixed bottom-8 left-8 p-4 rounded-full bg-orange-100/80 dark:bg-slate-700/80 text-orange-600 dark:text-orange-400 shadow-lg backdrop-blur-sm transition-all duration-300 hover:brightness-90 z-40"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-6 h-6" strokeWidth={2.5} />
    </button>
  );
}

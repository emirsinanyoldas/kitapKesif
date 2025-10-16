import { BookOpen, Sun, Moon, Settings } from 'lucide-react';
import { Theme } from '../types';
import { memo } from 'react';

interface HeaderProps {
  theme: Theme;
  onThemeToggle: () => void;
  onSettingsClick: () => void;
}

export const Header = memo(function Header({ theme, onThemeToggle, onSettingsClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-orange-50/90 dark:bg-slate-900/90 border-b border-orange-300/40 dark:border-blue-900/40 transition-colors">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <BookOpen className="w-10 h-10 text-orange-600 dark:text-orange-400 transition-transform group-hover:scale-110" strokeWidth={1.5} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 dark:from-orange-400 dark:to-blue-400 bg-clip-text text-transparent transition-all group-hover:scale-105">
                KitapKeşif
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">Kitap Öneri ve Değerlendirme</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onThemeToggle}
              className="p-3 rounded-full bg-orange-100 dark:bg-slate-800 text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-110 hover:rotate-12"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button
              onClick={onSettingsClick}
              className="p-3 rounded-full bg-blue-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-110 hover:rotate-90"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
});

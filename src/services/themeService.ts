import { Theme } from '../types';
import { THEME_STORAGE_KEY, THEME_DARK_CLASS } from '../constants';

export class ThemeService {
  /**
   * Get theme from localStorage
   */
  static getStoredTheme(): Theme | null {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return null;
  }

  /**
   * Save theme to localStorage
   */
  static saveTheme(theme: Theme): void {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }

  /**
   * Apply theme to document
   */
  static applyTheme(theme: Theme): void {
    if (theme === 'dark') {
      document.documentElement.classList.add(THEME_DARK_CLASS);
    } else {
      document.documentElement.classList.remove(THEME_DARK_CLASS);
    }
  }

  /**
   * Toggle theme
   */
  static toggleTheme(currentTheme: Theme): Theme {
    return currentTheme === 'light' ? 'dark' : 'light';
  }
}

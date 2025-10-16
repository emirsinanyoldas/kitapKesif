import { useState, useEffect } from 'react';
import { Theme } from '../types';
import { ThemeService } from '../services';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedTheme = ThemeService.getStoredTheme();
    if (savedTheme) {
      setTheme(savedTheme);
      ThemeService.applyTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = ThemeService.toggleTheme(theme);
    setTheme(newTheme);
    ThemeService.saveTheme(newTheme);
    ThemeService.applyTheme(newTheme);
  };

  return { theme, toggleTheme };
}

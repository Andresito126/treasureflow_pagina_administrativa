import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import type { ThemeApi } from './ThemeContext';

export function useTheme(): ThemeApi {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme debe usarse dentro de <ThemeProvider>');
  }
  return ctx;
}

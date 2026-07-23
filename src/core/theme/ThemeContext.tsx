import { createContext } from 'react';

export type ThemeMode = 'light' | 'dark';

export interface ThemeApi {
  theme: ThemeMode;
  toggle: () => void;
  setTheme: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeApi | null>(null);

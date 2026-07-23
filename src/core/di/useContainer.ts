import { useContext } from 'react';
import { DiContext } from './DiContext';
import type { AppContainer } from './container';

/** Access the DI container (use cases) from any presentation-layer component. */
export function useContainer(): AppContainer {
  const ctx = useContext(DiContext);
  if (!ctx) {
    throw new Error('useContainer debe usarse dentro de <DiProvider>');
  }
  return ctx;
}

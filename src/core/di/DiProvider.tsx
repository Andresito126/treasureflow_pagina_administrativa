import type { ReactNode } from 'react';
import { useRef } from 'react';
import { createContainer } from './container';
import type { AppContainer } from './container';
import { DiContext } from './DiContext';

/** Builds the composition root once and provides it to the whole app. */
export function DiProvider({ children }: { children: ReactNode }) {
  const containerRef = useRef<AppContainer | null>(null);
  containerRef.current ??= createContainer();

  return <DiContext.Provider value={containerRef.current}>{children}</DiContext.Provider>;
}

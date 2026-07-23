import { createContext } from 'react';
import type { AppContainer } from './container';

export const DiContext = createContext<AppContainer | null>(null);

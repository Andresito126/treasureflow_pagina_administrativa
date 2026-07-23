import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import type { AuthApi } from './AuthContext';

export function useAuth(): AuthApi {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  }
  return ctx;
}

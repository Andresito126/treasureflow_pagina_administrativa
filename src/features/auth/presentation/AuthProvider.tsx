import type { ReactNode } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { useContainer } from '@/core/di/useContainer';
import { AuthContext } from './AuthContext';
import type { AuthApi } from './AuthContext';
import type { AdminSession, LoginCredentials } from '../domain/entities/adminSession';

/**
 * Presentation-layer auth state. Depends only on the auth use cases exposed by
 * the DI container — never on the repository directly.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const { auth } = useContainer();
  const [session, setSession] = useState<AdminSession | null>(() =>
    auth.getSession.execute(),
  );

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const next = await auth.login.execute(credentials);
      setSession(next);
    },
    [auth.login],
  );

  const logout = useCallback(async () => {
    await auth.logout.execute();
    setSession(null);
  }, [auth.logout]);

  const value = useMemo<AuthApi>(
    () => ({ session, isAuthenticated: session !== null, login, logout }),
    [session, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

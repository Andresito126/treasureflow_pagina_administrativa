import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/presentation/useAuth';
import { ROUTES } from '../routes';

/** Redirects to /login when there is no active session. */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace />;
  }
  return <>{children}</>;
}

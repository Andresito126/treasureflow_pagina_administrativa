import { createContext } from 'react';
import type { AdminSession, LoginCredentials } from '../domain/entities/adminSession';

export interface AuthApi {
  session: AdminSession | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthApi | null>(null);

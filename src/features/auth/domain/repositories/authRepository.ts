import type { AdminSession, LoginCredentials } from '../entities/adminSession';

/**
 * Auth contract. Phase 2 impl will POST {GATEWAY_URL}/api/v1/auth/login and,
 * after a successful login, verify the email against the admin whitelist.
 */
export interface AuthRepository {
  login(credentials: LoginCredentials): Promise<AdminSession>;
  logout(): Promise<void>;
  /** Returns the persisted session, if any (survives page reloads). */
  currentSession(): AdminSession | null;
}

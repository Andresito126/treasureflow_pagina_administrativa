import type { AuthRepository } from '../domain/repositories/authRepository';
import type { AdminSession, LoginCredentials } from '../domain/entities/adminSession';
import { delay } from '@/shared/utils/delay';

const STORAGE_KEY = 'tf-admin-session';

/**
 * Mock auth for Phase 1. Accepts any email/password. The session survives
 * reloads via localStorage — mirroring how a real JWT would be persisted.
 */
export class MockAuthRepository implements AuthRepository {
  async login({ email, password }: LoginCredentials): Promise<AdminSession> {
    await delay(600);
    if (!email || !password) {
      throw new Error('Ingresa tu correo y contraseña.');
    }
    const session: AdminSession = { email: email.trim().toLowerCase(), accessToken: '' };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return session;
  }

  async logout(): Promise<void> {
    await delay(150);
    localStorage.removeItem(STORAGE_KEY);
  }

  currentSession(): AdminSession | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AdminSession;
    } catch {
      return null;
    }
  }
}

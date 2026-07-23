import type { AuthRepository } from '../domain/repositories/authRepository';
import type { AdminSession, LoginCredentials } from '../domain/entities/adminSession';
import type { HttpClient } from '@/core/http/httpClient';
import { HttpError } from '@/core/http/httpClient';
import { tokenStore, decodeJwt } from '@/core/http/tokenStore';

const SESSION_KEY = 'tf-admin-session';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface AccessTokenPayload {
  sub: string;
  email: string;
  userType: string;
}

/**
 * Real auth against the API Gateway: POST /api/v1/auth/login. There is no admin
 * role in the backend, so after a successful login the email is checked against
 * the whitelist (VITE_ADMIN_EMAILS). The JWT is stored for subsequent /admin calls.
 */
export class ApiAuthRepository implements AuthRepository {
  private readonly http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  async login({ email, password }: LoginCredentials): Promise<AdminSession> {
    let tokens: LoginResponse;
    try {
      tokens = await this.http.post<LoginResponse>('/api/v1/auth/login', {
        email,
        password,
      });
    } catch (err) {
      if (err instanceof HttpError && err.status === 401) {
        throw new Error('Correo o contraseña incorrectos.');
      }
      if (err instanceof HttpError && err.status === 403) {
        throw new Error('Tu cuenta ha sido desactivada.');
      }
      throw new Error('No se pudo conectar con el servidor.');
    }

    // Persist the tokens first so the /admin/me check below is authenticated.
    tokenStore.setTokens(tokens.accessToken, tokens.refreshToken);

    // Admin access is decided by the backend (users.is_admin). A non-admin gets
    // 403 here, so we reject the login and clear the tokens.
    try {
      await this.http.get('/api/v1/admin/me');
    } catch (err) {
      tokenStore.clear();
      if (err instanceof HttpError && err.status === 403) {
        throw new Error('Esta cuenta no tiene acceso al panel de administración.');
      }
      throw new Error('No se pudo verificar el acceso de administrador.');
    }

    const payload = decodeJwt<AccessTokenPayload>(tokens.accessToken);
    const resolvedEmail = payload?.email ?? email;
    const session: AdminSession = {
      email: resolvedEmail.toLowerCase(),
      accessToken: tokens.accessToken,
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  }

  async logout(): Promise<void> {
    const refreshToken = tokenStore.getRefreshToken();
    if (refreshToken) {
      try {
        await this.http.post('/api/v1/auth/logout', { refreshToken });
      } catch {
        // best-effort — clear the local session regardless
      }
    }
    tokenStore.clear();
    localStorage.removeItem(SESSION_KEY);
  }

  currentSession(): AdminSession | null {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AdminSession;
    } catch {
      return null;
    }
  }
}

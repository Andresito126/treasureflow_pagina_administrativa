import { env } from '@/core/config/env';

/**
 * Thin fetch wrapper for Phase 2. It is intentionally isolated here so that
 * swapping the mock repositories for API-backed ones only touches the
 * `infrastructure/` layer of each feature — the UI never imports this directly.
 *
 * All admin calls will carry `Authorization: Bearer <token>`.
 */
export class HttpError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(status: number, message: string, body: unknown) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.body = body;
  }
}

type Json = Record<string, unknown>;

export interface HttpClient {
  get<T>(path: string): Promise<T>;
  post<T>(path: string, body?: Json): Promise<T>;
  patch<T>(path: string, body?: Json): Promise<T>;
  delete<T>(path: string): Promise<T>;
}

export function createHttpClient(getToken: () => string | null): HttpClient {
  async function request<T>(method: string, path: string, body?: Json): Promise<T> {
    const token = getToken();
    const res = await fetch(`${env.gatewayUrl}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const text = await res.text();
    const parsed = text ? (JSON.parse(text) as unknown) : null;

    if (!res.ok) {
      throw new HttpError(res.status, `Request failed: ${method} ${path}`, parsed);
    }
    return parsed as T;
  }

  return {
    get: (path) => request('GET', path),
    post: (path, body) => request('POST', path, body),
    patch: (path, body) => request('PATCH', path, body),
    delete: (path) => request('DELETE', path),
  };
}

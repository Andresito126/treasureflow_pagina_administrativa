/**
 * Centralized, typed access to build-time configuration.
 * Phase 1 runs entirely on mock data. In API mode, admin access is decided by
 * the backend (users.is_admin) — there is no email whitelist here.
 */
export const env = {
  /** API Gateway base URL, e.g. http://localhost:3000 (no trailing slash). */
  gatewayUrl: import.meta.env.VITE_GATEWAY_URL ?? '',
  /** When true, the app uses the in-memory mock repositories. */
  useMocks: (import.meta.env.VITE_USE_MOCKS ?? 'true') !== 'false',
} as const;

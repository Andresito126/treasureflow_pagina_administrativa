/**
 * Centralized, typed access to build-time configuration.
 * Phase 1 runs entirely on mock data. In API mode, admin access is decided by
 * the backend (users.is_admin) — there is no email whitelist here.
 */
const requiredEnv = <T extends string | boolean | undefined>(value: T, name: string): Exclude<T, undefined> => {
  if (value === undefined || value === null || value === '') {
    console.error(`Missing required env var: ${name}`);
    throw new Error(`Missing required env var: ${name}`);
  }

  return value as Exclude<T, undefined>;
};

export const env = {
  /** API Gateway base URL, e.g. http://localhost:3000 (no trailing slash). */
  gatewayUrl: requiredEnv(import.meta.env.VITE_GATEWAY_URL, 'VITE_GATEWAY_URL'),
  /** When true, the app uses the in-memory mock repositories. */
  useMocks: requiredEnv(import.meta.env.VITE_USE_MOCKS, 'VITE_USE_MOCKS'),
} as const;

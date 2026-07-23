import type { AdminUser, UserStatus } from '../entities/user';

/**
 * Data-access contract for users. The presentation layer never depends on this
 * directly — it goes through use cases. Phase 2 will provide an API-backed
 * implementation (GET /admin/users, PATCH /admin/users/:id/status, ...).
 */
export interface UserRepository {
  list(): Promise<AdminUser[]>;
  getById(id: string): Promise<AdminUser | null>;
  setStatus(id: string, status: UserStatus): Promise<void>;
  delete(id: string): Promise<void>;
}

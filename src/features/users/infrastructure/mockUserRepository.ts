import type { UserRepository } from '../domain/repositories/userRepository';
import type { AdminUser, UserStatus } from '../domain/entities/user';
import { usersSeed } from '@/mocks/users.mock';
import { delay } from '@/shared/utils/delay';

/** In-memory user repository. Mutations persist for the session (module state). */
export class MockUserRepository implements UserRepository {
  private users: AdminUser[] = usersSeed.map((u) => ({ ...u, stats: { ...u.stats } }));

  async list(): Promise<AdminUser[]> {
    await delay();
    return this.users.map((u) => ({ ...u, stats: { ...u.stats } }));
  }

  async getById(id: string): Promise<AdminUser | null> {
    await delay(150);
    const found = this.users.find((u) => u.id === id);
    return found ? { ...found, stats: { ...found.stats } } : null;
  }

  async setStatus(id: string, status: UserStatus): Promise<void> {
    await delay();
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new Error(`Usuario ${id} no encontrado`);
    user.status = status;
  }

  async delete(id: string): Promise<void> {
    await delay();
    this.users = this.users.filter((u) => u.id !== id);
  }
}

import type { UserRepository } from '../domain/repositories/userRepository';
import type { AdminUser } from '../domain/entities/user';

export class ListUsersUseCase {
  private readonly repo: UserRepository;
  constructor(repo: UserRepository) {
    this.repo = repo;
  }
  execute(): Promise<AdminUser[]> {
    return this.repo.list();
  }
}

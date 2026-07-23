import type { UserRepository } from '../domain/repositories/userRepository';
import type { UserStatus } from '../domain/entities/user';

export class SetUserStatusUseCase {
  private readonly repo: UserRepository;
  constructor(repo: UserRepository) {
    this.repo = repo;
  }
  execute(id: string, status: UserStatus): Promise<void> {
    return this.repo.setStatus(id, status);
  }
}

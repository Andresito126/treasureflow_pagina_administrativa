import type { UserRepository } from '../domain/repositories/userRepository';

export class DeleteUserUseCase {
  private readonly repo: UserRepository;
  constructor(repo: UserRepository) {
    this.repo = repo;
  }
  execute(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}

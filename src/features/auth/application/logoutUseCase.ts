import type { AuthRepository } from '../domain/repositories/authRepository';

export class LogoutUseCase {
  private readonly repo: AuthRepository;
  constructor(repo: AuthRepository) {
    this.repo = repo;
  }
  execute(): Promise<void> {
    return this.repo.logout();
  }
}

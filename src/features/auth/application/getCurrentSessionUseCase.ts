import type { AuthRepository } from '../domain/repositories/authRepository';
import type { AdminSession } from '../domain/entities/adminSession';

export class GetCurrentSessionUseCase {
  private readonly repo: AuthRepository;
  constructor(repo: AuthRepository) {
    this.repo = repo;
  }
  execute(): AdminSession | null {
    return this.repo.currentSession();
  }
}

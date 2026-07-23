import type { AuthRepository } from '../domain/repositories/authRepository';
import type { AdminSession, LoginCredentials } from '../domain/entities/adminSession';

export class LoginUseCase {
  private readonly repo: AuthRepository;
  constructor(repo: AuthRepository) {
    this.repo = repo;
  }
  execute(credentials: LoginCredentials): Promise<AdminSession> {
    return this.repo.login(credentials);
  }
}

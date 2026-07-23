import type { PostRepository } from '../domain/repositories/postRepository';

export class DeletePostUseCase {
  private readonly repo: PostRepository;
  constructor(repo: PostRepository) {
    this.repo = repo;
  }
  execute(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}

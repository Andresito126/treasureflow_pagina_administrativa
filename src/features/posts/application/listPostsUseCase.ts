import type { PostRepository } from '../domain/repositories/postRepository';
import type { AdminPost } from '../domain/entities/post';

export class ListPostsUseCase {
  private readonly repo: PostRepository;
  constructor(repo: PostRepository) {
    this.repo = repo;
  }
  execute(): Promise<AdminPost[]> {
    return this.repo.list();
  }
}

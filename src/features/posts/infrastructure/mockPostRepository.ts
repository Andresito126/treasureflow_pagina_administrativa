import type { PostRepository } from '../domain/repositories/postRepository';
import type { AdminPost } from '../domain/entities/post';
import { postsSeed } from '@/mocks/posts.mock';
import { delay } from '@/shared/utils/delay';

export class MockPostRepository implements PostRepository {
  private posts: AdminPost[] = postsSeed.map((p) => ({ ...p }));

  async list(): Promise<AdminPost[]> {
    await delay();
    return this.posts.map((p) => ({ ...p }));
  }

  async getById(id: string): Promise<AdminPost | null> {
    await delay(150);
    const found = this.posts.find((p) => p.id === id);
    return found ? { ...found } : null;
  }

  async delete(id: string): Promise<void> {
    await delay();
    this.posts = this.posts.filter((p) => p.id !== id);
  }
}

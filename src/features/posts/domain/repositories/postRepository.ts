import type { AdminPost } from '../entities/post';

export interface PostRepository {
  list(): Promise<AdminPost[]>;
  getById(id: string): Promise<AdminPost | null>;
  delete(id: string): Promise<void>;
}

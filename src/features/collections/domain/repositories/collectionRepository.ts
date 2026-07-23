import type { AdminCollection } from '../entities/collection';

export interface CollectionRepository {
  list(): Promise<AdminCollection[]>;
  getById(id: string): Promise<AdminCollection | null>;
}

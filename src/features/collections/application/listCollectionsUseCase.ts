import type { CollectionRepository } from '../domain/repositories/collectionRepository';
import type { AdminCollection } from '../domain/entities/collection';

export class ListCollectionsUseCase {
  private readonly repo: CollectionRepository;
  constructor(repo: CollectionRepository) {
    this.repo = repo;
  }
  execute(): Promise<AdminCollection[]> {
    return this.repo.list();
  }
}

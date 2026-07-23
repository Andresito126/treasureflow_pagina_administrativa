import type { CollectionRepository } from '../domain/repositories/collectionRepository';
import type { AdminCollection } from '../domain/entities/collection';
import { collectionsSeed } from '@/mocks/collections.mock';
import { delay } from '@/shared/utils/delay';

export class MockCollectionRepository implements CollectionRepository {
  private collections: AdminCollection[] = collectionsSeed.map((c) => ({
    ...c,
    timeline: c.timeline.map((e) => ({ ...e })),
  }));

  async list(): Promise<AdminCollection[]> {
    await delay();
    return this.collections.map((c) => ({ ...c, timeline: c.timeline.map((e) => ({ ...e })) }));
  }

  async getById(id: string): Promise<AdminCollection | null> {
    await delay(150);
    const found = this.collections.find((c) => c.id === id);
    return found ? { ...found, timeline: found.timeline.map((e) => ({ ...e })) } : null;
  }
}

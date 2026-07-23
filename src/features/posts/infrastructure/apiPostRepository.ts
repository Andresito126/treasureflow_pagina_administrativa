import type { PostRepository } from '../domain/repositories/postRepository';
import type { AdminPost, PostStatus, PostType } from '../domain/entities/post';
import type { HttpClient } from '@/core/http/httpClient';
import type { WasteCategory } from '@/shared/domain/wasteCategory';
import { mapMaterialToCategory } from '@/shared/domain/materialCategory';

/** Shape returned by GET /api/v1/admin/posts. */
interface AdminPublicationDto {
  id: string;
  publicationType: 'waste' | 'item';
  title: string;
  category: string;
  status: string;
  authorName: string;
  publicationDate: string;
  photoUrl: string | null;
}

const EMOJI: Record<WasteCategory, string> = {
  aluminum: '🥫',
  oil: '🛢️',
  paper: '📦',
  plastic: '🧴',
  metal: '🔩',
  battery: '🔋',
};

/** Maps the backend publication.status enum to the panel's four states. */
function mapStatus(status: string): PostStatus {
  switch (status) {
    case 'active':
      return 'active';
    case 'completed':
      return 'completed';
    case 'reserved':
    case 'pending_moderation':
      return 'waiting';
    case 'cancelled':
    case 'rejected':
      return 'expired';
    default:
      return 'waiting';
  }
}

function toEntity(dto: AdminPublicationDto): AdminPost {
  const type: PostType = dto.publicationType === 'item' ? 'object' : 'waste';
  const category = mapMaterialToCategory(dto.category);
  return {
    id: dto.id,
    title: dto.title,
    category,
    type,
    authorName: dto.authorName,
    estimatedWeightKg: 0,
    createdAt: dto.publicationDate,
    status: mapStatus(dto.status),
    photoEmoji: EMOJI[category],
    photoUrl: dto.photoUrl,
    description:
      type === 'object'
        ? 'Objeto de segunda mano publicado en TreasureFlow.'
        : 'Residuo reciclable publicado en TreasureFlow.',
    location: '—',
  };
}

export class ApiPostRepository implements PostRepository {
  private readonly http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  async list(): Promise<AdminPost[]> {
    const rows = await this.http.get<AdminPublicationDto[]>('/api/v1/admin/posts');
    return rows.map(toEntity);
  }

  async getById(id: string): Promise<AdminPost | null> {
    const rows = await this.http.get<AdminPublicationDto[]>('/api/v1/admin/posts');
    const found = rows.find((r) => r.id === id);
    return found ? toEntity(found) : null;
  }

  async delete(id: string): Promise<void> {
    await this.http.delete(`/api/v1/admin/posts/${id}`);
  }
}

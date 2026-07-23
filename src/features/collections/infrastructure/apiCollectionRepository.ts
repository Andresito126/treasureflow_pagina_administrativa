import type { CollectionRepository } from '../domain/repositories/collectionRepository';
import type {
  AdminCollection,
  CollectionEvent,
  CollectionStatus,
} from '../domain/entities/collection';
import type { HttpClient } from '@/core/http/httpClient';
import { mapMaterialToCategory } from '@/shared/domain/materialCategory';

const STEP_NOTE: Record<CollectionStatus, string> = {
  pending: 'Solicitud creada.',
  on_the_way: 'Ciudadano en ruta al establecimiento.',
  weighing: 'Material recibido en pesaje.',
  paid: 'Transacción completada.',
  cancelled: 'Recolección cancelada.',
};

/** Shape returned by GET /api/v1/admin/collections. */
interface AdminCollectionDto {
  id: string;
  status: string;
  citizenName: string;
  establishmentName: string;
  material: string;
  estimatedQuantity: number | null;
  unit: string | null;
  actualQuantity: number | null;
  finalAmount: number | null;
  createdAt: string;
}

/** Maps the backend collections.status enum to the panel's five states. */
function mapStatus(status: string): CollectionStatus {
  switch (status) {
    case 'pending_delivery':
      return 'pending';
    case 'pending_weighing':
    case 'pending_confirmation':
    case 'pending_payment':
      return 'weighing';
    case 'completed':
      return 'paid';
    case 'cancelled_by_establishment':
    case 'cancelled_by_citizen':
      return 'cancelled';
    default:
      return 'pending';
  }
}

const LIFECYCLE: CollectionStatus[] = ['pending', 'on_the_way', 'weighing', 'paid'];

/**
 * The list endpoint returns only the current status, so we synthesize a
 * plausible lifecycle timeline for the detail modal.
 */
function buildTimeline(status: CollectionStatus, baseIso: string): CollectionEvent[] {
  const base = new Date(baseIso).getTime();
  const step = 45 * 60 * 1000;

  if (status === 'cancelled') {
    return [
      { status: 'pending', at: new Date(base).toISOString(), note: 'Solicitud creada.' },
      { status: 'cancelled', at: new Date(base + step).toISOString(), note: 'Recolección cancelada.' },
    ];
  }

  const reached = LIFECYCLE.slice(0, LIFECYCLE.indexOf(status) + 1);
  return reached.map((s, i) => ({
    status: s,
    at: new Date(base + i * step).toISOString(),
    note: STEP_NOTE[s],
  }));
}

function toEntity(dto: AdminCollectionDto): AdminCollection {
  const status = mapStatus(dto.status);
  return {
    id: dto.id,
    citizenName: dto.citizenName,
    establishmentName: dto.establishmentName,
    material: mapMaterialToCategory(dto.material),
    estimatedWeightKg: dto.estimatedQuantity ?? 0,
    realWeightKg: dto.actualQuantity,
    amount: dto.finalAmount ?? 0,
    paymentMethod: 'transfer',
    date: dto.createdAt,
    status,
    timeline: buildTimeline(status, dto.createdAt),
  };
}

export class ApiCollectionRepository implements CollectionRepository {
  private readonly http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  async list(): Promise<AdminCollection[]> {
    const rows = await this.http.get<AdminCollectionDto[]>('/api/v1/admin/collections');
    return rows.map(toEntity);
  }

  async getById(id: string): Promise<AdminCollection | null> {
    const rows = await this.http.get<AdminCollectionDto[]>('/api/v1/admin/collections');
    const found = rows.find((r) => r.id === id);
    return found ? toEntity(found) : null;
  }
}

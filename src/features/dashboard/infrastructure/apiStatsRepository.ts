import type { StatsRepository } from '../domain/repositories/statsRepository';
import type {
  CategoryCount,
  DashboardStats,
  RecentCollection,
} from '../domain/entities/dashboardStats';
import type { HttpClient } from '@/core/http/httpClient';
import type { CollectionRepository } from '@/features/collections/domain/repositories/collectionRepository';
import { WASTE_CATEGORIES } from '@/shared/domain/wasteCategory';
import { mapMaterialToCategory } from '@/shared/domain/materialCategory';

/** Shape returned by GET /api/v1/admin/stats. */
interface AdminStatsDto {
  totalUsers: number;
  citizens: number;
  establishments: number;
  activePublications: number;
  completedCollections: number;
  totalKg: number;
  newUsers7d: number;
  newPublications7d: number;
  completedCollections7d: number;
  kg7d: number;
  publicationsByMaterial: { material: string; count: number }[];
  activityLast7Days: { day: string; count: number }[];
}

const weekdayFmt = new Intl.DateTimeFormat('es-MX', { weekday: 'short' });

function weekdayLabel(isoDay: string): string {
  const date = new Date(`${isoDay}T00:00:00`);
  const raw = weekdayFmt.format(date).replace('.', '');
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

function pct(recent: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((recent / total) * 100);
}

export class ApiStatsRepository implements StatsRepository {
  private readonly http: HttpClient;
  private readonly collections: CollectionRepository;

  constructor(http: HttpClient, collections: CollectionRepository) {
    this.http = http;
    this.collections = collections;
  }

  async getDashboard(): Promise<DashboardStats> {
    const [dto, allCollections] = await Promise.all([
      this.http.get<AdminStatsDto>('/api/v1/admin/stats'),
      this.collections.list(),
    ]);

    // Aggregate materials into the six fixed categories.
    const counts = new Map<string, number>();
    for (const cat of WASTE_CATEGORIES) counts.set(cat, 0);
    for (const row of dto.publicationsByMaterial) {
      const cat = mapMaterialToCategory(row.material);
      counts.set(cat, (counts.get(cat) ?? 0) + row.count);
    }
    const postsByCategory: CategoryCount[] = WASTE_CATEGORIES.map((category) => ({
      category,
      count: counts.get(category) ?? 0,
    }));

    const recentCollections: RecentCollection[] = allCollections.slice(0, 5).map((c) => ({
      id: c.id,
      citizenName: c.citizenName,
      establishmentName: c.establishmentName,
      status: c.status,
    }));

    return {
      totalUsers: dto.totalUsers,
      citizens: dto.citizens,
      establishments: dto.establishments,
      activePosts: dto.activePublications,
      completedCollections: dto.completedCollections,
      totalKg: dto.totalKg,
      weeklyDeltas: {
        users: pct(dto.newUsers7d, dto.totalUsers),
        posts: pct(dto.newPublications7d, dto.activePublications),
        collections: pct(dto.completedCollections7d, dto.completedCollections),
        kg: pct(dto.kg7d, dto.totalKg),
      },
      postsByCategory,
      activityLast7Days: dto.activityLast7Days.map((a) => ({
        day: weekdayLabel(a.day),
        count: a.count,
      })),
      recentCollections,
    };
  }
}

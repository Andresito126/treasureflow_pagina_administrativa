import type { StatsRepository } from '../domain/repositories/statsRepository';
import type { DashboardStats } from '../domain/entities/dashboardStats';
import { dashboardSeed } from '@/mocks/dashboard.mock';
import { delay } from '@/shared/utils/delay';

export class MockStatsRepository implements StatsRepository {
  async getDashboard(): Promise<DashboardStats> {
    await delay();
    return {
      ...dashboardSeed,
      postsByCategory: dashboardSeed.postsByCategory.map((c) => ({ ...c })),
      activityLast7Days: dashboardSeed.activityLast7Days.map((a) => ({ ...a })),
      recentCollections: dashboardSeed.recentCollections.map((r) => ({ ...r })),
    };
  }
}

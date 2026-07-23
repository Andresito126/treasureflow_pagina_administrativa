import type { DashboardStats } from '@/features/dashboard/domain/entities/dashboardStats';
import { collectionsSeed } from './collections.mock';

export const dashboardSeed: DashboardStats = {
  totalUsers: 542,
  citizens: 471,
  establishments: 71,
  activePosts: 86,
  completedCollections: 1234,
  totalKg: 4500,
  weeklyDeltas: { users: 12, posts: 5, collections: 18, kg: 22 },
  postsByCategory: [
    { category: 'aluminum', count: 64 },
    { category: 'oil', count: 32 },
    { category: 'paper', count: 76 },
    { category: 'plastic', count: 80 },
    { category: 'metal', count: 48 },
    { category: 'battery', count: 20 },
  ],
  activityLast7Days: [
    { day: 'Lun', count: 18 },
    { day: 'Mar', count: 24 },
    { day: 'Mié', count: 21 },
    { day: 'Jue', count: 30 },
    { day: 'Vie', count: 34 },
    { day: 'Sáb', count: 41 },
    { day: 'Dom', count: 38 },
  ],
  recentCollections: collectionsSeed.slice(0, 5).map((c) => ({
    id: c.id,
    citizenName: c.citizenName,
    establishmentName: c.establishmentName,
    status: c.status,
  })),
};

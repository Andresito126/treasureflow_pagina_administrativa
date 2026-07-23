import type { WasteCategory } from '@/shared/domain/wasteCategory';
import type { CollectionStatus } from '@/features/collections/domain/entities/collection';

export interface CategoryCount {
  category: WasteCategory;
  count: number;
}

export interface ActivityPoint {
  /** Short weekday label, e.g. "Lun". */
  day: string;
  count: number;
}

export interface RecentCollection {
  id: string;
  citizenName: string;
  establishmentName: string;
  status: CollectionStatus;
}

export interface WeeklyDeltas {
  users: number;
  posts: number;
  collections: number;
  kg: number;
}

export interface DashboardStats {
  totalUsers: number;
  citizens: number;
  establishments: number;
  activePosts: number;
  completedCollections: number;
  totalKg: number;
  weeklyDeltas: WeeklyDeltas;
  postsByCategory: CategoryCount[];
  activityLast7Days: ActivityPoint[];
  recentCollections: RecentCollection[];
}

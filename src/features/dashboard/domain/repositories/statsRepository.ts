import type { DashboardStats } from '../entities/dashboardStats';

export interface StatsRepository {
  getDashboard(): Promise<DashboardStats>;
}

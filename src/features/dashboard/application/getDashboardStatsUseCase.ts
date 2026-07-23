import type { StatsRepository } from '../domain/repositories/statsRepository';
import type { DashboardStats } from '../domain/entities/dashboardStats';

export class GetDashboardStatsUseCase {
  private readonly repo: StatsRepository;
  constructor(repo: StatsRepository) {
    this.repo = repo;
  }
  execute(): Promise<DashboardStats> {
    return this.repo.getDashboard();
  }
}

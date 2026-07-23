import { useEffect, useState } from 'react';
import { useContainer } from '@/core/di/useContainer';
import type { DashboardStats } from '../domain/entities/dashboardStats';

interface DashboardState {
  stats: DashboardStats | null;
  loading: boolean;
}

/** Loads dashboard stats through the DI use case (never the repository). */
export function useDashboard(): DashboardState {
  const { dashboard } = useContainer();
  const [state, setState] = useState<DashboardState>({ stats: null, loading: true });

  useEffect(() => {
    let active = true;
    dashboard.getStats.execute().then((stats) => {
      if (active) setState({ stats, loading: false });
    });
    return () => {
      active = false;
    };
  }, [dashboard.getStats]);

  return state;
}

import { Card } from '@/shared/ui/Card';
import { PageLoader } from '@/shared/ui/PageLoader';
import { formatCount } from '@/shared/utils/format';
import { useDashboard } from '../useDashboard';
import { KpiCard } from '../components/KpiCard';
import { CategoryBarChart } from '../components/CategoryBarChart';
import { ActivityLineChart } from '../components/ActivityLineChart';
import { RecentCollectionsCard } from '../components/RecentCollectionsCard';

export function DashboardPage() {
  const { stats, loading } = useDashboard();

  if (loading || !stats) {
    return <PageLoader label="Cargando panel…" />;
  }

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          title="Usuarios totales"
          value={formatCount(stats.totalUsers)}
          deltaPercent={stats.weeklyDeltas.users}
          icon="group"
          footer={`${formatCount(stats.citizens)} ciudadanos · ${formatCount(stats.establishments)} establecimientos`}
        />
        <KpiCard
          title="Publicaciones activas"
          value={formatCount(stats.activePosts)}
          deltaPercent={stats.weeklyDeltas.posts}
          icon="inventory_2"
        />
        <KpiCard
          title="Recolecciones completadas"
          value={formatCount(stats.completedCollections)}
          deltaPercent={stats.weeklyDeltas.collections}
          icon="local_shipping"
        />
        <KpiCard
          title="Kg reciclados"
          value={formatCount(stats.totalKg)}
          deltaPercent={stats.weeklyDeltas.kg}
          icon="recycling"
        />
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h3 className="mb-4 font-display text-lg font-bold text-content">
            Publicaciones por categoría
          </h3>
          <CategoryBarChart data={stats.postsByCategory} />
        </Card>
        <Card>
          <h3 className="mb-4 font-display text-base font-bold text-content">
            Actividad (7 días)
          </h3>
          <ActivityLineChart data={stats.activityLast7Days} />
        </Card>
      </section>

      {/* Recent collections */}
      <RecentCollectionsCard items={stats.recentCollections} />
    </div>
  );
}

import { Link } from 'react-router-dom';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Avatar } from '@/shared/ui/Avatar';
import { Icon } from '@/shared/ui/Icon';
import { ROUTES } from '@/app/routes';
import type { RecentCollection } from '../../domain/entities/dashboardStats';
import {
  collectionStatusLabel,
  collectionStatusTone,
} from '@/features/collections/presentation/collectionStatus';

export function RecentCollectionsCard({ items }: { items: RecentCollection[] }) {
  return (
    <Card flush>
      <div className="flex items-center justify-between border-b border-stroke px-6 py-4">
        <h3 className="font-display text-base font-bold text-content">Últimas recolecciones</h3>
        <Link
          to={ROUTES.collections}
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          Ver todas <Icon name="arrow_forward" size={16} />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-page/60 text-xs uppercase tracking-wide text-muted">
              <th className="px-6 py-3 font-semibold">ID</th>
              <th className="px-6 py-3 font-semibold">Ciudadano</th>
              <th className="px-6 py-3 font-semibold">Local (Recolector)</th>
              <th className="px-6 py-3 font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stroke">
            {items.map((c) => (
              <tr key={c.id} className="transition-colors hover:bg-page/50">
                <td className="px-6 py-3 font-semibold text-primary">#{c.id}</td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={c.citizenName} size={30} />
                    <span className="text-content">{c.citizenName}</span>
                  </div>
                </td>
                <td className="px-6 py-3 text-content">{c.establishmentName}</td>
                <td className="px-6 py-3">
                  <Badge tone={collectionStatusTone(c.status)} dot>
                    {collectionStatusLabel(c.status)}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

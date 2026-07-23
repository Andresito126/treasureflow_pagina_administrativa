import { Badge } from '@/shared/ui/Badge';
import { Icon } from '@/shared/ui/Icon';
import { EmptyState } from '@/shared/ui/EmptyState';
import { formatDate, formatMoney, formatWeight } from '@/shared/utils/format';
import { categoryLabel } from '@/shared/domain/wasteCategory';
import type { AdminCollection } from '../../domain/entities/collection';
import {
  collectionStatusLabel,
  collectionStatusTone,
  paymentMethodLabel,
} from '../collectionStatus';

interface CollectionsTableProps {
  collections: AdminCollection[];
  onView: (collection: AdminCollection) => void;
}

export function CollectionsTable({ collections, onView }: CollectionsTableProps) {
  if (collections.length === 0) {
    return <EmptyState emoji="🚚" message="No hay recolecciones con estos filtros." />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead>
          <tr className="bg-page/60 text-xs uppercase tracking-wide text-muted">
            <th className="px-6 py-3 font-semibold">ID</th>
            <th className="px-6 py-3 font-semibold">Ciudadano</th>
            <th className="px-6 py-3 font-semibold">Establecimiento</th>
            <th className="px-6 py-3 font-semibold">Material · Peso (est/real)</th>
            <th className="px-6 py-3 font-semibold">Monto</th>
            <th className="px-6 py-3 font-semibold">Pago</th>
            <th className="px-6 py-3 font-semibold">Fecha</th>
            <th className="px-6 py-3 font-semibold">Estado</th>
            <th className="px-6 py-3 text-right font-semibold">Detalle</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stroke">
          {collections.map((c) => (
            <tr
              key={c.id}
              className="cursor-pointer transition-colors hover:bg-page/50"
              onClick={() => onView(c)}
            >
              <td className="px-6 py-3 font-semibold text-primary">#{c.id}</td>
              <td className="px-6 py-3 text-content">{c.citizenName}</td>
              <td className="px-6 py-3 text-muted">{c.establishmentName}</td>
              <td className="px-6 py-3 text-muted">
                {categoryLabel(c.material)} ·{' '}
                <span className="text-content">
                  {formatWeight(c.estimatedWeightKg)} /{' '}
                  {c.realWeightKg !== null ? formatWeight(c.realWeightKg) : '—'}
                </span>
              </td>
              <td className="px-6 py-3 font-medium text-content">
                {c.amount > 0 ? formatMoney(c.amount) : '—'}
              </td>
              <td className="px-6 py-3 text-muted">{paymentMethodLabel(c.paymentMethod)}</td>
              <td className="px-6 py-3 text-muted">{formatDate(c.date)}</td>
              <td className="px-6 py-3">
                <Badge tone={collectionStatusTone(c.status)} dot>
                  {collectionStatusLabel(c.status)}
                </Badge>
              </td>
              <td className="px-6 py-3 text-right">
                <span className="inline-flex text-muted">
                  <Icon name="chevron_right" size={20} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

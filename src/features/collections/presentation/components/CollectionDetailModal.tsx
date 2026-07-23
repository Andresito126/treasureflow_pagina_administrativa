import { Modal } from '@/shared/ui/Modal';
import { Button } from '@/shared/ui/Button';
import { Badge } from '@/shared/ui/Badge';
import { Icon } from '@/shared/ui/Icon';
import { cn } from '@/shared/utils/cn';
import { formatMoney, formatTime, formatWeight } from '@/shared/utils/format';
import { categoryLabel } from '@/shared/domain/wasteCategory';
import type { AdminCollection } from '../../domain/entities/collection';
import {
  collectionStatusLabel,
  collectionStatusTone,
  paymentMethodLabel,
} from '../collectionStatus';

interface CollectionDetailModalProps {
  collection: AdminCollection | null;
  onClose: () => void;
}

export function CollectionDetailModal({ collection, onClose }: CollectionDetailModalProps) {
  if (!collection) return null;
  const c = collection;

  return (
    <Modal
      open
      onClose={onClose}
      title={`Detalle de transacción · #${c.id}`}
      footer={
        <>
          <Button variant="outline" icon="receipt_long">
            Imprimir recibo
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cerrar
          </Button>
        </>
      }
    >
      {/* Summary */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 rounded-xl border border-stroke p-4 text-sm">
        <Field label="Ciudadano" value={c.citizenName} />
        <Field label="Establecimiento" value={c.establishmentName} />
        <Field label="Material" value={categoryLabel(c.material)} />
        <Field
          label="Peso (est / real)"
          value={`${formatWeight(c.estimatedWeightKg)} / ${
            c.realWeightKg !== null ? formatWeight(c.realWeightKg) : '—'
          }`}
        />
        <Field label="Método de pago" value={paymentMethodLabel(c.paymentMethod)} />
        <div>
          <p className="text-xs uppercase tracking-wide text-muted">Monto total</p>
          <p className="mt-0.5 font-display text-base font-bold text-primary">
            {c.amount > 0 ? formatMoney(c.amount) : '—'}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span className="text-sm font-medium text-muted">Estado actual:</span>
        <Badge tone={collectionStatusTone(c.status)} dot>
          {collectionStatusLabel(c.status)}
        </Badge>
      </div>

      {/* Timeline */}
      <p className="mt-6 mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
        Historial del ciclo
      </p>
      <ol className="relative ml-1">
        {c.timeline.map((event, i) => {
          const isCancelled = event.status === 'cancelled';
          const isLast = i === c.timeline.length - 1;
          return (
            <li key={i} className="relative flex gap-4 pb-6 last:pb-0">
              {/* connector line */}
              {!isLast && (
                <span className="absolute left-[11px] top-6 h-full w-0.5 bg-stroke" />
              )}
              <span
                className={cn(
                  'z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white',
                  isCancelled ? 'bg-danger' : 'bg-primary',
                )}
              >
                <Icon name={isCancelled ? 'close' : 'check'} size={16} />
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-content">
                    {collectionStatusLabel(event.status)}
                  </p>
                  <span className="text-xs text-muted">{formatTime(event.at)}</span>
                </div>
                <p className="mt-0.5 text-sm text-muted">{event.note}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </Modal>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-0.5 font-medium text-content">{value}</p>
    </div>
  );
}

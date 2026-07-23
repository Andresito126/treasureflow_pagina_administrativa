import type { BadgeTone } from '@/shared/ui/Badge';
import type {
  CollectionStatus,
  PaymentMethod,
} from '../domain/entities/collection';

interface StatusMeta {
  label: string;
  tone: BadgeTone;
}

const STATUS: Record<CollectionStatus, StatusMeta> = {
  pending: { label: 'Pendiente', tone: 'neutral' },
  on_the_way: { label: 'En camino', tone: 'info' },
  weighing: { label: 'Pesaje', tone: 'warning' },
  paid: { label: 'Pagada', tone: 'success' },
  cancelled: { label: 'Cancelada', tone: 'danger' },
};

export const COLLECTION_STATUSES = Object.keys(STATUS) as CollectionStatus[];

export function collectionStatusLabel(status: CollectionStatus): string {
  return STATUS[status].label;
}

export function collectionStatusTone(status: CollectionStatus): BadgeTone {
  return STATUS[status].tone;
}

const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  card: 'Tarjeta',
  cash: 'Efectivo',
  transfer: 'Transferencia',
};

export function paymentMethodLabel(method: PaymentMethod): string {
  return PAYMENT_LABELS[method];
}

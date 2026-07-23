import type { WasteCategory } from '@/shared/domain/wasteCategory';

export type CollectionStatus =
  | 'pending'
  | 'on_the_way'
  | 'weighing'
  | 'paid'
  | 'cancelled';

export type PaymentMethod = 'card' | 'cash' | 'transfer';

/** A single step in the collection lifecycle timeline. */
export interface CollectionEvent {
  status: CollectionStatus;
  /** ISO timestamp. */
  at: string;
  note: string;
}

export interface AdminCollection {
  id: string;
  citizenName: string;
  establishmentName: string;
  material: WasteCategory;
  estimatedWeightKg: number;
  /** null until the weighing step confirms the real weight. */
  realWeightKg: number | null;
  /** Amount paid to the citizen, in MXN. */
  amount: number;
  paymentMethod: PaymentMethod;
  /** ISO date of the collection. */
  date: string;
  status: CollectionStatus;
  timeline: CollectionEvent[];
}

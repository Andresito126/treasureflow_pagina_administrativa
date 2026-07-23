import type {
  AdminCollection,
  CollectionEvent,
  CollectionStatus,
  PaymentMethod,
} from '@/features/collections/domain/entities/collection';
import type { WasteCategory } from '@/shared/domain/wasteCategory';

const LIFECYCLE: CollectionStatus[] = ['pending', 'on_the_way', 'weighing', 'paid'];

const NOTES: Record<CollectionStatus, (amount: number, weight: number | null) => string> = {
  pending: () => 'Solicitud creada en el sistema.',
  on_the_way: () => 'Ciudadano en ruta al establecimiento.',
  weighing: (_a, w) => `Material recibido. Peso confirmado: ${w ?? '—'} kg.`,
  paid: (a) => `Transacción completada. Monto: $${a.toFixed(2)} MXN.`,
  cancelled: () => 'Recolección cancelada.',
};

/** Builds a lifecycle timeline consistent with the collection's current status. */
function buildTimeline(
  status: CollectionStatus,
  baseIso: string,
  amount: number,
  realWeight: number | null,
): CollectionEvent[] {
  const base = new Date(baseIso).getTime();
  const step = 45 * 60 * 1000; // 45 min between steps

  if (status === 'cancelled') {
    return [
      { status: 'pending', at: new Date(base).toISOString(), note: NOTES.pending(amount, realWeight) },
      { status: 'cancelled', at: new Date(base + step).toISOString(), note: NOTES.cancelled(amount, realWeight) },
    ];
  }

  const reached = LIFECYCLE.slice(0, LIFECYCLE.indexOf(status) + 1);
  return reached.map((s, i) => ({
    status: s,
    at: new Date(base + i * step).toISOString(),
    note: NOTES[s](amount, realWeight),
  }));
}

type Row = [
  id: string,
  citizen: string,
  establishment: string,
  material: WasteCategory,
  estimated: number,
  real: number | null,
  amount: number,
  method: PaymentMethod,
  date: string,
  status: CollectionStatus,
];

const rows: Row[] = [
  ['TRC-1042', 'Carlos Mendoza', 'Recicladora Sur', 'paper', 14, 12, 120, 'cash', '2026-07-22T10:00:00Z', 'paid'],
  ['TRC-1041', 'Juan Gómez', 'Recicladora Norte', 'plastic', 9, null, 0, 'transfer', '2026-07-22T09:30:00Z', 'on_the_way'],
  ['TRC-1040', 'Laura Ruiz', 'Punto Verde Polanco', 'aluminum', 6, 6, 210, 'card', '2026-07-21T16:00:00Z', 'paid'],
  ['TRC-1039', 'Carlos Herrera', 'Acopio Sur', 'metal', 40, null, 0, 'cash', '2026-07-21T11:00:00Z', 'pending'],
  ['TRC-1038', 'Sofía Vargas', 'EcoCentro CDMX', 'plastic', 8, 8, 96, 'transfer', '2026-07-21T08:00:00Z', 'paid'],
  ['TRC-1037', 'María Aguilar', 'Recicladora El Águila', 'aluminum', 3, 3.2, 145, 'card', '2026-07-20T15:20:00Z', 'paid'],
  ['TRC-1036', 'Diego Morales', 'Green Point Querétaro', 'oil', 20, null, 0, 'cash', '2026-07-20T13:00:00Z', 'weighing'],
  ['TRC-1035', 'Valentina Cruz', 'Recolectora Occidente', 'paper', 12, 11, 88, 'transfer', '2026-07-20T10:30:00Z', 'paid'],
  ['TRC-1034', 'Andrés Jiménez', 'Metales del Bajío', 'metal', 9, null, 0, 'card', '2026-07-19T17:00:00Z', 'cancelled'],
  ['TRC-1033', 'Fernanda Ríos', 'Aceites Verdes SA', 'oil', 25, 24, 360, 'transfer', '2026-07-19T14:15:00Z', 'paid'],
  ['TRC-1032', 'Miguel Ángel Torres', 'Chatarrera López', 'metal', 60, null, 0, 'cash', '2026-07-19T09:20:00Z', 'on_the_way'],
  ['TRC-1031', 'Daniela Flores', 'EcoCentro CDMX', 'plastic', 7, 7, 84, 'card', '2026-07-18T16:40:00Z', 'paid'],
  ['TRC-1030', 'José Luis Ramírez', 'Punto Verde Polanco', 'paper', 18, null, 0, 'transfer', '2026-07-18T11:00:00Z', 'pending'],
  ['TRC-1029', 'Paola Mendoza', 'Recicladora Norte', 'aluminum', 4, 4, 180, 'card', '2026-07-18T08:30:00Z', 'paid'],
  ['TRC-1028', 'Roberto Sánchez', 'Acopio Sur', 'battery', 2, null, 0, 'cash', '2026-07-17T13:00:00Z', 'cancelled'],
  ['TRC-1027', 'María Aguilar', 'Recolectora Occidente', 'paper', 22, 20, 150, 'transfer', '2026-07-17T10:10:00Z', 'paid'],
  ['TRC-1026', 'Sofía Vargas', 'Aceites Verdes SA', 'oil', 10, null, 0, 'card', '2026-07-16T18:20:00Z', 'weighing'],
  ['TRC-1025', 'Juan Gómez', 'Metales del Bajío', 'metal', 45, 43, 640, 'transfer', '2026-07-16T09:00:00Z', 'paid'],
  ['TRC-1024', 'Carlos Herrera', 'Green Point Querétaro', 'plastic', 6, 6, 72, 'cash', '2026-07-15T15:30:00Z', 'paid'],
  ['TRC-1023', 'Fernanda Ríos', 'Recicladora El Águila', 'aluminum', 5, null, 0, 'card', '2026-07-15T12:00:00Z', 'on_the_way'],
];

export const collectionsSeed: AdminCollection[] = rows.map(
  ([
    id,
    citizen,
    establishment,
    material,
    estimated,
    real,
    amount,
    method,
    date,
    status,
  ]): AdminCollection => ({
    id,
    citizenName: citizen,
    establishmentName: establishment,
    material,
    estimatedWeightKg: estimated,
    realWeightKg: real,
    amount,
    paymentMethod: method,
    date,
    status,
    timeline: buildTimeline(status, date, amount, real),
  }),
);

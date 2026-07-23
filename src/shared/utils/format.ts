const currencyFmt = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  minimumFractionDigits: 2,
});

const dateFmt = new Intl.DateTimeFormat('es-MX', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const dateTimeFmt = new Intl.DateTimeFormat('es-MX', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

const timeFmt = new Intl.DateTimeFormat('es-MX', {
  hour: '2-digit',
  minute: '2-digit',
});

/** $120.00 MXN */
export function formatMoney(amount: number): string {
  return `${currencyFmt.format(amount)} MXN`;
}

/** 12 oct 2023 */
export function formatDate(iso: string): string {
  return dateFmt.format(new Date(iso));
}

/** 12 oct 2023, 11:20 a.m. */
export function formatDateTime(iso: string): string {
  return dateTimeFmt.format(new Date(iso));
}

/** 11:20 a.m. */
export function formatTime(iso: string): string {
  return timeFmt.format(new Date(iso));
}

/** "Hace 2 días", "Hoy", "Hace 3 horas" — friendly relative time in Spanish. */
export function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  const diffMs = Date.now() - then;
  const minutes = Math.round(diffMs / 60000);
  if (minutes < 1) return 'Justo ahora';
  if (minutes < 60) return `Hace ${minutes} min`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `Hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  const days = Math.round(hours / 24);
  if (days === 0) return 'Hoy';
  if (days < 30) return `Hace ${days} ${days === 1 ? 'día' : 'días'}`;
  const months = Math.round(days / 30);
  return `Hace ${months} ${months === 1 ? 'mes' : 'meses'}`;
}

/** kg with at most one decimal — "12 kg", "0.5 kg". */
export function formatWeight(kg: number): string {
  const value = Number.isInteger(kg) ? kg.toString() : kg.toFixed(1);
  return `${value} kg`;
}

/** Initials from a full name — "María Aguilar" -> "MA". */
export function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

/** Thousands separator for big counts — 1234 -> "1,234". */
export function formatCount(value: number): string {
  return new Intl.NumberFormat('es-MX').format(value);
}

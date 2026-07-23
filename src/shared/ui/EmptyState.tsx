interface EmptyStateProps {
  emoji?: string;
  title?: string;
  message?: string;
}

/** Friendly empty state shown when filters yield no rows. */
export function EmptyState({
  emoji = '🗑️',
  title = 'No hay resultados',
  message = 'No hay resultados con estos filtros.',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
      <span className="text-4xl" aria-hidden="true">
        {emoji}
      </span>
      <p className="font-display text-base font-semibold text-content">{title}</p>
      <p className="max-w-sm text-sm text-muted">{message}</p>
    </div>
  );
}

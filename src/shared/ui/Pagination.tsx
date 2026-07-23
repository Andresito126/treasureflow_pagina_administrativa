import type { ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';
import { Icon } from './Icon';

interface PaginationProps {
  page: number;
  pageCount: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  page,
  pageCount,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) {
  if (pageCount <= 1 && totalItems <= pageSize) {
    return (
      <div className="flex items-center justify-between px-6 py-4 text-sm text-muted">
        <span>Mostrando {totalItems} resultados</span>
      </div>
    );
  }

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center justify-between gap-3 px-6 py-4 text-sm text-muted sm:flex-row">
      <span>
        Mostrando {from} a {to} de {totalItems} resultados
      </span>
      <div className="flex items-center gap-1">
        <PagerButton
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Anterior"
        >
          <Icon name="chevron_left" size={20} />
        </PagerButton>
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={cn(
              'h-8 min-w-8 rounded-lg px-2 text-sm font-semibold transition-colors',
              p === page
                ? 'bg-primary text-white'
                : 'text-content hover:bg-page',
            )}
          >
            {p}
          </button>
        ))}
        <PagerButton
          disabled={page === pageCount}
          onClick={() => onPageChange(page + 1)}
          aria-label="Siguiente"
        >
          <Icon name="chevron_right" size={20} />
        </PagerButton>
      </div>
    </div>
  );
}

function PagerButton({
  children,
  disabled,
  onClick,
  ...rest
}: {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
  'aria-label': string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex h-8 w-8 items-center justify-center rounded-lg text-content transition-colors hover:bg-page disabled:cursor-not-allowed disabled:opacity-40"
      {...rest}
    >
      {children}
    </button>
  );
}

import type { ReactNode } from 'react';
import { Card } from '@/shared/ui/Card';
import { Icon } from '@/shared/ui/Icon';

interface KpiCardProps {
  title: string;
  value: string;
  deltaPercent: number;
  icon: string;
  /** Extra content under the value, e.g. citizen/establishment breakdown. */
  footer?: ReactNode;
}

export function KpiCard({ title, value, deltaPercent, icon, footer }: KpiCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-card">
      <div className="mb-4 flex items-start justify-between">
        <h3 className="font-display text-base font-bold text-content">{title}</h3>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
          <Icon name={icon} size={22} />
        </span>
      </div>
      <div className="flex items-end gap-2">
        <p className="font-display text-4xl font-bold leading-none text-content">{value}</p>
        <span className="mb-1 inline-flex items-center gap-0.5 text-xs font-semibold text-primary">
          <Icon name="trending_up" size={16} />
          +{deltaPercent}%
        </span>
      </div>
      {footer && <div className="mt-2 text-xs text-muted">{footer}</div>}
    </Card>
  );
}

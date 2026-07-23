import type { ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';
import { Icon } from './Icon';

export type BadgeTone = 'success' | 'warning' | 'info' | 'danger' | 'neutral';

interface BadgeProps {
  tone: BadgeTone;
  children: ReactNode;
  /** Show a leading status dot. */
  dot?: boolean;
  /** Material Symbols icon shown before the label. */
  icon?: string;
  className?: string;
}

/** Pill badge with the status color at ~12% opacity background. */
const TONES: Record<BadgeTone, { text: string; bg: string; dot: string }> = {
  success: { text: 'text-primary', bg: 'bg-primary/12', dot: 'bg-primary' },
  warning: { text: 'text-warning', bg: 'bg-warning/15', dot: 'bg-warning' },
  info: { text: 'text-info', bg: 'bg-info/12', dot: 'bg-info' },
  danger: { text: 'text-danger', bg: 'bg-danger/12', dot: 'bg-danger' },
  neutral: { text: 'text-muted', bg: 'bg-muted/15', dot: 'bg-muted' },
};

export function Badge({ tone, children, dot = false, icon, className }: BadgeProps) {
  const styles = TONES[tone];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-xs font-semibold',
        styles.text,
        styles.bg,
        className,
      )}
    >
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', styles.dot)} />}
      {icon && <Icon name={icon} size={14} />}
      {children}
    </span>
  );
}

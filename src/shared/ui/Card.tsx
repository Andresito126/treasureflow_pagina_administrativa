import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Remove inner padding (useful when the card wraps a full-bleed table). */
  flush?: boolean;
}

export function Card({ children, className, flush = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-card border border-stroke bg-card shadow-soft',
        !flush && 'p-6',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

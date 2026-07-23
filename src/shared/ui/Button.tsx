import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';
import { Icon } from './Icon';
import { Spinner } from './Spinner';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
type Size = 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  /** Material Symbols icon name shown before the label. */
  icon?: string;
  children?: ReactNode;
}

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-primary text-white hover:brightness-95 focus-visible:ring-primary/40',
  secondary:
    'bg-secondary text-white hover:brightness-110 focus-visible:ring-secondary/40',
  danger: 'bg-danger text-white hover:brightness-95 focus-visible:ring-danger/40',
  outline:
    'border border-stroke bg-card text-content hover:bg-page focus-visible:ring-primary/30',
  ghost: 'text-content hover:bg-page focus-visible:ring-primary/30',
};

const SIZES: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-semibold font-display',
        'transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-card',
        'disabled:cursor-not-allowed disabled:opacity-60',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Spinner size={16} />
      ) : (
        icon && <Icon name={icon} size={size === 'sm' ? 18 : 20} />
      )}
      {children}
    </button>
  );
}

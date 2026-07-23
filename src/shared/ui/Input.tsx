import type { InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/shared/utils/cn';
import { Icon } from './Icon';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  /** Leading Material Symbols icon. */
  icon?: string;
  /** Optional element rendered at the right edge (e.g. password toggle). */
  trailing?: ReactNode;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, icon, trailing, error, id, className, ...props },
  ref,
) {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-semibold font-display text-content"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted">
            <Icon name={icon} size={20} />
          </span>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full rounded-xl border border-stroke bg-card py-2.5 text-sm text-content',
            'placeholder:text-muted transition-colors',
            'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30',
            icon ? 'pl-10' : 'pl-4',
            trailing ? 'pr-10' : 'pr-4',
            error && 'border-danger focus:border-danger focus:ring-danger/30',
            className,
          )}
          {...props}
        />
        {trailing && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted">
            {trailing}
          </span>
        )}
      </div>
      {error && <p className="mt-1 text-xs font-medium text-danger">{error}</p>}
    </div>
  );
});

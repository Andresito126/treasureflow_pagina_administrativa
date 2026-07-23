import type { SelectHTMLAttributes } from 'react';
import { cn } from '@/shared/utils/cn';
import { Icon } from './Icon';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  icon?: string;
  options: SelectOption[];
}

export function Select({ label, icon, options, id, className, ...props }: SelectProps) {
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
        <select
          id={id}
          className={cn(
            'w-full appearance-none rounded-xl border border-stroke bg-card py-2.5 text-sm text-content',
            'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30',
            icon ? 'pl-10' : 'pl-4',
            'pr-10',
            className,
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-muted">
          <Icon name="expand_more" size={20} />
        </span>
      </div>
    </div>
  );
}

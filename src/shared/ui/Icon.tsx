import { cn } from '@/shared/utils/cn';

interface IconProps {
  name: string;
  className?: string;
  /** Font-size in px. */
  size?: number;
}

/** Material Symbols (Outlined) glyph. */
export function Icon({ name, className, size = 24 }: IconProps) {
  return (
    <span
      className={cn('material-symbols-outlined', className)}
      style={{ fontSize: size }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}

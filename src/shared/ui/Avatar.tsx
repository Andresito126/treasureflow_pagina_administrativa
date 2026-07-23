import { cn } from '@/shared/utils/cn';
import { initials as toInitials } from '@/shared/utils/format';

interface AvatarProps {
  name: string;
  size?: number;
  className?: string;
  /** Tailwind bg/text classes for the initials chip. */
  tone?: string;
}

/** Circular initials avatar (no remote images in the mock phase). */
export function Avatar({
  name,
  size = 32,
  className,
  tone = 'bg-primary/15 text-primary',
}: AvatarProps) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-bold font-display',
        tone,
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {toInitials(name)}
    </span>
  );
}

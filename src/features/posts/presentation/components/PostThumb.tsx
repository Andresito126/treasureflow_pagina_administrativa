import { cn } from '@/shared/utils/cn';

interface PostThumbProps {
  emoji: string;
  /** Real photo URL; when present it renders instead of the emoji. */
  photoUrl?: string | null;
  size?: number;
}

/** Post photo thumbnail: real image when available, emoji fallback otherwise. */
export function PostThumb({ emoji, photoUrl, size = 48 }: PostThumbProps) {
  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt=""
        className="shrink-0 rounded-lg border border-stroke object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center rounded-lg border border-stroke bg-page/60',
      )}
      style={{ width: size, height: size, fontSize: size * 0.5 }}
      aria-hidden="true"
    >
      {emoji}
    </span>
  );
}

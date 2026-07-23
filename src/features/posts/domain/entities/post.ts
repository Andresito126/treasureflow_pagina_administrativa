import type { WasteCategory } from '@/shared/domain/wasteCategory';

export type PostType = 'waste' | 'object';
export type PostStatus = 'active' | 'completed' | 'waiting' | 'expired';

export interface AdminPost {
  id: string;
  title: string;
  category: WasteCategory;
  type: PostType;
  authorName: string;
  estimatedWeightKg: number;
  /** ISO creation date. */
  createdAt: string;
  status: PostStatus;
  /** Emoji stand-in used when there is no real photo (mock phase / fallback). */
  photoEmoji: string;
  /** Real photo URL when available (API phase); null falls back to the emoji. */
  photoUrl?: string | null;
  description: string;
  location: string;
}

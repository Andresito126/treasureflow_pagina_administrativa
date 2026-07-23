import type { BadgeTone } from '@/shared/ui/Badge';
import type { PostStatus, PostType } from '../domain/entities/post';

interface StatusMeta {
  label: string;
  tone: BadgeTone;
}

const STATUS: Record<PostStatus, StatusMeta> = {
  active: { label: 'Activa', tone: 'success' },
  completed: { label: 'Completada', tone: 'warning' },
  waiting: { label: 'En espera', tone: 'info' },
  expired: { label: 'Expirada', tone: 'danger' },
};

export const POST_STATUSES = Object.keys(STATUS) as PostStatus[];

export function postStatusLabel(status: PostStatus): string {
  return STATUS[status].label;
}

export function postStatusTone(status: PostStatus): BadgeTone {
  return STATUS[status].tone;
}

export function postTypeLabel(type: PostType): string {
  return type === 'object' ? 'Objeto' : 'Residuo';
}

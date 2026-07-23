import type { BadgeTone } from '@/shared/ui/Badge';
import type { UserRole, UserStatus } from '../domain/entities/user';

export function roleLabel(role: UserRole): string {
  return role === 'establishment' ? 'Establecimiento' : 'Ciudadano';
}

export function roleTone(role: UserRole): BadgeTone {
  return role === 'establishment' ? 'success' : 'info';
}

export function userStatusLabel(status: UserStatus): string {
  return status === 'active' ? 'Activa' : 'Desactivada';
}

export function userStatusTone(status: UserStatus): BadgeTone {
  return status === 'active' ? 'success' : 'neutral';
}

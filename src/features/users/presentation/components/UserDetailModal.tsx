import type { ReactNode } from 'react';
import { Modal } from '@/shared/ui/Modal';
import { Button } from '@/shared/ui/Button';
import { Badge } from '@/shared/ui/Badge';
import { Avatar } from '@/shared/ui/Avatar';
import { Icon } from '@/shared/ui/Icon';
import { formatDate, formatRelative, formatCount } from '@/shared/utils/format';
import type { AdminUser } from '../../domain/entities/user';
import {
  roleLabel,
  roleTone,
  userStatusLabel,
  userStatusTone,
} from '../userMeta';

interface UserDetailModalProps {
  user: AdminUser | null;
  busy: boolean;
  onClose: () => void;
  onToggleStatus: (user: AdminUser) => void;
  onRequestDelete: (user: AdminUser) => void;
}

export function UserDetailModal({
  user,
  busy,
  onClose,
  onToggleStatus,
  onRequestDelete,
}: UserDetailModalProps) {
  if (!user) return null;
  const isActive = user.status === 'active';

  return (
    <Modal
      open
      onClose={onClose}
      title="Detalle de usuario"
      footer={
        <>
          <Button
            variant="outline"
            icon="delete"
            className="text-danger"
            onClick={() => onRequestDelete(user)}
          >
            Eliminar
          </Button>
          <Button
            variant={isActive ? 'outline' : 'primary'}
            icon={isActive ? 'block' : 'check_circle'}
            loading={busy}
            onClick={() => onToggleStatus(user)}
          >
            {isActive ? 'Desactivar usuario' : 'Activar usuario'}
          </Button>
        </>
      }
    >
      {/* Identity */}
      <div className="flex flex-col items-center text-center">
        <Avatar name={user.name} size={72} />
        <h3 className="mt-3 font-display text-lg font-bold text-content">{user.name}</h3>
        <p className="text-sm text-muted">{user.email}</p>
        <div className="mt-2">
          <Badge tone={roleTone(user.role)}>{roleLabel(user.role)}</Badge>
        </div>
      </div>

      {/* Recycling stats */}
      <p className="mt-6 mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
        Estadísticas de reciclaje
      </p>
      <div className="grid grid-cols-2 gap-3">
        <StatTile
          icon="recycling"
          value={`${formatCount(user.stats.totalKg)} kg`}
          label="Total reciclado"
        />
        <StatTile
          icon="task_alt"
          value={formatCount(user.stats.successfulCollections)}
          label="Recolecciones exitosas"
        />
      </div>

      {/* Account info */}
      <p className="mt-6 mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
        Información de la cuenta
      </p>
      <dl className="divide-y divide-stroke rounded-xl border border-stroke">
        <InfoRow label="Teléfono" value={user.phone} />
        <InfoRow label="Fecha de registro" value={formatDate(user.registeredAt)} />
        <InfoRow label="Última actividad" value={formatRelative(user.stats.lastActivity)} />
        <InfoRow
          label="Estado actual"
          value={
            <Badge tone={userStatusTone(user.status)} dot>
              {userStatusLabel(user.status)}
            </Badge>
          }
        />
      </dl>
    </Modal>
  );
}

function StatTile({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <div className="rounded-xl border border-stroke bg-page/50 p-4 text-center">
      <Icon name={icon} size={24} className="text-primary" />
      <p className="mt-1 font-display text-xl font-bold text-content">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 text-sm">
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium text-content">{value}</dd>
    </div>
  );
}

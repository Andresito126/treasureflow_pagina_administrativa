import { Badge } from '@/shared/ui/Badge';
import { Avatar } from '@/shared/ui/Avatar';
import { ActionsMenu } from '@/shared/ui/ActionsMenu';
import { EmptyState } from '@/shared/ui/EmptyState';
import { formatDate } from '@/shared/utils/format';
import type { AdminUser } from '../../domain/entities/user';
import {
  roleLabel,
  roleTone,
  userStatusLabel,
  userStatusTone,
} from '../userMeta';

interface UsersTableProps {
  users: AdminUser[];
  onView: (user: AdminUser) => void;
  onToggleStatus: (user: AdminUser) => void;
  onDelete: (user: AdminUser) => void;
}

export function UsersTable({ users, onView, onToggleStatus, onDelete }: UsersTableProps) {
  if (users.length === 0) {
    return <EmptyState emoji="🧑‍🤝‍🧑" message="No hay usuarios con estos filtros." />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead>
          <tr className="bg-page/60 text-xs uppercase tracking-wide text-muted">
            <th className="px-6 py-3 font-semibold">Usuario</th>
            <th className="px-6 py-3 font-semibold">Teléfono</th>
            <th className="px-6 py-3 font-semibold">Rol</th>
            <th className="px-6 py-3 font-semibold">Registro</th>
            <th className="px-6 py-3 font-semibold">Estado</th>
            <th className="px-6 py-3 text-right font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stroke">
          {users.map((user) => (
            <tr key={user.id} className="transition-colors hover:bg-page/50">
              <td className="px-6 py-3">
                <div className="flex items-center gap-3">
                  <Avatar name={user.name} size={36} />
                  <div className="min-w-0">
                    <p className="truncate font-medium text-content">{user.name}</p>
                    <p className="truncate text-xs text-muted">{user.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-3 text-muted">{user.phone}</td>
              <td className="px-6 py-3">
                <Badge tone={roleTone(user.role)}>{roleLabel(user.role)}</Badge>
              </td>
              <td className="px-6 py-3 text-muted">{formatDate(user.registeredAt)}</td>
              <td className="px-6 py-3">
                <Badge tone={userStatusTone(user.status)} dot>
                  {userStatusLabel(user.status)}
                </Badge>
              </td>
              <td className="px-6 py-3 text-right">
                <ActionsMenu
                  items={[
                    { label: 'Ver detalle', icon: 'visibility', onClick: () => onView(user) },
                    {
                      label: user.status === 'active' ? 'Desactivar cuenta' : 'Reactivar cuenta',
                      icon: user.status === 'active' ? 'block' : 'check_circle',
                      onClick: () => onToggleStatus(user),
                    },
                    {
                      label: 'Eliminar cuenta',
                      icon: 'delete',
                      danger: true,
                      onClick: () => onDelete(user),
                    },
                  ]}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

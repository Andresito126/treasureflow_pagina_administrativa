import { useState } from 'react';
import { Card } from '@/shared/ui/Card';
import { SearchInput } from '@/shared/ui/SearchInput';
import { Select } from '@/shared/ui/Select';
import { Pagination } from '@/shared/ui/Pagination';
import { PageLoader } from '@/shared/ui/PageLoader';
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog';
import type { AdminUser } from '../../domain/entities/user';
import { useUsers } from '../useUsers';
import { UsersTable } from '../components/UsersTable';
import { UserDetailModal } from '../components/UserDetailModal';

export function UsersPage() {
  const c = useUsers();

  const [detailUser, setDetailUser] = useState<AdminUser | null>(null);
  const [toggleUser, setToggleUser] = useState<AdminUser | null>(null);
  const [deleteUser, setDeleteUser] = useState<AdminUser | null>(null);

  const confirmToggle = async () => {
    if (!toggleUser) return;
    await c.toggleStatus(toggleUser);
    setToggleUser(null);
    setDetailUser(null);
  };

  const confirmDelete = async () => {
    if (!deleteUser) return;
    await c.removeUser(deleteUser);
    setDeleteUser(null);
    setDetailUser(null);
  };

  return (
    <div className="space-y-5">
      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto_auto]">
          <SearchInput
            value={c.search}
            onChange={c.setSearch}
            placeholder="Buscar por nombre o correo…"
          />
          <Select
            aria-label="Filtrar por rol"
            icon="badge"
            value={c.role}
            onChange={(e) => c.setRole(e.target.value as typeof c.role)}
            options={[
              { value: 'all', label: 'Todos los roles' },
              { value: 'citizen', label: 'Ciudadano' },
              { value: 'establishment', label: 'Establecimiento' },
            ]}
          />
          <Select
            aria-label="Filtrar por estado"
            icon="filter_list"
            value={c.status}
            onChange={(e) => c.setStatus(e.target.value as typeof c.status)}
            options={[
              { value: 'all', label: 'Todos los estados' },
              { value: 'active', label: 'Activa' },
              { value: 'disabled', label: 'Desactivada' },
            ]}
          />
        </div>
      </Card>

      {/* Table */}
      <Card flush>
        {c.loading ? (
          <PageLoader label="Cargando usuarios…" />
        ) : (
          <>
            <UsersTable
              users={c.users}
              onView={setDetailUser}
              onToggleStatus={setToggleUser}
              onDelete={setDeleteUser}
            />
            <div className="border-t border-stroke">
              <Pagination
                page={c.page}
                pageCount={c.pageCount}
                totalItems={c.totalFiltered}
                pageSize={c.pageSize}
                onPageChange={c.setPage}
              />
            </div>
          </>
        )}
      </Card>

      {/* Detail modal */}
      {detailUser && (
        <UserDetailModal
          user={detailUser}
          busy={c.busyId === detailUser.id}
          onClose={() => setDetailUser(null)}
          onToggleStatus={setToggleUser}
          onRequestDelete={setDeleteUser}
        />
      )}

      {/* Toggle status confirm */}
      <ConfirmDialog
        open={toggleUser !== null}
        onClose={() => setToggleUser(null)}
        onConfirm={confirmToggle}
        loading={toggleUser ? c.busyId === toggleUser.id : false}
        tone={toggleUser?.status === 'active' ? 'danger' : 'primary'}
        title={toggleUser?.status === 'active' ? 'Desactivar cuenta' : 'Reactivar cuenta'}
        confirmLabel={toggleUser?.status === 'active' ? 'Desactivar' : 'Reactivar'}
        message={
          toggleUser?.status === 'active'
            ? `¿Seguro que quieres desactivar la cuenta de ${toggleUser?.name}? No podrá iniciar sesión hasta reactivarla.`
            : `¿Reactivar la cuenta de ${toggleUser?.name}? Volverá a tener acceso a la plataforma.`
        }
      />

      {/* Delete confirm */}
      <ConfirmDialog
        open={deleteUser !== null}
        onClose={() => setDeleteUser(null)}
        onConfirm={confirmDelete}
        loading={deleteUser ? c.busyId === deleteUser.id : false}
        tone="danger"
        title="Eliminar cuenta"
        confirmLabel="Eliminar definitivamente"
        confirmationWord="ELIMINAR"
        message={`Esta acción es permanente. Se eliminará la cuenta de ${deleteUser?.name} y sus datos asociados.`}
      />
    </div>
  );
}

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useContainer } from '@/core/di/useContainer';
import { useToast } from '@/shared/toast/useToast';
import type { AdminUser, UserRole, UserStatus } from '../domain/entities/user';

const PAGE_SIZE = 8;

export type RoleFilter = 'all' | UserRole;
export type StatusFilter = 'all' | UserStatus;

export function useUsers() {
  const { users } = useContainer();
  const toast = useToast();

  const [all, setAll] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState<RoleFilter>('all');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [page, setPage] = useState(1);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    users.list.execute().then((list) => {
      if (active) {
        setAll(list);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [users.list]);

  // Reset to first page whenever a filter changes.
  useEffect(() => {
    setPage(1);
  }, [search, role, status]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return all.filter((u) => {
      if (role !== 'all' && u.role !== role) return false;
      if (status !== 'all' && u.status !== status) return false;
      if (q && !u.name.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });
  }, [all, search, role, status]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleStatus = useCallback(
    async (user: AdminUser) => {
      const next: UserStatus = user.status === 'active' ? 'disabled' : 'active';
      setBusyId(user.id);
      try {
        await users.setStatus.execute(user.id, next);
        setAll((prev) =>
          prev.map((u) => (u.id === user.id ? { ...u, status: next } : u)),
        );
        toast.success(
          next === 'disabled' ? 'Cuenta desactivada' : 'Cuenta reactivada',
        );
      } catch {
        toast.error('No se pudo actualizar la cuenta.');
      } finally {
        setBusyId(null);
      }
    },
    [users.setStatus, toast],
  );

  const removeUser = useCallback(
    async (user: AdminUser) => {
      setBusyId(user.id);
      try {
        await users.remove.execute(user.id);
        setAll((prev) => prev.filter((u) => u.id !== user.id));
        toast.success('Cuenta eliminada');
      } catch {
        toast.error('No se pudo eliminar la cuenta.');
      } finally {
        setBusyId(null);
      }
    },
    [users.remove, toast],
  );

  return {
    loading,
    users: visible,
    totalFiltered: filtered.length,
    pageSize: PAGE_SIZE,
    page,
    pageCount,
    setPage,
    search,
    setSearch,
    role,
    setRole,
    status,
    setStatus,
    busyId,
    toggleStatus,
    removeUser,
  };
}

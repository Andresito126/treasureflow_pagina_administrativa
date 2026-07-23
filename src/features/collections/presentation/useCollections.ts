import { useEffect, useMemo, useState } from 'react';
import { useContainer } from '@/core/di/useContainer';
import type { AdminCollection, CollectionStatus } from '../domain/entities/collection';

const PAGE_SIZE = 8;

export type CollectionStatusFilter = 'all' | CollectionStatus;

export function useCollections() {
  const { collections } = useContainer();

  const [all, setAll] = useState<AdminCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<CollectionStatusFilter>('all');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    let active = true;
    collections.list.execute().then((list) => {
      if (active) {
        setAll(list);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [collections.list]);

  useEffect(() => {
    setPage(1);
  }, [search, status, fromDate, toDate]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const from = fromDate ? new Date(fromDate).getTime() : null;
    const to = toDate ? new Date(toDate).getTime() + 24 * 60 * 60 * 1000 : null;
    return all.filter((c) => {
      if (status !== 'all' && c.status !== status) return false;
      const time = new Date(c.date).getTime();
      if (from !== null && time < from) return false;
      if (to !== null && time > to) return false;
      if (
        q &&
        !c.id.toLowerCase().includes(q) &&
        !c.citizenName.toLowerCase().includes(q) &&
        !c.establishmentName.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [all, search, status, fromDate, toDate]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return {
    loading,
    collections: visible,
    totalFiltered: filtered.length,
    pageSize: PAGE_SIZE,
    page,
    pageCount,
    setPage,
    search,
    setSearch,
    status,
    setStatus,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
  };
}

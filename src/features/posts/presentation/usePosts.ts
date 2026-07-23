import { useCallback, useEffect, useMemo, useState } from 'react';
import { useContainer } from '@/core/di/useContainer';
import { useToast } from '@/shared/toast/useToast';
import type { AdminPost, PostStatus, PostType } from '../domain/entities/post';
import type { WasteCategory } from '@/shared/domain/wasteCategory';

const PAGE_SIZE = 8;

export type CategoryFilter = 'all' | WasteCategory;
export type PostStatusFilter = 'all' | PostStatus;
export type PostTypeFilter = 'all' | PostType;

export function usePosts() {
  const { posts } = useContainer();
  const toast = useToast();

  const [all, setAll] = useState<AdminPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [status, setStatus] = useState<PostStatusFilter>('all');
  const [type, setType] = useState<PostTypeFilter>('all');
  const [page, setPage] = useState(1);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    posts.list.execute().then((list) => {
      if (active) {
        setAll(list);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [posts.list]);

  useEffect(() => {
    setPage(1);
  }, [search, category, status, type]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return all.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      if (status !== 'all' && p.status !== status) return false;
      if (type !== 'all' && p.type !== type) return false;
      if (q && !p.title.toLowerCase().includes(q) && !p.authorName.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });
  }, [all, search, category, status, type]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const removePost = useCallback(
    async (post: AdminPost) => {
      setBusyId(post.id);
      try {
        await posts.remove.execute(post.id);
        setAll((prev) => prev.filter((p) => p.id !== post.id));
        toast.success('Publicación eliminada');
      } catch {
        toast.error('No se pudo eliminar la publicación.');
      } finally {
        setBusyId(null);
      }
    },
    [posts.remove, toast],
  );

  return {
    loading,
    posts: visible,
    totalFiltered: filtered.length,
    pageSize: PAGE_SIZE,
    page,
    pageCount,
    setPage,
    search,
    setSearch,
    category,
    setCategory,
    status,
    setStatus,
    type,
    setType,
    busyId,
    removePost,
  };
}

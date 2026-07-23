import { useState } from 'react';
import { Card } from '@/shared/ui/Card';
import { SearchInput } from '@/shared/ui/SearchInput';
import { Select } from '@/shared/ui/Select';
import { Pagination } from '@/shared/ui/Pagination';
import { PageLoader } from '@/shared/ui/PageLoader';
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog';
import { Icon } from '@/shared/ui/Icon';
import { cn } from '@/shared/utils/cn';
import { WASTE_CATEGORIES, categoryLabel } from '@/shared/domain/wasteCategory';
import type { AdminPost } from '../../domain/entities/post';
import { usePosts } from '../usePosts';
import { PostsTable } from '../components/PostsTable';
import { PostsGrid } from '../components/PostsGrid';
import { PostDetailModal } from '../components/PostDetailModal';

type ViewMode = 'table' | 'grid';

export function PostsPage() {
  const c = usePosts();
  const [view, setView] = useState<ViewMode>('table');
  const [detailPost, setDetailPost] = useState<AdminPost | null>(null);
  const [deletePost, setDeletePost] = useState<AdminPost | null>(null);

  const confirmDelete = async () => {
    if (!deletePost) return;
    await c.removePost(deletePost);
    setDeletePost(null);
    setDetailPost(null);
  };

  return (
    <div className="space-y-5">
      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_auto_auto_auto_auto]">
          <SearchInput
            value={c.search}
            onChange={c.setSearch}
            placeholder="Buscar por título o autor…"
          />
          <Select
            aria-label="Filtrar por categoría"
            icon="category"
            value={c.category}
            onChange={(e) => c.setCategory(e.target.value as typeof c.category)}
            options={[
              { value: 'all', label: 'Todas las categorías' },
              ...WASTE_CATEGORIES.map((cat) => ({ value: cat, label: categoryLabel(cat) })),
            ]}
          />
          <Select
            aria-label="Filtrar por tipo"
            icon="sell"
            value={c.type}
            onChange={(e) => c.setType(e.target.value as typeof c.type)}
            options={[
              { value: 'all', label: 'Ambos tipos' },
              { value: 'waste', label: 'Residuo' },
              { value: 'object', label: 'Objeto' },
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
              { value: 'completed', label: 'Completada' },
              { value: 'waiting', label: 'En espera' },
              { value: 'expired', label: 'Expirada' },
            ]}
          />
          <ViewToggle view={view} onChange={setView} />
        </div>
      </Card>

      {/* Content */}
      <Card flush>
        {c.loading ? (
          <PageLoader label="Cargando publicaciones…" />
        ) : (
          <>
            {view === 'table' ? (
              <PostsTable posts={c.posts} onView={setDetailPost} onDelete={setDeletePost} />
            ) : (
              <PostsGrid posts={c.posts} onView={setDetailPost} onDelete={setDeletePost} />
            )}
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

      <PostDetailModal
        post={detailPost}
        onClose={() => setDetailPost(null)}
        onRequestDelete={setDeletePost}
      />

      <ConfirmDialog
        open={deletePost !== null}
        onClose={() => setDeletePost(null)}
        onConfirm={confirmDelete}
        loading={deletePost ? c.busyId === deletePost.id : false}
        tone="danger"
        title="Eliminar publicación"
        confirmLabel="Eliminar"
        message={`¿Eliminar la publicación "${deletePost?.title}"? Úsalo para retirar contenido inapropiado. Esta acción no se puede deshacer.`}
      />
    </div>
  );
}

function ViewToggle({ view, onChange }: { view: ViewMode; onChange: (v: ViewMode) => void }) {
  return (
    <div className="flex items-center rounded-xl border border-stroke p-1">
      {(['table', 'grid'] as ViewMode[]).map((mode) => (
        <button
          key={mode}
          onClick={() => onChange(mode)}
          className={cn(
            'flex h-9 w-10 items-center justify-center rounded-lg transition-colors',
            view === mode ? 'bg-primary text-white' : 'text-muted hover:bg-page',
          )}
          aria-label={mode === 'table' ? 'Vista de tabla' : 'Vista de tarjetas'}
        >
          <Icon name={mode === 'table' ? 'table_rows' : 'grid_view'} size={20} />
        </button>
      ))}
    </div>
  );
}

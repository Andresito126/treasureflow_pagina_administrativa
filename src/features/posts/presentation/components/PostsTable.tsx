import { Badge } from '@/shared/ui/Badge';
import { ActionsMenu } from '@/shared/ui/ActionsMenu';
import { EmptyState } from '@/shared/ui/EmptyState';
import { formatDate, formatWeight } from '@/shared/utils/format';
import { categoryIcon, categoryLabel } from '@/shared/domain/wasteCategory';
import type { AdminPost } from '../../domain/entities/post';
import { postStatusLabel, postStatusTone, postTypeLabel } from '../postStatus';
import { PostThumb } from './PostThumb';

interface PostsTableProps {
  posts: AdminPost[];
  onView: (post: AdminPost) => void;
  onDelete: (post: AdminPost) => void;
}

export function PostsTable({ posts, onView, onDelete }: PostsTableProps) {
  if (posts.length === 0) {
    return <EmptyState emoji="📦" message="No hay publicaciones con estos filtros." />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[820px] text-left text-sm">
        <thead>
          <tr className="bg-page/60 text-xs uppercase tracking-wide text-muted">
            <th className="px-6 py-3 font-semibold">Foto</th>
            <th className="px-6 py-3 font-semibold">Título</th>
            <th className="px-6 py-3 font-semibold">Categoría</th>
            <th className="px-6 py-3 font-semibold">Tipo</th>
            <th className="px-6 py-3 font-semibold">Autor</th>
            <th className="px-6 py-3 font-semibold">Peso est.</th>
            <th className="px-6 py-3 font-semibold">Fecha</th>
            <th className="px-6 py-3 font-semibold">Estado</th>
            <th className="px-6 py-3 text-right font-semibold">Acción</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stroke">
          {posts.map((post) => (
            <tr key={post.id} className="transition-colors hover:bg-page/50">
              <td className="px-6 py-3">
                <PostThumb emoji={post.photoEmoji} photoUrl={post.photoUrl} />
              </td>
              <td className="px-6 py-3 font-medium text-content">{post.title}</td>
              <td className="px-6 py-3">
                <Badge tone="neutral" icon={categoryIcon(post.category)}>
                  {categoryLabel(post.category)}
                </Badge>
              </td>
              <td className="px-6 py-3 text-muted">{postTypeLabel(post.type)}</td>
              <td className="px-6 py-3 text-muted">{post.authorName}</td>
              <td className="px-6 py-3 text-muted">{formatWeight(post.estimatedWeightKg)}</td>
              <td className="px-6 py-3 text-muted">{formatDate(post.createdAt)}</td>
              <td className="px-6 py-3">
                <Badge tone={postStatusTone(post.status)} dot>
                  {postStatusLabel(post.status)}
                </Badge>
              </td>
              <td className="px-6 py-3 text-right">
                <ActionsMenu
                  items={[
                    { label: 'Ver detalle', icon: 'visibility', onClick: () => onView(post) },
                    {
                      label: 'Eliminar publicación',
                      icon: 'delete',
                      danger: true,
                      onClick: () => onDelete(post),
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

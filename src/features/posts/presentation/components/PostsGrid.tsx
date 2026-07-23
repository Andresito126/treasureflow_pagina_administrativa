import { Badge } from '@/shared/ui/Badge';
import { ActionsMenu } from '@/shared/ui/ActionsMenu';
import { EmptyState } from '@/shared/ui/EmptyState';
import { formatDate, formatWeight } from '@/shared/utils/format';
import { categoryIcon, categoryLabel } from '@/shared/domain/wasteCategory';
import type { AdminPost } from '../../domain/entities/post';
import { postStatusLabel, postStatusTone, postTypeLabel } from '../postStatus';

interface PostsGridProps {
  posts: AdminPost[];
  onView: (post: AdminPost) => void;
  onDelete: (post: AdminPost) => void;
}

export function PostsGrid({ posts, onView, onDelete }: PostsGridProps) {
  if (posts.length === 0) {
    return <EmptyState emoji="📦" message="No hay publicaciones con estos filtros." />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex flex-col overflow-hidden rounded-xl border border-stroke bg-card"
        >
          {post.photoUrl ? (
            <img src={post.photoUrl} alt="" className="h-32 w-full object-cover" />
          ) : (
            <div className="flex h-32 items-center justify-center bg-page/60 text-5xl" aria-hidden="true">
              {post.photoEmoji}
            </div>
          )}
          <div className="flex flex-1 flex-col gap-2 p-4">
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-display font-semibold text-content">{post.title}</h4>
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
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Badge tone="neutral" icon={categoryIcon(post.category)}>
                {categoryLabel(post.category)}
              </Badge>
              <Badge tone={postStatusTone(post.status)} dot>
                {postStatusLabel(post.status)}
              </Badge>
            </div>
            <p className="text-xs text-muted">
              {postTypeLabel(post.type)} · {formatWeight(post.estimatedWeightKg)} ·{' '}
              {formatDate(post.createdAt)}
            </p>
            <p className="mt-auto text-sm text-muted">Por {post.authorName}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

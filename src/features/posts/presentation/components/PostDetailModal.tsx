import { Modal } from '@/shared/ui/Modal';
import { Button } from '@/shared/ui/Button';
import { Badge } from '@/shared/ui/Badge';
import { formatDate, formatWeight } from '@/shared/utils/format';
import { categoryIcon, categoryLabel } from '@/shared/domain/wasteCategory';
import type { AdminPost } from '../../domain/entities/post';
import { postStatusLabel, postStatusTone, postTypeLabel } from '../postStatus';

interface PostDetailModalProps {
  post: AdminPost | null;
  onClose: () => void;
  onRequestDelete: (post: AdminPost) => void;
}

export function PostDetailModal({ post, onClose, onRequestDelete }: PostDetailModalProps) {
  if (!post) return null;

  return (
    <Modal
      open
      onClose={onClose}
      title="Detalle de publicación"
      size="lg"
      footer={
        <Button
          variant="outline"
          icon="delete"
          className="text-danger"
          onClick={() => onRequestDelete(post)}
        >
          Eliminar publicación
        </Button>
      }
    >
      {post.photoUrl ? (
        <img
          src={post.photoUrl}
          alt={post.title}
          className="h-48 w-full rounded-xl border border-stroke object-cover"
        />
      ) : (
        <div className="flex h-40 items-center justify-center rounded-xl border border-stroke bg-page/60 text-6xl">
          {post.photoEmoji}
        </div>
      )}

      <h3 className="mt-4 font-display text-xl font-bold text-content">{post.title}</h3>
      <div className="mt-2 flex flex-wrap gap-2">
        <Badge tone="neutral" icon={categoryIcon(post.category)}>
          {categoryLabel(post.category)}
        </Badge>
        <Badge tone="info">{postTypeLabel(post.type)}</Badge>
        <Badge tone={postStatusTone(post.status)} dot>
          {postStatusLabel(post.status)}
        </Badge>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted">{post.description}</p>

      <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 rounded-xl border border-stroke p-4 text-sm">
        <Field label="Autor" value={post.authorName} />
        <Field label="Peso estimado" value={formatWeight(post.estimatedWeightKg)} />
        <Field label="Fecha de publicación" value={formatDate(post.createdAt)} />
        <Field label="Ubicación" value={post.location} />
      </dl>
    </Modal>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted">{label}</dt>
      <dd className="mt-0.5 font-medium text-content">{value}</dd>
    </div>
  );
}

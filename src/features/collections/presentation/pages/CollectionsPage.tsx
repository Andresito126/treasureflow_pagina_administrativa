import { useState } from 'react';
import { Card } from '@/shared/ui/Card';
import { SearchInput } from '@/shared/ui/SearchInput';
import { Select } from '@/shared/ui/Select';
import { Input } from '@/shared/ui/Input';
import { Pagination } from '@/shared/ui/Pagination';
import { PageLoader } from '@/shared/ui/PageLoader';
import type { AdminCollection } from '../../domain/entities/collection';
import { useCollections } from '../useCollections';
import { COLLECTION_STATUSES, collectionStatusLabel } from '../collectionStatus';
import { CollectionsTable } from '../components/CollectionsTable';
import { CollectionDetailModal } from '../components/CollectionDetailModal';

export function CollectionsPage() {
  const c = useCollections();
  const [detail, setDetail] = useState<AdminCollection | null>(null);

  return (
    <div className="space-y-5">
      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_auto_auto_auto]">
          <SearchInput
            value={c.search}
            onChange={c.setSearch}
            placeholder="Buscar por ID, ciudadano o establecimiento…"
          />
          <Select
            aria-label="Filtrar por estado"
            icon="filter_list"
            value={c.status}
            onChange={(e) => c.setStatus(e.target.value as typeof c.status)}
            options={[
              { value: 'all', label: 'Todos los estados' },
              ...COLLECTION_STATUSES.map((s) => ({
                value: s,
                label: collectionStatusLabel(s),
              })),
            ]}
          />
          <Input
            type="date"
            aria-label="Desde"
            value={c.fromDate}
            onChange={(e) => c.setFromDate(e.target.value)}
          />
          <Input
            type="date"
            aria-label="Hasta"
            value={c.toDate}
            onChange={(e) => c.setToDate(e.target.value)}
          />
        </div>
      </Card>

      {/* Table */}
      <Card flush>
        {c.loading ? (
          <PageLoader label="Cargando recolecciones…" />
        ) : (
          <>
            <CollectionsTable collections={c.collections} onView={setDetail} />
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

      <CollectionDetailModal collection={detail} onClose={() => setDetail(null)} />
    </div>
  );
}

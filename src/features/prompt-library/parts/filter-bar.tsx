import { Filter, X } from '../../../shared/ui/icons'
import { Dropdown } from '../../../shared/ui/dropdown'
import { useBucketService } from '../../../shared/services'

type SortOrder = 'newest' | 'oldest' | 'a-z' | 'z-a'

export interface FilterBarProps {
  bucketFilter: string
  onBucketFilterChange: (bucketId: string) => void
  sortOrder: SortOrder
  onSortOrderChange: (order: SortOrder) => void
  resultCount: number
}

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'a-z', label: 'A-Z' },
  { value: 'z-a', label: 'Z-A' },
]

export function FilterBar({
  bucketFilter,
  onBucketFilterChange,
  sortOrder,
  onSortOrderChange,
  resultCount,
}: FilterBarProps) {
  const { buckets } = useBucketService()

  const bucketOptions = [
    { value: '', label: 'All Buckets' },
    ...buckets.map(b => ({ value: b.id, label: b.name })),
  ]

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-2 text-sm text-secondary-600">
        <Filter size={16} />
        <span>
          {resultCount} {resultCount === 1 ? 'result' : 'results'}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {bucketFilter && (
          <button
            onClick={() => onBucketFilterChange('')}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary-50 text-primary-700 rounded-full hover:bg-primary-100 transition-colors"
          >
            Filtered by bucket
            <X size={14} />
          </button>
        )}

        <Dropdown
          value={bucketFilter}
          onChange={(e) => onBucketFilterChange(e.target.value)}
          options={bucketOptions}
          className="w-48"
        />

        <Dropdown
          value={sortOrder}
          onChange={(e) => onSortOrderChange(e.target.value as SortOrder)}
          options={sortOptions}
          className="w-40"
        />
      </div>
    </div>
  )
}

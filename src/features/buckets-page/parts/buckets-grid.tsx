import { PromptBucket } from '../../../shared/types'
import { BucketCard } from '../components/bucket-card'
import { EmptyBucketsState } from '../components/empty-buckets-state'

export interface BucketsGridProps {
  buckets: PromptBucket[]
  getPromptCount: (bucketId: string) => number
  onEdit: (bucket: PromptBucket) => void
  onDelete: (bucket: PromptBucket) => void
  onCreateBucket: () => void
}

export function BucketsGrid({
  buckets,
  getPromptCount,
  onEdit,
  onDelete,
  onCreateBucket,
}: BucketsGridProps) {
  if (buckets.length === 0) {
    return <EmptyBucketsState onCreateBucket={onCreateBucket} />
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {buckets.map(bucket => (
        <BucketCard
          key={bucket.id}
          bucket={bucket}
          promptCount={getPromptCount(bucket.id)}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

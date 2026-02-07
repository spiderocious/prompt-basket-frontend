import { Plus } from '../../../shared/ui/icons'
import { Button } from '../../../shared/ui/button'

export interface BucketsHeaderProps {
  totalCount: number
  onCreateBucket: () => void
}

export function BucketsHeader({ totalCount, onCreateBucket }: BucketsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-secondary-900">Prompt Buckets</h1>
        <p className="mt-1 text-secondary-600">
          {totalCount} {totalCount === 1 ? 'bucket' : 'buckets'}
        </p>
      </div>
      <Button icon={<Plus size={20} />} onClick={onCreateBucket}>
        New Bucket
      </Button>
    </div>
  )
}

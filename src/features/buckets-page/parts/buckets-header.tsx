import { Plus } from '../../../shared/ui/icons'
import { Button } from '../../../shared/ui/button'

export interface BucketsHeaderProps {
  totalCount: number
  onCreateBucket: () => void
}

export function BucketsHeader({ totalCount, onCreateBucket }: BucketsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-secondary-900">Prompt Buckets</h1>
        <p className="mt-1 text-sm md:text-base text-secondary-600">
          {totalCount} {totalCount === 1 ? 'bucket' : 'buckets'}
        </p>
      </div>
      <Button
        icon={<Plus size={20} />}
        onClick={onCreateBucket}
        size="sm"
        className="w-full sm:w-auto"
      >
        <span className="sm:hidden">New</span>
        <span className="hidden sm:inline">New Bucket</span>
      </Button>
    </div>
  )
}

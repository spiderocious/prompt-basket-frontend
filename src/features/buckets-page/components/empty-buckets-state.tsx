import { Folder } from '../../../shared/ui/icons'
import { Button } from '../../../shared/ui/button'

export interface EmptyBucketsStateProps {
  onCreateBucket: () => void
}

export function EmptyBucketsState({ onCreateBucket }: EmptyBucketsStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Folder size={48} className="text-secondary-300 mb-4" />
      <h3 className="text-lg font-medium text-secondary-900 mb-2">
        No buckets yet
      </h3>
      <p className="text-secondary-600 mb-6 max-w-sm">
        Create buckets to organize your prompts by category, project, or any way you like.
      </p>
      <Button onClick={onCreateBucket}>
        Create Your First Bucket
      </Button>
    </div>
  )
}

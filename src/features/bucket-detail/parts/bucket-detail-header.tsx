import { ArrowLeft, Plus } from '../../../shared/ui/icons'
import { Button } from '../../../shared/ui/button'
import { PromptBucket } from '../../../shared/types'
import * as Icons from '../../../shared/ui/icons'
import { useNavigate } from 'react-router-dom'

export interface BucketDetailHeaderProps {
  bucket: PromptBucket
  promptCount: number
  onBack: () => void
}

export function BucketDetailHeader({ bucket, promptCount, onBack }: BucketDetailHeaderProps) {
  const navigate = useNavigate()
  const IconComponent = (Icons[bucket.icon as keyof typeof Icons] || Icons.Folder) as React.ElementType

  return (
    <div className="space-y-3 md:space-y-4">
      <Button
        variant="ghost"
        size="sm"
        icon={<ArrowLeft size={16} />}
        onClick={onBack}
      >
        <span className="hidden sm:inline">Back to Buckets</span>
        <span className="sm:hidden">Back</span>
      </Button>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 md:gap-4">
          <div
            className="flex items-center justify-center h-12 w-12 md:h-16 md:w-16 rounded-xl flex-shrink-0"
            style={{ backgroundColor: `${bucket.color}20`, color: bucket.color }}
          >
            <IconComponent size={24} className="md:w-8 md:h-8" />
          </div>
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-secondary-900">{bucket.name}</h1>
            <p className="mt-1 text-sm md:text-base text-secondary-600">
              {promptCount} {promptCount === 1 ? 'prompt' : 'prompts'}
            </p>
          </div>
        </div>

        <Button
          icon={<Plus size={20} />}
          onClick={() => navigate('/prompts/new')}
          size="sm"
          className="w-full sm:w-auto"
        >
          <span className="sm:hidden">Add</span>
          <span className="hidden sm:inline">Add Prompt</span>
        </Button>
      </div>
    </div>
  )
}

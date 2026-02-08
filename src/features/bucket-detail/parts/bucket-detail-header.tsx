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
    <div className="space-y-4">
      <Button
        variant="ghost"
        size="sm"
        icon={<ArrowLeft size={16} />}
        onClick={onBack}
      >
        Back to Buckets
      </Button>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="flex items-center justify-center h-16 w-16 rounded-xl flex-shrink-0"
            style={{ backgroundColor: `${bucket.color}20`, color: bucket.color }}
          >
            <IconComponent size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">{bucket.name}</h1>
            <p className="mt-1 text-secondary-600">
              {promptCount} {promptCount === 1 ? 'prompt' : 'prompts'}
            </p>
          </div>
        </div>

        <Button
          icon={<Plus size={20} />}
          onClick={() => navigate('/prompts/new')}
        >
          Add Prompt
        </Button>
      </div>
    </div>
  )
}

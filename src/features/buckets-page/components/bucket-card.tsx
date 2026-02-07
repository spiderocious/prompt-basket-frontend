import { useNavigate } from 'react-router-dom'
import { Card } from '../../../shared/ui/card'
import { Button } from '../../../shared/ui/button'
import { Edit, Trash } from '../../../shared/ui/icons'
import * as Icons from '../../../shared/ui/icons'
import { PromptBucket } from '../../../shared/types'

export interface BucketCardProps {
  bucket: PromptBucket
  promptCount: number
  onEdit: (bucket: PromptBucket) => void
  onDelete: (bucket: PromptBucket) => void
}

export function BucketCard({ bucket, promptCount, onEdit, onDelete }: BucketCardProps) {
  const navigate = useNavigate()
  const IconComponent = (Icons[bucket.icon as keyof typeof Icons] || Icons.Folder) as React.ElementType

  return (
    <Card
      hover
      onClick={() => navigate(`/buckets/${bucket.id}`)}
      className="p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div
            className="flex items-center justify-center h-12 w-12 rounded-lg flex-shrink-0"
            style={{ backgroundColor: `${bucket.color}20`, color: bucket.color }}
          >
            <IconComponent size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-secondary-900 truncate">
              {bucket.name}
            </h3>
            <p className="mt-1 text-sm text-secondary-600">
              {promptCount} {promptCount === 1 ? 'prompt' : 'prompts'}
            </p>
          </div>
        </div>

        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            icon={<Edit size={16} />}
            onClick={(e) => {
              e.stopPropagation()
              onEdit(bucket)
            }}
            aria-label="Edit bucket"
          />
          <Button
            variant="ghost"
            size="sm"
            icon={<Trash size={16} />}
            onClick={(e) => {
              e.stopPropagation()
              onDelete(bucket)
            }}
            aria-label="Delete bucket"
          />
        </div>
      </div>
    </Card>
  )
}

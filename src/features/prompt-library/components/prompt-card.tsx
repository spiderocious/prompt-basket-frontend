import { useNavigate } from 'react-router-dom'
import { Card } from '../../../shared/ui/card'
import { Button } from '../../../shared/ui/button'
import { Edit, Copy, Trash } from '../../../shared/ui/icons'
import { Prompt } from '../../../shared/types'
import { formatDate, truncateText } from '../../../shared/utils'
import { useBucketService } from '../../../shared/services'

export interface PromptCardProps {
  prompt: Prompt
  onCopy: (content: string) => void
  onDelete: (id: string) => void
}

export function PromptCard({ prompt, onCopy, onDelete }: PromptCardProps) {
  const navigate = useNavigate()
  const { getBucketById } = useBucketService()
  const bucket = prompt.bucketId ? getBucketById(prompt.bucketId) : null

  return (
    <Card hover onClick={() => navigate(`/prompts/${prompt.id}/edit`)} className="p-5 group">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="flex-1 font-semibold text-secondary-900 line-clamp-1">
            {prompt.title}
          </h3>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              icon={<Copy size={16} />}
              onClick={(e) => {
                e.stopPropagation()
                onCopy(prompt.content)
              }}
              aria-label="Copy prompt"
            />
            <Button
              variant="ghost"
              size="sm"
              icon={<Edit size={16} />}
              onClick={(e) => {
                e.stopPropagation()
                navigate(`/prompts/${prompt.id}/edit`)
              }}
              aria-label="Edit prompt"
            />
            <Button
              variant="ghost"
              size="sm"
              icon={<Trash size={16} />}
              onClick={(e) => {
                e.stopPropagation()
                onDelete(prompt.id)
              }}
              aria-label="Delete prompt"
            />
          </div>
        </div>

        <p className="text-sm text-secondary-600 line-clamp-3">
          {truncateText(prompt.content, 150)}
        </p>

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-secondary-100">
          <div className="flex items-center gap-2 text-xs text-secondary-500">
            {bucket && (
              <span className="flex items-center gap-1.5 px-2 py-1 bg-secondary-50 rounded-full">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: bucket.color }}
                />
                {bucket.name}
              </span>
            )}
          </div>
          <span className="text-xs text-secondary-500">
            {formatDate(prompt.updatedAt)}
          </span>
        </div>
      </div>
    </Card>
  )
}

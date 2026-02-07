import { useNavigate } from 'react-router-dom'
import { Card } from '../../../shared/ui/card'
import { Button } from '../../../shared/ui/button'
import { Edit, Copy, ArrowLeft } from '../../../shared/ui/icons'
import { useDashboardStats } from '../hooks/use-dashboard-stats'
import { formatDate, truncateText, copyToClipboard } from '../../../shared/utils'
import { useBucketService } from '../../../shared/services'

export function RecentPrompts() {
  const navigate = useNavigate()
  const { recentlyUpdated } = useDashboardStats()
  const { getBucketById } = useBucketService()

  const handleCopy = async (content: string) => {
    await copyToClipboard(content)
    // TODO: Show toast notification
  }

  if (recentlyUpdated.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-secondary-600">No prompts yet. Create your first prompt!</p>
        <Button
          className="mt-4"
          onClick={() => navigate('/prompts/new')}
        >
          Create Prompt
        </Button>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-secondary-900">
          Recently Updated
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/prompts')}
          icon={<ArrowLeft size={16} />}
        >
          View All
        </Button>
      </div>

      <div className="space-y-3">
        {recentlyUpdated.map(prompt => {
          const bucket = prompt.bucketId ? getBucketById(prompt.bucketId) : null

          return (
            <Card
              key={prompt.id}
              hover
              onClick={() => navigate(`/prompts/${prompt.id}/edit`)}
              className="p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-secondary-900 truncate">
                    {prompt.title}
                  </h3>
                  <p className="mt-1 text-sm text-secondary-600 line-clamp-2">
                    {truncateText(prompt.content, 100)}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-secondary-500">
                    {bucket && (
                      <span className="flex items-center gap-1">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: bucket.color }}
                        />
                        {bucket.name}
                      </span>
                    )}
                    <span>{formatDate(prompt.updatedAt)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<Copy size={16} />}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCopy(prompt.content)
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
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

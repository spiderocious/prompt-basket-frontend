import { useNavigate } from 'react-router-dom'
import { FileText } from '../../../shared/ui/icons'
import { Button } from '../../../shared/ui/button'

export interface EmptyStateProps {
  hasSearch: boolean
  onClearSearch?: () => void
}

export function EmptyState({ hasSearch, onClearSearch }: EmptyStateProps) {
  const navigate = useNavigate()

  if (hasSearch) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <FileText size={48} className="text-secondary-300 mb-4" />
        <h3 className="text-lg font-medium text-secondary-900 mb-2">
          No prompts found
        </h3>
        <p className="text-secondary-600 mb-6 max-w-sm">
          No prompts match your search criteria. Try adjusting your filters.
        </p>
        {onClearSearch && (
          <Button variant="secondary" onClick={onClearSearch}>
            Clear Search
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <FileText size={48} className="text-secondary-300 mb-4" />
      <h3 className="text-lg font-medium text-secondary-900 mb-2">
        No prompts yet
      </h3>
      <p className="text-secondary-600 mb-6 max-w-sm">
        Get started by creating your first prompt. You can organize them into buckets later.
      </p>
      <Button onClick={() => navigate('/prompts/new')}>
        Create Your First Prompt
      </Button>
    </div>
  )
}

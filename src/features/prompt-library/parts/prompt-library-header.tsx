import { useNavigate } from 'react-router-dom'
import { Plus } from '../../../shared/ui/icons'
import { Button } from '../../../shared/ui/button'
import { SearchBar } from '../../../shared/ui/search-bar'

export interface PromptLibraryHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  totalCount: number
}

export function PromptLibraryHeader({
  searchQuery,
  onSearchChange,
  totalCount,
}: PromptLibraryHeaderProps) {
  const navigate = useNavigate()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">All Prompts</h1>
          <p className="mt-1 text-secondary-600">
            {totalCount} {totalCount === 1 ? 'prompt' : 'prompts'}
          </p>
        </div>
        <Button icon={<Plus size={20} />} onClick={() => navigate('/prompts/new')}>
          New Prompt
        </Button>
      </div>

      <SearchBar
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        onClear={() => onSearchChange('')}
        placeholder="Search prompts by title, content, or tags..."
        className="max-w-2xl"
      />
    </div>
  )
}

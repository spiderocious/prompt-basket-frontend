import { Prompt } from '../../../shared/types'
import { PromptCard } from '../components/prompt-card'
import { EmptyState } from '../components/empty-state'

export interface PromptLibraryGridProps {
  prompts: Prompt[]
  hasSearch: boolean
  onCopy: (content: string) => void
  onDelete: (id: string) => void
  onClearSearch: () => void
}

export function PromptLibraryGrid({
  prompts,
  hasSearch,
  onCopy,
  onDelete,
  onClearSearch,
}: PromptLibraryGridProps) {
  if (prompts.length === 0) {
    return <EmptyState hasSearch={hasSearch} onClearSearch={onClearSearch} />
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {prompts.map(prompt => (
        <PromptCard
          key={prompt.id}
          prompt={prompt}
          onCopy={onCopy}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

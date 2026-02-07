import { Loading } from '../../shared/ui/loading'
import { usePromptLibrary } from './hooks/use-prompt-library'
import { PromptLibraryHeader } from './parts/prompt-library-header'
import { FilterBar } from './parts/filter-bar'
import { PromptLibraryGrid } from './parts/prompt-library-grid'
import { usePromptService } from '../../shared/services'

export function PromptLibrary() {
  const { prompts: allPrompts } = usePromptService()
  const {
    prompts,
    loading,
    searchQuery,
    setSearchQuery,
    bucketFilter,
    setBucketFilter,
    sortOrder,
    setSortOrder,
    handleDelete,
    handleCopy,
  } = usePromptLibrary()

  if (loading) {
    return <Loading />
  }

  return (
    <div className="p-8 space-y-6">
      <PromptLibraryHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalCount={allPrompts.length}
      />

      <FilterBar
        bucketFilter={bucketFilter}
        onBucketFilterChange={setBucketFilter}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        resultCount={prompts.length}
      />

      <PromptLibraryGrid
        prompts={prompts}
        hasSearch={!!searchQuery || !!bucketFilter}
        onCopy={handleCopy}
        onDelete={handleDelete}
        onClearSearch={() => {
          setSearchQuery('')
          setBucketFilter('')
        }}
      />
    </div>
  )
}

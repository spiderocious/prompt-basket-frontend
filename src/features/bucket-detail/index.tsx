import { Loading } from '../../shared/ui/loading'
import { useBucketDetail } from './hooks/use-bucket-detail'
import { BucketDetailHeader } from './parts/bucket-detail-header'
import { EmptyBucketState } from './components/empty-bucket-state'
import { PromptCard } from '../prompt-library/components/prompt-card'
import { copyToClipboard } from '../../shared/utils'
import { usePromptService } from '../../shared/services'

export function BucketDetail() {
  const { bucket, prompts, loading, handleBack } = useBucketDetail()
  const { deletePrompt } = usePromptService()

  const handleCopy = async (content: string) => {
    await copyToClipboard(content)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this prompt?')) {
      await deletePrompt(id)
    }
  }

  if (loading) {
    return <Loading />
  }

  if (!bucket) {
    return (
      <div className="p-4 md:p-6 lg:p-8">
        <p className="text-secondary-600">Bucket not found</p>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
      <BucketDetailHeader
        bucket={bucket}
        promptCount={prompts.length}
        onBack={handleBack}
      />

      {prompts.length === 0 ? (
        <EmptyBucketState />
      ) : (
        <div className="grid grid-cols-1 gap-3 md:gap-4 md:grid-cols-2 lg:grid-cols-3">
          {prompts.map(prompt => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              onCopy={handleCopy}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

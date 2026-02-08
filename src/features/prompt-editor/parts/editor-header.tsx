import { ArrowLeft, Save } from '../../../shared/ui/icons'
import { Button } from '../../../shared/ui/button'
import { Input } from '../../../shared/ui/input'
import { Dropdown } from '../../../shared/ui/dropdown'
import { useBucketService } from '../../../shared/services'

export interface EditorHeaderProps {
  title: string
  onTitleChange: (title: string) => void
  bucketId: string | null
  onBucketChange: (bucketId: string | null) => void
  onSave: () => void
  onCancel: () => void
  saving: boolean
  isDirty: boolean
  isEditing: boolean
  titleError?: string
}

export function EditorHeader({
  title,
  onTitleChange,
  bucketId,
  onBucketChange,
  onSave,
  onCancel,
  saving,
  isDirty,
  isEditing,
  titleError,
}: EditorHeaderProps) {
  const { buckets } = useBucketService()

  const bucketOptions = [
    { value: '', label: 'No Bucket (Uncategorized)' },
    ...buckets.map(b => ({ value: b.id, label: b.name })),
  ]

  return (
    <div className="border-b border-secondary-200 bg-white px-4 py-3 md:px-8 md:py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowLeft size={16} />}
          onClick={onCancel}
        >
          <span className="hidden sm:inline">Back</span>
        </Button>

        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
          {isDirty && (
            <span className="hidden sm:inline text-sm text-secondary-500">Unsaved</span>
          )}
          <Button
            icon={<Save size={16} />}
            onClick={onSave}
            loading={saving}
            disabled={saving}
            size="sm"
            className="w-full sm:w-auto"
          >
            <span className="sm:hidden">{isEditing ? 'Update' : 'Save'}</span>
            <span className="hidden sm:inline">{isEditing ? 'Update' : 'Save'} Prompt</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-3 md:gap-4 md:grid-cols-2">
        <Input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Enter prompt title..."
          error={titleError}
        />

        <Dropdown
          value={bucketId || ''}
          onChange={(e) => onBucketChange(e.target.value || null)}
          options={bucketOptions}
        />
      </div>
    </div>
  )
}

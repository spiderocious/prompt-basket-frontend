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
    <div className="border-b border-secondary-200 bg-white px-8 py-4">
      <div className="flex items-center justify-between gap-4 mb-4">
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowLeft size={16} />}
          onClick={onCancel}
        >
          Back
        </Button>

        <div className="flex items-center gap-3">
          {isDirty && (
            <span className="text-sm text-secondary-500">Unsaved changes</span>
          )}
          <Button
            icon={<Save size={16} />}
            onClick={onSave}
            loading={saving}
            disabled={saving}
          >
            {isEditing ? 'Update' : 'Save'} Prompt
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
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

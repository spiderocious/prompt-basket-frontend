import { useState, FormEvent } from 'react'
import { Input } from '../../../shared/ui/input'
import { ColorPicker } from '../../../shared/ui/color-picker'
import { IconPicker } from '../../../shared/ui/icon-picker'
import { BucketInput } from '../../../shared/types'

export interface BucketFormProps {
  initialData?: BucketInput
  onSubmit: (data: BucketInput) => Promise<void>
  onCancel: () => void
}

export function BucketForm({ initialData, onSubmit, onCancel }: BucketFormProps) {
  const [name, setName] = useState(initialData?.name || '')
  const [color, setColor] = useState(initialData?.color || '#6366F1')
  const [icon, setIcon] = useState(initialData?.icon || 'Folder')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('Name is required')
      return
    }

    if (name.length > 50) {
      setError('Name must be less than 50 characters')
      return
    }

    setSubmitting(true)
    try {
      await onSubmit({ name: name.trim(), color, icon })
    } catch (err) {
      setError('Failed to save bucket')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Bucket Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g., Work Prompts"
        error={error}
        maxLength={50}
        disabled={submitting}
      />

      <ColorPicker value={color} onChange={setColor} />
      <IconPicker value={icon} onChange={setIcon} />

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="px-4 py-2 text-sm font-medium text-secondary-700 hover:text-secondary-900 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:opacity-50"
        >
          {submitting ? 'Saving...' : initialData ? 'Update Bucket' : 'Create Bucket'}
        </button>
      </div>
    </form>
  )
}

import { Modal } from '../../../shared/ui/modal'
import { Button } from '../../../shared/ui/button'
import { AlertCircle } from '../../../shared/ui/icons'
import { PromptBucket } from '../../../shared/types'

export interface BucketDeleteConfirmProps {
  open: boolean
  onClose: () => void
  bucket: PromptBucket | null
  promptCount: number
  onConfirm: () => Promise<void>
}

export function BucketDeleteConfirm({
  open,
  onClose,
  bucket,
  promptCount,
  onConfirm,
}: BucketDeleteConfirmProps) {
  if (!bucket) return null

  const handleConfirm = async () => {
    await onConfirm()
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Delete Bucket" size="sm">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
          <div className="flex-1">
            <p className="text-sm text-secondary-900">
              Are you sure you want to delete <strong>{bucket.name}</strong>?
            </p>
            {promptCount > 0 && (
              <p className="mt-2 text-sm text-secondary-600">
                This bucket contains {promptCount} {promptCount === 1 ? 'prompt' : 'prompts'}.
                All prompts will be moved to "Uncategorized".
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            Delete Bucket
          </Button>
        </div>
      </div>
    </Modal>
  )
}

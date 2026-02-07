import { Modal } from '../../../shared/ui/modal'
import { BucketForm } from '../components/bucket-form'
import { PromptBucket, BucketInput } from '../../../shared/types'

export interface BucketModalProps {
  open: boolean
  onClose: () => void
  bucket?: PromptBucket | null
  onSave: (data: BucketInput) => Promise<void>
}

export function BucketModal({ open, onClose, bucket, onSave }: BucketModalProps) {
  const handleSave = async (data: BucketInput) => {
    await onSave(data)
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={bucket ? 'Edit Bucket' : 'Create New Bucket'}
      size="md"
    >
      <BucketForm
        initialData={bucket ? { name: bucket.name, color: bucket.color, icon: bucket.icon } : undefined}
        onSubmit={handleSave}
        onCancel={onClose}
      />
    </Modal>
  )
}

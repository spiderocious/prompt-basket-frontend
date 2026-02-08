import { Loading } from '../../shared/ui/loading'
import { useBucketService } from '../../shared/services'
import {
  useBucketManagement,
  BucketModal,
  BucketDeleteConfirm,
} from '../bucket-management'
import { BucketsHeader } from './parts/buckets-header'
import { BucketsGrid } from './parts/buckets-grid'

export function BucketsPage() {
  const { buckets, loading } = useBucketService()
  const {
    modalOpen,
    editingBucket,
    deleteConfirmOpen,
    bucketToDelete,
    openCreateModal,
    openEditModal,
    closeModal,
    handleCreateBucket,
    handleUpdateBucket,
    openDeleteConfirm,
    closeDeleteConfirm,
    handleDeleteBucket,
    getPromptCount,
  } = useBucketManagement()

  if (loading) {
    return <Loading />
  }

  const handleSave = async (data: any) => {
    if (editingBucket) {
      await handleUpdateBucket(editingBucket.id, data)
    } else {
      await handleCreateBucket(data)
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
      <BucketsHeader totalCount={buckets.length} onCreateBucket={openCreateModal} />

      <BucketsGrid
        buckets={buckets}
        getPromptCount={getPromptCount}
        onEdit={openEditModal}
        onDelete={openDeleteConfirm}
        onCreateBucket={openCreateModal}
      />

      <BucketModal
        open={modalOpen}
        onClose={closeModal}
        bucket={editingBucket}
        onSave={handleSave}
      />

      <BucketDeleteConfirm
        open={deleteConfirmOpen}
        onClose={closeDeleteConfirm}
        bucket={bucketToDelete}
        promptCount={bucketToDelete ? getPromptCount(bucketToDelete.id) : 0}
        onConfirm={handleDeleteBucket}
      />
    </div>
  )
}

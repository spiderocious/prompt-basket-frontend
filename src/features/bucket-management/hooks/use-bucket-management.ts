import { useState, useCallback } from 'react'
import { useBucketService, usePromptService } from '../../../shared/services'
import { PromptBucket, BucketInput } from '../../../shared/types'

export function useBucketManagement() {
  const { createBucket, updateBucket, deleteBucket } = useBucketService()
  const { prompts, updatePrompt } = usePromptService()

  const [modalOpen, setModalOpen] = useState(false)
  const [editingBucket, setEditingBucket] = useState<PromptBucket | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [bucketToDelete, setBucketToDelete] = useState<PromptBucket | null>(null)

  const openCreateModal = useCallback(() => {
    setEditingBucket(null)
    setModalOpen(true)
  }, [])

  const openEditModal = useCallback((bucket: PromptBucket) => {
    setEditingBucket(bucket)
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setModalOpen(false)
    setEditingBucket(null)
  }, [])

  const handleCreateBucket = useCallback(
    async (data: BucketInput) => {
      try {
        await createBucket(data)
        closeModal()
      } catch (error) {
        console.error('Failed to create bucket:', error)
        throw error
      }
    },
    [createBucket, closeModal]
  )

  const handleUpdateBucket = useCallback(
    async (id: string, data: BucketInput) => {
      try {
        await updateBucket(id, data)
        closeModal()
      } catch (error) {
        console.error('Failed to update bucket:', error)
        throw error
      }
    },
    [updateBucket, closeModal]
  )

  const openDeleteConfirm = useCallback((bucket: PromptBucket) => {
    setBucketToDelete(bucket)
    setDeleteConfirmOpen(true)
  }, [])

  const closeDeleteConfirm = useCallback(() => {
    setDeleteConfirmOpen(false)
    setBucketToDelete(null)
  }, [])

  const handleDeleteBucket = useCallback(async () => {
    if (!bucketToDelete) return

    try {
      // Move all prompts to uncategorized
      const affectedPrompts = prompts.filter(p => p.bucketId === bucketToDelete.id)
      await Promise.all(
        affectedPrompts.map(prompt =>
          updatePrompt(prompt.id, { bucketId: null })
        )
      )

      await deleteBucket(bucketToDelete.id)
      closeDeleteConfirm()
    } catch (error) {
      console.error('Failed to delete bucket:', error)
      throw error
    }
  }, [bucketToDelete, prompts, updatePrompt, deleteBucket, closeDeleteConfirm])

  const getPromptCount = useCallback(
    (bucketId: string) => {
      return prompts.filter(p => p.bucketId === bucketId).length
    },
    [prompts]
  )

  return {
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
  }
}

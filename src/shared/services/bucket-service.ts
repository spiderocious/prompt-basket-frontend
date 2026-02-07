import { useState, useEffect, useCallback } from 'react'
import { PromptBucket, BucketInput, BucketUpdate } from '../types'
import { useStorage } from './storage'
import { generateId } from '../utils'

export function useBucketService() {
  const storage = useStorage()
  const [buckets, setBuckets] = useState<PromptBucket[]>([])
  const [loading, setLoading] = useState(true)

  const loadBuckets = useCallback(async () => {
    setLoading(true)
    try {
      const data = await storage.getBuckets()
      setBuckets(data)
    } catch (error) {
      console.error('Failed to load buckets:', error)
    } finally {
      setLoading(false)
    }
  }, [storage])

  useEffect(() => {
    loadBuckets()
  }, [loadBuckets])

  const getAllBuckets = useCallback(() => {
    return [...buckets].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }, [buckets])

  const getBucketById = useCallback(
    (id: string) => {
      return buckets.find(b => b.id === id) || null
    },
    [buckets]
  )

  const createBucket = useCallback(
    async (input: BucketInput) => {
      const newBucket: PromptBucket = {
        id: generateId(),
        ...input,
        createdAt: new Date().toISOString(),
      }

      try {
        await storage.saveBucket(newBucket)
        setBuckets(prev => [...prev, newBucket])
        return newBucket
      } catch (error) {
        console.error('Failed to create bucket:', error)
        throw error
      }
    },
    [storage]
  )

  const updateBucket = useCallback(
    async (id: string, updates: BucketUpdate) => {
      const existing = buckets.find(b => b.id === id)
      if (!existing) {
        throw new Error('Bucket not found')
      }

      const updatedBucket: PromptBucket = {
        ...existing,
        ...updates,
      }

      try {
        await storage.saveBucket(updatedBucket)
        setBuckets(prev => prev.map(b => (b.id === id ? updatedBucket : b)))
        return updatedBucket
      } catch (error) {
        console.error('Failed to update bucket:', error)
        throw error
      }
    },
    [storage, buckets]
  )

  const deleteBucket = useCallback(
    async (id: string) => {
      try {
        await storage.deleteBucket(id)
        setBuckets(prev => prev.filter(b => b.id !== id))
      } catch (error) {
        console.error('Failed to delete bucket:', error)
        throw error
      }
    },
    [storage]
  )

  return {
    buckets: getAllBuckets(),
    loading,
    getBucketById,
    createBucket,
    updateBucket,
    deleteBucket,
    refresh: loadBuckets,
  }
}

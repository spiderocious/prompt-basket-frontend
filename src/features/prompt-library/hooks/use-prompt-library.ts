import { useState, useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { usePromptService } from '../../../shared/services'
import { Prompt } from '../../../shared/types'
import { copyToClipboard, sortByDate } from '../../../shared/utils'

type SortOrder = 'newest' | 'oldest' | 'a-z' | 'z-a'

export function usePromptLibrary() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { prompts, loading, deletePrompt } = usePromptService()

  const searchQuery = searchParams.get('search') || ''
  const bucketFilter = searchParams.get('bucket') || ''
  const sortOrder = (searchParams.get('sort') || 'newest') as SortOrder

  const setSearchQuery = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams)
      if (query) {
        params.set('search', query)
      } else {
        params.delete('search')
      }
      setSearchParams(params)
    },
    [searchParams, setSearchParams]
  )

  const setBucketFilter = useCallback(
    (bucketId: string) => {
      const params = new URLSearchParams(searchParams)
      if (bucketId) {
        params.set('bucket', bucketId)
      } else {
        params.delete('bucket')
      }
      setSearchParams(params)
    },
    [searchParams, setSearchParams]
  )

  const setSortOrder = useCallback(
    (order: SortOrder) => {
      const params = new URLSearchParams(searchParams)
      params.set('sort', order)
      setSearchParams(params)
    },
    [searchParams, setSearchParams]
  )

  const filteredPrompts = useMemo(() => {
    let result = [...prompts]

    // Filter by search query
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase()
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(lowerQuery) ||
          p.content.toLowerCase().includes(lowerQuery) ||
          p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      )
    }

    // Filter by bucket
    if (bucketFilter) {
      result = result.filter(p => p.bucketId === bucketFilter)
    }

    // Sort
    switch (sortOrder) {
      case 'newest':
        result = sortByDate(result, 'updatedAt', 'desc')
        break
      case 'oldest':
        result = sortByDate(result, 'updatedAt', 'asc')
        break
      case 'a-z':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'z-a':
        result.sort((a, b) => b.title.localeCompare(a.title))
        break
    }

    return result
  }, [prompts, searchQuery, bucketFilter, sortOrder])

  const handleDelete = useCallback(
    async (id: string) => {
      if (confirm('Are you sure you want to delete this prompt?')) {
        try {
          await deletePrompt(id)
        } catch (error) {
          console.error('Failed to delete prompt:', error)
        }
      }
    },
    [deletePrompt]
  )

  const handleCopy = useCallback(async (content: string) => {
    const success = await copyToClipboard(content)
    if (success) {
      // TODO: Show toast notification
      console.log('Copied to clipboard')
    }
  }, [])

  return {
    prompts: filteredPrompts,
    loading,
    searchQuery,
    setSearchQuery,
    bucketFilter,
    setBucketFilter,
    sortOrder,
    setSortOrder,
    handleDelete,
    handleCopy,
  }
}

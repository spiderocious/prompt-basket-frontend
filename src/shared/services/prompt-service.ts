import { useState, useEffect, useCallback } from 'react'
import { Prompt, PromptInput, PromptUpdate } from '../types'
import { useStorage } from './storage'
import { generateId } from '../utils'

export function usePromptService() {
  const storage = useStorage()
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [loading, setLoading] = useState(true)

  const loadPrompts = useCallback(async () => {
    setLoading(true)
    try {
      const data = await storage.getPrompts()
      setPrompts(data)
    } catch (error) {
      console.error('Failed to load prompts:', error)
    } finally {
      setLoading(false)
    }
  }, [storage])

  useEffect(() => {
    loadPrompts()
  }, [loadPrompts])

  const getAllPrompts = useCallback(() => {
    return [...prompts].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
  }, [prompts])

  const getPromptById = useCallback(
    (id: string) => {
      return prompts.find(p => p.id === id) || null
    },
    [prompts]
  )

  const getPromptsByBucket = useCallback(
    (bucketId: string | null) => {
      return prompts.filter(p => p.bucketId === bucketId)
    },
    [prompts]
  )

  const createPrompt = useCallback(
    async (input: PromptInput) => {
      const now = new Date().toISOString()
      const newPrompt: Prompt = {
        id: generateId(),
        ...input,
        createdAt: now,
        updatedAt: now,
      }

      try {
        await storage.savePrompt(newPrompt)
        setPrompts(prev => [...prev, newPrompt])
        return newPrompt
      } catch (error) {
        console.error('Failed to create prompt:', error)
        throw error
      }
    },
    [storage]
  )

  const updatePrompt = useCallback(
    async (id: string, updates: PromptUpdate) => {
      const existing = prompts.find(p => p.id === id)
      if (!existing) {
        throw new Error('Prompt not found')
      }

      const updatedPrompt: Prompt = {
        ...existing,
        ...updates,
        updatedAt: new Date().toISOString(),
      }

      try {
        await storage.savePrompt(updatedPrompt)
        setPrompts(prev => prev.map(p => (p.id === id ? updatedPrompt : p)))
        return updatedPrompt
      } catch (error) {
        console.error('Failed to update prompt:', error)
        throw error
      }
    },
    [storage, prompts]
  )

  const deletePrompt = useCallback(
    async (id: string) => {
      try {
        await storage.deletePrompt(id)
        setPrompts(prev => prev.filter(p => p.id !== id))
      } catch (error) {
        console.error('Failed to delete prompt:', error)
        throw error
      }
    },
    [storage]
  )

  const searchPrompts = useCallback(
    (query: string) => {
      if (!query.trim()) return getAllPrompts()

      const lowerQuery = query.toLowerCase()
      return prompts.filter(
        p =>
          p.title.toLowerCase().includes(lowerQuery) ||
          p.content.toLowerCase().includes(lowerQuery) ||
          p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      )
    },
    [prompts, getAllPrompts]
  )

  return {
    prompts: getAllPrompts(),
    loading,
    getPromptById,
    getPromptsByBucket,
    createPrompt,
    updatePrompt,
    deletePrompt,
    searchPrompts,
    refresh: loadPrompts,
  }
}

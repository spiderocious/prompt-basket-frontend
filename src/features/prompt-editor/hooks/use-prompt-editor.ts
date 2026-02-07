import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePromptService } from '../../../shared/services'
import { validatePrompt } from '../../../shared/utils'

export function usePromptEditor() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { getPromptById, createPrompt, updatePrompt } = usePromptService()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [bucketId, setBucketId] = useState<string | null>(null)
  const [tags, setTags] = useState<string[]>([])
  const [isDirty, setIsDirty] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)

  // Load prompt if editing
  useEffect(() => {
    if (id) {
      const prompt = getPromptById(id)
      if (prompt) {
        setTitle(prompt.title)
        setContent(prompt.content)
        setBucketId(prompt.bucketId)
        setTags(prompt.tags)
      }
    }
  }, [id, getPromptById])

  // Track changes
  useEffect(() => {
    if (title || content) {
      setIsDirty(true)
    }
  }, [title, content, bucketId, tags])

  const handleSave = useCallback(async () => {
    const validationErrors = validatePrompt({ title, content, bucketId, tags })

    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {}
      validationErrors.forEach(err => {
        errorMap[err.field] = err.message
      })
      setErrors(errorMap)
      return
    }

    setErrors({})
    setSaving(true)

    try {
      if (id) {
        await updatePrompt(id, { title, content, bucketId, tags })
      } else {
        await createPrompt({ title, content, bucketId, tags })
      }
      setIsDirty(false)
      navigate('/prompts')
    } catch (error) {
      console.error('Failed to save prompt:', error)
      setErrors({ general: 'Failed to save prompt' })
    } finally {
      setSaving(false)
    }
  }, [id, title, content, bucketId, tags, createPrompt, updatePrompt, navigate])

  const handleCancel = useCallback(() => {
    if (isDirty && !confirm('You have unsaved changes. Are you sure you want to leave?')) {
      return
    }
    navigate('/prompts')
  }, [isDirty, navigate])

  return {
    title,
    setTitle,
    content,
    setContent,
    bucketId,
    setBucketId,
    tags,
    setTags,
    isDirty,
    errors,
    saving,
    isEditing: !!id,
    handleSave,
    handleCancel,
  }
}

import { PromptInput } from '../types'

export interface ValidationError {
  field: string
  message: string
}

export function validatePrompt(prompt: Partial<PromptInput>): ValidationError[] {
  const errors: ValidationError[] = []

  if (!prompt.title || prompt.title.trim().length === 0) {
    errors.push({ field: 'title', message: 'Title is required' })
  } else if (prompt.title.length > 200) {
    errors.push({ field: 'title', message: 'Title must be less than 200 characters' })
  }

  if (!prompt.content || prompt.content.trim().length === 0) {
    errors.push({ field: 'content', message: 'Content is required' })
  }

  return errors
}

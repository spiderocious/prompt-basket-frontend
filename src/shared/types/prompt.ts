export interface Prompt {
  id: string
  title: string
  content: string
  bucketId: string | null
  tags: string[]
  createdAt: string
  updatedAt: string
}

export type PromptInput = Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>
export type PromptUpdate = Partial<PromptInput>

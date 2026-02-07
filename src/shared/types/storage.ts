import { Prompt } from './prompt'
import { PromptBucket } from './bucket'

export interface IStorageAdapter {
  // Prompt operations
  getPrompts(): Promise<Prompt[]>
  getPromptById(id: string): Promise<Prompt | null>
  savePrompt(prompt: Prompt): Promise<Prompt>
  deletePrompt(id: string): Promise<void>
  searchPrompts(query: string): Promise<Prompt[]>

  // Bucket operations
  getBuckets(): Promise<PromptBucket[]>
  getBucketById(id: string): Promise<PromptBucket | null>
  saveBucket(bucket: PromptBucket): Promise<PromptBucket>
  deleteBucket(id: string): Promise<void>
}

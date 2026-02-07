import { IStorageAdapter, Prompt, PromptBucket } from '../../types'

/**
 * API Storage Adapter - Future backend implementation
 * This is a stub for when backend API is available
 */
export class ApiStorageAdapter implements IStorageAdapter {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  // Prompt operations
  async getPrompts(): Promise<Prompt[]> {
    // TODO: Implement API call
    // const response = await fetch(`${this.baseUrl}/prompts`)
    // return response.json()
    throw new Error('API adapter not yet implemented')
  }

  async getPromptById(id: string): Promise<Prompt | null> {
    // TODO: Implement API call
    throw new Error('API adapter not yet implemented')
  }

  async savePrompt(prompt: Prompt): Promise<Prompt> {
    // TODO: Implement API call (POST or PUT)
    throw new Error('API adapter not yet implemented')
  }

  async deletePrompt(id: string): Promise<void> {
    // TODO: Implement API call
    throw new Error('API adapter not yet implemented')
  }

  async searchPrompts(query: string): Promise<Prompt[]> {
    // TODO: Implement API call with query params
    throw new Error('API adapter not yet implemented')
  }

  // Bucket operations
  async getBuckets(): Promise<PromptBucket[]> {
    // TODO: Implement API call
    throw new Error('API adapter not yet implemented')
  }

  async getBucketById(id: string): Promise<PromptBucket | null> {
    // TODO: Implement API call
    throw new Error('API adapter not yet implemented')
  }

  async saveBucket(bucket: PromptBucket): Promise<PromptBucket> {
    // TODO: Implement API call (POST or PUT)
    throw new Error('API adapter not yet implemented')
  }

  async deleteBucket(id: string): Promise<void> {
    // TODO: Implement API call
    throw new Error('API adapter not yet implemented')
  }
}

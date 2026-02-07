import { IStorageAdapter, Prompt, PromptBucket } from '../../types'

const PROMPTS_KEY = 'promptbasket_prompts'
const BUCKETS_KEY = 'promptbasket_buckets'

export class LocalStorageAdapter implements IStorageAdapter {
  // Prompt operations
  async getPrompts(): Promise<Prompt[]> {
    const data = localStorage.getItem(PROMPTS_KEY)
    return data ? JSON.parse(data) : []
  }

  async getPromptById(id: string): Promise<Prompt | null> {
    const prompts = await this.getPrompts()
    return prompts.find(p => p.id === id) || null
  }

  async savePrompt(prompt: Prompt): Promise<Prompt> {
    const prompts = await this.getPrompts()
    const existingIndex = prompts.findIndex(p => p.id === prompt.id)

    if (existingIndex >= 0) {
      prompts[existingIndex] = prompt
    } else {
      prompts.push(prompt)
    }

    localStorage.setItem(PROMPTS_KEY, JSON.stringify(prompts))
    return prompt
  }

  async deletePrompt(id: string): Promise<void> {
    const prompts = await this.getPrompts()
    const filtered = prompts.filter(p => p.id !== id)
    localStorage.setItem(PROMPTS_KEY, JSON.stringify(filtered))
  }

  async searchPrompts(query: string): Promise<Prompt[]> {
    const prompts = await this.getPrompts()
    const lowerQuery = query.toLowerCase()
    return prompts.filter(
      p =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.content.toLowerCase().includes(lowerQuery) ||
        p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    )
  }

  // Bucket operations
  async getBuckets(): Promise<PromptBucket[]> {
    const data = localStorage.getItem(BUCKETS_KEY)
    return data ? JSON.parse(data) : []
  }

  async getBucketById(id: string): Promise<PromptBucket | null> {
    const buckets = await this.getBuckets()
    return buckets.find(b => b.id === id) || null
  }

  async saveBucket(bucket: PromptBucket): Promise<PromptBucket> {
    const buckets = await this.getBuckets()
    const existingIndex = buckets.findIndex(b => b.id === bucket.id)

    if (existingIndex >= 0) {
      buckets[existingIndex] = bucket
    } else {
      buckets.push(bucket)
    }

    localStorage.setItem(BUCKETS_KEY, JSON.stringify(buckets))
    return bucket
  }

  async deleteBucket(id: string): Promise<void> {
    const buckets = await this.getBuckets()
    const filtered = buckets.filter(b => b.id !== id)
    localStorage.setItem(BUCKETS_KEY, JSON.stringify(filtered))
  }
}

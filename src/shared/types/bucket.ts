export interface PromptBucket {
  id: string
  name: string
  color: string
  icon: string
  createdAt: string
}

export type BucketInput = Omit<PromptBucket, 'id' | 'createdAt'>
export type BucketUpdate = Partial<BucketInput>

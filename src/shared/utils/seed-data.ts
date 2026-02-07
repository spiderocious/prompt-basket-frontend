import { Prompt, PromptBucket } from '../types'

export const sampleBuckets: PromptBucket[] = [
  {
    id: 'bucket-1',
    name: 'Work',
    color: '#6366F1',
    icon: 'Folder',
    createdAt: new Date('2026-01-15').toISOString(),
  },
  {
    id: 'bucket-2',
    name: 'Personal',
    color: '#10B981',
    icon: 'FolderOpen',
    createdAt: new Date('2026-01-20').toISOString(),
  },
  {
    id: 'bucket-3',
    name: 'Code Review',
    color: '#F59E0B',
    icon: 'FileText',
    createdAt: new Date('2026-02-01').toISOString(),
  },
]

export const samplePrompts: Prompt[] = [
  {
    id: 'prompt-1',
    title: 'Email Writer',
    content: 'Help me write a professional email to [recipient] about [topic]. The tone should be [formal/friendly/casual] and include [key points].',
    bucketId: 'bucket-1',
    tags: ['email', 'communication'],
    createdAt: new Date('2026-01-16').toISOString(),
    updatedAt: new Date('2026-02-05').toISOString(),
  },
  {
    id: 'prompt-2',
    title: 'Code Explainer',
    content: 'Explain the following code in simple terms:\n\n```\n[paste code here]\n```\n\nBreak down:\n- What it does\n- How it works\n- Any potential improvements',
    bucketId: 'bucket-3',
    tags: ['coding', 'learning'],
    createdAt: new Date('2026-02-01').toISOString(),
    updatedAt: new Date('2026-02-06').toISOString(),
  },
  {
    id: 'prompt-3',
    title: 'Meeting Notes',
    content: 'Create structured meeting notes from this discussion:\n\n**Attendees:** [list]\n**Date:** [date]\n**Topics:**\n- [topic 1]\n- [topic 2]\n\n**Action Items:**\n- [ ] [action item]',
    bucketId: 'bucket-1',
    tags: ['meetings', 'notes'],
    createdAt: new Date('2026-01-25').toISOString(),
    updatedAt: new Date('2026-02-04').toISOString(),
  },
  {
    id: 'prompt-4',
    title: 'Recipe Ideas',
    content: 'Suggest 5 creative recipes using these ingredients: [list ingredients].\n\nFor each recipe provide:\n- Name\n- Cooking time\n- Difficulty level\n- Brief instructions',
    bucketId: 'bucket-2',
    tags: ['cooking', 'food'],
    createdAt: new Date('2026-01-22').toISOString(),
    updatedAt: new Date('2026-02-03').toISOString(),
  },
  {
    id: 'prompt-5',
    title: 'Bug Report Template',
    content: '# Bug Report\n\n## Description\n[Brief description]\n\n## Steps to Reproduce\n1. [Step 1]\n2. [Step 2]\n\n## Expected Behavior\n[What should happen]\n\n## Actual Behavior\n[What actually happens]\n\n## Environment\n- Browser:\n- OS:\n- Version:',
    bucketId: 'bucket-3',
    tags: ['development', 'bugs'],
    createdAt: new Date('2026-02-02').toISOString(),
    updatedAt: new Date('2026-02-07').toISOString(),
  },
  {
    id: 'prompt-6',
    title: 'Brainstorming Assistant',
    content: 'Help me brainstorm ideas for [project/problem].\n\nConsider:\n- Target audience\n- Budget constraints\n- Timeline\n- Available resources\n\nProvide at least 10 creative ideas.',
    bucketId: null,
    tags: ['creativity', 'planning'],
    createdAt: new Date('2026-02-01').toISOString(),
    updatedAt: new Date('2026-02-02').toISOString(),
  },
]

export function seedInitialData() {
  const hasData = localStorage.getItem('promptbasket_prompts') || localStorage.getItem('promptbasket_buckets')

  if (!hasData) {
    localStorage.setItem('promptbasket_prompts', JSON.stringify(samplePrompts))
    localStorage.setItem('promptbasket_buckets', JSON.stringify(sampleBuckets))
    return true
  }

  return false
}

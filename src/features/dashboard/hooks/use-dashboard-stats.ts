import { useMemo } from 'react'
import { usePromptService, useBucketService } from '../../../shared/services'

export function useDashboardStats() {
  const { prompts, loading: promptsLoading } = usePromptService()
  const { buckets, loading: bucketsLoading } = useBucketService()

  const stats = useMemo(() => {
    const now = new Date()
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    const recentPrompts = prompts
      .filter(p => new Date(p.createdAt) >= sevenDaysAgo)
      .length

    const recentlyUpdated = prompts
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 10)

    return {
      totalPrompts: prompts.length,
      totalBuckets: buckets.length,
      createdThisWeek: recentPrompts,
      recentlyUpdated,
    }
  }, [prompts, buckets])

  return {
    ...stats,
    loading: promptsLoading || bucketsLoading,
  }
}

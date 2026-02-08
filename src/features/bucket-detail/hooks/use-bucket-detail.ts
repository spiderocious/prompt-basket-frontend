import { useParams, useNavigate } from 'react-router-dom'
import { useBucketService, usePromptService } from '../../../shared/services'

export function useBucketDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getBucketById } = useBucketService()
  const { getPromptsByBucket, loading } = usePromptService()

  const bucket = id ? getBucketById(id) : null
  const prompts = id ? getPromptsByBucket(id) : []

  const handleBack = () => {
    navigate('/buckets')
  }

  return {
    bucket,
    prompts,
    loading,
    handleBack,
  }
}

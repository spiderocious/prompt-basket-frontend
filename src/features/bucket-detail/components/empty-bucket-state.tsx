import { FileText } from '../../../shared/ui/icons'
import { Button } from '../../../shared/ui/button'
import { useNavigate } from 'react-router-dom'

export function EmptyBucketState() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <FileText size={48} className="text-secondary-300 mb-4" />
      <h3 className="text-lg font-medium text-secondary-900 mb-2">
        No prompts in this bucket yet
      </h3>
      <p className="text-secondary-600 mb-6 max-w-sm">
        Start adding prompts to organize them in this bucket.
      </p>
      <Button onClick={() => navigate('/prompts/new')}>
        Add First Prompt
      </Button>
    </div>
  )
}

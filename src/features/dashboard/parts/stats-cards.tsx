import { useNavigate } from 'react-router-dom'
import { FileText, Folder, Calendar } from '../../../shared/ui/icons'
import { StatCard } from '../components/stat-card'
import { useDashboardStats } from '../hooks/use-dashboard-stats'

export function StatsCards() {
  const navigate = useNavigate()
  const { totalPrompts, totalBuckets, createdThisWeek } = useDashboardStats()

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <StatCard
        title="Total Prompts"
        value={totalPrompts}
        icon={<FileText size={24} />}
        onClick={() => navigate('/prompts')}
      />
      <StatCard
        title="Total Buckets"
        value={totalBuckets}
        icon={<Folder size={24} />}
        onClick={() => navigate('/buckets')}
      />
      <StatCard
        title="Created This Week"
        value={createdThisWeek}
        icon={<Calendar size={24} />}
      />
    </div>
  )
}

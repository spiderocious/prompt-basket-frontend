import { StatsCards } from './parts/stats-cards'
import { RecentPrompts } from './parts/recent-prompts'
import { Loading } from '../../shared/ui/loading'
import { useDashboardStats } from './hooks/use-dashboard-stats'

export function Dashboard() {
  const { loading } = useDashboardStats()

  if (loading) {
    return <Loading />
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-secondary-900">Dashboard</h1>
        <p className="mt-2 text-secondary-600">Welcome to PromptBasket</p>
      </div>

      <StatsCards />
      <RecentPrompts />
    </div>
  )
}

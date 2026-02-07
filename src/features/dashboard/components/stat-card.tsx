import { ReactNode } from 'react'
import { Card } from '../../../shared/ui/card'

export interface StatCardProps {
  title: string
  value: number | string
  icon: ReactNode
  onClick?: () => void
}

export function StatCard({ title, value, icon, onClick }: StatCardProps) {
  return (
    <Card hover={!!onClick} onClick={onClick} className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-secondary-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-secondary-900">{value}</p>
        </div>
        <div className="rounded-full bg-primary-100 p-3 text-primary-600">
          {icon}
        </div>
      </div>
    </Card>
  )
}

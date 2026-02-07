import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import { Home, FileText, Folder } from '../../../shared/ui/icons'
import { Logo } from '../../../shared/ui/logo'

interface NavItem {
  path: string
  label: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  { path: '/', label: 'Dashboard', icon: Home },
  { path: '/prompts', label: 'All Prompts', icon: FileText },
  { path: '/buckets', label: 'Buckets', icon: Folder },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-secondary-200 bg-white">
      {/* Logo */}
      <div className="border-b border-secondary-200 p-6">
        <Link to="/">
          <Logo />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map(item => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
              )}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

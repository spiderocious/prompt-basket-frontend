import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import { Home, FileText, Folder, X } from '../../../shared/ui/icons'
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

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const location = useLocation()

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed lg:static inset-y-0 left-0 z-50',
          'flex h-screen w-64 flex-col border-r border-secondary-200 bg-white',
          'transition-transform duration-300 ease-in-out',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="border-b border-secondary-200 p-6 flex items-center justify-between">
          <Link to="/" onClick={onClose}>
            <Logo />
          </Link>
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden text-secondary-600 hover:text-secondary-900"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
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
                onClick={onClose}
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
    </>
  )
}

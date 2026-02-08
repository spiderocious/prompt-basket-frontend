import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './sidebar'
import { Menu } from '../../shared/ui/icons'

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Header with Hamburger */}
        <header className="lg:hidden flex items-center gap-4 border-b border-secondary-200 bg-white px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-secondary-600 hover:text-secondary-900"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold text-secondary-900">PromptBasket</h1>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

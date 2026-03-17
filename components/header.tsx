'use client'

import { useRole } from '@/lib/role-context'
import { usePathname } from 'next/navigation'
import { Menu, Bell, User, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { clients } from '@/lib/sample-data'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname()
  const { role, setRole, selectedClientId, setSelectedClientId } = useRole()

  const getPageTitle = (path: string): string => {
    const titles: Record<string, string> = {
      '/': 'Dashboard',
      '/quickbooks': 'QuickBooks Connection',
      '/accounting/overview': 'Accounting Overview',
      '/accounting/issues': 'Book Health & Issues',
      '/accounting/reconciliation': 'Bank Reconciliation',
      '/accounting/tax': 'Tax Reconciliation',
      '/transactions/overview': 'Transactions Overview',
      '/transactions/readiness': 'M&A Readiness',
      '/transactions/buyer-view': 'Buyer View',
      '/transactions/teaser': 'Teaser Summary',
      '/requests': 'Requests & Follow-ups',
      '/data-room': 'Data Room',
      '/clients': 'Clients',
      '/documents': 'Documents',
      '/reports': 'Reports',
      '/settings': 'Settings',
    }
    return titles[path] || 'Page'
  }

  const roleOptions: Array<{ value: typeof role; label: string }> = [
    { value: 'internal', label: 'Internal Finance Team' },
    { value: 'accountant', label: 'Accountant' },
    { value: 'client', label: 'Client/Business Owner' },
    { value: 'buyer', label: 'Potential Buyer' },
  ]

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-muted rounded-lg transition-colors lg:hidden"
          title="Toggle sidebar"
        >
          <Menu size={20} className="text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">
          {getPageTitle(pathname)}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Client Selector */}
        <div className="hidden md:flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Client:</span>
          <select
            value={selectedClientId}
            onChange={(e) => setSelectedClientId(e.target.value)}
            className="text-xs bg-muted border border-border rounded px-2 py-1 text-foreground cursor-pointer hover:bg-muted/80 transition-colors max-w-xs"
          >
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        {/* Role Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground hidden sm:inline">View as:</span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as typeof role)}
            className="text-xs bg-muted border border-border rounded px-2 py-1 text-foreground cursor-pointer hover:bg-muted/80 transition-colors"
          >
            {roleOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Notification Bell */}
        <button className="p-2 hover:bg-muted rounded-lg transition-colors relative" title="Notifications">
          <Bell size={20} className="text-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
        </button>

        {/* User Menu */}
        <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="User menu">
          <User size={20} className="text-foreground" />
        </button>
      </div>
    </header>
  )
}

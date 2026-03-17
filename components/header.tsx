'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { Bell, Menu, User } from 'lucide-react'
import { useRole } from '@/lib/role-context'
import { clients } from '@/lib/sample-data'

interface HeaderProps {
  onMenuClick: () => void
}

const PAGE_TITLES: Record<string, string> = {
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

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname()
  const {
    role,
    setRole,
    selectedClientId,
    setSelectedClientId,
    roleOptions,
    isHydrated,
  } = useRole()

  const pageTitle = useMemo(() => {
    return PAGE_TITLES[pathname] || 'Page'
  }, [pathname])

  const selectedClient = useMemo(() => {
    return clients.find((client) => client.id === selectedClientId) ?? clients[0]
  }, [selectedClientId])

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-card px-4 md:px-6">
      <div className="flex min-w-0 items-center gap-3 md:gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 transition-colors hover:bg-muted lg:hidden"
          title="Toggle sidebar"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} className="text-foreground" />
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold text-foreground md:text-lg">
            {pageTitle}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Client Selector */}
        <div className="hidden items-center gap-2 md:flex">
          <label
            htmlFor="client-selector"
            className="text-xs font-medium text-muted-foreground"
          >
            Client:
          </label>
          <select
            id="client-selector"
            value={isHydrated ? selectedClientId : selectedClient?.id}
            onChange={(e) => setSelectedClientId(e.target.value)}
            disabled={!isHydrated}
            className="max-w-[220px] rounded-md border border-border bg-muted px-2 py-1 text-xs text-foreground transition-colors hover:bg-muted/80 disabled:cursor-not-allowed disabled:opacity-70"
            aria-label="Select client"
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
          <label
            htmlFor="role-selector"
            className="hidden text-xs font-medium text-muted-foreground sm:inline"
          >
            View as:
          </label>
          <select
            id="role-selector"
            value={isHydrated ? role : roleOptions[0]?.value}
            onChange={(e) => setRole(e.target.value as typeof role)}
            disabled={!isHydrated}
            className="min-w-[160px] rounded-md border border-border bg-muted px-2 py-1 text-xs text-foreground transition-colors hover:bg-muted/80 disabled:cursor-not-allowed disabled:opacity-70 md:min-w-[200px]"
            aria-label="Select viewing role"
          >
            {roleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Notification Bell */}
        <button
          type="button"
          className="relative rounded-lg p-2 transition-colors hover:bg-muted"
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell size={20} className="text-foreground" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
        </button>

        {/* User Menu */}
        <button
          type="button"
          className="rounded-lg p-2 transition-colors hover:bg-muted"
          title="User menu"
          aria-label="User menu"
        >
          <User size={20} className="text-foreground" />
        </button>
      </div>
    </header>
  )
}
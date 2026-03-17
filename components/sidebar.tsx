'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { LucideIcon } from 'lucide-react'
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Folder,
  LayoutDashboard,
  MessageCircle,
  Settings,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import { clients } from '@/lib/sample-data'
import { useRole, type UserRole } from '@/lib/role-context'
import { cn } from '@/lib/utils'

interface SidebarProps {
  open: boolean
  onToggle: () => void
}

interface BaseNavItem {
  label: string
  allowedRoles?: UserRole[]
}

interface LinkNavItem extends BaseNavItem {
  href: string
  icon: LucideIcon
  items?: never
}

interface GroupChildItem {
  href: string
  label: string
  allowedRoles?: UserRole[]
}

interface GroupNavItem extends BaseNavItem {
  href?: never
  icon?: never
  items: GroupChildItem[]
}

type NavItem = LinkNavItem | GroupNavItem

const NAV_ITEMS: NavItem[] = [
  {
    href: '/',
    label: 'Dashboard',
    icon: LayoutDashboard,
    allowedRoles: ['internal', 'accountant', 'client', 'buyer'],
  },
  {
    href: '/quickbooks',
    label: 'QuickBooks Connection',
    icon: Zap,
    allowedRoles: ['internal', 'accountant'],
  },
  {
    label: 'Accounting',
    allowedRoles: ['internal', 'accountant', 'client'],
    items: [
      {
        href: '/accounting/overview',
        label: 'Overview',
        allowedRoles: ['internal', 'accountant', 'client'],
      },
      {
        href: '/accounting/issues',
        label: 'Book Health & Issues',
        allowedRoles: ['internal', 'accountant'],
      },
      {
        href: '/accounting/reconciliation',
        label: 'Bank Reconciliation',
        allowedRoles: ['internal', 'accountant'],
      },
      {
        href: '/accounting/tax',
        label: 'Tax Reconciliation',
        allowedRoles: ['internal', 'accountant'],
      },
    ],
  },
  {
    label: 'Transactions',
    allowedRoles: ['internal', 'client', 'buyer'],
    items: [
      {
        href: '/transactions/overview',
        label: 'Overview',
        allowedRoles: ['internal', 'client', 'buyer'],
      },
      {
        href: '/transactions/readiness',
        label: 'M&A Readiness',
        allowedRoles: ['internal', 'client', 'buyer'],
      },
      {
        href: '/transactions/buyer-view',
        label: 'Buyer View',
        allowedRoles: ['internal', 'buyer'],
      },
      {
        href: '/transactions/teaser',
        label: 'Teaser Summary',
        allowedRoles: ['internal', 'client', 'buyer'],
      },
    ],
  },
  {
    href: '/requests',
    label: 'Requests & Follow-ups',
    icon: MessageCircle,
    allowedRoles: ['internal', 'accountant', 'client', 'buyer'],
  },
  {
    href: '/data-room',
    label: 'Data Room',
    icon: Folder,
    allowedRoles: ['internal', 'accountant', 'client', 'buyer'],
  },
  {
    href: '/clients',
    label: 'Clients',
    icon: Users,
    allowedRoles: ['internal', 'accountant'],
  },
  {
    href: '/documents',
    label: 'Documents',
    icon: FileText,
    allowedRoles: ['internal', 'accountant', 'client'],
  },
  {
    href: '/reports',
    label: 'Reports',
    icon: TrendingUp,
    allowedRoles: ['internal', 'accountant', 'client'],
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: Settings,
    allowedRoles: ['internal', 'accountant', 'client', 'buyer'],
  },
]

function hasAccess(role: UserRole, allowedRoles?: UserRole[]) {
  if (!allowedRoles || allowedRoles.length === 0) {
    return true
  }

  return allowedRoles.includes(role)
}

function isPathActive(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/'
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

function getCompactLabel(label: string) {
  const words = label.trim().split(/\s+/)

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase()
  }

  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

export function Sidebar({ open, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const { role, roleLabel, selectedClientId, isHydrated } = useRole()

  const selectedClient = useMemo(() => {
    const fallbackClient = clients[0]
    const resolvedClient = clients.find((client) => client.id === selectedClientId)

    return isHydrated ? resolvedClient ?? fallbackClient : fallbackClient
  }, [selectedClientId, isHydrated])

  const visibleNavItems = useMemo(() => {
    return NAV_ITEMS.reduce<NavItem[]>((acc, item) => {
      if ('items' in item) {
        if (!hasAccess(role, item.allowedRoles)) {
          return acc
        }

        const visibleChildren = item.items.filter((child) => hasAccess(role, child.allowedRoles))

        if (visibleChildren.length === 0) {
          return acc
        }

        acc.push({
          ...item,
          items: visibleChildren,
        })

        return acc
      }

      if (hasAccess(role, item.allowedRoles)) {
        acc.push(item)
      }

      return acc
    }, [])
  }, [role])

  return (
    <aside
      className={cn(
        'flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out',
        open ? 'w-64' : 'w-20'
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        <div className={cn('flex min-w-0 items-center gap-2', !open && 'justify-center')}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sm font-bold text-sidebar-primary-foreground">
            FA
          </div>
          {open && <span className="truncate text-sm font-semibold">FinanceHub</span>}
        </div>

        <button
          type="button"
          onClick={onToggle}
          className="rounded-md p-1 transition-colors hover:bg-sidebar-accent"
          title={open ? 'Collapse sidebar' : 'Expand sidebar'}
          aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-4">
        {visibleNavItems.map((item) => {
          if ('items' in item) {
            return (
              <div key={item.label}>
                {open && (
                  <div className="mb-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60">
                    {item.label}
                  </div>
                )}

                <div className="space-y-1">
                  {item.items.map((subitem) => {
                    const active = isPathActive(pathname, subitem.href)

                    return (
                      <Link
                        key={subitem.href}
                        href={subitem.href}
                        className={cn(
                          'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                          active
                            ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                            : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                          !open && 'justify-center'
                        )}
                        title={!open ? subitem.label : undefined}
                      >
                        {open ? (
                          <span className="truncate">{subitem.label}</span>
                        ) : (
                          <span className="text-[11px] font-bold tracking-wide">
                            {getCompactLabel(subitem.label)}
                          </span>
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          }

          const Icon = item.icon
          const active = isPathActive(pathname, item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                active
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                !open && 'justify-center'
              )}
              title={!open ? item.label : undefined}
            >
              <Icon size={20} className="shrink-0" />
              {open && <span className="truncate">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="space-y-3 border-t border-sidebar-border p-4">
        {open && (
          <>
            {selectedClient && (
              <div>
                <div className="mb-1 text-xs font-semibold uppercase text-sidebar-foreground/60">
                  Client
                </div>
                <div className="truncate text-xs font-medium text-sidebar-foreground">
                  {selectedClient.name}
                </div>
              </div>
            )}

            <div>
              <div className="mb-1 text-xs font-semibold uppercase text-sidebar-foreground/60">
                Viewing as
              </div>
              <div className="rounded bg-sidebar-accent/50 px-2 py-1 text-xs text-sidebar-foreground/80">
                {roleLabel}
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  )
}
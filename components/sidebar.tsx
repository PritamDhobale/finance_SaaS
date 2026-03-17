'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRole } from '@/lib/role-context'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Zap,
  BarChart3,
  ArrowRightLeft,
  MessageCircle,
  Folder,
  Users,
  FileText,
  TrendingUp,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

interface SidebarProps {
  open: boolean
  onToggle: () => void
}

export function Sidebar({ open, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const { role } = useRole()

  const navItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/quickbooks', label: 'QuickBooks Connection', icon: Zap },
    {
      label: 'Accounting',
      items: [
        { href: '/accounting/overview', label: 'Overview' },
        { href: '/accounting/issues', label: 'Book Health & Issues' },
        { href: '/accounting/reconciliation', label: 'Bank Reconciliation' },
        { href: '/accounting/tax', label: 'Tax Reconciliation' },
      ],
    },
    {
      label: 'Transactions',
      items: [
        { href: '/transactions/overview', label: 'Overview' },
        { href: '/transactions/readiness', label: 'M&A Readiness' },
        { href: '/transactions/buyer-view', label: 'Buyer View' },
        { href: '/transactions/teaser', label: 'Teaser Summary' },
      ],
    },
    { href: '/requests', label: 'Requests & Follow-ups', icon: MessageCircle },
    { href: '/data-room', label: 'Data Room', icon: Folder },
    { href: '/clients', label: 'Clients', icon: Users },
    { href: '/documents', label: 'Documents', icon: FileText },
    { href: '/reports', label: 'Reports', icon: TrendingUp },
    { href: '/settings', label: 'Settings', icon: Settings },
  ]

  const { selectedClientId } = useRole()
  const isActive = (href: string) => pathname === href

  const sampleData = require('@/lib/sample-data')
  const client = sampleData.clients.find((c: any) => c.id === selectedClientId)

  return (
    <aside
      className={cn(
        'bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 ease-in-out flex flex-col',
        open ? 'w-64' : 'w-20'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        {open && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center text-sidebar-primary-foreground font-bold text-sm">
              FA
            </div>
            <span className="text-sm font-semibold truncate">FinanceHub</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1 hover:bg-sidebar-accent rounded-md transition-colors"
          title={open ? 'Collapse' : 'Expand'}
        >
          {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
        {navItems.map((item, idx) => {
          if ('items' in item) {
            // Group item
            return (
              <div key={idx}>
                {open && (
                  <div className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider px-3 py-2 mb-2">
                    {item.label}
                  </div>
                )}
                <div className="space-y-1">
                  {item.items.map((subitem) => (
                    <Link
                      key={subitem.href}
                      href={subitem.href}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap',
                        isActive(subitem.href)
                          ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                          : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                      )}
                      title={!open ? subitem.label : undefined}
                    >
                      {open && <span>{subitem.label}</span>}
                      {!open && (
                        <span className="text-xs font-bold">{subitem.label.substring(0, 1)}</span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )
          }

          // Regular item
          const Icon = item.icon || LayoutDashboard
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive(item.href)
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
              title={!open ? item.label : undefined}
            >
              <Icon size={20} className="flex-shrink-0" />
              {open && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-3">
        {open && (
          <>
            {client && (
              <div>
                <div className="text-xs font-semibold text-sidebar-foreground/60 uppercase mb-1">
                  Client
                </div>
                <div className="text-xs text-sidebar-foreground font-medium truncate">
                  {client.name}
                </div>
              </div>
            )}
            <div>
              <div className="text-xs font-semibold text-sidebar-foreground/60 uppercase mb-1">
                Viewing as
              </div>
              <div className="text-xs text-sidebar-foreground/80 capitalize bg-sidebar-accent/50 rounded px-2 py-1">
                {role === 'internal' && 'Internal Finance Team'}
                {role === 'accountant' && 'Accountant'}
                {role === 'client' && 'Business Owner'}
                {role === 'buyer' && 'Potential Buyer'}
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  )
}

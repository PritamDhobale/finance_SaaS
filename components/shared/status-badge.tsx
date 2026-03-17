import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: string
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'info'
  className?: string
}

export function StatusBadge({ status, variant = 'default', className }: StatusBadgeProps) {
  const variants = {
    default: 'bg-muted text-muted-foreground',
    success: 'bg-secondary/20 text-secondary border border-secondary/30',
    warning: 'bg-destructive/10 text-destructive border border-destructive/20',
    destructive: 'bg-destructive/20 text-destructive border border-destructive/30',
    info: 'bg-primary/10 text-primary border border-primary/20',
  }

  const statusVariantMap: Record<string, 'default' | 'success' | 'warning' | 'destructive' | 'info'> = {
    reconciled: 'success',
    complete: 'success',
    resolved: 'success',
    closed: 'success',
    received: 'success',
    unreconciled: 'warning',
    pending: 'warning',
    in_progress: 'info',
    in: 'info',
    progress: 'info',
    open: 'warning',
    draft: 'default',
    sent: 'info',
    waiting: 'warning',
    critical: 'destructive',
    high: 'destructive',
    medium: 'warning',
    low: 'default',
    good: 'success',
    active: 'success',
    archived: 'muted',
  }

  const selectedVariant = variant || statusVariantMap[status.toLowerCase().replace('_', '')] || 'default'

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 rounded-md text-xs font-medium capitalize',
        variants[selectedVariant],
        className
      )}
    >
      {status}
    </span>
  )
}

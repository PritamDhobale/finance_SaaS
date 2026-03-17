import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface KPICardProps {
  label: string
  value: string | number
  change?: number
  status: 'good' | 'warning' | 'critical'
  icon?: React.ReactNode
}

export function KPICard({ label, value, change, status, icon }: KPICardProps) {
  const statusColors = {
    good: 'bg-secondary/10 border-secondary/30 text-secondary',
    warning: 'bg-destructive/10 border-destructive/30 text-destructive',
    critical: 'bg-destructive/20 border-destructive/40 text-destructive',
  }

  const changeColor = change !== undefined && change >= 0 ? 'text-secondary' : 'text-destructive'

  return (
    <div className={cn('rounded-lg border p-6 bg-card', statusColors[status])}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold text-foreground mt-2">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {change > 0 && <TrendingUp size={16} className={changeColor} />}
              {change < 0 && <TrendingDown size={16} className={changeColor} />}
              {change === 0 && <Minus size={16} className="text-muted-foreground" />}
              <span className={cn('text-xs font-medium', changeColor)}>
                {change > 0 ? '+' : ''}{change}%
              </span>
            </div>
          )}
        </div>
        {icon && <div className="text-3xl opacity-50">{icon}</div>}
      </div>
    </div>
  )
}

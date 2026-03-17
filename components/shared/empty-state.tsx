import React from 'react'
import { AlertCircle, FileText, Users, Clock } from 'lucide-react'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  const defaultIcon = <FileText size={48} className="text-muted-foreground opacity-30" />

  return (
    <div className="rounded-lg border border-dashed border-border bg-muted/30 p-12 text-center flex flex-col items-center justify-center min-h-64">
      <div className="mb-4">{icon || defaultIcon}</div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mb-6">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-all font-medium text-sm"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useRole } from '@/lib/role-context'
import { clients, getClientBookIssues } from '@/lib/sample-data'
import { StatusBadge } from '@/components/shared/status-badge'
import { AlertCircle, CheckCircle, Clock } from 'lucide-react'

export default function BookHealthIssues() {
  const { selectedClientId } = useRole()
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null)
  const client = clients.find(c => c.id === selectedClientId)
  const issues = getClientBookIssues(selectedClientId)

  const filteredIssues = selectedSeverity
    ? issues.filter(i => i.severity === selectedSeverity)
    : issues

  const issueCounts = {
    critical: issues.filter(i => i.severity === 'critical').length,
    high: issues.filter(i => i.severity === 'high').length,
    medium: issues.filter(i => i.severity === 'medium').length,
    low: issues.filter(i => i.severity === 'low').length,
  }

  const statusCounts = {
    open: issues.filter(i => i.status === 'open').length,
    in_progress: issues.filter(i => i.status === 'in_progress').length,
    resolved: issues.filter(i => i.status === 'resolved').length,
  }

  const statusIcons = {
    open: <AlertCircle size={16} className="text-destructive" />,
    in_progress: <Clock size={16} className="text-destructive/60" />,
    resolved: <CheckCircle size={16} className="text-secondary" />,
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Book Health & Issues</h2>
        <p className="text-muted-foreground">Identified issues affecting financial record accuracy</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Total Issues</p>
          <p className="text-2xl font-bold text-foreground">{issues.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 border-destructive/30 bg-destructive/5">
          <p className="text-xs text-destructive uppercase tracking-wider font-semibold mb-2">Critical</p>
          <p className="text-2xl font-bold text-destructive">{issueCounts.critical}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">In Progress</p>
          <p className="text-2xl font-bold text-foreground">{statusCounts.in_progress}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Resolved</p>
          <p className="text-2xl font-bold text-secondary">{statusCounts.resolved}</p>
        </div>
      </div>

      {/* Severity Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedSeverity(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedSeverity === null
              ? 'bg-primary text-primary-foreground'
              : 'border border-border hover:bg-muted'
          }`}
        >
          All Issues
        </button>
        <button
          onClick={() => setSelectedSeverity('critical')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
            selectedSeverity === 'critical'
              ? 'bg-destructive text-destructive-foreground border-destructive'
              : 'border-border hover:bg-muted'
          }`}
        >
          Critical ({issueCounts.critical})
        </button>
        <button
          onClick={() => setSelectedSeverity('high')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
            selectedSeverity === 'high'
              ? 'bg-destructive/50 text-destructive border-destructive/50'
              : 'border-border hover:bg-muted'
          }`}
        >
          High ({issueCounts.high})
        </button>
        <button
          onClick={() => setSelectedSeverity('medium')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
            selectedSeverity === 'medium'
              ? 'bg-destructive/30 text-foreground border-destructive/30'
              : 'border-border hover:bg-muted'
          }`}
        >
          Medium ({issueCounts.medium})
        </button>
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        {filteredIssues.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <CheckCircle size={48} className="mx-auto text-secondary mb-3 opacity-50" />
            <p className="text-foreground font-medium">No issues found</p>
            <p className="text-sm text-muted-foreground mt-1">All issues resolved in this category</p>
          </div>
        ) : (
          filteredIssues.map((issue) => (
            <div
              key={issue.id}
              className="rounded-lg border border-border bg-card p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{issue.title}</h3>
                    <StatusBadge
                      status={issue.severity}
                      variant={
                        issue.severity === 'critical'
                          ? 'destructive'
                          : issue.severity === 'high'
                          ? 'warning'
                          : 'default'
                      }
                    />
                  </div>
                  <p className="text-muted-foreground mb-3">{issue.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Category: </span>
                    <span className="text-foreground font-medium capitalize">
                      {issue.category.replace('_', ' ')}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Created: </span>
                    <span className="text-foreground font-medium">{issue.createdDate}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {statusIcons[issue.status as keyof typeof statusIcons]}
                    <StatusBadge status={issue.status} variant="info" />
                  </div>
                  <button className="px-3 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Status Distribution */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Issue Status Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Open Issues</span>
              <span className="text-2xl font-bold text-destructive">{statusCounts.open}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="bg-destructive h-full"
                style={{
                  width: `${(statusCounts.open / issues.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">In Progress</span>
              <span className="text-2xl font-bold text-destructive/60">{statusCounts.in_progress}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="bg-destructive/60 h-full"
                style={{
                  width: `${(statusCounts.in_progress / issues.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Resolved</span>
              <span className="text-2xl font-bold text-secondary">{statusCounts.resolved}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="bg-secondary h-full"
                style={{
                  width: `${(statusCounts.resolved / issues.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

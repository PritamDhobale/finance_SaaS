'use client'

import { useRole } from '@/lib/role-context'
import { clients, getClientKPIs, getClientTransactions, getClientBookIssues } from '@/lib/sample-data'
import { KPICard } from '@/components/shared/kpi-card'
import { StatusBadge } from '@/components/shared/status-badge'
import { BookOpen, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'

export default function Dashboard() {
  const { selectedClientId } = useRole()
  const client = clients.find(c => c.id === selectedClientId)
  const kpis = getClientKPIs(selectedClientId)
  const transactions = getClientTransactions(selectedClientId)
  const issues = getClientBookIssues(selectedClientId)

  const reconciledCount = transactions.filter(t => t.status === 'reconciled').length
  const unreconciledCount = transactions.filter(t => t.status === 'unreconciled').length
  const criticalIssues = issues.filter(i => i.severity === 'critical').length

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">
          Welcome back, {client?.name}
        </h2>
        <p className="text-muted-foreground">
          Here's your financial overview and key metrics for this period.
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Transactions</p>
              <p className="text-2xl font-bold text-foreground mt-2">{transactions.length}</p>
            </div>
            <BookOpen size={24} className="text-primary/50" />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Reconciled</p>
              <p className="text-2xl font-bold text-secondary mt-2">{reconciledCount}</p>
            </div>
            <CheckCircle size={24} className="text-secondary/50" />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
              <p className="text-2xl font-bold text-destructive mt-2">{unreconciledCount}</p>
            </div>
            <AlertCircle size={24} className="text-destructive/50" />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Critical Issues</p>
              <p className="text-2xl font-bold text-destructive mt-2">{criticalIssues}</p>
            </div>
            <AlertCircle size={24} className="text-destructive/50" />
          </div>
        </div>
      </div>

      {/* KPI Metrics */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-4">Key Performance Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, idx) => (
            <KPICard
              key={idx}
              label={kpi.label}
              value={kpi.value}
              change={kpi.change}
              status={kpi.status}
            />
          ))}
        </div>
      </div>

      {/* Transaction Overview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground">Recent Transactions</h3>
          <a href="/transactions/overview" className="text-sm text-primary hover:underline">
            View all
          </a>
        </div>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-foreground">Date</th>
                <th className="text-left px-6 py-3 font-semibold text-foreground">Description</th>
                <th className="text-left px-6 py-3 font-semibold text-foreground">Amount</th>
                <th className="text-left px-6 py-3 font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 5).map((tx) => (
                <tr key={tx.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-foreground/70">{tx.date}</td>
                  <td className="px-6 py-4 text-foreground font-medium">{tx.description}</td>
                  <td className="px-6 py-4 font-semibold text-foreground">
                    ${tx.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={tx.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Book Issues */}
      {issues.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-foreground">Open Book Issues</h3>
            <a href="/accounting/issues" className="text-sm text-primary hover:underline">
              View all
            </a>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {issues.slice(0, 4).map((issue) => (
              <div key={issue.id} className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-foreground">{issue.title}</h4>
                  <StatusBadge status={issue.severity} />
                </div>
                <p className="text-sm text-muted-foreground mb-3">{issue.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{issue.category}</span>
                  <StatusBadge status={issue.status} variant="info" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

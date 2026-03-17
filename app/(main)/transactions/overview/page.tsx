'use client'

import { useRole } from '@/lib/role-context'
import { clients, getClientTransactions } from '@/lib/sample-data'
import { DataTable } from '@/components/shared/data-table'
import { StatusBadge } from '@/components/shared/status-badge'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { AlertCircle, TrendingUp } from 'lucide-react'

export default function TransactionsOverview() {
  const { selectedClientId } = useRole()
  const client = clients.find(c => c.id === selectedClientId)
  const transactions = getClientTransactions(selectedClientId)

  const categoryData = [
    { name: 'Operating Expenses', value: 180000, color: 'var(--color-chart-1)' },
    { name: 'Revenue', value: 450000, color: 'var(--color-chart-2)' },
    { name: 'Payroll', value: 200000, color: 'var(--color-chart-3)' },
    { name: 'Capital Assets', value: 75000, color: 'var(--color-chart-4)' },
    { name: 'Other', value: 45000, color: 'var(--color-chart-5)' },
  ]

  const reconciledCount = transactions.filter(t => t.status === 'reconciled').length
  const unreconciledCount = transactions.filter(t => t.status === 'unreconciled').length
  const pendingCount = transactions.filter(t => t.status === 'pending').length

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Transactions Overview</h2>
        <p className="text-muted-foreground">
          Complete view of all financial transactions and their reconciliation status
        </p>
      </div>

      {/* Important Message */}
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 flex items-start gap-3">
        <AlertCircle size={20} className="text-destructive flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-foreground">Accounting Cleanup Required</p>
          <p className="text-sm text-muted-foreground mt-1">
            Your accounting books have critical issues that must be resolved before proceeding with transaction analysis. Please visit the Book Health section to address these issues.
          </p>
          <a href="/accounting/issues" className="text-sm text-primary font-medium hover:underline mt-2 inline-block">
            Review Issues →
          </a>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Total Transactions</p>
          <p className="text-3xl font-bold text-foreground">{transactions.length}</p>
          <p className="text-xs text-muted-foreground mt-2">For period ending {new Date().toLocaleDateString()}</p>
        </div>
        <div className="rounded-lg border border-secondary/30 bg-secondary/5 p-6">
          <p className="text-sm text-secondary uppercase tracking-wider font-semibold mb-2">Reconciled</p>
          <p className="text-3xl font-bold text-secondary">{reconciledCount}</p>
          <p className="text-xs text-muted-foreground mt-2">
            {Math.round((reconciledCount / transactions.length) * 100)}% complete
          </p>
        </div>
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6">
          <p className="text-sm text-destructive uppercase tracking-wider font-semibold mb-2">Pending Review</p>
          <p className="text-3xl font-bold text-destructive">{unreconciledCount + pendingCount}</p>
          <p className="text-xs text-muted-foreground mt-2">Requires attention</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Transaction Categories</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: $${(value / 1000).toFixed(0)}K`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `$${value.toLocaleString()}`}
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-foreground)',
                  borderRadius: '0.5rem',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Status Breakdown */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Reconciliation Status</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Reconciled</span>
                <span className="text-sm font-semibold text-secondary">{reconciledCount}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className="bg-secondary h-full"
                  style={{ width: `${(reconciledCount / transactions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Unreconciled</span>
                <span className="text-sm font-semibold text-destructive">{unreconciledCount}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className="bg-destructive h-full"
                  style={{ width: `${(unreconciledCount / transactions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Pending</span>
                <span className="text-sm font-semibold text-destructive/60">{pendingCount}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className="bg-destructive/60 h-full"
                  style={{ width: `${(pendingCount / transactions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
            <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Next Steps</p>
            <ol className="text-sm text-foreground space-y-1 list-decimal list-inside">
              <li>Resolve critical accounting issues</li>
              <li>Reconcile remaining transactions</li>
              <li>Complete M&A readiness checklist</li>
              <li>Prepare for transaction review</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">All Transactions</h3>
        <DataTable
          columns={[
            {
              id: 'date',
              label: 'Date',
              accessor: (row) => row.date,
              sortable: true,
            },
            {
              id: 'description',
              label: 'Description',
              accessor: (row) => row.description,
              sortable: true,
            },
            {
              id: 'category',
              label: 'Category',
              accessor: (row) => row.category,
              sortable: true,
            },
            {
              id: 'amount',
              label: 'Amount',
              accessor: (row) => `$${row.amount.toLocaleString()}`,
              align: 'right',
              sortable: true,
            },
            {
              id: 'status',
              label: 'Status',
              accessor: (row) => <StatusBadge status={row.status} />,
            },
          ]}
          data={transactions}
          searchable
          searchField="description"
        />
      </div>
    </div>
  )
}

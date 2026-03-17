'use client'

import { useRole } from '@/lib/role-context'
import { clients, getClientKPIs, getClientTransactions } from '@/lib/sample-data'
import { KPICard } from '@/components/shared/kpi-card'
import { DataTable } from '@/components/shared/data-table'
import { StatusBadge } from '@/components/shared/status-badge'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'

export default function AccountingOverview() {
  const { selectedClientId } = useRole()
  const client = clients.find(c => c.id === selectedClientId)
  const kpis = getClientKPIs(selectedClientId)
  const transactions = getClientTransactions(selectedClientId)

  // Prepare chart data
  const monthlyData = [
    { month: 'Jan', revenue: 120000, expenses: 80000, net: 40000 },
    { month: 'Feb', revenue: 135000, expenses: 88000, net: 47000 },
    { month: 'Mar', revenue: 128000, expenses: 85000, net: 43000 },
    { month: 'Apr', revenue: 145000, expenses: 92000, net: 53000 },
    { month: 'May', revenue: 152000, expenses: 95000, net: 57000 },
    { month: 'Jun', revenue: 165000, expenses: 100000, net: 65000 },
  ]

  const accountData = [
    { name: 'Cash', balance: 2100000, status: 'healthy' },
    { name: 'Accounts Receivable', balance: 2300000, status: 'healthy' },
    { name: 'Inventory', balance: 1500000, status: 'needs_review' },
    { name: 'Fixed Assets', balance: 5200000, status: 'healthy' },
    { name: 'Accounts Payable', balance: -950000, status: 'healthy' },
    { name: 'Debt', balance: -2100000, status: 'needs_review' },
  ]

  const reconciledCount = transactions.filter(t => t.status === 'reconciled').length
  const reconciledPercent = Math.round((reconciledCount / transactions.length) * 100)

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Accounting Overview</h2>
        <p className="text-muted-foreground">Complete view of your accounting status and financial health</p>
      </div>

      {/* Key Metrics */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">Key Accounting Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.slice(0, 4).map((kpi, idx) => (
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

      {/* Reconciliation Status */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Reconciliation Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Overall Progress</p>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-secondary h-full transition-all"
                    style={{ width: `${reconciledPercent}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-2xl font-bold text-foreground">{reconciledPercent}%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {reconciledCount} of {transactions.length} transactions reconciled
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Status Distribution</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-foreground">Reconciled</span>
                <span className="font-semibold text-secondary">{reconciledCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground">Pending</span>
                <span className="font-semibold text-destructive">
                  {transactions.filter(t => t.status === 'unreconciled').length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground">In Review</span>
                <span className="font-semibold text-destructive">
                  {transactions.filter(t => t.status === 'pending').length}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-end">
            <button className="w-full bg-primary text-primary-foreground hover:opacity-90 font-medium py-2 rounded-lg transition-all">
              Review Unreconciled
            </button>
          </div>
        </div>
      </div>

      {/* Revenue & Expenses Trend */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Revenue vs Expenses Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-foreground)',
                borderRadius: '0.5rem',
              }}
            />
            <Legend wrapperStyle={{ color: 'var(--color-foreground)' }} />
            <Bar dataKey="revenue" fill="var(--color-chart-2)" name="Revenue" />
            <Bar dataKey="expenses" fill="var(--color-chart-1)" name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Account Balances */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Account Balances</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-foreground">Account</th>
                <th className="text-right px-6 py-3 font-semibold text-foreground">Balance</th>
                <th className="text-left px-6 py-3 font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {accountData.map((account) => (
                <tr key={account.name} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{account.name}</td>
                  <td className="text-right px-6 py-4 font-semibold text-foreground">
                    ${Math.abs(account.balance).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge
                      status={account.status === 'healthy' ? 'good' : 'warning'}
                      variant={account.status === 'healthy' ? 'success' : 'warning'}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">Recent Transactions</h3>
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
            },
            {
              id: 'amount',
              label: 'Amount',
              accessor: (row) => `$${row.amount.toLocaleString()}`,
              align: 'right',
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

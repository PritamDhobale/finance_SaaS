'use client'

import { useRole } from '@/lib/role-context'
import { clients } from '@/lib/sample-data'
import { StatusBadge } from '@/components/shared/status-badge'
import { CheckCircle, AlertCircle, Clock } from 'lucide-react'

export default function TaxReconciliation() {
  const { selectedClientId } = useRole()
  const client = clients.find(c => c.id === selectedClientId)

  const taxItems = [
    {
      id: 'tax-1',
      category: 'Income Tax',
      items: [
        { name: 'W-2 Income', bookAmount: 850000, taxAmount: 850000, status: 'match', variance: 0 },
        { name: '1099 Income', bookAmount: 125000, taxAmount: 125000, status: 'match', variance: 0 },
        { name: 'Dividend Income', bookAmount: 45000, taxAmount: 45000, status: 'match', variance: 0 },
        { name: 'Capital Gains', bookAmount: 82000, taxAmount: 82000, status: 'match', variance: 0 },
      ],
    },
    {
      id: 'tax-2',
      category: 'Deductions',
      items: [
        { name: 'Meals & Entertainment', bookAmount: 28000, taxAmount: 18000, status: 'variance', variance: -10000 },
        { name: 'Office Supplies', bookAmount: 15600, taxAmount: 15600, status: 'match', variance: 0 },
        { name: 'Depreciation', bookAmount: 125000, taxAmount: 135000, status: 'variance', variance: 10000 },
        { name: 'Business Travel', bookAmount: 42000, taxAmount: 42000, status: 'match', variance: 0 },
      ],
    },
    {
      id: 'tax-3',
      category: 'Credits & Adjustments',
      items: [
        { name: 'R&D Tax Credit', bookAmount: 0, taxAmount: 45000, status: 'variance', variance: 45000 },
        { name: 'Work Opportunity Credit', bookAmount: 0, taxAmount: 12000, status: 'variance', variance: 12000 },
      ],
    },
  ]

  const taxfilingItems = [
    { id: 'tf-1', type: 'Corporate Tax Return', dueDate: '2024-04-15', status: 'in_progress', documents: 8 },
    { id: 'tf-2', type: 'State Tax Filings', dueDate: '2024-05-31', status: 'pending', documents: 3 },
    { id: 'tf-3', type: 'Payroll Tax Reports', dueDate: '2024-03-31', status: 'complete', documents: 12 },
    { id: 'tf-4', type: 'Sales Tax Returns', dueDate: '2024-04-20', status: 'complete', documents: 5 },
  ]

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Tax Reconciliation</h2>
        <p className="text-muted-foreground">Reconcile book amounts with tax reporting amounts</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Total Book Amount</p>
          <p className="text-2xl font-bold text-foreground">$1.62M</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Total Tax Amount</p>
          <p className="text-2xl font-bold text-foreground">$1.65M</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Total Variance</p>
          <p className="text-2xl font-bold text-destructive">$67K</p>
        </div>
      </div>

      {/* Tax Reconciliation Detail */}
      <div className="space-y-6">
        {taxItems.map((section) => (
          <div key={section.id} className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="bg-muted px-6 py-4 border-b border-border">
              <h3 className="font-bold text-foreground">{section.category}</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-6 py-3 font-semibold text-foreground">Item</th>
                  <th className="text-right px-6 py-3 font-semibold text-foreground">Book Amount</th>
                  <th className="text-right px-6 py-3 font-semibold text-foreground">Tax Amount</th>
                  <th className="text-right px-6 py-3 font-semibold text-foreground">Variance</th>
                  <th className="text-left px-6 py-3 font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {section.items.map((item) => (
                  <tr key={item.name} className="border-b border-border hover:bg-muted/50">
                    <td className="px-6 py-3 text-foreground">{item.name}</td>
                    <td className="text-right px-6 py-3 text-foreground font-medium">
                      ${item.bookAmount.toLocaleString()}
                    </td>
                    <td className="text-right px-6 py-3 text-foreground font-medium">
                      ${item.taxAmount.toLocaleString()}
                    </td>
                    <td className={`text-right px-6 py-3 font-semibold ${
                      item.variance === 0 ? 'text-secondary' : 'text-destructive'
                    }`}>
                      ${item.variance >= 0 ? '+' : ''}{item.variance.toLocaleString()}
                    </td>
                    <td className="px-6 py-3">
                      <StatusBadge
                        status={item.status === 'match' ? 'match' : 'variance'}
                        variant={item.status === 'match' ? 'success' : 'warning'}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Tax Filing Schedule */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">Tax Filing Schedule</h3>
        <div className="space-y-3">
          {taxfilingItems.map((item) => (
            <div key={item.id} className="rounded-lg border border-border bg-card p-4 flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{item.type}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.documents} documents attached • Due: {item.dueDate}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge
                  status={item.status}
                  variant={
                    item.status === 'complete'
                      ? 'success'
                      : item.status === 'in_progress'
                      ? 'info'
                      : 'warning'
                  }
                />
                <button className="text-primary text-sm font-medium hover:underline">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reconciliation Notes */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Reconciliation Notes</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-destructive/50 pl-4 py-2">
            <p className="font-medium text-foreground">Meals & Entertainment Disallowance</p>
            <p className="text-sm text-muted-foreground mt-1">
              50% of meal expenses not deductible per tax regulations. Adjustment of $10,000 required.
            </p>
          </div>
          <div className="border-l-4 border-secondary/50 pl-4 py-2">
            <p className="font-medium text-foreground">Depreciation Schedule Updated</p>
            <p className="text-sm text-muted-foreground mt-1">
              Section 179 deduction applied, increasing tax depreciation by $10,000.
            </p>
          </div>
          <div className="border-l-4 border-secondary/50 pl-4 py-2">
            <p className="font-medium text-foreground">R&D Tax Credits Identified</p>
            <p className="text-sm text-muted-foreground mt-1">
              Federal and state R&D credits available: $57,000 total.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end">
        <button className="px-6 py-2 border border-border rounded-lg hover:bg-muted transition-colors font-medium">
          Save Draft
        </button>
        <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all font-medium">
          Submit for Review
        </button>
      </div>
    </div>
  )
}

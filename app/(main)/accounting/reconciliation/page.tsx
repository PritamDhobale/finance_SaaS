'use client'

import { useState } from 'react'
import { useRole } from '@/lib/role-context'
import { clients, getClientTransactions } from '@/lib/sample-data'
import { StatusBadge } from '@/components/shared/status-badge'
import { CheckCircle, Clock, AlertCircle, Upload } from 'lucide-react'

export default function BankReconciliation() {
  const { selectedClientId } = useRole()
  const [activeTab, setActiveTab] = useState<'matching' | 'unmatched' | 'discrepancies'>('matching')
  const client = clients.find(c => c.id === selectedClientId)
  const transactions = getClientTransactions(selectedClientId)

  // Sample bank accounts
  const bankAccounts = [
    {
      id: 'ba-1',
      name: 'Primary Operating Account',
      bank: 'FirstBank',
      accountNumber: '****1234',
      balance: 2100000,
      lastReconciled: '2024-02-28',
      status: 'reconciled',
    },
    {
      id: 'ba-2',
      name: 'Savings Account',
      bank: 'FirstBank',
      accountNumber: '****5678',
      balance: 850000,
      lastReconciled: '2024-03-10',
      status: 'in_progress',
    },
    {
      id: 'ba-3',
      name: 'Payroll Account',
      bank: 'SecondBank',
      accountNumber: '****9999',
      balance: 450000,
      lastReconciled: '2024-02-15',
      status: 'needs_review',
    },
  ]

  const reconciledTransactions = transactions.filter(t => t.status === 'reconciled')
  const unmatchedTransactions = transactions.filter(t => t.status === 'unreconciled')
  const pendingTransactions = transactions.filter(t => t.status === 'pending')

  const discrepancies = [
    { id: 'd-1', date: '2024-03-15', amount: 5500, description: 'Deposit not on statement', status: 'pending_review' },
    { id: 'd-2', date: '2024-03-14', amount: -2100, description: 'Check cleared but not recorded', status: 'needs_action' },
    { id: 'd-3', date: '2024-03-12', amount: 8200, description: 'Wire transfer variance', status: 'pending_review' },
  ]

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Bank Reconciliation</h2>
        <p className="text-muted-foreground">Match and reconcile transactions with bank statements</p>
      </div>

      {/* Bank Accounts Overview */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">Bank Accounts</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {bankAccounts.map((account) => (
            <div key={account.id} className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-foreground">{account.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{account.bank} {account.accountNumber}</p>
                </div>
                <StatusBadge
                  status={account.status}
                  variant={
                    account.status === 'reconciled'
                      ? 'success'
                      : account.status === 'needs_review'
                      ? 'destructive'
                      : 'info'
                  }
                />
              </div>

              <div className="mb-4 pb-4 border-b border-border">
                <p className="text-xs text-muted-foreground">Current Balance</p>
                <p className="text-2xl font-bold text-foreground">${(account.balance / 1000000).toFixed(1)}M</p>
              </div>

              <div className="text-xs text-muted-foreground mb-4">
                Last reconciled: {account.lastReconciled}
              </div>

              <button className="w-full bg-primary text-primary-foreground hover:opacity-90 font-medium py-2 rounded-lg transition-all text-sm">
                Reconcile Account
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Section */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Upload size={20} className="text-primary" />
          <h3 className="text-lg font-bold text-foreground">Import Bank Statements</h3>
        </div>
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
          <div className="space-y-2 text-muted-foreground">
            <p className="font-medium">Drop your bank statement files here</p>
            <p className="text-sm">or</p>
            <button className="text-primary hover:underline font-medium">browse files</button>
            <p className="text-xs">Supports CSV, OFX, and PDF formats</p>
          </div>
        </div>
      </div>

      {/* Reconciliation Tabs */}
      <div className="space-y-4">
        <div className="flex gap-2 border-b border-border">
          {[
            { value: 'matching', label: `Matched (${reconciledTransactions.length})`, icon: CheckCircle },
            { value: 'unmatched', label: `Unmatched (${unmatchedTransactions.length})`, icon: AlertCircle },
            { value: 'discrepancies', label: `Discrepancies (${discrepancies.length})`, icon: AlertCircle },
          ].map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setActiveTab(value as typeof activeTab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === value
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="rounded-lg border border-border overflow-hidden">
          {activeTab === 'matching' && (
            <table className="w-full text-sm">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="text-left px-6 py-3 font-semibold text-foreground">Date</th>
                  <th className="text-left px-6 py-3 font-semibold text-foreground">Description</th>
                  <th className="text-right px-6 py-3 font-semibold text-foreground">Amount</th>
                  <th className="text-left px-6 py-3 font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {reconciledTransactions.slice(0, 8).map((tx) => (
                  <tr key={tx.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-6 py-4 text-foreground/70">{tx.date}</td>
                    <td className="px-6 py-4 text-foreground">{tx.description}</td>
                    <td className="text-right px-6 py-4 font-semibold text-foreground">
                      ${tx.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status="reconciled" variant="success" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'unmatched' && (
            <table className="w-full text-sm">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="text-left px-6 py-3 font-semibold text-foreground">Date</th>
                  <th className="text-left px-6 py-3 font-semibold text-foreground">Description</th>
                  <th className="text-right px-6 py-3 font-semibold text-foreground">Amount</th>
                  <th className="text-left px-6 py-3 font-semibold text-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {unmatchedTransactions.slice(0, 8).map((tx) => (
                  <tr key={tx.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-6 py-4 text-foreground/70">{tx.date}</td>
                    <td className="px-6 py-4 text-foreground">{tx.description}</td>
                    <td className="text-right px-6 py-4 font-semibold text-foreground">
                      ${tx.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-primary text-sm font-medium hover:underline">
                        Find Match
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'discrepancies' && (
            <table className="w-full text-sm">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="text-left px-6 py-3 font-semibold text-foreground">Date</th>
                  <th className="text-left px-6 py-3 font-semibold text-foreground">Description</th>
                  <th className="text-right px-6 py-3 font-semibold text-foreground">Amount</th>
                  <th className="text-left px-6 py-3 font-semibold text-foreground">Status</th>
                  <th className="text-left px-6 py-3 font-semibold text-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {discrepancies.map((disc) => (
                  <tr key={disc.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-6 py-4 text-foreground/70">{disc.date}</td>
                    <td className="px-6 py-4 text-foreground">{disc.description}</td>
                    <td className="text-right px-6 py-4 font-semibold text-foreground">
                      ${Math.abs(disc.amount).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge
                        status={disc.status}
                        variant={disc.status === 'needs_action' ? 'destructive' : 'warning'}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-primary text-sm font-medium hover:underline">
                        Investigate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Auto-Reconcile Button */}
      <div className="rounded-lg border border-border bg-card p-6 flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-foreground">Auto-Reconciliation Available</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Use our intelligent matching algorithm to automatically match transactions
          </p>
        </div>
        <button className="bg-secondary text-secondary-foreground hover:opacity-90 font-medium px-6 py-2 rounded-lg transition-all">
          Run Auto-Reconcile
        </button>
      </div>
    </div>
  )
}

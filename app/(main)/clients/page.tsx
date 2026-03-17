'use client'

import { clients } from '@/lib/sample-data'
import { StatusBadge } from '@/components/shared/status-badge'
import { Users, Building2, TrendingUp } from 'lucide-react'

export default function Clients() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Clients</h2>
        <p className="text-muted-foreground">Manage and view all client organizations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Total Clients</p>
              <p className="text-3xl font-bold text-foreground">{clients.length}</p>
            </div>
            <Users size={32} className="text-primary/30" />
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">QB Connected</p>
              <p className="text-3xl font-bold text-secondary">{clients.filter(c => c.qbConnected).length}</p>
            </div>
            <Building2 size={32} className="text-secondary/30" />
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Total Revenue</p>
              <p className="text-3xl font-bold text-foreground">${(clients.reduce((sum, c) => sum + c.revenue, 0) / 1000000).toFixed(0)}M</p>
            </div>
            <TrendingUp size={32} className="text-primary/30" />
          </div>
        </div>
      </div>

      {/* Clients Table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="text-left px-6 py-3 font-semibold text-foreground">Company</th>
              <th className="text-left px-6 py-3 font-semibold text-foreground">Industry</th>
              <th className="text-right px-6 py-3 font-semibold text-foreground">Revenue</th>
              <th className="text-center px-6 py-3 font-semibold text-foreground">Employees</th>
              <th className="text-center px-6 py-3 font-semibold text-foreground">QB Status</th>
              <th className="text-left px-6 py-3 font-semibold text-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-b border-border hover:bg-muted/50 cursor-pointer transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-foreground">{client.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-muted-foreground">{client.industry}</td>
                <td className="text-right px-6 py-4 font-medium text-foreground">
                  ${(client.revenue / 1000000).toFixed(1)}M
                </td>
                <td className="text-center px-6 py-4 text-muted-foreground">{client.employees}</td>
                <td className="text-center px-6 py-4">
                  <StatusBadge
                    status={client.qbConnected ? 'connected' : 'not_connected'}
                    variant={client.qbConnected ? 'success' : 'warning'}
                  />
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={client.status} variant="success" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

'use client'

import { useRole } from '@/lib/role-context'
import { clients, getClientKPIs } from '@/lib/sample-data'
import { KPICard } from '@/components/shared/kpi-card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Lock, Eye } from 'lucide-react'

export default function BuyerView() {
  const { role, selectedClientId } = useRole()
  const client = clients.find(c => c.id === selectedClientId)
  const kpis = getClientKPIs(selectedClientId)

  const financialHighlights = [
    { year: '2021', revenue: 8500000, ebitda: 1700000 },
    { year: '2022', revenue: 11200000, ebitda: 2240000 },
    { year: '2023', revenue: 15200000, ebitda: 3800000 },
    { year: '2024', revenue: 18500000, ebitda: 4625000 },
  ]

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Buyer View</h2>
        <p className="text-muted-foreground">Sanitized financial overview for potential acquirers</p>
      </div>

      {/* Confidentiality Notice */}
      {role !== 'buyer' && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 flex items-start gap-4">
          <Eye size={20} className="text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-foreground">Buyer-Ready View</p>
            <p className="text-sm text-muted-foreground mt-1">
              This dashboard displays sanitized information for buyer presentations
            </p>
          </div>
        </div>
      )}

      {/* Key Metrics */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">Key Financial Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.slice(0, 4).map((kpi, idx) => (
            <KPICard key={idx} label={kpi.label} value={kpi.value} change={kpi.change} status={kpi.status} />
          ))}
        </div>
      </div>

      {/* Historical Performance */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Historical Financial Performance</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={financialHighlights}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="year" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip formatter={(value) => `$${(value / 1000000).toFixed(1)}M`} contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }} />
            <Legend wrapperStyle={{ color: 'var(--color-foreground)' }} />
            <Bar dataKey="revenue" fill="var(--color-chart-2)" name="Revenue" />
            <Bar dataKey="ebitda" fill="var(--color-chart-1)" name="EBITDA" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Key Strengths */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Market Position</h3>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li className="flex items-start gap-2">
              <span className="text-secondary font-bold">▸</span>
              <span>Leading market position with strong brand recognition</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary font-bold">▸</span>
              <span>Diversified customer base reducing risk</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary font-bold">▸</span>
              <span>Proven ability to win and retain customers</span>
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Operational Excellence</h3>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li className="flex items-start gap-2">
              <span className="text-secondary font-bold">▸</span>
              <span>Efficient cost structure with scalability</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary font-bold">▸</span>
              <span>Strong management team</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary font-bold">▸</span>
              <span>Modern technology infrastructure</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Data Access Notice */}
      <div className="rounded-lg border border-border bg-muted/50 p-6 flex items-start gap-4">
        <Lock size={20} className="text-muted-foreground flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-foreground">Limited Data View</p>
          <p className="text-sm text-muted-foreground mt-1">
            This view displays sanitized aggregate information. Detailed data available after NDA execution.
          </p>
        </div>
      </div>
    </div>
  )
}

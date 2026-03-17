'use client'

import { useState } from 'react'
import { useRole } from '@/lib/role-context'
import { clients } from '@/lib/sample-data'
import { StatusBadge } from '@/components/shared/status-badge'
import { CheckCircle, Clock, AlertCircle, ArrowRight } from 'lucide-react'

export default function QuickBooksConnection() {
  const { selectedClientId } = useRole()
  const [currentStep, setCurrentStep] = useState(1)
  const client = clients.find(c => c.id === selectedClientId)

  const steps = [
    {
      number: 1,
      title: 'Authorize Connection',
      description: 'Grant permission to access QuickBooks data',
      status: 'complete',
    },
    {
      number: 2,
      title: 'Select Company',
      description: 'Choose which company to connect',
      status: 'complete',
    },
    {
      number: 3,
      title: 'Configure Sync',
      description: 'Set up data synchronization preferences',
      status: currentStep === 3 ? 'in_progress' : 'pending',
    },
    {
      number: 4,
      title: 'Verify Data',
      description: 'Review and confirm imported data',
      status: currentStep > 3 ? 'complete' : 'pending',
    },
  ]

  const connectedClients = clients.filter(c => c.qbConnected)
  const disconnectedClients = clients.filter(c => !c.qbConnected)

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">QuickBooks Connection</h2>
        <p className="text-muted-foreground">Connect and manage QuickBooks integrations</p>
      </div>

      {/* Current Connection Status */}
      {client?.qbConnected ? (
        <div className="rounded-lg border border-secondary/30 bg-secondary/5 p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <CheckCircle size={24} className="text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-foreground">{client.name} is Connected</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Connected on {client.connectedDate} • Last synced: Today at 2:34 PM
                </p>
                <div className="flex gap-2 mt-4">
                  <button className="text-sm px-3 py-1 border border-secondary/30 rounded hover:bg-secondary/10 transition-colors text-foreground font-medium">
                    Manage Connection
                  </button>
                  <button className="text-sm px-3 py-1 border border-secondary/30 rounded hover:bg-secondary/10 transition-colors text-foreground font-medium">
                    View Sync Details
                  </button>
                </div>
              </div>
            </div>
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Disconnect
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6">
          <div className="flex items-start gap-3">
            <AlertCircle size={24} className="text-destructive flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-bold text-foreground">{client?.name} is Not Connected</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Connect to QuickBooks to enable automatic data synchronization and reconciliation.
              </p>
              <button className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-all text-sm font-medium">
                Start Connection Wizard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Connection Wizard (if needed) */}
      {!client?.qbConnected && (
        <div className="rounded-lg border border-border bg-card p-8">
          <h3 className="text-xl font-bold text-foreground mb-6">Connection Setup Wizard</h3>

          {/* Steps */}
          <div className="mb-8">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex">
                <div className="flex flex-col items-center mr-6">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      step.status === 'complete'
                        ? 'bg-secondary text-secondary-foreground'
                        : step.status === 'in_progress'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {step.status === 'complete' ? <CheckCircle size={20} /> : step.number}
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={`w-1 h-12 ${
                        step.status === 'complete' ? 'bg-secondary' : 'bg-border'
                      }`}
                    ></div>
                  )}
                </div>
                <div className="pb-6">
                  <h4 className="font-semibold text-foreground">{step.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Current Step Content */}
          {currentStep === 3 && (
            <div className="space-y-4 mb-6 p-4 bg-muted rounded-lg">
              <h4 className="font-semibold text-foreground">Configure Data Sync</h4>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-foreground">Sync all transactions</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-foreground">Sync accounts and chart of accounts</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-foreground">Sync customer and vendor data</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-foreground">Auto-sync daily</span>
                </label>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all font-medium flex items-center gap-2"
            >
              {currentStep === 4 ? 'Complete' : 'Next'}
              {currentStep < 4 && <ArrowRight size={16} />}
            </button>
          </div>
        </div>
      )}

      {/* Connected Companies Overview */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">QuickBooks Integrations</h3>
        <div className="space-y-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {connectedClients.map((c) => (
              <div key={c.id} className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground">{c.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">Connected {c.connectedDate}</p>
                  </div>
                  <StatusBadge status="connected" variant="success" />
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {c.employees} employees • ${(c.revenue / 1000000).toFixed(1)}M revenue
                </p>
                <button className="text-sm text-primary font-medium hover:underline">
                  Manage →
                </button>
              </div>
            ))}
          </div>

          {disconnectedClients.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Not Connected
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {disconnectedClients.map((c) => (
                  <div key={c.id} className="rounded-lg border border-border bg-muted/30 p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{c.name}</h4>
                      </div>
                      <StatusBadge status="not_connected" variant="warning" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {c.employees} employees • ${(c.revenue / 1000000).toFixed(1)}M revenue
                    </p>
                    <button className="text-sm text-primary font-medium hover:underline">
                      Connect Now →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sync History */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Recent Sync Activity</h3>
        <div className="space-y-3">
          {[
            { time: 'Today at 2:34 PM', status: 'complete', message: 'Synced 1,250 transactions', company: 'ACME Corp' },
            { time: 'Yesterday at 11:20 AM', status: 'complete', message: 'Synced 890 transactions', company: 'Stellar Retail' },
            { time: '2 days ago at 3:45 PM', status: 'error', message: 'Sync failed - connection timeout', company: 'ACME Corp' },
            { time: '3 days ago at 9:15 AM', status: 'complete', message: 'Synced 1,450 transactions', company: 'Coastal Services' },
          ].map((log, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div>
                <p className="font-medium text-foreground">{log.company}</p>
                <p className="text-sm text-muted-foreground">{log.message}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">{log.time}</p>
                <StatusBadge
                  status={log.status}
                  variant={log.status === 'complete' ? 'success' : 'destructive'}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

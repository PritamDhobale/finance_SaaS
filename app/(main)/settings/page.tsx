'use client'

import { useState } from 'react'
import { Building2, Users, Lock, Bell, Zap } from 'lucide-react'
import { StatusBadge } from '@/components/shared/status-badge'

export default function Settings() {
  const [activeTab, setActiveTab] = useState<'organization' | 'users' | 'integrations' | 'notifications'>('organization')

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground">Manage your organization, users, and integrations</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        {[
          { value: 'organization', label: 'Organization', icon: Building2 },
          { value: 'users', label: 'Users & Access', icon: Users },
          { value: 'integrations', label: 'Integrations', icon: Zap },
          { value: 'notifications', label: 'Notifications', icon: Bell },
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
            <Icon size={18} />
            {label}
          </button>
        ))}
      </div>

      {/* Organization Tab */}
      {activeTab === 'organization' && (
        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Organization Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Organization Name</label>
                <input type="text" defaultValue="Financial Analytics Corp" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Industry</label>
                <select className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none">
                  <option>Financial Services</option>
                  <option>Technology</option>
                  <option>Accounting</option>
                </select>
              </div>
              <div className="flex gap-2 justify-end pt-4">
                <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted font-medium">Cancel</button>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 font-medium">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-foreground">Team Members</h3>
              <button className="bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:opacity-90 font-medium text-sm">
                Add User
              </button>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Alex Johnson', email: 'alex@company.com', role: 'Admin' },
                { name: 'Sarah Chen', email: 'sarah@company.com', role: 'Editor' },
                { name: 'Michael Brown', email: 'michael@company.com', role: 'Viewer' },
              ].map((user, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50">
                  <div>
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <StatusBadge status={user.role.toLowerCase()} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Integrations Tab */}
      {activeTab === 'integrations' && (
        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Connected Services</h3>
            <div className="space-y-4">
              {[
                { name: 'QuickBooks Online', status: 'connected', connected: '2024-01-15' },
                { name: 'Stripe', status: 'pending', connected: null },
                { name: 'Slack', status: 'not_connected', connected: null },
              ].map((integration, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{integration.name}</p>
                    {integration.connected && (
                      <p className="text-xs text-muted-foreground">Connected since {integration.connected}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={integration.status} variant={integration.status === 'connected' ? 'success' : 'warning'} />
                    <button className="px-3 py-1 text-sm border border-border rounded hover:bg-muted transition-colors">
                      {integration.status === 'connected' ? 'Manage' : 'Connect'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              {[
                { label: 'Email notifications for new requests', enabled: true },
                { label: 'Daily digest of pending items', enabled: true },
                { label: 'Alert when critical issues are found', enabled: true },
                { label: 'Weekly performance summary', enabled: false },
              ].map((notification, idx) => (
                <label key={idx} className="flex items-center gap-3 cursor-pointer p-3 rounded hover:bg-muted/50 transition-colors">
                  <input
                    type="checkbox"
                    defaultChecked={notification.enabled}
                    className="w-4 h-4"
                  />
                  <span className="text-foreground">{notification.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

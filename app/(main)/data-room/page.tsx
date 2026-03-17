'use client'

import { useRole } from '@/lib/role-context'
import { clients, getClientDocuments } from '@/lib/sample-data'
import { StatusBadge } from '@/components/shared/status-badge'
import { Folder, FileText, Download, Share2, Lock } from 'lucide-react'

export default function DataRoom() {
  const { selectedClientId } = useRole()
  const client = clients.find(c => c.id === selectedClientId)
  const documents = getClientDocuments(selectedClientId)

  const folders = [
    { id: 'f-1', name: 'Financial Statements', docCount: 8, status: 'complete' },
    { id: 'f-2', name: 'Tax Documents', docCount: 5, status: 'complete' },
    { id: 'f-3', name: 'Bank Statements', docCount: 12, status: 'in_review' },
    { id: 'f-4', name: 'Legal & Compliance', docCount: 15, status: 'pending' },
    { id: 'f-5', name: 'Operational Data', docCount: 22, status: 'complete' },
  ]

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Data Room</h2>
        <p className="text-muted-foreground">Secure document repository for due diligence materials</p>
      </div>

      {/* Security Notice */}
      <div className="rounded-lg border border-secondary/30 bg-secondary/5 p-4 flex items-start gap-3">
        <Lock size={20} className="text-secondary flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-foreground">Secure Access</p>
          <p className="text-sm text-muted-foreground mt-1">
            All documents are encrypted and access is logged. Download, sharing, and printing are tracked.
          </p>
        </div>
      </div>

      {/* Folder Overview */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">Document Folders</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {folders.map((folder) => (
            <div key={folder.id} className="rounded-lg border border-border bg-card p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <Folder size={32} className="text-primary" />
                <StatusBadge status={folder.status} />
              </div>
              <h4 className="font-semibold text-foreground mb-2">{folder.name}</h4>
              <p className="text-sm text-muted-foreground">{folder.docCount} documents</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Documents */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">Recent Documents</h3>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-foreground">Document</th>
                <th className="text-left px-6 py-3 font-semibold text-foreground">Type</th>
                <th className="text-left px-6 py-3 font-semibold text-foreground">Source</th>
                <th className="text-left px-6 py-3 font-semibold text-foreground">Date</th>
                <th className="text-left px-6 py-3 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.slice(0, 8).map((doc) => (
                <tr key={doc.id} className="border-b border-border hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-muted-foreground" />
                      <span className="text-foreground font-medium">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground capitalize">{doc.type.replace('_', ' ')}</td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">{doc.source}</td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">{doc.uploadDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-muted rounded transition-colors" title="Download">
                        <Download size={16} className="text-primary" />
                      </button>
                      <button className="p-1 hover:bg-muted rounded transition-colors" title="Share">
                        <Share2 size={16} className="text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Log */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Access Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'Downloaded', document: 'Q4 2023 Financial Statements', user: 'Sarah Johnson', time: '2 hours ago' },
            { action: 'Viewed', document: 'Tax Return (Form 1120)', user: 'Michael Chen', time: '4 hours ago' },
            { action: 'Shared', document: 'Accounts Receivable Aging', user: 'Jennifer Lee', time: '1 day ago' },
            { action: 'Downloaded', document: 'General Ledger Q1 2024', user: 'David Martinez', time: '2 days ago' },
          ].map((log, idx) => (
            <div key={idx} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
              <div>
                <p className="font-medium text-foreground">{log.action}: {log.document}</p>
                <p className="text-xs text-muted-foreground mt-1">by {log.user}</p>
              </div>
              <p className="text-xs text-muted-foreground whitespace-nowrap">{log.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

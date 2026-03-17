'use client'

import { useState } from 'react'
import { useRole } from '@/lib/role-context'
import { clients, getClientRequests } from '@/lib/sample-data'
import { StatusBadge } from '@/components/shared/status-badge'
import { MessageCircle, Plus, Calendar } from 'lucide-react'

export default function RequestsFollowups() {
  const { selectedClientId } = useRole()
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null)
  const client = clients.find(c => c.id === selectedClientId)
  const requests = getClientRequests(selectedClientId)

  const statusCounts = {
    draft: requests.filter(r => r.status === 'draft').length,
    sent: requests.filter(r => r.status === 'sent').length,
    waiting: requests.filter(r => r.status === 'waiting').length,
    received: requests.filter(r => r.status === 'received').length,
    closed: requests.filter(r => r.status === 'closed').length,
  }

  const selectedReq = requests.find(r => r.id === selectedRequest)

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Requests & Follow-ups</h2>
          <p className="text-muted-foreground">Track outstanding data requests and follow-ups</p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-all flex items-center gap-2 font-medium">
          <Plus size={18} />
          New Request
        </button>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {Object.entries(statusCounts).map(([status, count]) => (
          <div key={status} className="rounded-lg border border-border bg-card p-4 text-center">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2 capitalize">{status}</p>
            <p className="text-2xl font-bold text-foreground">{count}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Requests List */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-lg font-bold text-foreground mb-4">All Requests</h3>
          {requests.length === 0 ? (
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <MessageCircle size={40} className="mx-auto text-muted-foreground opacity-30 mb-3" />
              <p className="text-foreground font-medium">No requests yet</p>
              <p className="text-sm text-muted-foreground mt-1">Create a new request to get started</p>
            </div>
          ) : (
            requests.map((req) => (
              <div
                key={req.id}
                onClick={() => setSelectedRequest(req.id)}
                className={`rounded-lg border cursor-pointer transition-all p-4 ${
                  selectedRequest === req.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50 hover:bg-muted/30'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-foreground flex-1 pr-2">{req.title}</h4>
                  <StatusBadge
                    status={req.status}
                    variant={
                      req.status === 'closed'
                        ? 'success'
                        : req.status === 'received'
                        ? 'success'
                        : req.status === 'waiting'
                        ? 'warning'
                        : 'default'
                    }
                  />
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{req.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {req.dueDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle size={14} />
                    {req.comments.length} comment{req.comments.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Request Details Panel */}
        <div className="lg:col-span-1">
          {selectedReq ? (
            <div className="rounded-lg border border-border bg-card p-6 sticky top-24 space-y-6">
              <div>
                <h4 className="font-bold text-foreground text-lg mb-2">{selectedReq.title}</h4>
                <StatusBadge status={selectedReq.status} />
              </div>

              <div className="space-y-3 pb-6 border-b border-border">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Assignee</p>
                  <p className="font-medium text-foreground">{selectedReq.assignee}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Priority</p>
                  <StatusBadge
                    status={selectedReq.priority}
                    variant={selectedReq.priority === 'high' ? 'destructive' : 'default'}
                  />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Category</p>
                  <p className="text-sm text-foreground capitalize">{selectedReq.category.replace('_', ' ')}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Due Date</p>
                  <p className="text-sm text-foreground">{selectedReq.dueDate}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Description</p>
                <p className="text-sm text-foreground">{selectedReq.description}</p>
              </div>

              {/* Comments */}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Comments ({selectedReq.comments.length})</p>
                <div className="space-y-3 mb-4">
                  {selectedReq.comments.map((comment) => (
                    <div key={comment.id} className="bg-muted/50 p-3 rounded text-sm">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-foreground">{comment.author}</p>
                        <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                      </div>
                      <p className="text-foreground/80">{comment.text}</p>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <button className="w-full bg-primary text-primary-foreground rounded-lg py-2 hover:opacity-90 transition-all font-medium text-sm">
                Update Status
              </button>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center h-full flex items-center justify-center">
              <div>
                <MessageCircle size={40} className="mx-auto text-muted-foreground opacity-30 mb-3" />
                <p className="text-foreground font-medium">Select a request</p>
                <p className="text-xs text-muted-foreground mt-1">Click on any request to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { clients, getClientDocuments } from '@/lib/sample-data'
import { StatusBadge } from '@/components/shared/status-badge'
import { FileText, Download, Search } from 'lucide-react'

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState('')
  const allDocuments = clients.flatMap(c => getClientDocuments(c.id).map(doc => ({ ...doc, clientName: c.name })))

  const filteredDocs = searchTerm
    ? allDocuments.filter(doc => doc.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : allDocuments

  const typeColors: Record<string, string> = {
    financial_statement: 'text-primary',
    tax_return: 'text-secondary',
    bank_statement: 'text-destructive',
    ledger: 'text-destructive/60',
    other: 'text-muted-foreground',
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Documents</h2>
        <p className="text-muted-foreground">Global document repository across all clients</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={20} className="absolute left-3 top-3 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Document List */}
      <div className="rounded-lg border border-border overflow-hidden">
        {filteredDocs.length === 0 ? (
          <div className="p-8 text-center bg-card">
            <FileText size={40} className="mx-auto text-muted-foreground opacity-30 mb-3" />
            <p className="text-foreground font-medium">No documents found</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your search</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-foreground">Document</th>
                <th className="text-left px-6 py-3 font-semibold text-foreground">Type</th>
                <th className="text-left px-6 py-3 font-semibold text-foreground">Client</th>
                <th className="text-left px-6 py-3 font-semibold text-foreground">Size</th>
                <th className="text-left px-6 py-3 font-semibold text-foreground">Date</th>
                <th className="text-left px-6 py-3 font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="border-b border-border hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className={typeColors[doc.type] || 'text-muted-foreground'} />
                      <span className="text-foreground font-medium">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={doc.type.replace('_', ' ')} />
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">{doc.clientName}</td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">{doc.size}</td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">{doc.uploadDate}</td>
                  <td className="px-6 py-4">
                    <button className="text-primary hover:underline text-sm font-medium flex items-center gap-1">
                      <Download size={14} />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Documents', value: allDocuments.length },
          { label: 'Financial Statements', value: allDocuments.filter(d => d.type === 'financial_statement').length },
          { label: 'Tax Returns', value: allDocuments.filter(d => d.type === 'tax_return').length },
          { label: 'Bank Statements', value: allDocuments.filter(d => d.type === 'bank_statement').length },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{stat.label}</p>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

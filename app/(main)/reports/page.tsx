'use client'

import { FileText, Download, Calendar } from 'lucide-react'

export default function Reports() {
  const reports = [
    {
      id: '1',
      name: 'Monthly Financial Summary',
      category: 'Financial',
      lastGenerated: '2024-03-10',
      frequency: 'Monthly',
    },
    {
      id: '2',
      name: 'Reconciliation Status Report',
      category: 'Accounting',
      lastGenerated: '2024-03-12',
      frequency: 'Weekly',
    },
    {
      id: '3',
      name: 'Tax Compliance Checklist',
      category: 'Tax',
      lastGenerated: '2024-02-28',
      frequency: 'Quarterly',
    },
    {
      id: '4',
      name: 'Cash Flow Forecast',
      category: 'Financial',
      lastGenerated: '2024-03-15',
      frequency: 'Monthly',
    },
    {
      id: '5',
      name: 'Outstanding Issues Report',
      category: 'Accounting',
      lastGenerated: '2024-03-14',
      frequency: 'Weekly',
    },
    {
      id: '6',
      name: 'Audit Readiness Report',
      category: 'Audit',
      lastGenerated: '2024-03-01',
      frequency: 'Quarterly',
    },
  ]

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Reports</h2>
        <p className="text-muted-foreground">Generate and manage financial and compliance reports</p>
      </div>

      {/* Report Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <div key={report.id} className="rounded-lg border border-border bg-card p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <FileText size={32} className="text-primary" />
              <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded font-medium">
                {report.frequency}
              </span>
            </div>
            <h4 className="font-semibold text-foreground mb-1">{report.name}</h4>
            <p className="text-xs text-muted-foreground mb-4">{report.category}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 pb-4 border-b border-border">
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                Last: {report.lastGenerated}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-primary text-primary-foreground rounded py-2 hover:opacity-90 transition-all text-sm font-medium">
                Generate
              </button>
              <button className="flex-1 border border-border rounded py-2 hover:bg-muted transition-colors text-sm font-medium flex items-center justify-center gap-1">
                <Download size={14} />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Report Section */}
      <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
        <FileText size={40} className="mx-auto text-muted-foreground opacity-30 mb-3" />
        <h3 className="font-bold text-foreground">Create Custom Report</h3>
        <p className="text-sm text-muted-foreground mt-2 mb-4">
          Build your own report with custom metrics and filters
        </p>
        <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-all font-medium">
          Create Report
        </button>
      </div>
    </div>
  )
}

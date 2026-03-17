'use client'

import { useState } from 'react'
import { getMAReadinessChecklist } from '@/lib/sample-data'
import { StatusBadge } from '@/components/shared/status-badge'
import { CheckCircle, Clock, AlertCircle } from 'lucide-react'

export default function MAReadiness() {
  const checklist = getMAReadinessChecklist()
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const categoryStatus = (category: string) => {
    const items = checklist.find(c => c.category === category)?.items || []
    const completed = items.filter(i => i.status === 'complete').length
    const total = items.length
    return { completed, total }
  }

  const overallProgress = Math.round(
    (checklist.reduce((sum, cat) => {
      const completed = cat.items.filter(i => i.status === 'complete').length
      return sum + completed
    }, 0) / checklist.reduce((sum, cat) => sum + cat.items.length, 0)) * 100
  )

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">M&A Readiness Assessment</h2>
        <p className="text-muted-foreground">
          Comprehensive checklist for preparing your company for acquisition review
        </p>
      </div>

      {/* Overall Progress */}
      <div className="rounded-lg border border-border bg-card p-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-foreground">Overall Completion</h3>
            <span className="text-3xl font-bold text-primary">{overallProgress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <p className="text-2xl font-bold text-secondary">
              {checklist.reduce((sum, cat) => sum + cat.items.filter(i => i.status === 'complete').length, 0)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Completed Tasks</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <p className="text-2xl font-bold text-destructive">
              {checklist.reduce((sum, cat) => sum + cat.items.filter(i => i.status === 'in_progress').length, 0)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">In Progress</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <p className="text-2xl font-bold text-muted-foreground">
              {checklist.reduce((sum, cat) => sum + cat.items.filter(i => i.status === 'not_started').length, 0)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Not Started</p>
          </div>
        </div>
      </div>

      {/* Checklist by Category */}
      <div className="space-y-4">
        {checklist.map((category) => {
          const { completed, total } = categoryStatus(category.category)
          const percent = Math.round((completed / total) * 100)
          const isExpanded = expandedCategory === category.category

          return (
            <div key={category.category} className="rounded-lg border border-border overflow-hidden">
              <button
                onClick={() =>
                  setExpandedCategory(isExpanded ? null : category.category)
                }
                className="w-full p-6 bg-card hover:bg-muted/50 transition-colors text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-foreground">{category.category}</h3>
                      <StatusBadge
                        status={
                          completed === total
                            ? 'complete'
                            : completed > 0
                            ? 'in_progress'
                            : 'not_started'
                        }
                        variant={
                          completed === total
                            ? 'success'
                            : completed > 0
                            ? 'info'
                            : 'warning'
                        }
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 max-w-xs">
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden mb-1">
                          <div
                            className="bg-primary h-full transition-all"
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-foreground whitespace-nowrap">
                        {completed}/{total} items
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 text-2xl font-bold text-foreground">{percent}%</div>
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-border bg-muted/50 divide-y divide-border">
                  {category.items.map((item) => (
                    <div key={item.id} className="p-6 hover:bg-muted transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          {item.status === 'complete' && (
                            <CheckCircle size={24} className="text-secondary" />
                          )}
                          {item.status === 'in_progress' && (
                            <Clock size={24} className="text-destructive/60" />
                          )}
                          {item.status === 'not_started' && (
                            <AlertCircle size={24} className="text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{item.title}</h4>
                          {item.dueDate && (
                            <p className="text-xs text-muted-foreground mt-1">Due: {item.dueDate}</p>
                          )}
                        </div>
                        <StatusBadge
                          status={item.status}
                          variant={
                            item.status === 'complete'
                              ? 'success'
                              : item.status === 'in_progress'
                              ? 'info'
                              : 'default'
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Key Recommendations */}
      <div className="rounded-lg border border-border bg-card p-8">
        <h3 className="text-lg font-bold text-foreground mb-6">Key Recommendations</h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-1 bg-destructive rounded-full flex-shrink-0"></div>
            <div>
              <h4 className="font-semibold text-foreground">Priority: Accounting Cleanup</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Critical accounting issues must be resolved before buyer review. Complete bank reconciliation and address all identified discrepancies.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1 bg-destructive/60 rounded-full flex-shrink-0"></div>
            <div>
              <h4 className="font-semibold text-foreground">Legal Documentation</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Organize all contracts and legal documents. Review for any litigation risks or compliance issues.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1 bg-secondary rounded-full flex-shrink-0"></div>
            <div>
              <h4 className="font-semibold text-foreground">Management Information</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Prepare comprehensive profiles of leadership team. Document succession plans and key person dependencies.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end">
        <button className="px-6 py-2 border border-border rounded-lg hover:bg-muted transition-colors font-medium">
          Export Checklist
        </button>
        <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all font-medium">
          Start Assessment
        </button>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useRole } from '@/lib/role-context'
import { clients, getClientKPIs } from '@/lib/sample-data'
import { Eye, EyeOff } from 'lucide-react'

export default function TeaserSummary() {
  const { selectedClientId } = useRole()
  const [showSensitive, setShowSensitive] = useState(false)
  const client = clients.find(c => c.id === selectedClientId)
  const kpis = getClientKPIs(selectedClientId)

  const maskedValue = (actual: string | number) => (
    <span className="bg-muted px-2 py-1 rounded text-muted-foreground">
      [Confidential]
    </span>
  )

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Teaser Summary</h2>
        <p className="text-muted-foreground">
          Anonymized overview of business opportunity for initial buyer outreach
        </p>
      </div>

      {/* Anonymization Toggle */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-foreground">Anonymization Status</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {showSensitive ? 'Currently displaying sensitive information' : 'Sensitive information is anonymized'}
            </p>
          </div>
          <button
            onClick={() => setShowSensitive(!showSensitive)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors font-medium"
          >
            {showSensitive ? (
              <>
                <EyeOff size={18} />
                Hide Details
              </>
            ) : (
              <>
                <Eye size={18} />
                Show Details
              </>
            )}
          </button>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="rounded-lg border border-border bg-card p-8">
        <h3 className="text-lg font-bold text-foreground mb-4">Investment Opportunity</h3>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Established company in the <strong>{showSensitive ? client?.industry : '[Industry]'}</strong> sector
            with a proven business model and consistent growth trajectory. The target demonstrates strong market
            position and operational efficiency.
          </p>
          <p>
            The company has built a <strong>{showSensitive ? 'diversified' : '[Diversified]'}</strong> customer base
            across multiple market segments, reducing revenue concentration risk. Management team brings extensive
            industry experience and demonstrated execution capability.
          </p>
        </div>
      </div>

      {/* Key Metrics - Anonymized */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">Financial Profile</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              label: 'Revenue Scale',
              value: client?.revenue,
              display: showSensitive ? `$${(client?.revenue! / 1000000).toFixed(1)}M` : '[Confidential]',
            },
            {
              label: 'Team Size',
              value: client?.employees,
              display: showSensitive ? `${client?.employees} employees` : '[Confidential]',
            },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">{item.label}</p>
              <p className="text-2xl font-bold text-foreground">
                {typeof item.display === 'string' ? (
                  item.display.includes('Confidential') ? (
                    <span className="bg-muted px-2 py-1 rounded text-muted-foreground text-sm">
                      {item.display}
                    </span>
                  ) : (
                    item.display
                  )
                ) : (
                  item.display
                )}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Business Profile */}
      <div className="rounded-lg border border-border bg-card p-8">
        <h3 className="text-lg font-bold text-foreground mb-4">Business Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-foreground mb-3">Market Characteristics</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">▸</span>
                <span>Established market with consistent demand</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">▸</span>
                <span>Recurring revenue model with high retention</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">▸</span>
                <span>Scalable operations with growth potential</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">▸</span>
                <span>Attractive unit economics and margins</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">Investment Highlights</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">▸</span>
                <span>Experienced management team</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">▸</span>
                <span>Strong customer relationships</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">▸</span>
                <span>Multiple growth levers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">▸</span>
                <span>Platform for add-on acquisitions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Growth Opportunities */}
      <div className="rounded-lg border border-border bg-muted/50 p-8">
        <h3 className="text-lg font-bold text-foreground mb-4">Strategic Opportunities</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Market Expansion', 'Product Development', 'Operational Optimization'].map((opp) => (
            <div key={opp} className="bg-card rounded-lg p-4 border border-border">
              <p className="font-semibold text-foreground">{opp}</p>
              <p className="text-xs text-muted-foreground mt-2">Significant potential for value creation</p>
            </div>
          ))}
        </div>
      </div>

      {/* Valuation Range - Anonymized */}
      <div className="rounded-lg border border-border bg-card p-8">
        <h3 className="text-lg font-bold text-foreground mb-4">Investment Range</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Estimated EBITDA', value: showSensitive ? '$3.8M' : '[Confidential]' },
            { label: 'Valuation Multiple', value: '6.5-8.0x' },
            { label: 'Estimated Valuation', value: showSensitive ? '$24.7M - $30.4M' : '[Confidential]' },
          ].map((item) => (
            <div key={item.label} className="p-4 rounded-lg bg-muted/50 border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{item.label}</p>
              <p className="text-xl font-bold text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
        {!showSensitive && (
          <p className="text-sm text-muted-foreground italic">
            Detailed valuation available upon execution of NDA
          </p>
        )}
      </div>

      {/* Next Steps */}
      <div className="rounded-lg border border-border bg-card p-8">
        <h3 className="text-lg font-bold text-foreground mb-4">Next Steps for Interested Parties</h3>
        <ol className="space-y-3 text-muted-foreground">
          <li className="flex gap-3">
            <span className="text-secondary font-bold flex-shrink-0">1.</span>
            <span>Review this confidential teaser summary</span>
          </li>
          <li className="flex gap-3">
            <span className="text-secondary font-bold flex-shrink-0">2.</span>
            <span>Submit preliminary expression of interest</span>
          </li>
          <li className="flex gap-3">
            <span className="text-secondary font-bold flex-shrink-0">3.</span>
            <span>Execute mutual NDA</span>
          </li>
          <li className="flex gap-3">
            <span className="text-secondary font-bold flex-shrink-0">4.</span>
            <span>Access detailed information in data room</span>
          </li>
          <li className="flex gap-3">
            <span className="text-secondary font-bold flex-shrink-0">5.</span>
            <span>Management presentation and due diligence</span>
          </li>
        </ol>
      </div>

      {/* Confidentiality Footer */}
      <div className="text-center text-xs text-muted-foreground p-6 rounded-lg border border-border bg-muted/30">
        <p>
          This document contains confidential and proprietary information. It is provided solely for evaluation purposes
          to authorized recipients. Unauthorized distribution is prohibited.
        </p>
      </div>
    </div>
  )
}

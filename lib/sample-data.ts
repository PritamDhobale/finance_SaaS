import { UserRole } from './role-context'

export interface Client {
  id: string
  name: string
  industry: string
  revenue: number
  employees: number
  status: 'active' | 'archived'
  qbConnected: boolean
  connectedDate?: string
}

export interface KPIMetric {
  label: string
  value: string | number
  change?: number
  status: 'good' | 'warning' | 'critical'
}

export interface Transaction {
  id: string
  date: string
  description: string
  category: string
  amount: number
  account: string
  status: 'reconciled' | 'unreconciled' | 'pending'
}

export interface BookIssue {
  id: string
  title: string
  description: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  category: 'reconciliation' | 'data_quality' | 'classification' | 'balance'
  status: 'open' | 'in_progress' | 'resolved'
  createdDate: string
}

export interface Document {
  id: string
  name: string
  type: 'financial_statement' | 'tax_return' | 'bank_statement' | 'ledger' | 'other'
  size: string
  uploadDate: string
  source: string
}

export interface Request {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  status: 'draft' | 'sent' | 'waiting' | 'received' | 'closed'
  dueDate: string
  assignee: string
  category: 'data_request' | 'clarification' | 'compliance' | 'analysis'
  comments: RequestComment[]
}

export interface RequestComment {
  id: string
  author: string
  text: string
  timestamp: string
}

export interface ClientProfile {
  id: string
  name: string
  industry: string
  foundedYear: number
  revenue: number
  employees: number
  description: string
}

// Sample Clients
export const clients: Client[] = [
  {
    id: 'acme-corp',
    name: 'ACME Corporation',
    industry: 'Technology',
    revenue: 15000000,
    employees: 180,
    status: 'active',
    qbConnected: true,
    connectedDate: '2024-01-15',
  },
  {
    id: 'stellar-retail',
    name: 'Stellar Retail Inc',
    industry: 'Retail',
    revenue: 8500000,
    employees: 95,
    status: 'active',
    qbConnected: true,
    connectedDate: '2023-11-20',
  },
  {
    id: 'nexus-ventures',
    name: 'Nexus Ventures LLC',
    industry: 'Investment',
    revenue: 12000000,
    employees: 42,
    status: 'active',
    qbConnected: false,
  },
  {
    id: 'coastal-services',
    name: 'Coastal Services Group',
    industry: 'Professional Services',
    revenue: 5200000,
    employees: 68,
    status: 'active',
    qbConnected: true,
    connectedDate: '2024-02-01',
  },
]

// Sample KPI Data by Client
export const getClientKPIs = (clientId: string): KPIMetric[] => {
  const kpiMap: Record<string, KPIMetric[]> = {
    'acme-corp': [
      { label: 'Total Revenue', value: '$15.2M', change: 12, status: 'good' },
      { label: 'Net Income', value: '$3.8M', change: 8, status: 'good' },
      { label: 'Cash on Hand', value: '$2.1M', change: -5, status: 'warning' },
      { label: 'Accounts Receivable', value: '$2.3M', change: 15, status: 'good' },
      { label: 'Days Sales Outstanding', value: '32 days', change: -3, status: 'good' },
      { label: 'Debt-to-Equity Ratio', value: '0.45', change: 2, status: 'good' },
      { label: 'Operating Margin', value: '25.2%', change: 4, status: 'good' },
      { label: 'Asset Turnover', value: '2.8x', change: 0, status: 'good' },
    ],
    'stellar-retail': [
      { label: 'Total Revenue', value: '$8.5M', change: 5, status: 'good' },
      { label: 'Net Income', value: '$1.7M', change: -2, status: 'warning' },
      { label: 'Cash on Hand', value: '$850K', change: -10, status: 'critical' },
      { label: 'Accounts Receivable', value: '$520K', change: 8, status: 'good' },
      { label: 'Days Sales Outstanding', value: '28 days', change: 0, status: 'good' },
      { label: 'Debt-to-Equity Ratio', value: '0.62', change: 5, status: 'warning' },
      { label: 'Operating Margin', value: '20.1%', change: -3, status: 'warning' },
      { label: 'Inventory Turnover', value: '5.2x', change: 2, status: 'good' },
    ],
    'nexus-ventures': [
      { label: 'Assets Under Management', value: '$12.0M', change: 18, status: 'good' },
      { label: 'Net Investment Returns', value: '$1.2M', change: 25, status: 'good' },
      { label: 'Cash Position', value: '$3.5M', change: 12, status: 'good' },
      { label: 'Number of Deals', value: '12', change: 2, status: 'good' },
      { label: 'Average Deal Size', value: '$1.0M', change: 5, status: 'good' },
      { label: 'Portfolio Companies', value: '8', change: 1, status: 'good' },
      { label: 'Cash Deployment Rate', value: '35%', change: 8, status: 'good' },
      { label: 'Returns Multiple', value: '1.8x', change: 3, status: 'good' },
    ],
    'coastal-services': [
      { label: 'Total Revenue', value: '$5.2M', change: 7, status: 'good' },
      { label: 'Net Income', value: '$1.1M', change: 3, status: 'good' },
      { label: 'Cash on Hand', value: '$620K', change: -2, status: 'warning' },
      { label: 'Accounts Receivable', value: '$480K', change: 12, status: 'good' },
      { label: 'Days Sales Outstanding', value: '41 days', change: 4, status: 'warning' },
      { label: 'Debt-to-Equity Ratio', value: '0.35', change: 1, status: 'good' },
      { label: 'Operating Margin', value: '21.5%', change: 2, status: 'good' },
      { label: 'Billable Utilization', value: '78%', change: -3, status: 'warning' },
    ],
  }

  return kpiMap[clientId] || kpiMap['acme-corp']
}

// Sample Transactions
export const getClientTransactions = (clientId: string): Transaction[] => {
  const baseTransactions: Transaction[] = [
    { id: '1', date: '2024-03-15', description: 'Software License Renewal', category: 'Operating Expense', amount: 5400, account: 'Expense Account', status: 'reconciled' },
    { id: '2', date: '2024-03-14', description: 'Client Invoice #12034', category: 'Revenue', amount: 28500, account: 'Accounts Receivable', status: 'reconciled' },
    { id: '3', date: '2024-03-13', description: 'Payroll Processing', category: 'Payroll Expense', amount: 95000, account: 'Cash', status: 'unreconciled' },
    { id: '4', date: '2024-03-12', description: 'Equipment Purchase', category: 'Capital Asset', amount: 15600, account: 'Fixed Asset', status: 'pending' },
    { id: '5', date: '2024-03-11', description: 'Vendor Payment - ABC Supplies', category: 'Accounts Payable', amount: 8750, account: 'Cash', status: 'reconciled' },
    { id: '6', date: '2024-03-10', description: 'Consulting Services Invoice', category: 'Revenue', amount: 12000, account: 'Accounts Receivable', status: 'unreconciled' },
    { id: '7', date: '2024-03-09', description: 'Office Rent Payment', category: 'Occupancy', amount: 22000, account: 'Cash', status: 'reconciled' },
    { id: '8', date: '2024-03-08', description: 'Bank Interest Income', category: 'Interest Income', amount: 285, account: 'Cash', status: 'reconciled' },
    { id: '9', date: '2024-03-07', description: 'Marketing Campaign', category: 'Marketing', amount: 6200, account: 'Cash', status: 'pending' },
    { id: '10', date: '2024-03-06', description: 'Customer Refund', category: 'Refund', amount: -2100, account: 'Cash', status: 'reconciled' },
    { id: '11', date: '2024-03-05', description: 'Professional Fees', category: 'Professional Services', amount: 4500, account: 'Cash', status: 'unreconciled' },
    { id: '12', date: '2024-03-04', description: 'Subscription Service', category: 'Software', amount: 299, account: 'Cash', status: 'reconciled' },
    { id: '13', date: '2024-03-03', description: 'Product Sales', category: 'Revenue', amount: 45000, account: 'Accounts Receivable', status: 'unreconciled' },
    { id: '14', date: '2024-03-02', description: 'Utilities Payment', category: 'Utilities', amount: 3200, account: 'Cash', status: 'reconciled' },
    { id: '15', date: '2024-03-01', description: 'Insurance Premium', category: 'Insurance', amount: 7800, account: 'Cash', status: 'pending' },
    { id: '16', date: '2024-02-28', description: 'Inventory Purchase', category: 'Inventory', amount: 35000, account: 'Inventory', status: 'unreconciled' },
    { id: '17', date: '2024-02-27', description: 'Travel Reimbursement', category: 'Travel', amount: 1450, account: 'Cash', status: 'reconciled' },
    { id: '18', date: '2024-02-26', description: 'Loan Payment', category: 'Debt Service', amount: 25000, account: 'Cash', status: 'reconciled' },
    { id: '19', date: '2024-02-25', description: 'Training Program', category: 'Professional Development', amount: 8900, account: 'Cash', status: 'pending' },
    { id: '20', date: '2024-02-24', description: 'Grant Income', category: 'Other Income', amount: 50000, account: 'Cash', status: 'reconciled' },
  ]

  // Add clientId variation to make each client unique
  const clientIndex = ['acme-corp', 'stellar-retail', 'nexus-ventures', 'coastal-services'].indexOf(clientId)
  const multiplier = [1, 0.8, 1.2, 0.6][clientIndex] || 1

  return baseTransactions.map(t => ({
    ...t,
    amount: Math.round(t.amount * multiplier),
  }))
}

// Sample Book Issues
export const getClientBookIssues = (clientId: string): BookIssue[] => {
  const issues: BookIssue[] = [
    {
      id: 'issue-1',
      title: 'Unreconciled Bank Deposits',
      description: 'Multiple deposits from Q1 2024 do not match bank statements. Approximately $125,000 in discrepancies.',
      severity: 'critical',
      category: 'reconciliation',
      status: 'open',
      createdDate: '2024-02-15',
    },
    {
      id: 'issue-2',
      title: 'Duplicate Invoices',
      description: 'Found 3 duplicate invoices totaling $18,500 that need to be removed or adjusted.',
      severity: 'high',
      category: 'data_quality',
      status: 'in_progress',
      createdDate: '2024-02-20',
    },
    {
      id: 'issue-3',
      title: 'Uncategorized Transactions',
      description: 'Approximately 45 transactions from January-February lack proper account classification.',
      severity: 'medium',
      category: 'classification',
      status: 'open',
      createdDate: '2024-02-18',
    },
    {
      id: 'issue-4',
      title: 'Balance Sheet Discrepancy',
      description: 'Accounts Receivable aging report shows $8,200 in potential bad debt write-offs.',
      severity: 'high',
      category: 'balance',
      status: 'open',
      createdDate: '2024-02-25',
    },
    {
      id: 'issue-5',
      title: 'Missing Supporting Documentation',
      description: 'Several expense reimbursements lack proper receipts and documentation.',
      severity: 'medium',
      category: 'data_quality',
      status: 'in_progress',
      createdDate: '2024-03-01',
    },
    {
      id: 'issue-6',
      title: 'Inventory Count Variance',
      description: 'Physical count does not match books by $12,400. Investigation needed.',
      severity: 'high',
      category: 'balance',
      status: 'open',
      createdDate: '2024-02-28',
    },
  ]

  return clientId === 'stellar-retail' ? issues : issues.slice(0, 3)
}

// Sample Documents
export const getClientDocuments = (clientId: string): Document[] => {
  const documents: Document[] = [
    { id: 'doc-1', name: 'Q4 2023 Financial Statements', type: 'financial_statement', size: '2.4 MB', uploadDate: '2024-01-20', source: 'Internal Finance' },
    { id: 'doc-2', name: '2023 Tax Return (Form 1120)', type: 'tax_return', size: '1.1 MB', uploadDate: '2024-02-10', source: 'CPA Firm' },
    { id: 'doc-3', name: 'January 2024 Bank Statements', type: 'bank_statement', size: '850 KB', uploadDate: '2024-02-05', source: 'Bank Upload' },
    { id: 'doc-4', name: 'General Ledger - Q1 2024', type: 'ledger', size: '3.2 MB', uploadDate: '2024-03-10', source: 'Accounting System' },
    { id: 'doc-5', name: 'February 2024 Bank Statements', type: 'bank_statement', size: '920 KB', uploadDate: '2024-03-05', source: 'Bank Upload' },
    { id: 'doc-6', name: 'Accounts Payable Aging Report', type: 'other', size: '450 KB', uploadDate: '2024-03-12', source: 'Internal Finance' },
    { id: 'doc-7', name: 'Accounts Receivable Detail', type: 'other', size: '580 KB', uploadDate: '2024-03-12', source: 'Internal Finance' },
    { id: 'doc-8', name: 'March 2024 Bank Statements', type: 'bank_statement', size: '895 KB', uploadDate: '2024-03-15', source: 'Bank Upload' },
    { id: 'doc-9', name: 'Fixed Asset Register', type: 'other', size: '1.3 MB', uploadDate: '2024-03-01', source: 'Finance Department' },
    { id: 'doc-10', name: '2024 Tax Planning Summary', type: 'tax_return', size: '680 KB', uploadDate: '2024-03-08', source: 'CPA Firm' },
  ]

  return documents
}

// Sample Requests
export const getClientRequests = (clientId: string): Request[] => {
  const requests: Request[] = [
    {
      id: 'req-1',
      title: 'Complete Bank Reconciliation - Q1 2024',
      description: 'Please provide detailed reconciliation for all bank accounts for the first quarter of 2024, including supporting documentation for any variances.',
      priority: 'high',
      status: 'waiting',
      dueDate: '2024-03-20',
      assignee: 'Sarah Johnson',
      category: 'data_request',
      comments: [
        { id: 'c1', author: 'Internal Finance', text: 'This is critical for closing the Q1 books. We need this by March 20th.', timestamp: '2024-03-10' },
        { id: 'c2', author: 'Sarah Johnson', text: 'Working on this. Should have complete reconciliation by March 18th.', timestamp: '2024-03-12' },
      ],
    },
    {
      id: 'req-2',
      title: 'Clarify Revenue Recognition Policy',
      description: 'Please clarify how multi-year contracts are being recognized. We noticed some inconsistencies in how revenue is being booked.',
      priority: 'high',
      status: 'received',
      dueDate: '2024-03-15',
      assignee: 'Michael Chen',
      category: 'clarification',
      comments: [
        { id: 'c3', author: 'Accounting Team', text: 'Need clarification on policy before we can approve the entries.', timestamp: '2024-03-05' },
        { id: 'c4', author: 'Michael Chen', text: 'Sent updated policy document. Multi-year contracts are recognized ratably over performance period.', timestamp: '2024-03-12' },
      ],
    },
    {
      id: 'req-3',
      title: 'Provide Supporting Docs for Q1 Accruals',
      description: 'Please provide supporting documentation for all accrued expenses as of March 31, 2024.',
      priority: 'medium',
      status: 'sent',
      dueDate: '2024-03-25',
      assignee: 'Jennifer Lee',
      category: 'data_request',
      comments: [
        { id: 'c5', author: 'Audit Team', text: 'Requesting documentation for audit compliance.', timestamp: '2024-03-08' },
      ],
    },
    {
      id: 'req-4',
      title: 'Tax Compliance Documentation',
      description: 'Please prepare all tax compliance documentation required for annual filing, including estimated tax payments.',
      priority: 'high',
      status: 'in_progress',
      dueDate: '2024-04-15',
      assignee: 'David Martinez',
      category: 'compliance',
      comments: [
        { id: 'c6', author: 'Tax Advisor', text: 'We need this to finalize the tax return.', timestamp: '2024-03-01' },
        { id: 'c7', author: 'David Martinez', text: 'Currently gathering all required documentation. Should be complete by April 10th.', timestamp: '2024-03-12' },
      ],
    },
    {
      id: 'req-5',
      title: 'Inventory Audit Follow-up',
      description: 'Address the inventory count variance of $12,400. Provide explanation and adjustment entries.',
      priority: 'high',
      status: 'draft',
      dueDate: '2024-03-22',
      assignee: 'Robert Wilson',
      category: 'analysis',
      comments: [],
    },
  ]

  return requests
}

// Helper function to filter data based on role
export function filterDataByRole<T extends any>(data: T[], role: UserRole, dataType: string): T[] {
  // Buyers see limited data - no sensitive financial details
  if (role === 'buyer') {
    // This would be implemented per data type
    return data.slice(0, Math.ceil(data.length / 2))
  }
  return data
}

// M&A Readiness Checklist
export interface MAReadinessItem {
  category: string
  items: Array<{
    id: string
    title: string
    status: 'complete' | 'in_progress' | 'not_started'
    dueDate?: string
  }>
}

export const getMAReadinessChecklist = (): MAReadinessItem[] => [
  {
    category: 'Financial Records',
    items: [
      { id: 'fr-1', title: 'Complete 3 years of audited financial statements', status: 'complete' },
      { id: 'fr-2', title: 'Prepare detailed revenue analysis', status: 'complete' },
      { id: 'fr-3', title: 'Compile EBITDA reconciliation', status: 'in_progress', dueDate: '2024-03-25' },
      { id: 'fr-4', title: 'Prepare working capital analysis', status: 'not_started', dueDate: '2024-04-05' },
    ],
  },
  {
    category: 'Legal Compliance',
    items: [
      { id: 'lc-1', title: 'Complete legal due diligence report', status: 'complete' },
      { id: 'lc-2', title: 'Review and organize contracts', status: 'in_progress', dueDate: '2024-03-20' },
      { id: 'lc-3', title: 'Verify licenses and permits', status: 'complete' },
      { id: 'lc-4', title: 'Prepare litigation summary', status: 'not_started', dueDate: '2024-04-10' },
    ],
  },
  {
    category: 'Tax Compliance',
    items: [
      { id: 'tc-1', title: 'Prepare tax compliance summary', status: 'complete' },
      { id: 'tc-2', title: 'Review open tax positions', status: 'in_progress', dueDate: '2024-03-28' },
      { id: 'tc-3', title: 'Compile state tax filings', status: 'complete' },
      { id: 'tc-4', title: 'Prepare transfer tax analysis', status: 'not_started', dueDate: '2024-04-15' },
    ],
  },
  {
    category: 'Operations',
    items: [
      { id: 'op-1', title: 'Prepare operational overview', status: 'complete' },
      { id: 'op-2', title: 'Document key processes', status: 'in_progress', dueDate: '2024-03-30' },
      { id: 'op-3', title: 'Customer concentration analysis', status: 'complete' },
      { id: 'op-4', title: 'Prepare management team overview', status: 'not_started', dueDate: '2024-04-05' },
    ],
  },
]

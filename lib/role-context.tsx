'use client'

import React, { createContext, useContext, useState } from 'react'

export type UserRole = 'internal' | 'client' | 'accountant' | 'buyer'

interface RoleContextType {
  role: UserRole
  setRole: (role: UserRole) => void
  selectedClientId: string
  setSelectedClientId: (id: string) => void
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>('internal')
  const [selectedClientId, setSelectedClientId] = useState('acme-corp')

  return (
    <RoleContext.Provider value={{ role, setRole, selectedClientId, setSelectedClientId }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  const context = useContext(RoleContext)
  if (!context) {
    throw new Error('useRole must be used within RoleProvider')
  }
  return context
}

'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { clients } from '@/lib/sample-data'

export type UserRole = 'internal' | 'client' | 'accountant' | 'buyer'

export interface RoleOption {
  value: UserRole
  label: string
}

export const ROLE_OPTIONS: RoleOption[] = [
  { value: 'internal', label: 'Internal Finance Team' },
  { value: 'accountant', label: 'Accountant' },
  { value: 'client', label: 'Client/Business Owner' },
  { value: 'buyer', label: 'Potential Buyer' },
]

export const ROLE_LABELS: Record<UserRole, string> = {
  internal: 'Internal Finance Team',
  accountant: 'Accountant',
  client: 'Client/Business Owner',
  buyer: 'Potential Buyer',
}

interface RoleContextType {
  role: UserRole
  setRole: (role: UserRole) => void
  selectedClientId: string
  setSelectedClientId: (id: string) => void
  roleOptions: RoleOption[]
  roleLabel: string
  isHydrated: boolean
}

const ROLE_STORAGE_KEY = 'financehub:selected-role'
const CLIENT_STORAGE_KEY = 'financehub:selected-client-id'
const DEFAULT_ROLE: UserRole = 'internal'
const DEFAULT_CLIENT_ID = clients[0]?.id ?? 'acme-corp'

const VALID_ROLES = new Set<UserRole>(['internal', 'client', 'accountant', 'buyer'])
const VALID_CLIENT_IDS = new Set(clients.map((client) => client.id))

const RoleContext = createContext<RoleContextType | undefined>(undefined)

function isValidRole(value: string): value is UserRole {
  return VALID_ROLES.has(value as UserRole)
}

function isValidClientId(value: string): boolean {
  return VALID_CLIENT_IDS.has(value)
}

function getSafeStoredValue(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function setSafeStoredValue(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Ignore storage write errors
  }
}

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>(DEFAULT_ROLE)
  const [selectedClientId, setSelectedClientIdState] = useState<string>(DEFAULT_CLIENT_ID)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const storedRole = getSafeStoredValue(ROLE_STORAGE_KEY)
    const storedClientId = getSafeStoredValue(CLIENT_STORAGE_KEY)

    if (storedRole && isValidRole(storedRole)) {
      setRoleState(storedRole)
    }

    if (storedClientId && isValidClientId(storedClientId)) {
      setSelectedClientIdState(storedClientId)
    }

    setIsHydrated(true)
  }, [])

  const setRole = useCallback((nextRole: UserRole) => {
    if (!isValidRole(nextRole)) {
      return
    }

    setRoleState(nextRole)
    setSafeStoredValue(ROLE_STORAGE_KEY, nextRole)
  }, [])

  const setSelectedClientId = useCallback((nextClientId: string) => {
    if (!isValidClientId(nextClientId)) {
      return
    }

    setSelectedClientIdState(nextClientId)
    setSafeStoredValue(CLIENT_STORAGE_KEY, nextClientId)
  }, [])

  const value = useMemo<RoleContextType>(
    () => ({
      role,
      setRole,
      selectedClientId,
      setSelectedClientId,
      roleOptions: ROLE_OPTIONS,
      roleLabel: ROLE_LABELS[role],
      isHydrated,
    }),
    [role, setRole, selectedClientId, setSelectedClientId, isHydrated]
  )

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
}

export function useRole() {
  const context = useContext(RoleContext)

  if (!context) {
    throw new Error('useRole must be used within RoleProvider')
  }

  return context
}
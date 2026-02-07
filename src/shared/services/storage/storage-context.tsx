import { createContext, useContext, ReactNode } from 'react'
import { IStorageAdapter } from '../../types'
import { LocalStorageAdapter } from './local-storage-adapter'

const StorageContext = createContext<IStorageAdapter | null>(null)

interface StorageProviderProps {
  children: ReactNode
  adapter?: IStorageAdapter
}

export function StorageProvider({ children, adapter }: StorageProviderProps) {
  const storageAdapter = adapter || new LocalStorageAdapter()

  return (
    <StorageContext.Provider value={storageAdapter}>
      {children}
    </StorageContext.Provider>
  )
}

export function useStorage(): IStorageAdapter {
  const context = useContext(StorageContext)
  if (!context) {
    throw new Error('useStorage must be used within a StorageProvider')
  }
  return context
}

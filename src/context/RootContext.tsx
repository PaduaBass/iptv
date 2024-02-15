'use client'
import { ReactNode } from 'react'
import { UserProvider } from './UserContext'
import { DataProvider } from './DataContext'

const RootProvider = ({ children }: { children: ReactNode }) => {
  return (
    <UserProvider>
      <DataProvider>{children}</DataProvider>
    </UserProvider>
  )
}

export default RootProvider

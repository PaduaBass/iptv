'use client'
import { ReactNode } from 'react'
import { UserProvider } from './UserContext'

const RootProvider = ({ children }: { children: ReactNode }) => {
  return <UserProvider>{children}</UserProvider>
}

export default RootProvider

'use client'
import { useRouter } from 'next/navigation'
import { ReactNode, createContext, useEffect, useState } from 'react'

export interface User {
  id: string
  name: string
  email: string
  phone: string
  isActive: boolean
  payDay: number
  lastPayment: string
  trialMode: boolean
  trialStart: string
}

interface UserContextProps {
  user: User
  token?: string
  handleLogin: (user: User) => void
  handleLogout: () => void
  getUserStorage: () => Promise<void>
  handleUpdateToken: (currentToken: string) => void
}
const UserContext = createContext<UserContextProps>({} as UserContextProps)

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({} as User)
  const [token, setToken] = useState<string | undefined>()
  const { replace } = useRouter()
  const handleLogin = (user: User) => {
    setUser(user)
    localStorage.setItem('@user', JSON.stringify(user))
  }

  const handleLogout = () => {
    setUser({} as User)
    localStorage.clear()
  }

  const handleUpdateToken = (currentToken: string) => {
    setToken(currentToken)
  }

  const getUserStorage = async () => {
    if (localStorage) {
      const userStorage = await localStorage.getItem('@user')
      const tokenStorage = await localStorage.getItem('@token')
      if (tokenStorage) {
        setToken(tokenStorage)
      }
      if (userStorage) {
        setUser(JSON.parse(userStorage))
        if (window && window.location.pathname === '/' && !tokenStorage) {
          replace('/dashboard')
        } else if (window && window.location.pathname === '/' && tokenStorage) {
          replace('/signup/confirmationemail')
        }
      }
    }
  }

  useEffect(() => {
    getUserStorage()
  }, [])

  return (
    <UserContext.Provider
      value={{
        handleLogin,
        user,
        handleLogout,
        getUserStorage,
        token,
        handleUpdateToken,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider, UserContext }

'use client'
import { UserContext } from '@/context/UserContext'
import { Ban, DollarSign, LogOut, MessageCircle, UserCog } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useRef, useState } from 'react'

interface DrawerProps {
  isOpen: boolean
  handleClose: () => void
}
const Drawer = ({ isOpen, handleClose }: DrawerProps) => {
  const { user, handleLogout } = useContext(UserContext)
  const { replace, push } = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        handleClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  if (isOpen) {
    return (
      <div className="bg-[#0009] absolute flex w-screen h-screen right-0">
        <div
          ref={dropdownRef}
          className="flex p-2 flex-col h-full bg-[#0F0F0F] max-sm:w-[80%] w-[50%] overflow-hidden"
        >
          <h2 className="text-white text-center mt-4 mb-2">{user.name}</h2>
          <button
            onClick={() => push('/updateuser')}
            className="mt-2 flex justify-between p-4 rounded-md text-white bg-[#005B41]"
          >
            Atualizar Perfil
            <UserCog />
          </button>
          <button className="mt-2 flex justify-between p-4 rounded-md text-white bg-[#005B41]">
            Pagamentos
            <DollarSign />
          </button>
          <button className="mt-2 flex justify-between p-4 rounded-md text-white bg-[#005B41]">
            Falar com suporte
            <MessageCircle />
          </button>
          <button className="mt-2 flex justify-between p-4 rounded-md text-white bg-[#005B41]">
            Cancelar plano
            <Ban />
          </button>
          <button
            onClick={() => {
              handleLogout()
              replace('/')
            }}
            className="mt-2 flex justify-between p-4 rounded-md text-white bg-[#005B41]"
          >
            Sair
            <LogOut />
          </button>
        </div>
      </div>
    )
  }
  return null
}

export default Drawer

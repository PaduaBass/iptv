'use client'
import Image from 'next/image'
import Logo from '../../../assets/tutu tv white.png'
import { useContext, useState } from 'react'
import { UserContext } from '@/context/UserContext'
import { confirmEmailUseCase } from '@/useCase/confirmEmailUseCase'
import { ToastContainer, toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const ConfirmEmail: React.FC = () => {
  const { token, user, handleUpdateToken } = useContext(UserContext)
  const [codeValue, setCodeValue] = useState('')
  const { replace } = useRouter()
  const handleSendCode = (email: string) =>
    confirmEmailUseCase(
      email,
      (currentToken) => {
        handleUpdateToken(currentToken)
        toast('Código enviado!', {
          type: 'success',
        })
      },
      () => {
        toast(
          'Houve um erro ao tentar enviar o código de confirmação! tente reenviar.',
          { type: 'warning' },
        )
      },
    )

  const handleVerifyCode = async () => {
    if (token === codeValue) {
      toast('Email Confirmado', {
        type: 'success',
      })
      if (localStorage) {
        await localStorage.removeItem('@token')
        replace('/dashboard')
      } else {
        replace('/login')
      }
    } else {
      toast(
        'Código inválido O código inserido é diferente do código enviado no email, por favor verifique seu email!',
        { type: 'error' },
      )
    }
  }
  return (
    <main className="bg-[#0F0F0F] flex w-screen gap-4 h-screen flex-col justify-center items-center">
      <Image width={90} height={90} src={Logo} alt="tutu tv" />
      <div className="flex w-[40%] max-sm:w-[80%] flex-col gap-4">
        <span className="text-white text-sm">
          Foi enviado para o email {user.email} um código de 4 dígitos. Por
          favor insira esse código para confirmar seu email. Caso não encontre o
          email Tutu Tv considere verificar no spam ou reenviar o código.
        </span>
        <input
          onChange={(e) => setCodeValue(e.target.value)}
          maxLength={4}
          max={4}
          type="tel"
          placeholder="Digite o código"
          className="p-2 rounded-md w-full"
        />
        <button
          onClick={handleVerifyCode}
          className="bg-[#092635] flex rounded-md text-white font-bold justify-center items-center p-2 w-full hover:bg-[#005B41]"
        >
          Validar código
        </button>
        <button
          onClick={() => handleSendCode(user.email)}
          className="flex rounded-md text-white font-bold justify-center items-center p-2 w-full hover:bg-[#005B41]"
        >
          Reenviar código
        </button>
      </div>
      <ToastContainer />
    </main>
  )
}

export default ConfirmEmail

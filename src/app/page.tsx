'use client'

import Image from 'next/image'
import Logo from '../assets/tutu tv white.png'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { authUseCase } from '@/useCase/authUseCase'
import { useContext, useEffect } from 'react'
import { UserContext } from '@/context/UserContext'
import { ToastContainer, toast } from 'react-toastify'

const loginFormScheme = z.object({
  email: z
    .string({ required_error: '*Campo obrigatório!' })
    .email('Formato de email inválido!'),
  password: z
    .string({ required_error: '*Campo obrigatório!' })
    .min(8, 'A senha deve conter pelo menos 8 caracteres'),
})

export type LoginScheme = z.infer<typeof loginFormScheme>

export default function Home() {
  const {
    formState: { errors },
    setValue,
    watch,
    handleSubmit,
    setError,
  } = useForm<LoginScheme>({
    resolver: zodResolver(loginFormScheme),
  })
  const { push } = useRouter()
  const { handleLogin } = useContext(UserContext)
  // useEffect(() => {
  //   getUserStorage()
  // }, [])
  const login = (data: LoginScheme) => {
    authUseCase(
      data,
      (user) => {
        handleLogin(user)
        push('/dashboard')
      },
      (e) => {
        console.log(e?.response?.data?.message)
        if (e?.response?.data?.message?.includes('Email')) {
          setError('email', {
            message: 'O email informado não está cadastrado!',
          })
        }
        toast(
          'Houve um erro ao tentar fazer o login verifique seus dados e tente novamente',
          {
            type: 'error',
          },
        )
      },
    )
  }

  return (
    <main className="bg-[#0F0F0F] flex-col  w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4 w-[50%] max-sm:w-[100%] bg-zinc-900 p-4 rounded-md">
        <Image width={90} height={90} src={Logo} alt="tutu tv" />
        <div className="w-full">
          <label className="text-white text-sm">Email</label>
          <input
            value={watch('email')}
            onChange={(e) => setValue('email', e.target.value)}
            className="p-2 rounded-md w-full"
            placeholder="Digite seu email"
            type="email"
          />
          {errors.email && (
            <span className="text-white text-xs">{errors.email.message}</span>
          )}
        </div>
        <div className="w-full text-sm">
          <label className="text-white">Senha</label>
          <input
            value={watch('password')}
            onChange={(e) => setValue('password', e.target.value)}
            className="p-2 rounded-md w-full"
            placeholder="Digite sua senha"
            type="password"
          />
          {errors.password && (
            <span className="text-white text-xs">
              {errors.password.message}
            </span>
          )}
        </div>
        <button
          onClick={handleSubmit(login)}
          className="bg-[#092635] flex rounded-md text-white font-bold justify-center items-center p-2 w-full hover:bg-[#005B41]"
        >
          Entrar
        </button>
        <button
          onClick={() => push('/signup')}
          className="font-bold text-white hover:text-[#005B41]"
        >
          Cadastre-se
        </button>
      </div>
      <ToastContainer />
    </main>
  )
}

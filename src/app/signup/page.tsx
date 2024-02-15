'use client'
import Image from 'next/image'
import Logo from '../../assets/tutu tv white.png'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { signUpUseCase } from '@/useCase/userUseCase'
import { ToastContainer, toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, useContext } from 'react'
import { UserContext } from '@/context/UserContext'
import { confirmEmailUseCase } from '@/useCase/confirmEmailUseCase'
import { phoneMask } from '@/util/mask'

const addUserFormScheme = z.object({
  name: z.string({ required_error: '*Campo obrigatório' }),
  email: z
    .string({ required_error: '*Campo obrigatório' })
    .email('Formato de email inválido'),
  phone: z.string({ required_error: '*Campo obrigatório' }),
  payDay: z.number(),
  password: z
    .string({ required_error: '*Campo obrigatório' })
    .min(8, 'A senha deve conter no mínimo 8 caracteres'),
})

export type AddUserSchema = z.infer<typeof addUserFormScheme>

const SignUp = () => {
  const { push, back, replace } = useRouter()
  const {
    formState: { errors },
    setValue,
    setError,
    handleSubmit,
    watch,
  } = useForm<AddUserSchema>({
    defaultValues: {
      payDay: 10,
      email: undefined,
      name: undefined,
      password: undefined,
      phone: undefined,
    },
    resolver: zodResolver(addUserFormScheme),
  })

  const { handleLogin } = useContext(UserContext)

  const handleSignUp = async (data: AddUserSchema) => {
    signUpUseCase(
      data,
      (user) => {
        toast('Cadastro realizado', {
          type: 'success',
        })
        handleLogin(user)
        confirmEmailUseCase(
          user.email,
          () => {
            replace('/signup/confirmationemail')
          },
          () => {
            replace('/signup/confirmationemail')
          },
        )
      },
      (e) => {
        if (e?.response?.data?.message?.includes('Email')) {
          setError('email', {
            message: 'Email já cadastrado!',
          })
        }
        toast(
          'Houve uma falha no cadastro, por favor verifique se os dados estão preenchidos corretamente!',
          {
            type: 'error',
          },
        )
      },
    )
  }

  const handlePhone = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target
    input.value = phoneMask(input.value)
  }

  return (
    <main className="bg-[#0F0F0F] flex w-screen h-screen justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4 w-[50%] max-sm:w-[100%] bg-zinc-900 p-4 rounded-md">
        <Image width={90} height={90} src={Logo} alt="tutu tv" />
        <h3 className="text-white font-bold">Cadastro de Usuário</h3>
        <div className="w-full">
          <label className="text-white text-sm">Nome</label>
          <input
            className="p-2 rounded-md w-full"
            placeholder="Digite seu nome"
            onChange={(e) => setValue('name', e.target.value)}
          />
          {errors.name && (
            <span className="text-white text-xs">{errors.name.message}</span>
          )}
        </div>
        <div className="w-full">
          <label className="text-white text-sm">Telefone</label>
          <input
            className="p-2 rounded-md w-full"
            type="tel"
            placeholder="Digite seu numero de telefone"
            onChange={(e) => setValue('phone', phoneMask(e.target.value))}
            value={watch('phone')}
            maxLength={15}
          />
          {errors.phone && (
            <span className="text-white text-xs">{errors.phone.message}</span>
          )}
        </div>
        <div className="w-full">
          <label className="text-white text-sm">Email</label>
          <input
            className="p-2 rounded-md w-full"
            type="email"
            placeholder="Digite seu email"
            onChange={(e) => setValue('email', e.target.value)}
          />
          {errors.email && (
            <span className="text-white text-xs">{errors.email.message}</span>
          )}
        </div>
        <div className="w-full text-sm">
          <label className="text-white">Senha</label>
          <input
            className="p-2 rounded-md w-full"
            placeholder="Digite sua senha"
            type="password"
            onChange={(e) => setValue('password', e.target.value)}
          />
          {errors.password && (
            <span className="text-white text-xs">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="flex w-full">
          <button
            onClick={back}
            className="font-bold text-white w-[49%] hover:text-[#005B41]"
          >
            Voltar
          </button>
          <button
            onClick={handleSubmit(handleSignUp)}
            className="bg-[#092635] flex rounded-md text-white font-bold justify-center items-center p-2 w-[49%] hover:bg-[#005B41]"
          >
            Cadastrar
          </button>
        </div>
      </div>
      <ToastContainer />
    </main>
  )
}

export default SignUp

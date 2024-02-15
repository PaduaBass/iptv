'use client'
import { UserContext } from '@/context/UserContext'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Logo from '../../assets/tutu tv white.png'
import { useRouter } from 'next/navigation'
import { phoneMask } from '@/util/mask'
const updateUserFormScheme = z.object({
  id: z.string(),
  name: z
    .string({
      required_error: '*Campo obrigatório!',
    })
    .min(5, 'Nome não pode ser vazio'),
  email: z
    .string({
      required_error: '*Campo obrigatório!',
    })
    .email('Formato de email inválido!'),
  payDay: z.string({
    required_error: '*Campo obrigatório!',
  }),
  phone: z.string({
    required_error: '*Campo obrigatório!',
  }),
})

export type UpdateUserScheme = z.infer<typeof updateUserFormScheme>
const UpdateUser = () => {
  const { user } = useContext(UserContext)
  const { back, push } = useRouter()
  const {
    formState: { errors },
    setValue,
    watch,
    handleSubmit,
  } = useForm<UpdateUserScheme>({
    resolver: zodResolver(updateUserFormScheme),
    defaultValues: {
      id: user.id,
      email: user.email,
      name: user.name,
      payDay: String(user.payDay),
      phone: user.phone,
    },
  })

  const handleUpdateProfile = (data: UpdateUserScheme) => {
    console.log(data)
  }
  return (
    <main className="bg-[#0F0F0F] flex w-screen h-screen justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4 w-[50%] max-sm:w-[80%] bg-zinc-900 p-4 rounded-md">
        <Image width={90} height={90} src={Logo} alt="tutu tv" />
        <h3 className="text-white font-bold">Atualizar Dados Pessoais</h3>
        <div className="w-full">
          <label className="text-white text-sm">Nome</label>
          <input
            value={watch('name')}
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
            value={watch('phone')}
            className="p-2 rounded-md w-full"
            type="tel"
            placeholder="Digite seu numero de telefone"
            onChange={(e) => setValue('phone', phoneMask(e.target.value))}
            maxLength={15}
          />
          {errors.phone && (
            <span className="text-white text-xs">{errors.phone.message}</span>
          )}
        </div>
        <div className="w-full">
          <label className="text-white text-sm">Email</label>
          <input
            value={watch('email')}
            className="p-2 rounded-md w-full"
            placeholder="Digite seu email"
            onChange={(e) => setValue('email', e.target.value)}
          />
          {errors.email && (
            <span className="text-white text-xs">{errors.email.message}</span>
          )}
        </div>
        <div className="w-full text-sm">
          <label className="text-white">Data de vencimento</label>
          <input
            className="p-2 rounded-md w-full"
            placeholder="Digite a data de vencimento"
            type="number"
            value={watch('payDay')}
            min={1}
            max={30}
            minLength={1}
            maxLength={2}
            onChange={(e) => setValue('payDay', e.target.value)}
          />
          {errors.payDay && (
            <span className="text-white text-xs">{errors.payDay.message}</span>
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
            onClick={handleSubmit(handleUpdateProfile)}
            className="bg-[#092635] flex rounded-md text-white font-bold justify-center items-center p-2 w-[49%] hover:bg-[#005B41]"
          >
            Atualizar
          </button>
        </div>
      </div>
    </main>
  )
}

export default UpdateUser

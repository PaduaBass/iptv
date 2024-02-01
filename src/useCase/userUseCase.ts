import { AddUserSchema } from '@/app/signup/page'
import { UpdateUserScheme } from '@/app/updateuser/page'
import { User } from '@/context/UserContext'
import api from '@/services/api'

export const signUpUseCase = async (
  data: AddUserSchema,
  successCallback?: (user: User) => void,
  failureCallback?: (e: any) => void,
) => {
  try {
    const response = await api.post('/user', data)
    console.log(response.data)
    successCallback && successCallback(response.data)
  } catch (e) {
    console.log(e)
    failureCallback && failureCallback(e)
  }
}

export const updateUserUseCase = async (
  data: UpdateUserScheme,
  successCallback?: (user: User) => void,
  failureCallback?: () => void,
) => {
  try {
    console.log(data)
    const response = await api.put(`/user/${data.id}`, data)
    console.log('ssk', response.data)
    successCallback && successCallback(response.data)
  } catch (e) {
    console.log(e)
    failureCallback && failureCallback()
  }
}

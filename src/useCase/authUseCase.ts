import { LoginScheme } from '@/app/page'
import { User } from '@/context/UserContext'
import api from '@/services/api'

export const authUseCase = async (
  data: LoginScheme,
  successCallback?: (user: User) => void,
  failureCallback?: (error: any) => void,
) => {
  try {
    const response = await api.post('/auth', data)
    successCallback && successCallback(response.data)
  } catch (e) {
    failureCallback && failureCallback(e)
  }
}

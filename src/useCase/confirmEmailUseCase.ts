import api from '@/services/api'

function gerarNumeroAleatorio() {
  return Math.floor(Math.random() * 9000) + 1000
}

export const confirmEmailUseCase = async (
  email: string,
  successCallback?: (currentToken: string) => void,
  failureCallback?: () => void,
) => {
  try {
    const token = gerarNumeroAleatorio()
    if (localStorage) {
      await localStorage.setItem('@token', JSON.stringify(token))
    }
    await api.post('/email/sendCode', {
      token,
      email,
    })
    successCallback && successCallback(String(token))
  } catch (e) {
    if (localStorage) {
      await localStorage.removeItem('@token')
    }
    failureCallback && failureCallback()
  }
}

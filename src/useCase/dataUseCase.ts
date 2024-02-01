import api from '@/services/api'
import { Playlist, PlaylistItem } from 'iptv-playlist-parser'

export const getDataUseCase = async (
  successCallback: (data: string) => void,
  failureCallback?: (e: unknown) => void,
) => {
  try {
    console.log('iniciando')
    const response = await api.get('/data')
    console.log('opa')

    successCallback(response.data.playlist)
  } catch (e) {
    console.log(e)
    failureCallback && failureCallback(e)
  }
}

import api from '@/services/api'
import { Playlist, PlaylistItem } from 'iptv-playlist-parser'

export const getDataUseCase = async (
  successCallback: (data: string) => void,
  failureCallback?: (e: unknown) => void,
) => {
  try {
    const response = await api.get('/data')

    successCallback(response.data.playlist)
  } catch (e) {
    failureCallback && failureCallback(e)
  }
}

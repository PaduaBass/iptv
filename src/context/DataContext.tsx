import { PlaylistItem, parse } from 'iptv-playlist-parser'
import { ReactNode, createContext, useEffect, useRef, useState } from 'react'
import { playlist } from '../mock/playlist'
import { getDataUseCase } from '@/useCase/dataUseCase'

interface DataContextProps {
  list: PlaylistItem[]
  groups: PlaylistItem[]
  selectList: (listSelect: string, callback?: () => void) => void
  isError: boolean
  handleGetData: () => Promise<void>
}

enum ListSelect {
  CHANNELS = 'canais | abertos',
  SERIES = 'serie',
  MOVIES = 'filmes',
  RADIO = 'rádio',
}

const DataContext = createContext<DataContextProps>({} as DataContextProps)
const DataProvider = ({ children }: { children: ReactNode }) => {
  const [list, setList] = useState<PlaylistItem[]>([])
  const [isError, setIsError] = useState(false)
  const itemsRef = useRef<PlaylistItem[]>([])
  const groups = itemsRef.current?.reduce((pv: PlaylistItem[] = [], cv) => {
    if (pv?.find((item) => item.group.title === cv.group.title)) {
      return pv
    } else {
      pv.push(cv)
    }
    return pv
  }, [])

  const handleGetData = async () => {
    if (isError) {
      setIsError(false)
    }
    return getDataUseCase(
      async (data) => {
        const { items } = parse(data)
        itemsRef.current = items
        setList(
          items.filter(
            (item) =>
              item.group.title.toLocaleLowerCase() === 'canais | abertos',
          ),
        )

        console.log('opa')
      },
      () => {
        setIsError(true)
        console.log('caiu mesmo dentro')
      },
    )
  }

  const filterAsync = async (listSelect: string) =>
    await Promise.all(
      itemsRef.current.filter(
        (item) => item.group.title.toLocaleLowerCase() === listSelect,
      ),
    )

  const selectList = async (listSelect: string, callback?: () => void) => {
    console.log(listSelect)
    const response = await filterAsync(listSelect)
    console.log(response)
    setList(response)
    callback && callback()
    console.log('chamou callback')
  }

  useEffect(() => {
    handleGetData()
  }, [])

  return (
    <DataContext.Provider
      value={{ list, groups, selectList, isError, handleGetData }}
    >
      {children}
    </DataContext.Provider>
  )
}

export { DataContext, DataProvider, ListSelect }

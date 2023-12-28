'use client'
import VideoPlayer from '@/components/Video/Video'
import { useCallback, useState } from 'react'
import { playlist } from '@/mock/playlist'
import { PlaylistItem, parse } from 'iptv-playlist-parser'
import { debounce } from 'lodash'
import ChannelList from '@/components/ChannelList/ChannelList'
import GroupList from '@/components/GroupList/GroupList'
import { ArrowLeft } from 'lucide-react'

enum ViewType {
  ALL = 'all',
  GROUP = 'group',
  SELECTED_GROUP = 'selectedGroup',
}
export default function Home() {
  const test = parse(playlist)
  const [src, setSrc] = useState<string | null>(null)
  const [selectedGroup, setSelectedGroup] = useState('')
  const [viewType, setViewType] = useState<string>(ViewType.ALL)
  const [searchChannel, setSearchChannel] = useState<string>('')

  const [sendFilter, setSendFilter] = useState(false)

  const debouncedSave = useCallback(
    debounce(() => !sendFilter && setSendFilter(true), 1000),
    [],
  )

  const group = test.items.reduce((acc: PlaylistItem[], cv, i) => {
    if (!acc?.find((it) => it.group.title === cv.group.title)) {
      acc.push(cv)
    }
    return acc
  }, [])

  const filterChannels =
    viewType === ViewType.ALL
      ? test.items.filter(
          (item) =>
            item.name.toLowerCase().startsWith(searchChannel) ||
            item.name.toLowerCase().includes(searchChannel),
        )
      : group.filter(
          (group) =>
            group.group.title.toLocaleLowerCase().startsWith(searchChannel) ||
            group.group.title.toLocaleLowerCase().includes(searchChannel),
        )

  const channelsGroup =
    selectedGroup.length > 0
      ? test.items.filter((item) => item.group.title === selectedGroup)
      : []

  const filterChannelsSelectedGroup = channelsGroup.filter(
    (item) =>
      item.name.toLocaleLowerCase().startsWith(searchChannel) ||
      item.name.toLocaleLowerCase().includes(searchChannel),
  )
  return (
    <main className="flex h-screen w-screen bg-slate-700 flex-col overflow-y-scroll">
      <header className="absolute bg-slate-800 flex w-screen items-center p-2 justify-between">
        <div className="flex w-[20%] max-sm:w-[40%]">
          {selectedGroup.length > 0 && (
            <button
              onClick={() => {
                setSelectedGroup('')
                setViewType(ViewType.GROUP)
              }}
              className="text-zinc-50 h-9  flex items-center justify-center top-20 left-4 p-4"
            >
              <ArrowLeft width={20} />
            </button>
          )}
          <select
            onChange={(e) => setViewType(e.target.value)}
            className=" p-2 rounded-md w-full "
          >
            <option value={ViewType.ALL}>Todos os Canais</option>
            <option value={ViewType.GROUP}>Grupos</option>
          </select>
        </div>
        <h2 className="text-zinc-50 font-bold">IPTV</h2>
        <input
          onChange={(e) => setSearchChannel(e.target.value)}
          placeholder="Pesquise aqui"
          className=" p-2 rounded-md w-[20%] max-sm:w-[40%]"
        />
      </header>
      {viewType === ViewType.GROUP && (
        <GroupList
          data={searchChannel.length > 0 ? filterChannels : group}
          onSelectGroup={(group) => {
            console.log(group)
            setSelectedGroup(group)
            setViewType(ViewType.SELECTED_GROUP)
          }}
          isSearch={searchChannel.length > 0}
        />
      )}
      {viewType === ViewType.ALL && (
        <ChannelList
          data={searchChannel.length > 0 ? filterChannels : test.items}
          onSelectChannel={(url) => setSrc(url)}
          isSearch={searchChannel.length > 0}
        />
      )}

      {viewType === ViewType.SELECTED_GROUP && (
        <>
          <ChannelList
            data={
              searchChannel.length > 0
                ? filterChannelsSelectedGroup
                : channelsGroup
            }
            onSelectChannel={(url) => setSrc(url)}
            isSearch={searchChannel.length > 0}
          />
        </>
      )}

      <VideoPlayer closeCallback={() => setSrc(null)} src={src} />
    </main>
  )
}

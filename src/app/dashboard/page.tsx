'use client'
import VideoPlayer from '@/components/Video/Video'
import { useCallback, useContext, useEffect, useState } from 'react'
import { PlaylistItem, parse } from 'iptv-playlist-parser'
import { debounce } from 'lodash'
import ChannelList from '@/components/ChannelList/ChannelList'
import GroupList from '@/components/GroupList/GroupList'
import { ArrowLeft, Menu, Sandwich } from 'lucide-react'
import Image from 'next/image'
import Logo from '../../assets/tutu tv white.png'
import Drawer from '@/components/Drawer/Drawer'
import { UserContext } from '@/context/UserContext'
import { useRouter } from 'next/navigation'
import { DataContext } from '@/context/DataContext'
enum ViewType {
  ALL = 'all',
  GROUP = 'group',
  SELECTED_GROUP = 'selectedGroup',
}
export default function Dashboard() {
  const { list, groups, selectList } = useContext(DataContext)
  const [src, setSrc] = useState<string | null>(null)
  const [selectedGroup, setSelectedGroup] = useState('')
  const [viewType, setViewType] = useState<string>(ViewType.ALL)
  const [searchChannel, setSearchChannel] = useState<string>('')
  const [sendFilter, setSendFilter] = useState(false)
  const [isPhone, setIsPhone] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)
  const { user } = useContext(UserContext)
  const { replace } = useRouter()

  const debouncedSave = useCallback(
    debounce(() => !sendFilter && setSendFilter(true), 1000),
    [],
  )

  useEffect(() => {
    if (window) {
      if (window.innerHeight > window.innerWidth) {
        setIsPhone(true)
      }
    }
  }, [])

  useEffect(() => {
    if (!user?.name) {
      replace('/')
    }
  }, [user])

  const channelsGroup =
    selectedGroup.length > 0
      ? list.filter((item) => item.group.title === selectedGroup)
      : []

  const filterChannelsSelectedGroup = channelsGroup.filter(
    (item) =>
      item.name.toLocaleLowerCase().startsWith(searchChannel) ||
      item.name.toLocaleLowerCase().includes(searchChannel),
  )

  return (
    <main className="flex h-screen overscroll-x-none w-screen bg-[#0F0F0F] flex-col overflow-y-scroll ">
      <header className="absolute bg-[#092635] h-12  flex w-full items-center  justify-between">
        {isPhone ? (
          <div className="flex flex-row w-full  items-center justify-between">
            <Image width={70} height={70} src={Logo} alt="Tutu Tv" />
            <button onClick={() => setOpenDrawer(true)}>
              <Menu color="#fff" />
            </button>
          </div>
        ) : (
          <>
            <div className="flex w-[20%] max-sm:w-[40%]"></div>
            <Image width={70} height={70} src={Logo} alt="Tutu Tv" />
            <div className="flex w-[20%] justify-end  max-sm:w-[40%]">
              <button className="mr-4" onClick={() => setOpenDrawer(true)}>
                <Menu color="#fff" />
              </button>
            </div>
          </>
        )}
      </header>

      <div className="flex mt-[48px] pt-1 pb-1 border-b-[1px]">
        <div className="max-sm:w-[40%] w-[20%] flex justify-center">
          <span className="text-zinc-50 font-bold text-xs">Grupos</span>
        </div>
        <div className="max-sm:w-[60%] w-[80%] flex justify-center">
          <span className="text-zinc-50 font-bold text-xs">
            {selectedGroup}
          </span>
        </div>
      </div>
      <div className="flex gap-2 overflow-hidden h-screen">
        <div className=" flex flex-col max-sm:w-[40%] w-[20%] gap-1 overflow-y-scroll">
          {groups.map((group, index) => (
            <button
              onClick={() => selectList(group.group.title.toLocaleLowerCase())}
              key={index}
              className="bg-[#092635] p-2 min-h-10 overflow-hidden flex justify-start items-center rounded-md hover:bg-[#005B41]"
            >
              <img src={group.tvg.logo} width={25} />
              <span className="text-zinc-50 max-sm:text-xs flex-wrap ml-2  text-start h-[25px]">
                {group.group.title}
              </span>
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <div className=" flex w-full h-full justify-center items-center">
            <span className="text-zinc-50">Selecione um grupo</span>
          </div>
        ) : (
          <div className=" grid grid-cols-4 h-min max-h-[100%] pb-12 max-sm:w-[60%] max-sm:grid-cols-1 w-[80%] gap-1 overflow-y-scroll">
            {list.map((item, index) => (
              <button
                onClick={() => setSrc(item.url)}
                key={index}
                className="bg-[#092635] h-36 flex flex-col justify-center items-center rounded-md hover:bg-[#005B41]"
              >
                <img src={item.tvg.logo} width={50} height={50} />
                <span className="text-zinc-50 overflow-hidden text-center h-[25px]">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* {viewType === ViewType.GROUP && (
        <GroupList
          data={searchChannel.length > 0 ? filterChannels : group}
          onSelectGroup={(group) => {
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
      )} */}

      <VideoPlayer closeCallback={() => setSrc(null)} src={src} />
      <Drawer isOpen={openDrawer} handleClose={() => setOpenDrawer(false)} />
    </main>
  )
}

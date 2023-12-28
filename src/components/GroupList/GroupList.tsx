import { PlaylistItem } from 'iptv-playlist-parser'
import Image from 'next/image'

interface GroupListProps {
  data: PlaylistItem[]
  onSelectGroup: (group: string) => void
  isSearch: boolean
}
const GroupList = ({ data, onSelectGroup, isSearch }: GroupListProps) => {
  return (
    <div className="grid grid-cols-4 gap-2 mt-20 max-sm:grid-cols-2">
      {data.map((item, i) => (
        <button
          key={i}
          className="bg-slate-100 p-2 rounded-md h-[100px] hover:border-2 border-slate-800 hover:bg-slate-500 border-2 hover:border-red-600 flex items-center"
          onClick={() => onSelectGroup(item.group.title)}
        >
          <Image
            alt={item.tvg.name}
            src={item.tvg.logo}
            width={50}
            height={50}
          />
          <h2>{item.group.title}</h2>
        </button>
      ))}
      {isSearch && data.length === 0 && (
        <div className="w-screen h-screen flex text-zinc-50 justify-center">
          Nenhum canal correspondente a pesquisa
        </div>
      )}
    </div>
  )
}

export default GroupList

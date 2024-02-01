import { PlaylistItem } from 'iptv-playlist-parser'
import Image from 'next/image'

interface GroupListProps {
  data: PlaylistItem[]
  onSelectGroup: (group: string) => void
  isSearch: boolean
}
const GroupList = ({ data, onSelectGroup, isSearch }: GroupListProps) => {
  return (
    <div className="grid grid-cols-4 gap-2 mt-16 max-sm:grid-cols-2">
      {data.map((item, i) => (
        <button
          key={i}
          className="bg-[#092635] p-2 rounded-md h-[100px] hover:border-2 border-slate-800 hover:bg-[#005B41] border-2  flex items-center gap-2"
          onClick={() => onSelectGroup(item.group.title)}
        >
          <Image
            alt={item.tvg.name}
            src={item.tvg.logo}
            width={50}
            height={50}
          />
          <h2 className="text-white">{item.group.title}</h2>
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

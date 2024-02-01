import { PlaylistItem } from 'iptv-playlist-parser'

interface ChannelListProps {
  data: PlaylistItem[]
  onSelectChannel: (url: string) => void
  isSearch: boolean
}

const ChannelList = ({ data, onSelectChannel, isSearch }: ChannelListProps) => {
  return (
    <div className="grid grid-cols-4 gap-2 mt-20 max-sm:grid-cols-2">
      {data.map((item, i) => (
        <button
          key={i}
          className="bg-[#092635] p-2 rounded-md h-[100px] hover:border-2 border-slate-800 hover:bg-[#005B41] border-2  flex items-center gap-2"
          onClick={() => onSelectChannel(item.url)}
        >
          <img alt={item.tvg.name} src={item.tvg.logo} width={50} height={50} />
          <h2 className="text-white">{item.name}</h2>
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

export default ChannelList

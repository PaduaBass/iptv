import { useEffect, useRef } from 'react'
import Hls from 'hls.js'
// import 'plyr/dist/plyr.css'
import { DoorClosed, X } from 'lucide-react'
import { PlaylistItem } from 'iptv-playlist-parser'
interface VideoPlayerProps {
  item: PlaylistItem
  closeCallback: () => void
}
export default function VideoPlayer({ item, closeCallback }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (videoRef.current) {

      const video = videoRef.current;
      video.controls = false
      const url = item.url;
      const isMp4 = item.url.includes('mp4')
      
      
      if (!isMp4 && Hls.isSupported()) {
        console.log('aqui')
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Safari toca direto
        console.log('em baixo')
        video.src = url;
      } else {
        video.src = url
        video.controls = true;
      }

    }
    }, 1000)
  }, [item]);

  if (item.url) {
    return (
      <>
        <img src={item.tvg.logo} width={50} height={50} />
        <div className="absolute bg-black text-zinc-100 w-full h-full  flex justify-center items-center">
          Carregando...
        </div>
        <video
          className="min-h-full w-full fixed"
          autoPlay
          controls={false}
          ref={videoRef}
          src={item.url}
        />
        <button
          onClick={closeCallback}
          className="absolute bg-zinc-800 text-zinc-50 p-4 flex justify-center items-center top-2 right-2 bg-opacity-40 rounded-full"
        >
          <X />
        </button>
      </>
    )
  }
  return null
}

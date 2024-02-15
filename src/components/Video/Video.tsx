import { useEffect, useRef } from 'react'
import Hls from 'hls.js'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'
import { DoorClosed, X } from 'lucide-react'
interface VideoPlayerProps {
  src: string | null
  closeCallback: () => void
}
export default function VideoPlayer({ src, closeCallback }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (src) {
      const video = videoRef.current
      if (!video) return

      video.controls = false
      const defaultOptions = {}
      const isMp4 = src.includes('mp4')
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // This will run in safari, where HLS is supported natively
        video.src = src
      } else if (Hls.isSupported()) {
        // This will run in all other modern browsers

        const hls = new Hls()
        hls.loadSource(src)

        //   const player = new Video(video, defaultOptions)
        hls.attachMedia(video)
        if (isMp4) {
          video.src = src
          video.controls = true
        }
      } else {
        console.log('aisdi')
      }
    }
  }, [src, videoRef])

  if (src) {
    return (
      <>
        <div className="absolute bg-black text-zinc-100 w-full h-full  flex justify-center items-center">
          Carregando...
        </div>
        <video
          className="min-h-full w-full fixed"
          autoPlay
          controls={true}
          ref={videoRef}
          src={src}
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

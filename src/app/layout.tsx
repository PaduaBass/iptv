import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'video.js/dist/video-js.css'
import RootProvider from '@/context/RootContext'
import 'react-toastify/dist/ReactToastify.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tutu Tv',
  description: 'Assista aqui o melhor da tv aberta brasileira',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <RootProvider>
        <body className={inter.className}>{children}</body>
      </RootProvider>
    </html>
  )
}

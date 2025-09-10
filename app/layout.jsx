export const metadata = {
  title: 'Mumtaz Travel',
  description: 'Paket Umroh, Umroh Korporasi, Wisata Halal, dan Program Tabungan.'
}

import './globals.css'
import Navbar from '@/components/Navbar'
import FloatingActions from '@/components/FloatingActions'

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body style={{scrollBehavior:'smooth'}}>
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <FloatingActions />
      </body>
    </html>
  )
}

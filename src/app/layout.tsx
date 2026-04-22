import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ขอคืนดีกับแฟนสาว',
  description: 'หน้าขอโทษแบบน่ารักๆ 💕',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body className="bg-gradient-to-br from-pink-100 to-rose-100 min-h-screen">
        {children}
      </body>
    </html>
  )
}

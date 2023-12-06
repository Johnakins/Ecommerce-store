import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import NavBar from './components/navbar/NavBar'
import Footer from './components/footer/Footer'
import { Toaster } from 'react-hot-toast'

const poppins = Poppins({ subsets: ['latin'], weight:['400','700'] })

export const metadata: Metadata = {
  title: 'E-shop',
  description: 'Ecommerce app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700`}>
        <div className='flex flex-col min-h-screen'>
          <Toaster toastOptions={{style: {
            background: 'rgb(51 65 85)',
            color: '#fff'
          }}}/>
          <NavBar/>
          <main className='flex-grow'>{children}</main>
          <Footer/>
        </div>
      </body>
    </html>
  )
}

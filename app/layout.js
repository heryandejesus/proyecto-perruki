import './globals.css'
import Navbar from '@/components/shop/Navbar'

export const metadata = {
  title: 'CollarDog — Collares para perros',
  description: 'Los mejores collares para tu perro',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-900 text-gray-400 text-center py-8 text-sm mt-20">
          © 2025 CollarDog — Hecho con amor para los perros 🐾
        </footer>
      </body>
    </html>
  )
}
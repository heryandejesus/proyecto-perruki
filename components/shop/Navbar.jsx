'use client'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const count = useCartStore(s => s.getCount())
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900">
          🐾 CollarDog
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">
            Productos
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 hidden sm:block">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                Salir
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Iniciar sesión
            </Link>
          )}

          <Link
            href="/carrito"
            className="relative bg-gray-900 text-white px-4 py-2 rounded-full text-sm hover:bg-gray-700 transition-colors"
          >
            Carrito
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}
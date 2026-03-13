'use client'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const count = useCartStore(s => s.getCount())
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
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
    setMenuOpen(false)
    router.push('/')
    router.refresh()
  }

  const pillStyle = {
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '13px',
    fontWeight: 700,
    color: '#0F2D1F',
    textDecoration: 'none',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    border: '2px solid #0F2D1F',
    borderRadius: '100px',
    padding: '8px 20px',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease, color 0.15s ease',
    display: 'inline-block',
  }

  return (
    <>
      <nav style={{
        backgroundColor: '#6EE9A0',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '2px solid #0F2D1F',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>

          {/* Links izquierda — solo desktop */}
          <div style={{ display: 'flex', gap: '12px' }} className="hidden-mobile">
            <Link href="/" style={pillStyle}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0F2D1F'; e.currentTarget.style.color = '#6EE9A0' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#0F2D1F' }}
            >
              Productos
            </Link>
            {user && (
              <button onClick={handleLogout} style={pillStyle}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0F2D1F'; e.currentTarget.style.color = '#6EE9A0' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#0F2D1F' }}
              >
                Salir
              </button>
            )}
          </div>

          {/* Hamburguesa — solo mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="show-mobile"
            style={{
              background: 'none',
              border: '2px solid #0F2D1F',
              borderRadius: '8px',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              display: 'none',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              padding: '6px',
            }}
          >
            <span style={{ width: '18px', height: '2px', backgroundColor: '#0F2D1F', display: 'block', borderRadius: '2px' }} />
            <span style={{ width: '18px', height: '2px', backgroundColor: '#0F2D1F', display: 'block', borderRadius: '2px' }} />
            <span style={{ width: '18px', height: '2px', backgroundColor: '#0F2D1F', display: 'block', borderRadius: '2px' }} />
          </button>

          {/* Logo centro */}
          <Link href="/" style={{
            fontFamily: 'Fredoka One, cursive',
            fontSize: '26px',
            fontWeight: 400,
            color: '#0F2D1F',
            textDecoration: 'none',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}>
            CollarDog
          </Link>

          {/* Links derecha — solo desktop */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }} className="hidden-mobile">
            {!user && (
              <Link href="/auth" style={pillStyle}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0F2D1F'; e.currentTarget.style.color = '#6EE9A0' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#0F2D1F' }}
              >
                Iniciar sesión
              </Link>
            )}
            <Link href="/carrito" style={{
              ...pillStyle,
              backgroundColor: '#0F2D1F',
              color: '#6EE9A0',
              position: 'relative',
            }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1A4A35' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#0F2D1F' }}
            >
              Carrito
              {mounted && count > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  backgroundColor: '#EEFE76',
                  color: '#0F2D1F',
                  fontSize: '10px',
                  fontWeight: 700,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #0F2D1F',
                }}>
                  {count}
                </span>
              )}
            </Link>
          </div>

          {/* Carrito mobile */}
          <Link href="/carrito" className="show-mobile" style={{
            ...pillStyle,
            backgroundColor: '#0F2D1F',
            color: '#6EE9A0',
            position: 'relative',
            display: 'none',
          }}>
            Carrito
            {mounted && count > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                backgroundColor: '#EEFE76',
                color: '#0F2D1F',
                fontSize: '10px',
                fontWeight: 700,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #0F2D1F',
              }}>
                {count}
              </span>
            )}
          </Link>

        </div>
      </nav>

      {/* Menu mobile desplegable */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          right: 0,
          backgroundColor: '#6EE9A0',
          borderBottom: '2px solid #0F2D1F',
          padding: '20px 24px',
          zIndex: 49,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          <Link href="/" onClick={() => setMenuOpen(false)} style={{
            ...pillStyle,
            textAlign: 'center',
          }}>
            Productos
          </Link>
          {!user ? (
            <Link href="/auth" onClick={() => setMenuOpen(false)} style={{
              ...pillStyle,
              textAlign: 'center',
            }}>
              Iniciar sesión
            </Link>
          ) : (
            <button onClick={handleLogout} style={{
              ...pillStyle,
              textAlign: 'center',
              width: '100%',
            }}>
              Salir
            </button>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  )
}
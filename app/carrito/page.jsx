'use client'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <p style={{ fontSize: '64px', marginBottom: '16px' }}>🛒</p>
        <h2 style={{ fontFamily: 'Fredoka One, cursive', fontSize: '32px', color: '#0F2D1F', marginBottom: '8px' }}>
          Tu carrito está vacío
        </h2>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: '#5A6A40', marginBottom: '32px' }}>
          Agregá algún collar para tu perro
        </p>
        <Link href="/" style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '14px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#6EE9A0',
          backgroundColor: '#0F2D1F',
          border: '2px solid #0F2D1F',
          borderRadius: '100px',
          padding: '12px 28px',
          textDecoration: 'none',
        }}>
          Ver productos
        </Link>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px' }}>
        <h1 style={{
          fontFamily: 'Fredoka One, cursive',
          fontSize: '48px',
          color: '#0F2D1F',
          marginBottom: '32px',
          textTransform: 'uppercase',
        }}>
          Tu carrito
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          {items.map(item => (
            <div key={item.id} style={{
              backgroundColor: '#FFFFFF',
              border: '2px solid #0F2D1F',
              borderRadius: '16px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}>
              <img src={item.image_url} alt={item.name} style={{
                width: '80px', height: '80px', objectFit: 'cover',
                borderRadius: '12px', border: '2px solid #0F2D1F',
                backgroundColor: '#EEFE76',
              }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: 'Fredoka One, cursive', fontSize: '20px', color: '#0F2D1F' }}>
                  {item.name}
                </h3>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#5A6A40' }}>
                  Talle {item.size} · {item.material}
                </p>
                <p style={{ fontFamily: 'Fredoka One, cursive', fontSize: '20px', color: '#0F2D1F', marginTop: '4px' }}>
                  ${item.price.toLocaleString('es-AR')}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {[
                  { label: '−', action: () => updateQuantity(item.id, item.quantity - 1) },
                  { label: item.quantity, action: null },
                  { label: '+', action: () => updateQuantity(item.id, item.quantity + 1) },
                ].map((btn, i) => (
                  btn.action ? (
                    <button key={i} onClick={btn.action} style={{
                      width: '32px', height: '32px', borderRadius: '50%',
                      border: '2px solid #0F2D1F', backgroundColor: 'transparent',
                      cursor: 'pointer', fontWeight: 700, fontSize: '16px',
                      color: '#0F2D1F', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {btn.label}
                    </button>
                  ) : (
                    <span key={i} style={{ fontFamily: 'Fredoka One, cursive', fontSize: '20px', color: '#0F2D1F', minWidth: '24px', textAlign: 'center' }}>
                      {btn.label}
                    </span>
                  )
                ))}
              </div>
              <button onClick={() => removeItem(item.id)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '22px', color: '#C0C0C0', padding: '4px',
              }}>
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Resumen */}
        <div style={{
          backgroundColor: '#EEFE76',
          border: '2px solid #0F2D1F',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '4px 4px 0px #0F2D1F',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: '#5A6A40' }}>Total</span>
            <span style={{ fontFamily: 'Fredoka One, cursive', fontSize: '36px', color: '#0F2D1F' }}>
              ${getTotal().toLocaleString('es-AR')}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={clearCart} style={{
              flex: 1, border: '2px solid #0F2D1F', backgroundColor: 'transparent',
              borderRadius: '100px', padding: '12px',
              fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', color: '#0F2D1F',
            }}>
              Vaciar
            </button>
            <Link href="/checkout" style={{
              flex: 2, backgroundColor: '#0F2D1F', color: '#6EE9A0',
              border: '2px solid #0F2D1F', borderRadius: '100px', padding: '12px',
              fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none',
              textAlign: 'center', display: 'block',
            }}>
              Ir al checkout →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
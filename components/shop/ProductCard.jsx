'use client'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'

export default function ProductCard({ product }) {
  const addItem = useCartStore(s => s.addItem)

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '16px',
      overflow: 'hidden',
      border: '2px solid #0F2D1F',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      position: 'relative',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '4px 4px 0px #0F2D1F'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <Link href={`/producto/${product.slug}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
        <div style={{
          aspectRatio: '1',
          overflow: 'hidden',
          backgroundColor: '#EEFE76',
        }}>
          <img
            src={product.image_url}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>

        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
            <span style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              color: '#0F2D1F',
              backgroundColor: '#EEFE76',
              padding: '3px 10px',
              borderRadius: '100px',
              textTransform: 'capitalize',
              border: '1.5px solid #0F2D1F',
            }}>
              {product.material}
            </span>
            <span style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              color: '#0F2D1F',
              backgroundColor: '#EEFE76',
              padding: '3px 10px',
              borderRadius: '100px',
              border: '1.5px solid #0F2D1F',
            }}>
              Talle {product.size}
            </span>
          </div>

          <h3 style={{
            fontFamily: 'Fredoka One, cursive',
            fontSize: '20px',
            fontWeight: 400,
            color: '#0F2D1F',
            lineHeight: 1.2,
            marginBottom: '4px',
          }}>
            {product.name}
          </h3>

          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '12px',
            color: '#5A6A40',
            marginBottom: '16px',
          }}>
            Cuello: {product.min_neck_cm}–{product.max_neck_cm} cm
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{
              fontFamily: 'Fredoka One, cursive',
              fontSize: '24px',
              fontWeight: 400,
              color: '#0F2D1F',
            }}>
              ${product.price.toLocaleString('es-AR')}
            </span>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                addItem(product)
              }}
              disabled={product.stock === 0}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                color: product.stock === 0 ? '#A8A29E' : '#6EE9A0',
                backgroundColor: product.stock === 0 ? '#F0EBE1' : '#0F2D1F',
                border: '2px solid ' + (product.stock === 0 ? '#F0EBE1' : '#0F2D1F'),
                padding: '10px 18px',
                borderRadius: '100px',
                cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                zIndex: 10,
              }}
              onMouseEnter={e => {
                if (product.stock > 0) {
                  e.currentTarget.style.backgroundColor = '#6EE9A0'
                  e.currentTarget.style.color = '#0F2D1F'
                }
              }}
              onMouseLeave={e => {
                if (product.stock > 0) {
                  e.currentTarget.style.backgroundColor = '#0F2D1F'
                  e.currentTarget.style.color = '#6EE9A0'
                }
              }}
            >
              {product.stock === 0 ? 'Sin stock' : 'Agregar'}
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}
  )
}
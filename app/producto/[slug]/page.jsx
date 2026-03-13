import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import AddToCartButton from '@/components/shop/AddToCartButton'

export default async function ProductoPage({ params }) {
  const { slug } = await params

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!product) notFound()

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>

          {/* Imagen */}
          <div style={{
            aspectRatio: '1',
            borderRadius: '20px',
            overflow: 'hidden',
            backgroundColor: '#EEFE76',
            border: '2px solid #0F2D1F',
          }}>
            <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
              {[product.material, `Talle ${product.size}`, product.stock > 0 ? `${product.stock} en stock` : 'Sin stock'].map((tag, i) => (
                <span key={i} style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#0F2D1F',
                  backgroundColor: i === 2 && product.stock === 0 ? '#FFE0E0' : '#EEFE76',
                  padding: '4px 12px',
                  borderRadius: '100px',
                  border: '2px solid #0F2D1F',
                  textTransform: 'capitalize',
                }}>
                  {tag}
                </span>
              ))}
            </div>

            <h1 style={{
              fontFamily: 'Fredoka One, cursive',
              fontSize: '42px',
              fontWeight: 400,
              color: '#0F2D1F',
              lineHeight: 1.1,
              marginBottom: '12px',
            }}>
              {product.name}
            </h1>

            <p style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '16px',
              color: '#5A6A40',
              lineHeight: 1.7,
              marginBottom: '24px',
            }}>
              {product.description}
            </p>

            <div style={{
              backgroundColor: '#F5F5F5',
              borderRadius: '16px',
              padding: '16px',
              marginBottom: '24px',
              border: '1.5px solid #E0E0E0',
            }}>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: '#0F2D1F', marginBottom: '6px' }}>
                Medidas del cuello
              </p>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#5A6A40' }}>
                Ideal para perros con cuello de{' '}
                <strong style={{ color: '#0F2D1F' }}>{product.min_neck_cm} a {product.max_neck_cm} cm</strong>
              </p>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#A0A0A0', marginTop: '4px' }}>
                Medí el cuello de tu perro y sumale 2 cm
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <span style={{
                fontFamily: 'Fredoka One, cursive',
                fontSize: '48px',
                color: '#0F2D1F',
              }}>
                ${product.price.toLocaleString('es-AR')}
              </span>
            </div>

            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}
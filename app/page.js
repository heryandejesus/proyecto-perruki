import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/shop/ProductCard'

export default async function HomePage() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main style={{ backgroundColor: '#6EE9A0', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 24px 60px',
      }}>
        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#1A4A35',
          marginBottom: '20px',
          fontStyle: 'italic',
        }}>
          hecho para ellos
        </p>
        <h1 style={{
          fontFamily: 'Fredoka One, cursive',
          fontSize: 'clamp(56px, 9vw, 110px)',
          fontWeight: 400,
          lineHeight: 1.0,
          color: '#0F2D1F',
          letterSpacing: '-1px',
          marginBottom: '28px',
          textTransform: 'uppercase',
        }}>
          Collares para tu mejor amigo.
        </h1>
        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '18px',
          fontWeight: 400,
          color: '#1A4A35',
          lineHeight: 1.6,
          maxWidth: '480px',
        }}>
          Diseñados para durar, pensados para ellos. Encontrá el collar perfecto para tu compañero.
        </p>
      </section>

      {/* Productos */}
      <section style={{
        backgroundColor: '#EEFE76',
        borderTop: '2px solid #0F2D1F',
        borderRadius: '32px 32px 0 0',
        padding: '60px 24px 100px',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '40px',
          }}>
            <h2 style={{
              fontFamily: 'Fredoka One, cursive',
              fontSize: '40px',
              fontWeight: 400,
              color: '#0F2D1F',
              textTransform: 'uppercase',
            }}>
              Todos los productos
            </h2>
            <span style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '13px',
              color: '#5A6A40',
            }}>
              {products?.length} productos
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '24px',
          }}>
            {products?.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
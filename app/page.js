import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/shop/ProductCard'

export default async function HomePage() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-14">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Collares para perros 🐶
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Diseñados para durar, pensados para ellos.
          Encontrá el collar perfecto para tu compañero.
        </p>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
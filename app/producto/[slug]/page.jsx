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
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Imagen */}
        <div className="aspect-square rounded-3xl overflow-hidden bg-gray-50">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <div className="flex gap-2 mb-4">
            <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
              {product.material}
            </span>
            <span className="text-sm bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
              Talle {product.size}
            </span>
            <span className={`text-sm px-3 py-1 rounded-full ${
              product.stock > 0
                ? 'bg-green-100 text-green-600'
                : 'bg-red-100 text-red-500'
            }`}>
              {product.stock > 0 ? `${product.stock} en stock` : 'Sin stock'}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
          <p className="text-gray-500 mb-6 leading-relaxed">{product.description}</p>

          {/* Medidas */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Medidas del cuello</p>
            <p className="text-gray-500 text-sm">
              Este collar es ideal para perros con cuello de{' '}
              <span className="font-semibold text-gray-900">
                {product.min_neck_cm} a {product.max_neck_cm} cm
              </span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Medí el cuello de tu perro con una cinta métrica y sumale 2 cm
            </p>
          </div>

          <div className="flex items-center justify-between mb-6">
            <span className="text-4xl font-bold text-gray-900">
              ${product.price.toLocaleString('es-AR')}
            </span>
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  )
}
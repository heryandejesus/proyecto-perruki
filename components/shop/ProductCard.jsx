'use client'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'

export default function ProductCard({ product }) {
  const addItem = useCartStore(s => s.addItem)

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow group">
      <Link href={`/producto/${product.slug}`}>
        <div className="aspect-square overflow-hidden bg-gray-50">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            {product.material}
          </span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            Talle {product.size}
          </span>
        </div>
        <Link href={`/producto/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 mt-2 hover:text-orange-500 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-400 mt-1">
          Cuello: {product.min_neck_cm}–{product.max_neck_cm} cm
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toLocaleString('es-AR')}
          </span>
          <button
            onClick={() => addItem(product)}
            disabled={product.stock === 0}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm px-3 py-1.5 rounded-full transition-colors"
          >
            {product.stock === 0 ? 'Sin stock' : 'Agregar'}
          </button>
        </div>
      </div>
    </div>
  )
}
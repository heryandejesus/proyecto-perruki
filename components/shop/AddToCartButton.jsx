'use client'
import { useCartStore } from '@/store/cartStore'
import { useState } from 'react'

export default function AddToCartButton({ product }) {
  const addItem = useCartStore(s => s.addItem)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      onClick={handleAdd}
      disabled={product.stock === 0}
      className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium py-4 rounded-full transition-colors text-lg"
    >
      {product.stock === 0
        ? 'Sin stock'
        : added
        ? '✓ Agregado al carrito'
        : 'Agregar al carrito'}
    </button>
  )
}
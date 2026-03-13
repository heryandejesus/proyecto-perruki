'use client'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <p className="text-6xl mb-6">🛒</p>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Tu carrito está vacío</h2>
        <p className="text-gray-500 mb-8">Agregá algún collar para tu perro</p>
        <Link href="/" className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors">
          Ver productos
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Tu carrito</h1>

      <div className="flex flex-col gap-4 mb-8">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4">
            <img
              src={item.image_url}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-xl bg-gray-50"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-400">Talle {item.size} · {item.material}</p>
              <p className="text-orange-500 font-bold mt-1">
                ${item.price.toLocaleString('es-AR')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 rounded-full border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-600"
              >
                −
              </button>
              <span className="w-6 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 rounded-full border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-600"
              >
                +
              </button>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-gray-300 hover:text-red-400 transition-colors ml-2 text-xl"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Resumen */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-600">Total</span>
          <span className="text-2xl font-bold text-gray-900">
            ${getTotal().toLocaleString('es-AR')}
          </span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={clearCart}
            className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-full hover:bg-gray-50 transition-colors text-sm"
          >
            Vaciar carrito
          </button>
          <Link
            href="/checkout"
            className="flex-1 bg-orange-500 text-white py-3 rounded-full hover:bg-orange-600 transition-colors text-sm text-center font-medium"
          >
            Ir al checkout →
          </Link>
        </div>
      </div>
    </div>
  )
}
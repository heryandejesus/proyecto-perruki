'use client'
import { useEffect, useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const STORAGE_KEY = 'collardog-checkout'

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore()
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1) // 1: datos, 2: resumen

  // Recuperar datos del sessionStorage si ya los completó antes
  const [form, setForm] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : { name: '', phone: '', address: '' }
    }
    return { name: '', phone: '', address: '' }
  })

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
  }, [])

  // Guardar en sessionStorage cada vez que cambia el form
  const handleChange = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value }
    setForm(updated)
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const handleConfirm = async () => {
  if (!user) {
    router.push('/auth')
    return
  }
  setLoading(true)

  // 1. Crear el pedido en Supabase
  const { data: order, error } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      status: 'pending',
      total: getTotal(),
    })
    .select()
    .single()

  if (error) {
    alert('Error al crear el pedido')
    setLoading(false)
    return
  }

  // 2. Crear los items del pedido
  const orderItems = items.map(item => ({
    order_id: order.id,
    product_id: item.id,
    quantity: item.quantity,
    unit_price: item.price,
  }))
  await supabase.from('order_items').insert(orderItems)

  // 3. Crear preferencia en MercadoPago
  const res = await fetch('/api/create-preference', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items, orderId: order.id }),
  })

  const data = await res.json()

  if (data.init_point) {
    sessionStorage.removeItem(STORAGE_KEY)
    clearCart()
    // 4. Redirigir a MercadoPago
    window.location.href = data.init_point
  } else {
    alert('Error al conectar con MercadoPago')
    setLoading(false)
  }
}

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <p className="text-6xl mb-6">🛒</p>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">No hay productos en tu carrito</h2>
        <Link href="/" className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors">
          Ver productos
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      {/* Pasos */}
      <div className="flex items-center gap-3 mb-10">
        <div className={`flex items-center gap-2 text-sm font-medium ${step >= 1 ? 'text-orange-500' : 'text-gray-400'}`}>
          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-400'}`}>1</span>
          Tus datos
        </div>
        <div className="flex-1 h-px bg-gray-200" />
        <div className={`flex items-center gap-2 text-sm font-medium ${step >= 2 ? 'text-orange-500' : 'text-gray-400'}`}>
          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-400'}`}>2</span>
          Confirmar pedido
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Formulario / Resumen */}
        <div className="md:col-span-2">
          {step === 1 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-900 mb-6">Datos de entrega</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Nombre completo</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Teléfono</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+54 11 1234-5678"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Dirección de envío</label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Calle, número, ciudad"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <button
                  onClick={() => setStep(2)}
                  disabled={!form.name || !form.phone || !form.address}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium py-3 rounded-full transition-colors mt-2"
                >
                  Continuar →
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Confirmá tu pedido</h2>
              <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm text-gray-600">
                <p><span className="font-medium">Nombre:</span> {form.name}</p>
                <p className="mt-1"><span className="font-medium">Teléfono:</span> {form.phone}</p>
                <p className="mt-1"><span className="font-medium">Dirección:</span> {form.address}</p>
                <button onClick={() => setStep(1)} className="text-orange-500 text-xs mt-2 hover:underline">
                  Editar datos
                </button>
              </div>
              <div className="flex flex-col gap-3 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img src={item.image_url} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                    <div className="flex-1 text-sm">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-gray-400">x{item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">${(item.price * item.quantity).toLocaleString('es-AR')}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={handleConfirm}
                disabled={loading || !user}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium py-3 rounded-full transition-colors"
              >
                {!user ? 'Iniciá sesión para continuar' : loading ? 'Procesando...' : 'Confirmar pedido'}
              </button>
              {!user && (
                <Link href="/auth" className="block text-center text-orange-500 text-sm mt-3 hover:underline">
                  Iniciar sesión
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Resumen lateral */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 h-fit">
          <h3 className="font-semibold text-gray-900 mb-4">Resumen</h3>
          <div className="flex flex-col gap-2 text-sm text-gray-600 mb-4">
            {items.map(item => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toLocaleString('es-AR')}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-gray-900">
            <span>Total</span>
            <span>${getTotal().toLocaleString('es-AR')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
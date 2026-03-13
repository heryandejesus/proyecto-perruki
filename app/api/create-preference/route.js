import { MercadoPagoConfig, Preference } from 'mercadopago'
import { NextResponse } from 'next/server'

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
})

export async function POST(request) {
  try {
    const { items, orderId } = await request.json()

    const preference = new Preference(client)

    const result = await preference.create({
      body: {
        items: items.map(item => ({
          id: item.id,
          title: item.name,
          quantity: item.quantity,
          unit_price: Number(item.price),
          currency_id: 'ARS',
        })),
        back_urls: {
          success: `http://localhost:3000/checkout/confirmacion?order=${orderId}`,
          failure: `http://localhost:3000/checkout`,
          pending: `http://localhost:3000/checkout/confirmacion?order=${orderId}`,
        },
        external_reference: orderId,
      },
    })

    return NextResponse.json({ init_point: result.init_point })
  } catch (error) {
    console.error('MP Error:', error)
    return NextResponse.json({ error: 'Error al crear preferencia' }, { status: 500 })
  }
}

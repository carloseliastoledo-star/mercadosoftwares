import { readBody } from 'h3'
import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!process.env.STRIPE_SECRET_KEY) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Stripe secret key missing'
    })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16'
  })

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: body.items.map((item: any) => ({
      price_data: {
        currency: 'brl',
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100)
      },
      quantity: item.quantity
    })),
    success_url: 'http://localhost:3000/pedido/sucesso',
    cancel_url: 'http://localhost:3000/pedido/cancelado'
  })

  return { url: session.url }
})

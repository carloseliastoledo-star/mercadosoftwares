import { defineEventHandler, getQuery, createError } from 'h3'
import prisma from '#root/server/db/prisma'
import { getMpPayment } from '#root/server/utils/mercadopago'
import { processMercadoPagoPayment } from '#root/server/utils/mercadopagoWebhook'
import { getStoreContext, whereForStore } from '#root/server/utils/store'

export default defineEventHandler(async (event) => {
  const ctx = getStoreContext()
  const query = getQuery(event)
  const orderId = String(query.orderId || '').trim()

  if (!orderId) {
    throw createError({ statusCode: 400, statusMessage: 'orderId obrigatório' })
  }

  let order = await prisma.order.findFirst({
    where: whereForStore({ id: orderId }, ctx) as any,
    select: {
      id: true,
      status: true,
      storeSlug: true,
      pagoEm: true,
      mercadoPagoPaymentId: true,
      emailEnviadoEm: true
    }
  })

  if (!order) {
    throw createError({ statusCode: 404, statusMessage: 'Pedido não encontrado' })
  }

  const statusUpper = String(order.status || '').toUpperCase()
  const mpPaymentId = String(order.mercadoPagoPaymentId || '').trim()

  let fulfillmentAttempted = false
  let fulfillmentError = ''

  if (statusUpper !== 'PAID' && mpPaymentId) {
    try {
      const payment = getMpPayment()
      const mpPayment = await payment.get({ id: mpPaymentId })
      const mpStatus = String((mpPayment as any)?.status || '').toLowerCase()

      if (mpStatus === 'approved') {
        order = await prisma.order.update({
          where: { id: orderId },
          data: {
            status: 'PAID',
            pagoEm: new Date(),
            mercadoPagoPaymentId: String((mpPayment as any)?.id || mpPaymentId)
          },
          select: {
            id: true,
            status: true,
            storeSlug: true,
            pagoEm: true,
            mercadoPagoPaymentId: true
          }
        })

        fulfillmentAttempted = true
        try {
          await processMercadoPagoPayment(String((mpPayment as any)?.id || mpPaymentId))
        } catch (err: any) {
          fulfillmentError = String(err?.data?.statusMessage || err?.message || 'Falha ao processar pagamento')
          console.log('[order-status] processMercadoPagoPayment error', err)
        }
      }
    } catch {
      // se falhar (token/MP indisponível), apenas retorna o status atual do pedido
    }
  }

  if (statusUpper === 'PAID' && !order.emailEnviadoEm && mpPaymentId) {
    fulfillmentAttempted = true
    try {
      await processMercadoPagoPayment(mpPaymentId)
    } catch (err: any) {
      fulfillmentError = String(err?.data?.statusMessage || err?.message || 'Falha ao processar pagamento')
      console.log('[order-status] reprocessMercadoPagoPayment error', err)
    }

    order = await prisma.order.findFirst({
      where: whereForStore({ id: orderId }, ctx) as any,
      select: {
        id: true,
        status: true,
        storeSlug: true,
        pagoEm: true,
        mercadoPagoPaymentId: true,
        emailEnviadoEm: true
      }
    })

    if (!order) {
      throw createError({ statusCode: 404, statusMessage: 'Pedido não encontrado' })
    }
  }

  return {
    ok: true,
    order: {
      id: order.id,
      status: order.status,
      pagoEm: order.pagoEm,
      mercadoPagoPaymentId: order.mercadoPagoPaymentId,
      emailEnviadoEm: order.emailEnviadoEm
    },
    fulfillmentAttempted,
    fulfillmentError
  }
})

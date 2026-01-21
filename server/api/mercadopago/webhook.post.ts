import { defineEventHandler, readBody } from 'h3'
import prisma from '../../db/prisma'
import { getMpPayment } from '../../utils/mercadopago.js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const type = String(body?.type || '')
  const dataId = String(body?.data?.id || body?.id || '')

  if (type !== 'payment' || !dataId) {
    return { ok: true }
  }

  const payment = getMpPayment()
  const mpPayment = await payment.get({ id: dataId })

  const status = String((mpPayment as any)?.status || '')
  const orderId = (mpPayment as any)?.metadata?.orderId || (mpPayment as any)?.external_reference

  if (!orderId) {
    return { ok: true }
  }

  if (status === 'approved') {
    await prisma.$transaction(async (tx) => {
      const order = await tx.order.update({
        where: { id: String(orderId) },
        data: {
          status: 'PAID',
          pagoEm: new Date(),
          mercadoPagoPaymentId: String((mpPayment as any)?.id || dataId)
        },
        select: { id: true, produtoId: true, customerId: true }
      })

      const already = await tx.licenca.findFirst({
        where: { orderId: order.id },
        select: { id: true }
      })
      if (already) return

      const candidate = await tx.licenca.findFirst({
        where: {
          produtoId: order.produtoId,
          status: 'STOCK',
          orderId: null,
          customerId: null
        },
        select: { id: true }
      })

      if (!candidate) return

      await tx.licenca.update({
        where: { id: candidate.id },
        data: {
          status: 'SOLD',
          orderId: order.id,
          customerId: order.customerId
        }
      })
    })
  } else if (status === 'rejected' || status === 'cancelled') {
    await prisma.order.update({
      where: { id: String(orderId) },
      data: {
        status: status.toUpperCase(),
        mercadoPagoPaymentId: String((mpPayment as any)?.id || dataId)
      }
    })
  }

  return { ok: true }
})

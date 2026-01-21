import prisma from '../db/prisma'
import { getMpPayment } from './mercadopago.js'
import { renderLicenseEmail, sendMail } from './mailer.js'

export async function processMercadoPagoPayment(dataId: string) {
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
        select: { id: true, produtoId: true, customerId: true, emailEnviadoEm: true }
      })

      if (order.emailEnviadoEm) return

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

      const licenca = await tx.licenca.update({
        where: { id: candidate.id },
        data: {
          status: 'SOLD',
          orderId: order.id,
          customerId: order.customerId
        },
        select: { id: true, chave: true }
      })

      const [customer, produto] = await Promise.all([
        tx.customer.findUnique({ where: { id: order.customerId }, select: { email: true } }),
        tx.produto.findUnique({ where: { id: order.produtoId }, select: { nome: true } })
      ])

      if (!customer?.email || !produto?.nome) return

      const html = renderLicenseEmail({
        produtoNome: produto.nome,
        licenseKey: licenca.chave,
        orderId: order.id
      })

      await sendMail({
        to: customer.email,
        subject: `Sua licença: ${produto.nome}`,
        html
      })

      await tx.order.update({
        where: { id: order.id },
        data: { emailEnviadoEm: new Date() }
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
}

import { defineEventHandler, readBody, createError } from 'h3'
import prisma from '../../db/prisma'
import { getMpPayment } from '../../utils/mercadopago.js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const produtoId = String(body?.produtoId || '')
  const email = String(body?.email || '').trim().toLowerCase()

  const token = String(body?.token || '')
  const paymentMethodId = String(body?.payment_method_id || '')
  const issuerId = body?.issuer_id ? String(body.issuer_id) : undefined
  const installments = Number(body?.installments || 1)

  const identificationType = String(body?.identification?.type || 'CPF')
  const identificationNumber = String(body?.identification?.number || '')

  if (!produtoId) throw createError({ statusCode: 400, statusMessage: 'produtoId obrigatório' })
  if (!email || !email.includes('@')) throw createError({ statusCode: 400, statusMessage: 'Email inválido' })

  if (!token) throw createError({ statusCode: 400, statusMessage: 'token obrigatório' })
  if (!paymentMethodId) throw createError({ statusCode: 400, statusMessage: 'payment_method_id obrigatório' })
  if (!identificationNumber) throw createError({ statusCode: 400, statusMessage: 'CPF obrigatório' })

  const produto = await prisma.produto.findUnique({ where: { id: produtoId } })
  if (!produto) throw createError({ statusCode: 404, statusMessage: 'Produto não encontrado' })

  const customer = await prisma.customer.upsert({
    where: { email },
    create: { email },
    update: {}
  })

  const order = await prisma.order.create({
    data: {
      status: 'PENDING',
      produtoId: produto.id,
      customerId: customer.id
    }
  })

  const payment = getMpPayment()

  const result = await payment.create({
    body: {
      transaction_amount: Number(produto.preco),
      description: produto.nome,
      token,
      installments,
      payment_method_id: paymentMethodId,
      issuer_id: issuerId,
      payer: {
        email,
        identification: {
          type: identificationType,
          number: identificationNumber
        }
      },
      metadata: {
        orderId: order.id,
        produtoId: produto.id
      },
      external_reference: order.id
    }
  })

  const mpPaymentId = String((result as any)?.id || '')
  if (!mpPaymentId) {
    throw createError({ statusCode: 502, statusMessage: 'Falha ao criar pagamento no Mercado Pago' })
  }

  const status = String((result as any)?.status || '').toLowerCase()

  await prisma.order.update({
    where: { id: order.id },
    data: {
      mercadoPagoPaymentId: mpPaymentId,
      status: status === 'approved' ? 'PAID' : 'PENDING',
      pagoEm: status === 'approved' ? new Date() : null
    }
  })

  return {
    ok: true,
    orderId: order.id,
    paymentId: mpPaymentId,
    status
  }
})

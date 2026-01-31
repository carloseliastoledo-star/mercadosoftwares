import { defineEventHandler, getRouterParam, createError } from 'h3'
import prisma from '#root/server/db/prisma'
import { requireAdminSession } from '#root/server/utils/adminSession'
import { renderLicenseEmail, sendMail } from '#root/server/utils/mailer'
import { getStoreContext, whereForStore } from '#root/server/utils/store'

export default defineEventHandler(async (event) => {
  requireAdminSession(event)

  const ctx = getStoreContext()

  const id = String(getRouterParam(event, 'id') || '').trim()
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'id obrigatório' })
  }

  const order = await prisma.order.findFirst({
    where: whereForStore({ id }, ctx) as any,
    select: {
      id: true,
      status: true,
      storeSlug: true,
      customer: { select: { email: true } },
      produto: { select: { nome: true } },
      licencas: { select: { chave: true } }
    }
  })

  if (!order) {
    throw createError({ statusCode: 404, statusMessage: 'Pedido não encontrado' })
  }

  if (String(order.status || '').toUpperCase() !== 'PAID') {
    throw createError({ statusCode: 400, statusMessage: 'Pedido precisa estar com status PAID' })
  }

  const customerEmail = String(order.customer?.email || '').trim()
  if (!customerEmail) {
    throw createError({ statusCode: 400, statusMessage: 'E-mail do cliente não encontrado' })
  }

  const produtoNome = String(order.produto?.nome || '').trim()
  if (!produtoNome) {
    throw createError({ statusCode: 400, statusMessage: 'Produto do pedido não encontrado' })
  }

  const licenseKey = String(order.licencas?.[0]?.chave || '').trim()
  if (!licenseKey) {
    throw createError({ statusCode: 400, statusMessage: 'Pedido ainda não possui licença vinculada' })
  }

  const html = renderLicenseEmail({
    produtoNome,
    licenseKey,
    orderId: order.id
  })

  const bcc = String(process.env.LICENSE_EMAIL_BCC || '').trim() || 'carloseliastoledo@gmail.com'

  await sendMail({
    to: customerEmail,
    bcc,
    subject: `Sua licença: ${produtoNome}`,
    html
  })

  await prisma.order.update({
    where: { id: order.id },
    data: {
      emailEnviadoEm: new Date(),
      fulfillmentStatus: 'RESENT',
      fulfillmentError: null,
      fulfillmentUpdatedAt: new Date()
    }
  })

  return {
    ok: true,
    orderId: order.id,
    customerEmail,
    produtoNome
  }
})

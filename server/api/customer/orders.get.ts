import { defineEventHandler } from 'h3'
import prisma from '../../db/prisma'
import { requireCustomerSession } from '../../utils/customerSession'
import { getStoreContext, whereForStore } from '../../utils/store'

export default defineEventHandler(async (event) => {
  const session = requireCustomerSession(event)

  const ctx = getStoreContext()

  const orders = await prisma.order.findMany({
    where: whereForStore({ customerId: session.customerId }, ctx) as any,
    orderBy: { criadoEm: 'desc' },
    select: {
      id: true,
      numero: true,
      status: true,
      storeSlug: true,
      criadoEm: true,
      pagoEm: true,
      produto: { select: { id: true, nome: true, slug: true } },
      licencas: { select: { id: true, chave: true, status: true } }
    }
  })

  return { ok: true, orders }
})

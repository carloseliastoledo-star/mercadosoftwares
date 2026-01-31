import { defineEventHandler } from 'h3'
import prisma from '../../../db/prisma'
import { requireCustomerSession } from '../../../utils/customerSession'
import { getStoreContext } from '../../../utils/store'

export default defineEventHandler(async (event) => {
  const { storeSlug } = getStoreContext()
  const session = requireCustomerSession(event)

  if (!storeSlug) {
    return { ok: true, customer: null }
  }

  const customer = await prisma.customer.findFirst({
    where: { id: session.customerId, storeSlug },
    select: { id: true, email: true, nome: true, whatsapp: true, cpf: true }
  })

  return { ok: true, customer }
})

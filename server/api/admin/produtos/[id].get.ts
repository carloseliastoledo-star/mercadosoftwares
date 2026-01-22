import prisma from '../../../db/prisma'
import { requireAdminSession } from '../../../utils/adminSession'

export default defineEventHandler(async (event) => {
  requireAdminSession(event)

  const id = event.context.params.id

  const produto = await prisma.produto.findUnique({
    where: { id }
  })

  if (!produto) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Produto não encontrado'
    })
  }

  return produto
})

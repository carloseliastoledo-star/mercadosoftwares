import prisma from '../../../db/prisma'
import { requireAdminSession } from '../../../utils/adminSession'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
  requireAdminSession(event)

  const id = event.context.params.id

  const produto = await prisma.produto.findUnique({
    where: { id },
    include: {
      categorias: { select: { id: true, nome: true, slug: true } }
    }
  })

  if (!produto) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Produto não encontrado'
    })
  }

  return produto
})

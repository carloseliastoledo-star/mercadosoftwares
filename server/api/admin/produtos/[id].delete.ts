import prisma from '../../../db/prisma'
import { requireAdminSession } from '../../../utils/adminSession'

export default defineEventHandler(async (event) => {
  requireAdminSession(event)

  const id = event.context.params.id

  const produto = await prisma.produto.findUnique({
    where: { id },
    select: {
      id: true,
      _count: {
        select: {
          orders: true,
          licencas: true
        }
      }
    }
  })

  if (!produto) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Produto não encontrado'
    })
  }

  if (produto._count.orders > 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Não é possível excluir um produto que já possui pedidos.'
    })
  }

  if (produto._count.licencas > 0) {
    await prisma.licenca.deleteMany({
      where: { produtoId: id }
    })
  }

  await prisma.produto.delete({
    where: { id }
  })

  return { ok: true }
})

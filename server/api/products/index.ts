import prisma from '#root/server/db/prisma'

export default defineEventHandler(async () => {
  const products = await prisma.produto.findMany({
    where: {
      ativo: true
    },
    orderBy: {
      criadoEm: 'desc'
    }
  })

  return products
})

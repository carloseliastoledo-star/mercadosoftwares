import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  const products = await prisma.produto.findMany({
    orderBy: {
      criadoEm: 'desc'
    }
  })

  return products.map(p => ({
    id: p.id,
    name: p.nome,
    slug: p.slug,
    description: p.descricao,
    price: p.preco,
    image: p.imagem,        // 👈 CAMPO CRÍTICO
    tutorialTitle: p.tutorialTitulo,
    tutorialSubtitle: p.tutorialSubtitulo,
    createdAt: p.criadoEm
  }))
})

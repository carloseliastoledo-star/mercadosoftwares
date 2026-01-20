import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const slug = event.context.params?.slug

  const product = await prisma.produto.findUnique({
    where: { slug: String(slug) }
  })

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Produto não encontrado'
    })
  }

  return {
    id: product.id,
    name: product.nome,
    slug: product.slug,
    description: product.descricao,
    price: product.preco,
    image: product.imagem,   // 👈 CAMPO CRÍTICO
    tutorialTitle: product.tutorialTitulo,
    tutorialSubtitle: product.tutorialSubtitulo,
    tutorialContent: product.tutorialConteudo,
    createdAt: product.criadoEm
  }
})

import prisma from '#root/server/db/prisma'

export default defineEventHandler(async () => {
  try {
    const products = await prisma.produto.findMany({
      where: {
        ativo: true
      },
      orderBy: {
        criadoEm: 'desc'
      }
    })

    return products.map((p) => ({
      id: p.id,
      name: p.nome,
      slug: p.slug,
      description: p.descricao,
      price: p.preco,
      image: p.imagem,
      tutorialTitle: p.tutorialTitulo,
      tutorialSubtitle: p.tutorialSubtitulo,
      createdAt: p.criadoEm
    }))
  } catch (err: any) {
    console.error('GET /api/products failed', err)
    throw createError({
      statusCode: 500,
      statusMessage: err?.message || 'Falha ao carregar produtos'
    })
  }
})

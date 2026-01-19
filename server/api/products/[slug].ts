import prisma from '#root/server/db/prisma'

export default defineEventHandler(async (event) => {
  try {
    const rawSlug = event.context.params?.slug

    console.log('SLUG RECEBIDO:', rawSlug)
    console.log('DATABASE_URL:', process.env.DATABASE_URL)

    if (!rawSlug) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Slug não informado'
      })
    }

    const slug = rawSlug
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/_/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')

    console.log('SLUG NORMALIZADO:', slug)

    const product = await prisma.Produto.findUnique({
      where: { slug }
    })

    if (!product) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Produto não encontrado'
      })
    }

    return product
  } catch (err) {
    console.error('🔥 ERRO NA API /products/[slug]:', err)

    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno na API de produto'
    })
  }
})

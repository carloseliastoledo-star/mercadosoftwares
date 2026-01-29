import { defineEventHandler, createError } from 'h3'
import prisma from '../../db/prisma.js'

export default defineEventHandler(async (event) => {
  const slug = String(event.context.params?.slug || '').trim()
  if (!slug) throw createError({ statusCode: 400, statusMessage: 'slug obrigatório' })

  const post = await (prisma as any).blogPost.findUnique({
    where: { slug },
    select: {
      titulo: true,
      slug: true,
      html: true,
      publicado: true,
      criadoEm: true,
      atualizadoEm: true
    }
  })

  if (!post || !post.publicado) {
    throw createError({ statusCode: 404, statusMessage: 'Post não encontrado' })
  }

  return { ok: true, post }
})

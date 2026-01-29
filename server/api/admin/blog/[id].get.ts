import { defineEventHandler, createError } from 'h3'
import prisma from '../../../db/prisma.js'
import { requireAdminSession } from '../../../utils/adminSession.js'

export default defineEventHandler(async (event) => {
  requireAdminSession(event)

  const id = String(event.context.params?.id || '')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'id obrigatório' })

  const post = await (prisma as any).blogPost.findUnique({
    where: { id },
    select: {
      id: true,
      titulo: true,
      slug: true,
      html: true,
      publicado: true,
      criadoEm: true,
      atualizadoEm: true
    }
  })

  if (!post) throw createError({ statusCode: 404, statusMessage: 'Post não encontrado' })

  return { ok: true, post }
})

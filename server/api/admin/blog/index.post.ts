import { defineEventHandler, readBody, createError } from 'h3'
import prisma from '../../../db/prisma.js'
import { requireAdminSession } from '../../../utils/adminSession.js'

export default defineEventHandler(async (event) => {
  requireAdminSession(event)

  const body = await readBody(event)

  const titulo = String(body?.titulo || '').trim()
  const slug = String(body?.slug || '').trim()
  const html = body?.html != null ? String(body.html) : null
  const publicado = Boolean(body?.publicado)

  if (!titulo) throw createError({ statusCode: 400, statusMessage: 'Título obrigatório' })
  if (!slug) throw createError({ statusCode: 400, statusMessage: 'Slug obrigatório' })

  const post = await (prisma as any).blogPost.create({
    data: {
      titulo,
      slug,
      html,
      publicado
    },
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

  return { ok: true, post }
})

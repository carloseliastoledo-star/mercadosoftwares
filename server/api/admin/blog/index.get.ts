import { defineEventHandler } from 'h3'
import prisma from '../../../db/prisma.js'
import { requireAdminSession } from '../../../utils/adminSession.js'

export default defineEventHandler(async (event) => {
  requireAdminSession(event)

  const posts = await (prisma as any).blogPost.findMany({
    orderBy: { criadoEm: 'desc' },
    select: {
      id: true,
      titulo: true,
      slug: true,
      publicado: true,
      criadoEm: true,
      atualizadoEm: true
    }
  })

  return { ok: true, posts }
})

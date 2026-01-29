import { defineEventHandler } from 'h3'
import prisma from '../../db/prisma.js'

export default defineEventHandler(async () => {
  const posts = await (prisma as any).blogPost.findMany({
    where: { publicado: true },
    orderBy: { criadoEm: 'desc' },
    select: {
      titulo: true,
      slug: true,
      criadoEm: true,
      atualizadoEm: true
    }
  })

  return { ok: true, posts }
})

import { defineEventHandler } from 'h3'
import prisma from '../../../db/prisma'
import { requireAdminSession } from '../../../utils/adminSession'

export default defineEventHandler(async (event) => {
  requireAdminSession(event)

  const paginas = await prisma.pagina.findMany({
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

  return { ok: true, paginas }
})

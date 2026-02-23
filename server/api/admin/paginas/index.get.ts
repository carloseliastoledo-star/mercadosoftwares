import { defineEventHandler } from 'h3'
import prisma from '../../../db/prisma'
import { requireAdminSession } from '../../../utils/adminSession'

export default defineEventHandler(async (event) => {
  requireAdminSession(event)

  const prismaAny = prisma as any

  const paginas = await prismaAny.pagina.findMany({
    orderBy: { criadoEm: 'desc' },
    select: {
      id: true,
      titulo: true,
      slug: true,
      publicado: true,
      showInFooter: true,
      footerOrder: true,
      criadoEm: true,
      atualizadoEm: true
    }
  })

  return { ok: true, paginas }
})

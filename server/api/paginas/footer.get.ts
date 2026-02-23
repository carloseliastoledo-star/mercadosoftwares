import { defineEventHandler } from 'h3'
import prisma from '../../db/prisma'

export default defineEventHandler(async () => {
  const prismaAny = prisma as any

  const paginas = await prismaAny.pagina.findMany({
    where: { publicado: true, showInFooter: true },
    orderBy: [{ footerOrder: 'asc' }, { criadoEm: 'asc' }],
    select: {
      titulo: true,
      slug: true,
      footerOrder: true
    }
  })

  return { ok: true, paginas }
})

import { defineEventHandler } from 'h3'
import prisma from '../../db/prisma'

export default defineEventHandler(async () => {
  const paginas = await prisma.pagina.findMany({
    where: { publicado: true },
    orderBy: { criadoEm: 'asc' },
    select: {
      titulo: true,
      slug: true
    }
  })

  return { ok: true, paginas }
})

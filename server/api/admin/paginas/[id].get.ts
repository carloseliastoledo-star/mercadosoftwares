import { defineEventHandler, createError } from 'h3'
import prisma from '../../../db/prisma'
import { requireAdminSession } from '../../../utils/adminSession'

export default defineEventHandler(async (event) => {
  requireAdminSession(event)

  const prismaAny = prisma as any

  const id = String(event.context.params?.id || '')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'id obrigatório' })

  const pagina = await prismaAny.pagina.findUnique({
    where: { id },
    select: {
      id: true,
      titulo: true,
      slug: true,
      conteudo: true,
      publicado: true,
      showInFooter: true,
      footerOrder: true,
      criadoEm: true,
      atualizadoEm: true
    }
  })

  if (!pagina) throw createError({ statusCode: 404, statusMessage: 'Página não encontrada' })

  return { ok: true, pagina }
})

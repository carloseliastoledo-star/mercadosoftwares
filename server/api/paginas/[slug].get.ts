import { defineEventHandler, createError } from 'h3'
import prisma from '../../db/prisma'

export default defineEventHandler(async (event) => {
  const slug = String(event.context.params?.slug || '').trim()
  if (!slug) throw createError({ statusCode: 400, statusMessage: 'slug obrigatório' })

  const pagina = await prisma.pagina.findUnique({
    where: { slug },
    select: {
      titulo: true,
      slug: true,
      conteudo: true,
      publicado: true,
      atualizadoEm: true
    }
  })

  if (!pagina || !pagina.publicado) {
    throw createError({ statusCode: 404, statusMessage: 'Página não encontrada' })
  }

  return { ok: true, pagina }
})

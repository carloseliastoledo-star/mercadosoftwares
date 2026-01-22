import prisma from '../../../db/prisma'
import { requireAdminSession } from '../../../utils/adminSession'

export default defineEventHandler(async (event) => {
  requireAdminSession(event)

  const body = await readBody(event)

  return await prisma.produto.create({
    data: {
      nome: body.nome,
      slug: body.slug,
      preco: Number(body.preco),
      descricao: body.descricao,
      imagem: body.imagem,
      tutorialTitulo: body.tutorialTitulo,
      tutorialSubtitulo: body.tutorialSubtitulo,
      tutorialConteudo: body.tutorialConteudo
    }
  })
})

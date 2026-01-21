import { defineEventHandler } from 'h3'
import prisma from '../../db/prisma'

export default defineEventHandler(async () => {
  const [produtosTotal, licencasTotal, ultimosProdutos] = await Promise.all([
    prisma.produto.count(),
    prisma.licenca.count(),
    prisma.produto.findMany({
      orderBy: { criadoEm: 'desc' },
      take: 5,
      select: {
        id: true,
        nome: true,
        slug: true,
        preco: true,
        criadoEm: true
      }
    })
  ])

  return {
    produtosTotal,
    licencasTotal,
    ultimosProdutos
  }
})

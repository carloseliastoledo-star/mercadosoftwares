import { defineEventHandler, getRouterParam, createError } from 'h3'
import prisma from '../../db/prisma'

export default defineEventHandler(async (event) => {
  const slug = String(getRouterParam(event, 'slug') || '').trim()
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'slug obrigatório' })
  }

  const categoria = await prisma.categoria.findUnique({
    where: { slug },
    select: {
      id: true,
      nome: true,
      slug: true,
      ativo: true,
      produtoCategorias: {
        where: {
          produto: { ativo: true }
        },
        select: {
          produto: {
            select: {
              id: true,
              nome: true,
              slug: true,
              descricao: true,
              preco: true,
              imagem: true,
              criadoEm: true
            }
          }
        }
      }
    }
  })

  if (!categoria) {
    throw createError({ statusCode: 404, statusMessage: 'Categoria não encontrada' })
  }

  if (!categoria.ativo) {
    throw createError({ statusCode: 404, statusMessage: 'Categoria não encontrada' })
  }

  type ProdutoItem = {
    id: string
    nome: string
    slug: string
    descricao: string | null
    preco: number
    imagem: string | null
    criadoEm: Date
  }

  return {
    ok: true,
    categoria: {
      id: categoria.id,
      nome: categoria.nome,
      slug: categoria.slug
    },
    produtos: (categoria.produtoCategorias || [])
      .map((pc: { produto: ProdutoItem }) => pc.produto)
      .filter((p: ProdutoItem | null): p is ProdutoItem => Boolean(p))
      .sort((a: ProdutoItem, b: ProdutoItem) => Number(new Date(b.criadoEm)) - Number(new Date(a.criadoEm)))
      .map((p: ProdutoItem) => ({
        id: p.id,
        name: p.nome,
        slug: p.slug,
        description: p.descricao,
        price: p.preco,
        image: p.imagem,
        createdAt: p.criadoEm
      }))
  }
})

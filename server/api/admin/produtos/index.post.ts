import prisma from '../../../db/prisma'
import { requireAdminSession } from '../../../utils/adminSession'

export default defineEventHandler(async (event) => {
  requireAdminSession(event)

  const body = await readBody(event)

  const hasGoogleAds = Boolean(body.googleAdsConversionLabel)

  try {
    return await prisma.produto.create({
      data: {
        nome: body.nome,
        slug: body.slug,
        preco: Number(body.preco),
        descricao: body.descricao,
        ativo: body.ativo ?? true,
        imagem: body.imagem,
        ...(hasGoogleAds
          ? {
              googleAdsConversionLabel: body.googleAdsConversionLabel,
              googleAdsConversionValue:
                body.googleAdsConversionValue === null || body.googleAdsConversionValue === undefined || body.googleAdsConversionValue === ''
                  ? null
                  : Number(body.googleAdsConversionValue),
              googleAdsConversionCurrency: body.googleAdsConversionCurrency || 'BRL'
            }
          : {}),
        tutorialTitulo: body.tutorialTitulo,
        tutorialSubtitulo: body.tutorialSubtitulo,
        tutorialConteudo: body.tutorialConteudo
      }
    })
  } catch (err: any) {
    const message = String(err?.message || '')
    throw createError({
      statusCode: 500,
      statusMessage: message.includes('Unknown column')
        ? 'Banco de dados desatualizado (migração pendente). Rode as migrations em produção.'
        : (err?.message || 'Server Error')
    })
  }
})

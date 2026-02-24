import prisma from '#root/server/db/prisma'
import { createError } from 'h3'
import { getStoreContext } from '#root/server/utils/store'
import { getIntlContext } from '#root/server/utils/intl'
import { resolveEffectivePrice } from '#root/server/utils/productCurrencyPricing'
import { autoTranslateText } from '#root/server/utils/autoTranslate'

function normalizeImageUrl(input: unknown): string | null {
  const raw = String(input ?? '').trim()
  if (!raw) return null

  if (raw.startsWith('http://')) return raw.replace(/^http:\/\//, 'https://')
  if (raw.startsWith('https://')) return raw
  if (raw.startsWith('//')) return `https:${raw}`

  if (raw.startsWith('/uploads/')) return raw

  if (/^([a-z0-9-]+\.)+[a-z]{2,}(\/|$)/i.test(raw)) {
    return `https://${raw}`
  }

  if (raw.startsWith('/')) {
    const baseUrl = String(process.env.WOOCOMMERCE_BASE_URL || '').trim().replace(/\/+$/, '')
    if (!baseUrl) return raw
    return `${baseUrl}${raw}`
  }

  if (/^(wp-content\/|uploads\/)/i.test(raw)) {
    const baseUrl = String(process.env.WOOCOMMERCE_BASE_URL || '').trim().replace(/\/+$/, '')
    if (!baseUrl) return `/${raw}`
    return `${baseUrl}/${raw}`
  }

  if (
    !raw.startsWith('/') &&
    !/^products\//i.test(raw) &&
    !/^public\//i.test(raw) &&
    /\.(png|jpe?g|webp|gif|svg)(\?.*)?$/i.test(raw)
  ) {
    const baseUrl = String(process.env.WOOCOMMERCE_BASE_URL || '').trim().replace(/\/+$/, '')
    if (!baseUrl) return `/${raw.replace(/^\/+/, '')}`
    return `${baseUrl}/${raw.replace(/^\/+/, '')}`
  }

  return raw
}

export default defineEventHandler(async (event) => {
  try {
    const { storeSlug } = getStoreContext()

    const intl = getIntlContext(event)

    const url = event.node?.req?.url || ''
    const queryString = String(url).split('?')[1] || ''
    const params = new URLSearchParams(queryString)
    const queryLang = String(params.get('lang') || '').trim().toLowerCase()
    const langFromQuery = queryLang === 'en' || queryLang === 'es' || queryLang === 'it' || queryLang === 'fr' ? queryLang : ''

    const lang = langFromQuery || (intl.language === 'en' ? 'en' : intl.language === 'es' ? 'es' : intl.language === 'it' ? 'it' : intl.language === 'fr' ? 'fr' : 'pt')

    const products = await (prisma as any).produto.findMany({
      where: {
        ativo: true
      },
      select: {
        id: true,
        nome: true,
        nomeEn: true,
        nomeEs: true,
        nomeIt: true,
        nomeFr: true,
        slug: true,
        descricao: true,
        descricaoEn: true,
        descricaoEs: true,
        descricaoIt: true,
        descricaoFr: true,
        preco: true,
        precoAntigo: true,
        imagem: true,
        cardItems: true,
        precosLoja: {
          where: { storeSlug: storeSlug || undefined },
          select: { preco: true, precoAntigo: true }
        },
        precosMoeda: {
          where: { storeSlug: storeSlug || undefined },
          select: { currency: true, amount: true, oldAmount: true }
        },
        produtoCategorias: { select: { categoria: { select: { slug: true } } } },
        tutorialTitulo: true,
        tutorialTituloEn: true,
        tutorialTituloEs: true,
        tutorialTituloIt: true,
        tutorialTituloFr: true,
        tutorialSubtitulo: true,
        tutorialSubtituloEn: true,
        tutorialSubtituloEs: true,
        tutorialSubtituloIt: true,
        tutorialSubtituloFr: true,
        criadoEm: true
      },
      orderBy: {
        criadoEm: 'desc'
      }
    })

    return products.map((p: any) => {
      const override = (p as any).precosLoja?.[0] || null

      const effective = resolveEffectivePrice({
        requestedCurrency: intl.currency,
        baseAmount: p.preco,
        baseOldAmount: p.precoAntigo,
        storeAmountOverride: override?.preco,
        storeOldAmountOverride: override?.precoAntigo,
        currencyRows: (p as any).precosMoeda || []
      })

      const effectivePrice = effective.amount
      const effectiveOldPrice = effective.oldAmount

      const dbName =
        lang === 'en'
          ? p.nomeEn
          : lang === 'es'
            ? p.nomeEs
            : lang === 'it'
              ? p.nomeIt
              : lang === 'fr'
                ? p.nomeFr
                : null

      const dbDescription =
        lang === 'en'
          ? p.descricaoEn
          : lang === 'es'
            ? p.descricaoEs
            : lang === 'it'
              ? p.descricaoIt
              : lang === 'fr'
                ? p.descricaoFr
                : null

      const dbTutorialTitle =
        lang === 'en'
          ? p.tutorialTituloEn
          : lang === 'es'
            ? p.tutorialTituloEs
            : lang === 'it'
              ? p.tutorialTituloIt
              : lang === 'fr'
                ? p.tutorialTituloFr
                : null

      const dbTutorialSubtitle =
        lang === 'en'
          ? p.tutorialSubtituloEn
          : lang === 'es'
            ? p.tutorialSubtituloEs
            : lang === 'it'
              ? p.tutorialSubtituloIt
              : lang === 'fr'
                ? p.tutorialSubtituloFr
                : null

      const translatedName = (typeof dbName === 'string' && dbName.trim()) ? dbName : (autoTranslateText(p.nome, { lang }) || p.nome)
      const baseDescription = typeof p.descricao === 'string' ? p.descricao : ''
      const translatedDescription = (typeof dbDescription === 'string' && dbDescription.trim()) ? dbDescription : (autoTranslateText(baseDescription, { lang }) || baseDescription)
      const translatedTutorialTitle = (typeof dbTutorialTitle === 'string' && dbTutorialTitle.trim())
        ? dbTutorialTitle
        : (autoTranslateText(p.tutorialTitulo, { lang }) || p.tutorialTitulo)
      const translatedTutorialSubtitle = (typeof dbTutorialSubtitle === 'string' && dbTutorialSubtitle.trim())
        ? dbTutorialSubtitle
        : (autoTranslateText(p.tutorialSubtitulo, { lang }) || p.tutorialSubtitulo)

      return {
        id: p.id,
        name: translatedName,
        slug: p.slug,
        description: translatedDescription,
        price: effectivePrice,
        precoAntigo: effectiveOldPrice,
        currency: effective.currency,
        image: normalizeImageUrl(p.imagem),
        cardItems: p.cardItems,
        categories: (p.produtoCategorias || []).map((pc: any) => pc.categoria?.slug).filter(Boolean),
        tutorialTitle: translatedTutorialTitle,
        tutorialSubtitle: translatedTutorialSubtitle,
        createdAt: p.criadoEm
      }
    })
  } catch (err: any) {
    console.error('GET /api/products failed', err)
    throw createError({
      statusCode: 500,
      statusMessage: err?.message || 'Falha ao carregar produtos'
    })
  }
})

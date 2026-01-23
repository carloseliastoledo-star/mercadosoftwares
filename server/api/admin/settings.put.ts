import { defineEventHandler, readBody, createError } from 'h3'
import prisma from '../../db/prisma'
import { requireAdminSession } from '../../utils/adminSession'

export default defineEventHandler(async (event) => {
  requireAdminSession(event)

  const body = await readBody(event)

  const googleAnalyticsId = body?.googleAnalyticsId === null || body?.googleAnalyticsId === undefined
    ? null
    : String(body.googleAnalyticsId).trim()

  const googleAdsConversionId = body?.googleAdsConversionId === null || body?.googleAdsConversionId === undefined
    ? null
    : String(body.googleAdsConversionId).trim()

  const googleAdsConversionLabel = body?.googleAdsConversionLabel === null || body?.googleAdsConversionLabel === undefined
    ? null
    : String(body.googleAdsConversionLabel).trim()

  if (googleAdsConversionId && googleAdsConversionId.length > 64) {
    throw createError({ statusCode: 400, statusMessage: 'googleAdsConversionId inválido' })
  }

  if (googleAnalyticsId && googleAnalyticsId.length > 64) {
    throw createError({ statusCode: 400, statusMessage: 'googleAnalyticsId inválido' })
  }

  if (googleAdsConversionLabel && googleAdsConversionLabel.length > 64) {
    throw createError({ statusCode: 400, statusMessage: 'googleAdsConversionLabel inválido' })
  }

  const existing = await prisma.siteSettings.findFirst({
    select: { id: true }
  })

  const settings = existing
    ? await prisma.siteSettings.update({
        where: { id: existing.id },
        data: {
          googleAnalyticsId: googleAnalyticsId || null,
          googleAdsConversionId: googleAdsConversionId || null,
          googleAdsConversionLabel: googleAdsConversionLabel || null
        },
        select: {
          id: true,
          googleAnalyticsId: true,
          googleAdsConversionId: true,
          googleAdsConversionLabel: true
        }
      })
    : await prisma.siteSettings.create({
        data: {
          googleAnalyticsId: googleAnalyticsId || null,
          googleAdsConversionId: googleAdsConversionId || null,
          googleAdsConversionLabel: googleAdsConversionLabel || null
        },
        select: {
          id: true,
          googleAnalyticsId: true,
          googleAdsConversionId: true,
          googleAdsConversionLabel: true
        }
      })

  return { ok: true, settings }
})

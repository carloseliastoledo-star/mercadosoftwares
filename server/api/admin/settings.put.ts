import { defineEventHandler, readBody, createError } from 'h3'
import prisma from '../../db/prisma'
import { requireAdminSession } from '../../utils/adminSession'

export default defineEventHandler(async (event) => {
  requireAdminSession(event)

  const body = await readBody(event)
  const googleAdsConversionId = body?.googleAdsConversionId === null || body?.googleAdsConversionId === undefined
    ? null
    : String(body.googleAdsConversionId).trim()

  const googleAdsConversionLabel = body?.googleAdsConversionLabel === null || body?.googleAdsConversionLabel === undefined
    ? null
    : String(body.googleAdsConversionLabel).trim()

  if (googleAdsConversionId && googleAdsConversionId.length > 64) {
    throw createError({ statusCode: 400, statusMessage: 'googleAdsConversionId inválido' })
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
          googleAdsConversionId: googleAdsConversionId || null,
          googleAdsConversionLabel: googleAdsConversionLabel || null
        },
        select: {
          id: true,
          googleAdsConversionId: true,
          googleAdsConversionLabel: true
        }
      })
    : await prisma.siteSettings.create({
        data: {
          googleAdsConversionId: googleAdsConversionId || null,
          googleAdsConversionLabel: googleAdsConversionLabel || null
        },
        select: {
          id: true,
          googleAdsConversionId: true,
          googleAdsConversionLabel: true
        }
      })

  return { ok: true, settings }
})

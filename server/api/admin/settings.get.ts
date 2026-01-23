import { defineEventHandler } from 'h3'
import prisma from '../../db/prisma'
import { requireAdminSession } from '../../utils/adminSession'

export default defineEventHandler(async (event) => {
  requireAdminSession(event)

  const existing = await prisma.siteSettings.findFirst({
    select: {
      id: true,
      googleAnalyticsId: true,
      googleAdsConversionId: true,
      googleAdsConversionLabel: true
    }
  })

  if (existing) return { ok: true, settings: existing }

  const created = await prisma.siteSettings.create({
    data: {},
    select: {
      id: true,
      googleAnalyticsId: true,
      googleAdsConversionId: true,
      googleAdsConversionLabel: true
    }
  })

  return { ok: true, settings: created }
})

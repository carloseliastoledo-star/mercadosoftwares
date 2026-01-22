import { defineEventHandler } from 'h3'
import prisma from '#root/server/db/prisma'

export default defineEventHandler(async () => {
  const existing = await prisma.siteSettings.findFirst({
    select: {
      id: true,
      googleAdsConversionId: true,
      googleAdsConversionLabel: true
    }
  })

  if (existing) return { ok: true, settings: existing }

  const created = await prisma.siteSettings.create({
    data: {},
    select: {
      id: true,
      googleAdsConversionId: true,
      googleAdsConversionLabel: true
    }
  })

  return { ok: true, settings: created }
})

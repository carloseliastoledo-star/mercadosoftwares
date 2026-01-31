export type StoreContext = {
  storeSlug: string | null
  includeLegacy: boolean
}

function normalizeSlug(input: string) {
  return String(input || '')
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function getStoreContext(): StoreContext {
  const storeSlugEnv = normalizeSlug(process.env.STORE_SLUG || '')
  const includeLegacy = String(process.env.STORE_INCLUDE_LEGACY || '').trim() === 'true'

  if (storeSlugEnv) {
    return { storeSlug: storeSlugEnv, includeLegacy }
  }

  const siteUrl = String(process.env.SITE_URL || '').trim()
  if (siteUrl) {
    return { storeSlug: normalizeSlug(siteUrl), includeLegacy }
  }

  return { storeSlug: null, includeLegacy }
}

export function whereForStore<T extends Record<string, any>>(
  baseWhere: T,
  ctx: StoreContext
): T | { OR: any[] } {
  if (!ctx.storeSlug) {
    return baseWhere
  }

  if (ctx.includeLegacy) {
    return {
      OR: [{ ...baseWhere, storeSlug: ctx.storeSlug }, { ...baseWhere, storeSlug: null }]
    }
  }

  return { ...baseWhere, storeSlug: ctx.storeSlug }
}

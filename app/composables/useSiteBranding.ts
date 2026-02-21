export function useSiteBranding() {
  const config = useRuntimeConfig()

  const defaultSiteName = 'Mercado Softwares'
  const defaultLogoPath = '/logo-mercadosoftwares.svg'

  const rawName = String((config.public as any)?.siteName || '').trim()
  const siteName = rawName && rawName !== 'Site' ? rawName : defaultSiteName

  const rawLogo = String(config.public.logoPath || '').trim()
  const logoPath = rawLogo && rawLogo !== '/logo.png' ? rawLogo : defaultLogoPath
  const supportEmail = String(config.public.supportEmail || '').trim() || ''
  const topbarText = String(config.public.topbarText || '').trim() || ''
  const topbarLink = String(config.public.topbarLink || '').trim() || ''
  const whatsappNumber = String(config.public.whatsappNumber || '').trim() || ''

  return {
    siteName,
    logoPath,
    supportEmail,
    topbarText,
    topbarLink,
    whatsappNumber
  }
}

export function useSiteUrl() {
  const config = useRuntimeConfig()
  const configured = String(config.public.siteUrl || '').trim()

  if (configured) return configured.replace(/\/$/, '')

  if (import.meta.server) {
    try {
      const url = useRequestURL()
      return String(url?.origin || '').replace(/\/$/, '')
    } catch {
      return ''
    }
  }

  if (typeof window !== 'undefined' && window.location?.origin) {
    return String(window.location.origin).replace(/\/$/, '')
  }

  return ''
}

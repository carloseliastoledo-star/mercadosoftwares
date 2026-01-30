export function useSiteBranding() {
  const config = useRuntimeConfig()

  const siteName = String(config.public.siteName || '').trim() || 'Site'
  const logoPath = String(config.public.logoPath || '').trim() || '/logo.png'
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

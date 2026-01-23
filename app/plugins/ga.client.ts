export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig()

  const { data: siteSettings } = await useFetch('/api/site-settings', { server: false })

  const googleAnalyticsId = String(
    (siteSettings.value as any)?.settings?.googleAnalyticsId || config.public.googleAnalyticsId || ''
  )

  if (!googleAnalyticsId) return

  const w = window as any
  w.dataLayer = w.dataLayer || []
  w.gtag = w.gtag || function gtag() { w.dataLayer.push(arguments) }

  const pageView = (path: string) => {
    w.gtag('config', googleAnalyticsId, {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title
    })
  }

  pageView(window.location.pathname + window.location.search + window.location.hash)

  nuxtApp.hook('page:finish', () => {
    pageView(window.location.pathname + window.location.search + window.location.hash)
  })
})

type ClientIntl = {
  language: 'pt'
  locale: 'pt-BR'
  currency: 'BRL' | 'USD' | 'EUR'
  currencyLower: 'brl' | 'usd' | 'eur'
  isIntl: boolean
  host: string
  countryCode: string
  setLanguage: (next: 'pt') => void
  setCurrency: (next: 'brl' | 'usd' | 'eur') => void
  setCountry: (next: string) => void
}

function normalizeCurrency(input: unknown): 'brl' | 'usd' | 'eur' | null {
  const v = String(input || '').trim().toLowerCase()
  if (!v) return null
  if (v === 'brl') return 'brl'
  if (v === 'usd') return 'usd'
  if (v === 'eur') return 'eur'
  return null
}

function detectHost(): string {
  if (import.meta.server) {
    try {
      const headers = useRequestHeaders(['x-forwarded-host', 'host']) as Record<string, string | undefined>
      const raw = headers?.['x-forwarded-host'] || headers?.host || ''
      const first = String(raw).split(',')[0]?.trim()
      return String(first || '').toLowerCase()
    } catch {
      return ''
    }
  }

  return String(window.location.host || '').toLowerCase()
}

export function useIntlContext() {
  const host = computed(() => detectHost())

  const langCookie = useCookie<string | null>('ld_lang', { sameSite: 'lax', path: '/' })
  const currencyCookie = useCookie<string | null>('ld_currency', { sameSite: 'lax', path: '/' })
  const countryCookie = useCookie<string | null>('ld_country', { sameSite: 'lax', path: '/' })

  const countryCode = computed(() => String(countryCookie.value || '').trim().toUpperCase())

  const language = computed<ClientIntl['language']>(() => 'pt')

  const locale = computed<ClientIntl['locale']>(() => 'pt-BR')

  const currencyLower = computed<ClientIntl['currencyLower']>(() => {
    const country = String(countryCode.value || '').trim().toUpperCase()

    if (country === 'BR') return 'brl'

    const eur = new Set([
      'AT',
      'BE',
      'BG',
      'HR',
      'CY',
      'CZ',
      'DK',
      'EE',
      'FI',
      'FR',
      'DE',
      'GR',
      'HU',
      'IE',
      'IT',
      'LV',
      'LT',
      'LU',
      'MT',
      'NL',
      'PL',
      'PT',
      'RO',
      'SK',
      'SI',
      'ES'
    ])

    if (country) {
      if (eur.has(country)) return 'eur'
      return 'usd'
    }

    const c = normalizeCurrency(currencyCookie.value)
    if (c) return c

    return 'brl'
  })

  const currency = computed<ClientIntl['currency']>(() => {
    if (currencyLower.value === 'usd') return 'USD'
    if (currencyLower.value === 'eur') return 'EUR'
    return 'BRL'
  })

  const isIntl = computed(() => currencyLower.value !== 'brl')

  return {
    host,
    language,
    locale,
    currency,
    currencyLower,
    isIntl,
    countryCode,
    setLanguage: (next) => {
      langCookie.value = next
    },
    setCurrency: (next) => {
      currencyCookie.value = next
    },
    setCountry: (next) => {
      const v = String(next || '').trim().toUpperCase()
      countryCookie.value = v || null
    }
  }
}

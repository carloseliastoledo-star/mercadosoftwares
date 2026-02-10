export default defineNuxtPlugin(() => {
  const send = (payload: any) => {
    try {
      $fetch('/api/client-error', {
        method: 'POST',
        body: {
          ...payload,
          href: window.location.href,
          userAgent: navigator.userAgent
        }
      }).catch(() => undefined)
    } catch {
      // ignore
    }
  }

  window.addEventListener('error', (event: any) => {
    try {
      send({
        type: 'error',
        message: String(event?.message || ''),
        filename: String(event?.filename || ''),
        lineno: Number(event?.lineno || 0),
        colno: Number(event?.colno || 0),
        stack: String(event?.error?.stack || '')
      })
    } catch {
      // ignore
    }
  })

  window.addEventListener('unhandledrejection', (event: any) => {
    try {
      const reason = event?.reason
      send({
        type: 'unhandledrejection',
        message: String(reason?.message || reason || ''),
        stack: String(reason?.stack || '')
      })
    } catch {
      // ignore
    }
  })
})

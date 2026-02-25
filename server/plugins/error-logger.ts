import { defineNitroPlugin } from 'nitropack/runtime'

export default defineNitroPlugin((nitroApp: any) => {
  nitroApp.hooks.hook('afterResponse', (event: any) => {
    try {
      const statusCode = Number(event?.node?.res?.statusCode || 0)
      if (!statusCode || statusCode < 500) return

      const method = event?.node?.req?.method
      const url = event?.node?.req?.url
      const statusMessage = event?.node?.res?.statusMessage

      const payload = {
        method,
        url,
        statusCode,
        statusMessage,
        userAgent: event?.node?.req?.headers?.['user-agent']
      }
      console.error('[nitro][5xx]', JSON.stringify(payload))
      console.log('[nitro][5xx]', JSON.stringify(payload))
    } catch {
      // ignore
    }
  })

  nitroApp.hooks.hook('error', (error: any, { event }: { event?: any }) => {
    try {
      const url = event?.node?.req?.url
      const method = event?.node?.req?.method
      const statusCode = Number((error as any)?.statusCode || 0)
      if (statusCode && statusCode < 500) return

      const payload = {
        method,
        url,
        name: (error as any)?.name,
        message: (error as any)?.message,
        statusCode,
        statusMessage: (error as any)?.statusMessage,
        cause: (error as any)?.cause,
        stack: (error as any)?.stack
      }
      console.error('[nitro][error]', JSON.stringify(payload))
      console.log('[nitro][error]', JSON.stringify(payload))
    } catch {
      const statusCode = Number((error as any)?.statusCode || 0)
      if (statusCode && statusCode < 500) return
      const payload = {
        name: (error as any)?.name,
        message: (error as any)?.message,
        statusCode,
        statusMessage: (error as any)?.statusMessage,
        cause: (error as any)?.cause,
        stack: (error as any)?.stack
      }
      console.error('[nitro][error]', JSON.stringify(payload))
      console.log('[nitro][error]', JSON.stringify(payload))
    }
  })
})

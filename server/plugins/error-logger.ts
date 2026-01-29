export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('error', (error, { event }) => {
    try {
      const url = event?.node?.req?.url
      console.error('[nitro][error]', url, error)
    } catch {
      console.error('[nitro][error]', error)
    }
  })
})

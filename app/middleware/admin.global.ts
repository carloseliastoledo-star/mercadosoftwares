import { navigateTo } from '#app'

export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin')) return

  if (to.path === '/admin/login') return

  if (import.meta.server) {
    const headers = useRequestHeaders(['cookie'])
    const requestFetch = useRequestFetch()
    try {
      await requestFetch('/api/admin/auth/me', { headers })
      return
    } catch {
      return navigateTo('/admin/login')
    }
  }

  try {
    await $fetch('/api/admin/auth/me')
    return
  } catch {
    return navigateTo('/admin/login')
  }
})

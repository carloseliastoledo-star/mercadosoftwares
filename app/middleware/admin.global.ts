import { navigateTo, useNuxtApp } from '#app'

export default defineNuxtRouteMiddleware((to) => {
  if (!to.path.startsWith('/admin')) return

  if (to.path === '/admin/login') return

  if (import.meta.server) {
    const $fetch = useRequestFetch()
    const headers = useRequestHeaders(['cookie'])
    return $fetch('/api/admin/auth/me', { headers })
      .then(() => undefined)
      .catch(() => navigateTo('/admin/login'))
  }

  const { $fetch } = useNuxtApp()

  return $fetch('/api/admin/auth/me')
    .then(() => undefined)
    .catch(() => navigateTo('/admin/login'))
})

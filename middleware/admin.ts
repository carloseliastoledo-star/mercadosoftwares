import { navigateTo, useNuxtApp } from '#app'

export default defineNuxtRouteMiddleware((to) => {
  // Só protege rotas /admin
  if (to.path.startsWith('/admin')) {

    // Libera a página de login
    if (to.path === '/admin/login') return

    const { $fetch } = useNuxtApp()

    if (import.meta.server) {
      const headers = useRequestHeaders(['cookie'])
      return $fetch('/api/admin/auth/me', { headers })
        .then(() => undefined)
        .catch(() => navigateTo('/admin/login'))
    }

    return $fetch('/api/admin/auth/me')
      .then(() => undefined)
      .catch(() => navigateTo('/admin/login'))
  }
})

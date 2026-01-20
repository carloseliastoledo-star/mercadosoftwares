import { navigateTo, useNuxtApp } from '#app'

export default defineNuxtRouteMiddleware((to) => {
  // Só protege rotas /admin
  if (to.path.startsWith('/admin')) {

    // Libera a página de login
    if (to.path === '/admin/login') return

    // Roda apenas no navegador
    if (import.meta.client) {
      const { $fetch } = useNuxtApp()

      return $fetch('/api/admin/auth/me')
        .then(() => undefined)
        .catch(() => navigateTo('/admin/login'))
    }
  }
})

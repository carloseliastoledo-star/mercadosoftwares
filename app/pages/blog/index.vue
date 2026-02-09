<template>
  <section class="bg-gray-50 min-h-screen py-12">
    <div class="max-w-5xl mx-auto px-6">
      <h1 class="text-3xl font-bold text-gray-900">Blog</h1>
      <p class="text-sm text-gray-600 mt-2">Novidades e tutoriais.</p>

      <div v-if="pending" class="mt-8 text-sm text-gray-600">Carregando...</div>
      <div v-else-if="error" class="mt-8 text-sm text-red-600">Não foi possível carregar o blog.</div>

      <div v-else class="mt-8 space-y-4">
        <div v-if="!posts.length" class="text-sm text-gray-600">Nenhum post publicado ainda.</div>

        <NuxtLink
          v-for="p in posts"
          :key="p.slug"
          :to="`/${p.slug}`"
          class="block bg-white border border-gray-100 rounded-2xl p-6 hover:border-blue-200 hover:shadow-sm transition"
        >
          <div class="text-xl font-bold text-gray-900">{{ p.titulo }}</div>
          <div class="text-xs text-gray-500 mt-2">Atualizado em {{ formatDate(p.atualizadoEm) }}</div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { siteName } = useSiteBranding()

const config = useRuntimeConfig()
const storeSlug = computed(() => String((config.public as any)?.storeSlug || '').trim())

const host = computed(() => {
  if (process.server) {
    try {
      const url = useRequestURL()
      if (url?.host) return String(url.host).toLowerCase()
    } catch {
      // ignore
    }
    const headers = useRequestHeaders(['x-forwarded-host', 'x-original-host', 'host']) as Record<string, string | undefined>
    const raw = headers?.['x-forwarded-host'] || headers?.['x-original-host'] || headers?.host || ''
    const first = String(raw).split(',')[0]?.trim()
    return String(first || '').toLowerCase()
  }
  return String(window.location.host || '').toLowerCase()
})

const normalizedHost = computed(() => {
  const h0 = String(host.value || '').trim().toLowerCase()
  const h1 = h0.replace(/^https?:\/\//, '')
  const h2 = h1.replace(/\/.*/, '')
  const h3 = h2.replace(/:\d+$/, '')
  const h4 = h3.replace(/^www\./, '')
  return h4.replace(/\.$/, '')
})

const isCasaDoSoftware = computed(() => {
  if (normalizedHost.value.includes('casadosoftware.com.br')) return true
  return storeSlug.value === 'casadosoftware'
})

useSeoMeta(() => {
  if (isCasaDoSoftware.value) {
    const title = 'Tutoriais de Ativação Windows e Office | Casa do Software'
    const description =
      'Aprenda a ativar Windows e Office legalmente com nossos guias passo a passo. Dicas, comparativos e suporte técnico.'

    return {
      title,
      description,
      ogTitle: title,
      ogDescription: description,
      twitterTitle: title,
      twitterDescription: description
    }
  }

  const title = `Blog - ${siteName}`
  return { title }
})

type BlogPostListDto = {
  titulo: string
  slug: string
  criadoEm: string
  atualizadoEm: string
}

const { data, pending, error } = await useFetch<{ ok: true; posts: BlogPostListDto[] }>('/api/blog', {
  server: true
})

const posts = computed(() => data.value?.posts || [])

function formatDate(input: string) {
  try {
    return new Date(input).toLocaleDateString('pt-BR')
  } catch {
    return input
  }
}
</script>

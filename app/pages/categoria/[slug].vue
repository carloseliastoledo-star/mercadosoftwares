<template>
  <section class="bg-gray-100 min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-6">
      <div class="mb-8">
        <h1 class="text-3xl font-extrabold text-gray-900">{{ categoria?.nome || 'Categoria' }}</h1>
        <p class="text-sm text-gray-600 mt-1" v-if="categoria?.slug">/categoria/{{ categoria.slug }}/</p>
      </div>

      <div v-if="pending" class="text-center py-16 text-gray-500">
        Carregando...
      </div>
      <div v-else-if="error" class="text-center py-16 text-red-600">
        Categoria não encontrada.
      </div>

      <div v-else class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <ProductCard
          v-for="p in produtos"
          :key="p.id + (p.imagem || p.image || '')"
          :product="p"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ProductCard from '~/components/ProductCard.vue'

const route = useRoute()
const slug = String(route.params.slug || '')

const baseUrl = useSiteUrl()
const { siteName } = useSiteBranding()

const { data, pending, error } = await useFetch(() => `/api/categorias/${slug}`, {
  server: true
})

const categoria = computed(() => (data.value as any)?.categoria || null)
const produtos = computed(() => (data.value as any)?.produtos || [])

const canonicalUrl = computed(() => {
  const s = categoria.value?.slug || slug
  if (!s) return ''
  if (!baseUrl) return ''
  return `${baseUrl}/categoria/${s}`
})

const pageTitle = computed(() => {
  return categoria.value?.nome ? `${categoria.value.nome} | ${siteName}` : `Categoria | ${siteName}`
})

const pageDescription = computed(() => {
  return categoria.value?.descricao || ''
})

useSeoMeta({
  title: pageTitle,
  description: pageDescription
})

useHead(() => ({
  link: canonicalUrl.value
    ? [{ rel: 'canonical', href: canonicalUrl.value }]
    : []
}))
</script>

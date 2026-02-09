<script setup>
import { products } from '~/data/products'

const config = useRuntimeConfig()
const storeSlug = computed(() => String(config.public?.storeSlug || '').trim())

const host = computed(() => {
  if (process.server) {
    try {
      const url = useRequestURL()
      if (url?.host) return String(url.host).toLowerCase()
    } catch {
      // ignore
    }
    const headers = useRequestHeaders(['x-forwarded-host', 'x-original-host', 'host'])
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
  if (!isCasaDoSoftware.value) return {}
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
})
</script>

<template>
  <section class="py-20">
    <div class="max-w-5xl mx-auto px-6">
      <h1 class="text-3xl font-bold mb-10">
        Tutoriais de Ativação
      </h1>

      <ul class="space-y-4">
        <li
          v-for="p in products"
          :key="p.slug"
          class="bg-white border rounded-lg p-6 hover:shadow"
        >
          <NuxtLink
            :to="`/tutoriais/${p.slug}`"
            class="text-blue-600 font-semibold hover:underline"
          >
            Como ativar {{ p.name }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

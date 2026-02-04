<template>
  <div class="bg-gray-50 min-h-screen">
    <section class="max-w-6xl mx-auto px-6 py-10">
      <div v-if="pending" class="bg-white rounded-2xl border border-gray-100 p-8 text-sm text-gray-600">
        Carregando...
      </div>

      <div v-else-if="error" class="bg-white rounded-2xl border border-gray-100 p-8">
        <div class="text-lg font-extrabold text-gray-900">Página não publicada</div>
        <div class="mt-2 text-sm text-gray-600">
          Crie uma página no admin com o slug <span class="font-mono">licencas-digitais-originais</span> e marque como publicada.
        </div>
      </div>

      <div v-else class="bg-white rounded-2xl border border-gray-100 p-8 md:p-10">
        <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
          {{ pagina?.titulo || 'Licenças Digitais Originais' }}
        </h1>
        <div class="prose prose-gray max-w-none mt-6" v-html="conteudoHtml" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import DOMPurify from 'isomorphic-dompurify'

definePageMeta({ layout: 'blank' })

const slug = 'licencas-digitais-originais'

type PaginaDto = {
  titulo: string
  slug: string
  conteudo: string | null
  atualizadoEm: string
}

const { data, pending, error } = await useFetch<{ ok: true; pagina: PaginaDto }>(() => `/api/paginas/${slug}`, {
  server: true
})

const pagina = computed(() => data.value?.pagina || null)

const conteudoHtml = computed(() => {
  const raw = String(pagina.value?.conteudo || '')
  return DOMPurify.sanitize(raw)
})
</script>

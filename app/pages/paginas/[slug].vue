<template>
  <section class="bg-gray-50 min-h-screen py-12">
    <div class="max-w-4xl mx-auto px-6">
      <div class="bg-white rounded-2xl border border-gray-100 p-8">
        <div v-if="pending" class="text-sm text-gray-600">Carregando...</div>
        <div v-else-if="error" class="text-sm text-red-600">Página não encontrada.</div>

        <div v-else>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">{{ pagina?.titulo }}</h1>
          <p v-if="pagina?.atualizadoEm" class="text-xs text-gray-500 mt-2">
            Atualizado em {{ formatDate(pagina.atualizadoEm) }}
          </p>

          <div class="prose prose-gray max-w-none mt-6 whitespace-pre-wrap">
            {{ pagina?.conteudo || '' }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))

type PaginaDto = {
  titulo: string
  slug: string
  conteudo: string | null
  atualizadoEm: string
}

const { data, pending, error } = await useFetch<{ ok: true; pagina: PaginaDto }>(() => `/api/paginas/${slug.value}`, {
  server: true
})

const pagina = computed(() => data.value?.pagina || null)

useHead(() => {
  const title = pagina.value?.titulo ? `${pagina.value.titulo} - Casa do Software` : 'Casa do Software'
  return { title }
})

function formatDate(input: string) {
  try {
    return new Date(input).toLocaleString('pt-BR')
  } catch {
    return input
  }
}
</script>

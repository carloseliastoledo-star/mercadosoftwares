<script setup lang="ts">
definePageMeta({ ssr: false })

const route = useRoute()
const slug = route.params.slug as string

const { data, pending, error } = await useFetch(
  () => `/api/products/${slug}`,
  { server: false }
)

const tutorial = computed(() => {
  const p: any = data.value
  if (!p) return null

  return {
    title: p.tutorialTitle || 'Tutorial de Ativação',
    content: p.tutorialContent || ''
  }
})
</script>

<template>
  <section class="py-20">
    <div class="max-w-4xl mx-auto px-6">

      <div v-if="pending" class="text-gray-500">
        Carregando tutorial...
      </div>

      <div v-else-if="error || !tutorial">
        <h1 class="text-2xl font-bold">
          Tutorial não encontrado
        </h1>
      </div>

      <div v-else>
        <h1 class="text-3xl font-bold mb-6">
          {{ tutorial.title }}
        </h1>

        <pre class="bg-gray-50 p-6 rounded-lg whitespace-pre-wrap text-sm">
{{ tutorial.content }}
        </pre>
      </div>

    </div>
  </section>
</template>
